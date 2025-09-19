import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for bodyguard applications
export interface BodyguardApplication {
  id?: string;
  full_name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone_number: string;
  email_address?: string;
  height_cm: number;
  weight_kg: number;
  years_experience: number;
  specialization: string;
  base_city: string;
  hourly_rate: number;
  full_day_rate: number;
  government_id_url: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

// Database types for the main app
export interface Client {
  id: string;
  name: string;
  preferable_area: string;
  created_at?: string;
  updated_at?: string;
}

export interface Bodyguard {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone_number: string;
  email_address?: string;
  height_cm: number;
  weight_kg: number;
  years_experience: number;
  specialization: string;
  base_city: string;
  hourly_rate: number;
  full_day_rate: number;
  photo_url?: string;
  government_id_url: string;
  is_available: boolean;
  rating: number;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id?: string;
  client_id: string;
  bodyguard_id: string;
  booking_date: string;
  duration_hours: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Auth helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};