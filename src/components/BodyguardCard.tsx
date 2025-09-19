import React from 'react';
import { Bodyguard } from '../lib/supabase';
import Button from './Button';
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Star, 
  Shield, 
  User,
  Calendar
} from 'lucide-react';

interface BodyguardCardProps {
  bodyguard: Bodyguard;
  onBookClick: (bodyguard: Bodyguard) => void;
  isCurrentlyBooked: boolean;
}

const BodyguardCard: React.FC<BodyguardCardProps> = ({ bodyguard, onBookClick, isCurrentlyBooked }) => {
  const handleBookClick = () => {
    onBookClick(bodyguard);
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-100/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl transition-all duration-300 group-hover:border-accent/50 group-hover:scale-105"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl transition-all duration-300 group-hover:border-accent/50 group-hover:scale-105"></div>

      {/* Availability Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
          isCurrentlyBooked
            ? 'bg-red-100 text-red-800 border-red-200'
            : 'bg-green-100 text-green-800 border-green-200'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isCurrentlyBooked ? 'bg-red-500' : 'bg-green-500 animate-pulse'
          }`}></div>
          {isCurrentlyBooked ? 'Unavailable' : 'Available'}
        </div>
      </div>

      <div className="p-6">
        {/* Header with Photo and Basic Info */}
        <div className="flex items-start space-x-4 mb-6">
          {/* Profile Photo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full transform -rotate-6 scale-105 blur-sm group-hover:rotate-12 transition-transform duration-300"></div>
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
              {bodyguard.photo_url ? (
                <img
                  src={bodyguard.photo_url}
                  alt={bodyguard.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-300">
              {bodyguard.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-neutral-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{bodyguard.base_city}</span>
            </div>
            <div className="flex items-center space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(bodyguard.rating) 
                      ? 'text-accent fill-current' 
                      : 'text-neutral-300'
                  } transition-colors duration-300`}
                />
              ))}
              <span className="text-sm text-neutral-600 ml-2">
                {bodyguard.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Experience</p>
              <p className="text-sm font-medium text-neutral-700">
                {bodyguard.years_experience} years
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <Shield className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Specialization</p>
              <p className="text-sm font-medium text-neutral-700">
                {bodyguard.specialization}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <IndianRupee className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Hourly Rate</p>
              <p className="text-sm font-medium text-neutral-700">
                ₹{bodyguard.pricing_hourly}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <IndianRupee className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Daily Rate</p>
              <p className="text-sm font-medium text-neutral-700">
                ₹{bodyguard.pricing_daily}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-1">
                <IndianRupee className="w-4 h-4 text-primary" />
                <span className="text-lg font-bold text-primary">
                  {bodyguard.pricing_hourly}
                </span>
                <span className="text-sm text-neutral-600">/hour</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <IndianRupee className="w-3 h-3 text-neutral-500" />
                <span className="text-sm text-neutral-600">
                  {bodyguard.pricing_daily} full day
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500">Starting from</p>
              <p className="text-sm font-medium text-accent">1 hour minimum</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-sm text-neutral-600 mb-6">
          <p className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>{bodyguard.gender}, {bodyguard.age} years old</span>
          </p>
          <p className="flex items-center space-x-2 mt-1">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            <span>{bodyguard.height_cm}cm, {bodyguard.weight_kg}kg</span>
          </p>
        </div>

        {/* Book Now Button */}
        <Button
          variant="primary"
          fullWidth
          disabled={isCurrentlyBooked || !bodyguard.is_available}
          onClick={handleBookClick}
          className="group relative overflow-hidden"
        >
          <Calendar className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
          {isCurrentlyBooked ? 'Currently Booked' : 'Book Now'}
        </Button>

        {isCurrentlyBooked && (
          <p className="text-center text-sm text-neutral-500 mt-2">
            This bodyguard is currently on another assignment
          </p>
        )}
      </div>

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

export default BodyguardCard;