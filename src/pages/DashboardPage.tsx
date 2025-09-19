import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, type Bodyguard, type Client, type Booking } from '../lib/supabase';
import BodyguardCard from '../components/BodyguardCard';
import BookingModal from '../components/BookingModal';
import MyBookings from '../components/MyBookings';
import Button from '../components/Button';
import { 
  Shield, 
  LogOut, 
  User, 
  MapPin, 
  Search,
  RefreshCw,
  AlertCircle,
  Calendar,
  Users
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const [bodyguards, setBodyguards] = useState<Bodyguard[]>([]);
  const [clientProfile, setClientProfile] = useState<Client | null>(null);
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [selectedBodyguard, setSelectedBodyguard] = useState<Bodyguard | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'bookings'>('browse');

  // Fetch client profile
  useEffect(() => {
    const fetchClientProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching client profile:', error);
        } else {
          setClientProfile(data);
        }
      } catch (error) {
        console.error('Error fetching client profile:', error);
      }
    };

    fetchClientProfile();
  }, [user]);

  // Fetch bodyguards
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch bodyguards
      const { data: bodyguardsData, error: bodyguardsError } = await supabase
        .from('bodyguards')
        .select('*')
        .eq('is_available', true)
        .order('rating', { ascending: false });

      if (bodyguardsError) {
        setError('Failed to load bodyguards. Please try again.');
        console.error('Error fetching bodyguards:', bodyguardsError);
      } else {
        setBodyguards(bodyguardsData || []);
      }

      // Fetch current bookings to check availability
      const now = new Date().toISOString();
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .in('status', ['pending', 'confirmed'])
        .lte('booking_start', now)
        .gte('booking_end', now);

      if (bookingsError) {
        console.error('Error fetching current bookings:', bookingsError);
      } else {
        setCurrentBookings(bookingsData || []);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Subscribe to bookings changes
    const bookingsSubscription = supabase
      .channel('bookings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        () => {
          // Refresh data when bookings change
          fetchData();
        }
      )
      .subscribe();
    return () => {
      bookingsSubscription.unsubscribe();
    };
  }, [user]);

  // Handle booking submission
  const handleBookingSubmit = async (bookingData: {
    bodyguardId: string;
    startTime: string;
    endTime: string;
    totalAmount: number;
  }): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'You must be logged in to book a bodyguard.' };
    }

    try {
      // Check for conflicts using the database function
      const { data: conflictCheck, error: conflictError } = await supabase
        .rpc('check_booking_conflict', {
          p_bodyguard_id: bookingData.bodyguardId,
          p_start: bookingData.startTime,
          p_end: bookingData.endTime
        });

      if (conflictError) {
        console.error('Error checking conflicts:', conflictError);
        return { success: false, message: 'Failed to check availability. Please try again.' };
      }

      if (conflictCheck) {
        return { 
          success: false, 
          message: 'This bodyguard is already booked during the selected time. Please choose a different time slot.' 
        };
      }

      // Create the booking
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            client_id: user.id,
            bodyguard_id: bookingData.bodyguardId,
            booking_start: bookingData.startTime,
            booking_end: bookingData.endTime,
            total_amount: bookingData.totalAmount,
            status: 'pending'
          }
        ]);

      if (error) {
        console.error('Booking error:', error);
        return { success: false, message: 'Failed to create booking. Please try again.' };
      }

      // Refresh data after successful booking
      fetchData();

      return { 
        success: true, 
        message: 'Booking request submitted successfully! You will be contacted by the bodyguard soon.' 
      };
    } catch (error) {
      console.error('Booking error:', error);
      return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
  };

  // Handle book button click
  const handleBookClick = (bodyguard: Bodyguard) => {
    setSelectedBodyguard(bodyguard);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedBodyguard(null);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
  };

  // Filter bodyguards
  const filteredBodyguards = bodyguards.filter(bodyguard => {
    const matchesSearch = bodyguard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bodyguard.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !filterCity || bodyguard.base_city === filterCity;
    const matchesSpecialization = !filterSpecialization || bodyguard.specialization === filterSpecialization;
    
    return matchesSearch && matchesCity && matchesSpecialization;
  });

  // Get unique cities and specializations for filters
  const cities = [...new Set(bodyguards.map(bg => bg.base_city))];
  const specializations = [...new Set(bodyguards.map(bg => bg.specialization))];

  // Check if bodyguard is currently booked
  const isBodyguardCurrentlyBooked = (bodyguardId: string) => {
    return currentBookings.some(booking => booking.bodyguard_id === bodyguardId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-neutral-600">Loading bodyguards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-neutral-200/50 sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Welcome */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">SecureMate Dashboard</h1>
                {clientProfile && (
                  <p className="text-sm text-neutral-600">
                    Welcome back, {clientProfile.name}
                  </p>
                )}
              </div>
            </div>

            {/* User Info and Sign Out */}
            <div className="flex items-center space-x-4">
              {clientProfile && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4" />
                  <span>{clientProfile.preferable_area}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="group"
              >
                <LogOut className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-neutral-100/50 shadow-lg max-w-md">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'browse'
                ? 'bg-primary text-white shadow-md'
                : 'text-neutral-600 hover:text-primary hover:bg-neutral-50'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Browse Guards
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'bookings'
                ? 'bg-primary text-white shadow-md'
                : 'text-neutral-600 hover:text-primary hover:bg-neutral-50'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            My Bookings
          </button>
        </div>

        {activeTab === 'browse' ? (
          <>
        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-100/50 shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
              />
            </div>

            {/* City Filter */}
            <div className="relative">
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="block w-full px-3 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm min-w-[150px]"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Specialization Filter */}
            <div className="relative">
              <select
                value={filterSpecialization}
                onChange={(e) => setFilterSpecialization(e.target.value)}
                className="block w-full px-3 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm min-w-[180px]"
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              onClick={fetchData}
              className="group"
            >
              <RefreshCw className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-180" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200 flex items-center">
            <AlertCircle className="w-5 h-5 mr-3 text-red-600" />
            <p>{error}</p>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">
            Available Bodyguards
          </h2>
          <div className="text-sm text-neutral-600">
            {filteredBodyguards.length} of {bodyguards.length} bodyguards
          </div>
        </div>

        {/* Bodyguards Grid */}
        {filteredBodyguards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBodyguards.map((bodyguard) => (
              <BodyguardCard
                key={bodyguard.id}
                bodyguard={bodyguard}
                onBookClick={handleBookClick}
                isCurrentlyBooked={isBodyguardCurrentlyBooked(bodyguard.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-neutral-100 mb-4">
              <User className="h-12 w-12 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No bodyguards found
            </h3>
            <p className="text-neutral-600">
              {searchTerm || filterCity || filterSpecialization
                ? 'Try adjusting your search filters.'
                : 'No bodyguards are currently available.'}
            </p>
          </div>
        )}
          </>
        ) : (
          <MyBookings />
        )}
      </main>

      {/* Booking Modal */}
      {selectedBodyguard && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          bodyguard={selectedBodyguard}
          onBookingSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default DashboardPage;