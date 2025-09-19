import React, { useState } from 'react';
import { X, Calendar, Clock, IndianRupee, AlertCircle, CheckCircle } from 'lucide-react';
import { Bodyguard } from '../lib/supabase';
import Button from './Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bodyguard: Bodyguard;
  onBookingSubmit: (bookingData: {
    bodyguardId: string;
    startTime: string;
    endTime: string;
    totalAmount: number;
  }) => Promise<{ success: boolean; message: string }>;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bodyguard,
  onBookingSubmit
}) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Calculate total amount based on duration
  const calculateTotal = () => {
    if (!startTime || !endTime) return 0;
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    
    if (durationHours <= 0) return 0;
    
    // If booking is 8+ hours, use daily rate, otherwise hourly
    if (durationHours >= 8) {
      const days = Math.ceil(durationHours / 24);
      return days * bodyguard.pricing_daily;
    } else {
      return durationHours * bodyguard.pricing_hourly;
    }
  };

  const getDuration = () => {
    if (!startTime || !endTime) return '';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    
    if (durationHours <= 0) return 'Invalid duration';
    
    if (durationHours >= 24) {
      const days = Math.floor(durationHours / 24);
      const hours = durationHours % 24;
      return `${days} day${days > 1 ? 's' : ''}${hours > 0 ? ` ${hours} hour${hours > 1 ? 's' : ''}` : ''}`;
    } else {
      return `${durationHours} hour${durationHours > 1 ? 's' : ''}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startTime || !endTime) {
      setMessage({ type: 'error', text: 'Please select both start and end times.' });
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (end <= start) {
      setMessage({ type: 'error', text: 'End time must be after start time.' });
      return;
    }

    if (start < new Date()) {
      setMessage({ type: 'error', text: 'Start time cannot be in the past.' });
      return;
    }

    const totalAmount = calculateTotal();
    if (totalAmount <= 0) {
      setMessage({ type: 'error', text: 'Invalid booking duration.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await onBookingSubmit({
        bodyguardId: bodyguard.id,
        startTime,
        endTime,
        totalAmount
      });

      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      });

      if (result.success) {
        // Reset form and close modal after success
        setTimeout(() => {
          setStartTime('');
          setEndTime('');
          setMessage(null);
          onClose();
        }, 2000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setStartTime('');
      setEndTime('');
      setMessage(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  // Get minimum datetime (current time + 1 hour)
  const minDateTime = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-neutral-200/50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
              {bodyguard.photo_url ? (
                <img
                  src={bodyguard.photo_url}
                  alt={bodyguard.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {bodyguard.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Book {bodyguard.name}</h3>
              <p className="text-sm text-neutral-600">{bodyguard.specialization}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Status Messages */}
        {message && (
          <div className={`mx-6 mt-4 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-3 text-red-600" />
            )}
            <p className="text-sm">{message.text}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Start Time */}
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-neutral-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              min={minDateTime}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-neutral-700 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min={startTime || minDateTime}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
              required
            />
          </div>

          {/* Pricing Summary */}
          {startTime && endTime && (
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4">
              <h4 className="font-semibold text-primary mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Duration:</span>
                  <span className="font-medium">{getDuration()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Hourly Rate:</span>
                  <span className="font-medium">₹{bodyguard.pricing_hourly}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Daily Rate:</span>
                  <span className="font-medium">₹{bodyguard.pricing_daily}</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">Total Amount:</span>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="text-lg font-bold text-primary">
                        {calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !startTime || !endTime}
              className="flex-1 group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Booking...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Book Now
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;