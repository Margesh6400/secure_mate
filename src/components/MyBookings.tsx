import React, { useState, useEffect } from 'react';
import { supabase, type Booking, type Payment } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  IndianRupee, 
  MapPin, 
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Timer,
  Sun,
  CreditCard
} from 'lucide-react';
import Button from './Button';

const MyBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          bodyguard:bodyguards(*),
          payment:payments(*)
        `)
        .eq('client_id', user.id)
        .order('booking_start', { ascending: false });

      if (error) {
        setError('Failed to load bookings. Please try again.');
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const getBookingType = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationHours = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    
    // Check if it's a full day booking (12 hours, 9 AM to 9 PM)
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    
    if (durationHours === 12 && startHour === 9 && endHour === 21) {
      return { type: 'Full Day', duration: '12 hours (9 AM - 9 PM)' };
    } else {
      return { type: 'Hourly', duration: `${durationHours} hour${durationHours > 1 ? 's' : ''}` };
    }
  };

  const isUpcoming = (startTime: string) => {
    return new Date(startTime) > new Date();
  };

  const canCancel = (booking: Booking) => {
    return booking.status === 'pending' && isUpcoming(booking.booking_start);
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) {
        console.error('Error cancelling booking:', error);
      } else {
        fetchBookings(); // Refresh bookings
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-neutral-600">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <Button variant="outline" onClick={fetchBookings}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">My Bookings</h2>
        <Button variant="outline" size="sm" onClick={fetchBookings}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-100/50">
          <Calendar className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No bookings yet</h3>
          <p className="text-neutral-600">
            Book your first bodyguard to see your bookings here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const startDateTime = formatDateTime(booking.booking_start);
            const endDateTime = formatDateTime(booking.booking_end);
            const bookingTypeInfo = getBookingType(booking.booking_start, booking.booking_end);
            const upcoming = isUpcoming(booking.booking_start);

            return (
              <div
                key={booking.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-100/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 p-6"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex flex-col space-y-2">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </div>
                    {booking.payment && (
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking.payment.status)}`}>
                        {getPaymentStatusIcon(booking.payment.status)}
                        <span className="ml-1 capitalize">Payment {booking.payment.status}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  {/* Bodyguard Photo */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                      {booking.bodyguard?.photo_url ? (
                        <img
                          src={booking.bodyguard.photo_url}
                          alt={booking.bodyguard.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    {upcoming && booking.status === 'confirmed' && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                    )}
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-primary">
                        {booking.bodyguard?.name || 'Unknown Bodyguard'}
                      </h3>
                      <div className="flex items-center space-x-1 text-primary">
                        <IndianRupee className="w-4 h-4" />
                        <span className="font-bold">
                          {(booking.total_amount ?? 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.bodyguard?.base_city}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {bookingTypeInfo.type === 'Full Day' ? (
                          <Sun className="w-4 h-4" />
                        ) : (
                          <Timer className="w-4 h-4" />
                        )}
                        <span>{bookingTypeInfo.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{bookingTypeInfo.duration}</span>
                      </div>
                    </div>

                    {/* Booking Type Badge */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        bookingTypeInfo.type === 'Full Day' 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-purple-100 text-purple-800 border border-purple-200'
                      }`}>
                        {bookingTypeInfo.type === 'Full Day' ? (
                          <Sun className="w-3 h-3 mr-1" />
                        ) : (
                          <Timer className="w-3 h-3 mr-1" />
                        )}
                        {bookingTypeInfo.type}
                      </span>
                    </div>

                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium text-neutral-700">Start:</span>
                          <div className="text-neutral-600">
                            {startDateTime.date} at {startDateTime.time}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">End:</span>
                          <div className="text-neutral-600">
                            {endDateTime.date} at {endDateTime.time}
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-blue-800">Notes:</span>
                        <p className="text-blue-700 text-sm mt-1">{booking.notes}</p>
                      </div>
                    )}

                    {/* Payment Information */}
                    {booking.payment && (
                      <div className="mt-3 p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-neutral-700 flex items-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Payment Details
                          </span>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking.payment.status)}`}>
                            {getPaymentStatusIcon(booking.payment.status)}
                            <span className="ml-1 capitalize">{booking.payment.status}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-neutral-500">Amount:</span>
                            <div className="font-medium">₹{booking.payment.amount.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-neutral-500">Currency:</span>
                            <div className="font-medium">{booking.payment.currency}</div>
                          </div>
                          {booking.payment.razorpay_payment_id && (
                            <div className="col-span-2">
                              <span className="text-neutral-500">Payment ID:</span>
                              <div className="font-mono text-xs">{booking.payment.razorpay_payment_id}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    {canCancel(booking) && (
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id!)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Booking
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;