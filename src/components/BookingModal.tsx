import React, { useState } from 'react';
import { X, Calendar, Clock, IndianRupee, AlertCircle, CheckCircle, Timer, Sun } from 'lucide-react';
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
    bookingType: 'hourly' | 'fullday';
  }) => Promise<{ success: boolean; message: string }>;
}

type BookingType = 'hourly' | 'fullday';

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bodyguard,
  onBookingSubmit
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [bookingType, setBookingType] = useState<BookingType>('hourly');
  const [hours, setHours] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Calculate total amount based on booking type
  const calculateTotal = () => {
    if (bookingType === 'hourly') {
      return hours * bodyguard.pricing_hourly;
    } else {
      return bodyguard.pricing_daily;
    }
  };

  // Get booking duration text
  const getDurationText = () => {
    if (bookingType === 'hourly') {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return '12 hours (9 AM - 9 PM)';
    }
  };

  // Get booking start and end times
  const getBookingTimes = () => {
    if (bookingType === 'hourly') {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(start.getTime() + (hours * 60 * 60 * 1000));
      return {
        startTime: start.toISOString(),
        endTime: end.toISOString()
      };
    } else {
      const start = new Date(`${selectedDate}T09:00:00`);
      const end = new Date(`${selectedDate}T21:00:00`);
      return {
        startTime: start.toISOString(),
        endTime: end.toISOString()
      };
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      setMessage(null);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (bookingType === 'hourly') {
      if (!startDate || !startTime) {
        setMessage({ type: 'error', text: 'Please select both date and time.' });
        return;
      }
      
      const startDateTime = new Date(`${startDate}T${startTime}`);
      if (startDateTime < new Date()) {
        setMessage({ type: 'error', text: 'Start time cannot be in the past.' });
        return;
      }
    } else {
      if (!selectedDate) {
        setMessage({ type: 'error', text: 'Please select a date.' });
        return;
      }
      
      const selectedDateTime = new Date(`${selectedDate}T09:00:00`);
      if (selectedDateTime < new Date()) {
        setMessage({ type: 'error', text: 'Selected date cannot be in the past.' });
        return;
      }
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { startTime: bookingStart, endTime: bookingEnd } = getBookingTimes();
      const totalAmount = calculateTotal();

      const result = await onBookingSubmit({
        bodyguardId: bodyguard.id,
        startTime: bookingStart,
        endTime: bookingEnd,
        totalAmount,
        bookingType
      });

      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      });

      if (result.success) {
        // Reset form and close modal after success
        setTimeout(() => {
          handleClose();
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
      setStep(1);
      setBookingType('hourly');
      setHours(1);
      setStartDate('');
      setStartTime('');
      setSelectedDate('');
      setMessage(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  // Get minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];
  // Get minimum time (current time + 1 hour if today is selected)
  const getMinTime = () => {
    if (startDate === minDate) {
      const now = new Date();
      now.setHours(now.getHours() + 1);
      return now.toTimeString().slice(0, 5);
    }
    return '00:00';
  };

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

        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-neutral-50/50">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary' : 'text-neutral-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= 1 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Booking Type</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-neutral-200'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-neutral-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= 2 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Date & Time</span>
            </div>
          </div>
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

        {/* Step 1: Booking Type Selection */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Choose Booking Type</h4>
              <div className="grid grid-cols-1 gap-4">
                {/* Hourly Option */}
                <button
                  onClick={() => setBookingType('hourly')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    bookingType === 'hourly'
                      ? 'border-accent bg-accent/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      bookingType === 'hourly' ? 'bg-accent/10 text-accent' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      <Timer className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-primary">Hourly Booking</h5>
                      <p className="text-sm text-neutral-600">Perfect for short-term protection</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <IndianRupee className="w-4 h-4 text-primary" />
                        <span className="font-bold text-primary">{bodyguard.pricing_hourly}</span>
                        <span className="text-sm text-neutral-600">/hour</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Full Day Option */}
                <button
                  onClick={() => setBookingType('fullday')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    bookingType === 'fullday'
                      ? 'border-accent bg-accent/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      bookingType === 'fullday' ? 'bg-accent/10 text-accent' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      <Sun className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-primary">Full Day Booking</h5>
                      <p className="text-sm text-neutral-600">12 hours (9 AM - 9 PM)</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <IndianRupee className="w-4 h-4 text-primary" />
                        <span className="font-bold text-primary">{bodyguard.pricing_daily}</span>
                        <span className="text-sm text-neutral-600">/day</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                variant="primary"
                className="group"
              >
                Next Step
                <Calendar className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">
                {bookingType === 'hourly' ? 'Select Date, Time & Duration' : 'Select Date'}
              </h4>

              {bookingType === 'hourly' ? (
                <div className="space-y-4">
                  {/* Number of Hours */}
                  <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-neutral-700 mb-2">
                      Number of Hours
                    </label>
                    <select
                      id="hours"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} hour{i + 1 > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={minDate}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Start Time */}
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-neutral-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      min={getMinTime()}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="selectedDate" className="block text-sm font-medium text-neutral-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="selectedDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={minDate}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
                    required
                  />
                  <p className="text-sm text-neutral-600 mt-2">
                    Service will be from 9:00 AM to 9:00 PM
                  </p>
                </div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4">
              <h4 className="font-semibold text-primary mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Booking Type:</span>
                  <span className="font-medium capitalize">{bookingType === 'hourly' ? 'Hourly' : 'Full Day'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Duration:</span>
                  <span className="font-medium">{getDurationText()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Rate:</span>
                  <span className="font-medium">
                    ₹{bookingType === 'hourly' ? bodyguard.pricing_hourly : bodyguard.pricing_daily}
                    {bookingType === 'hourly' ? '/hour' : '/day'}
                  </span>
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

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
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
                    Confirm Booking
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;