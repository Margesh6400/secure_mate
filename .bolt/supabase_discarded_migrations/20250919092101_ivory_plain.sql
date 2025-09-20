/*
  # Create bodyguards table for approved bodyguards

  1. New Tables
    - `bodyguards`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `age` (integer, required)
      - `gender` (text, required)
      - `phone_number` (text, required)
      - `email_address` (text, optional)
      - `height_cm` (integer, required)
      - `weight_kg` (integer, required)
      - `years_experience` (integer, required)
      - `specialization` (text, required)
      - `base_city` (text, required)
      - `hourly_rate` (numeric, required)
      - `full_day_rate` (numeric, required)
      - `photo_url` (text, optional)
      - `government_id_url` (text, required)
      - `is_available` (boolean, default true)
      - `rating` (numeric, default 5.0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bodyguards` table
    - Add policy for public read access
    - Add policy for admin management (future)
*/

CREATE TABLE IF NOT EXISTS bodyguards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer NOT NULL CHECK (age >= 18 AND age <= 70),
  gender text NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  phone_number text NOT NULL,
  email_address text,
  height_cm integer NOT NULL CHECK (height_cm >= 140 AND height_cm <= 220),
  weight_kg integer NOT NULL CHECK (weight_kg >= 40 AND weight_kg <= 150),
  years_experience integer NOT NULL CHECK (years_experience >= 0),
  specialization text NOT NULL,
  base_city text NOT NULL,
  hourly_rate numeric(10,2) NOT NULL CHECK (hourly_rate > 0),
  full_day_rate numeric(10,2) NOT NULL CHECK (full_day_rate > 0),
  photo_url text,
  government_id_url text NOT NULL,
  is_available boolean DEFAULT true,
  rating numeric(3,2) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bodyguards ENABLE ROW LEVEL SECURITY;

-- Allow public to read available bodyguards
CREATE POLICY "Anyone can view available bodyguards"
  ON bodyguards
  FOR SELECT
  TO public
  USING (is_available = true);

-- Create updated_at trigger for bodyguards
CREATE TRIGGER update_bodyguards_updated_at
  BEFORE UPDATE ON bodyguards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample bodyguards for testing
INSERT INTO bodyguards (name, age, gender, phone_number, email_address, height_cm, weight_kg, years_experience, specialization, base_city, hourly_rate, full_day_rate, photo_url, government_id_url, rating) VALUES
('Rajesh Kumar', 32, 'Male', '9876543210', 'rajesh@example.com', 175, 75, 8, 'Personal Security', 'Ahmedabad', 600, 4500, 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://example.com/id1.jpg', 4.8),
('Priya Sharma', 28, 'Female', '9876543211', 'priya@example.com', 165, 60, 5, 'Event Security', 'Gandhinagar', 550, 4000, 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://example.com/id2.jpg', 4.9),
('Vikram Singh', 35, 'Male', '9876543212', 'vikram@example.com', 180, 85, 12, 'VIP Protection', 'Ahmedabad', 800, 6000, 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://example.com/id3.jpg', 4.7),
('Anita Desai', 30, 'Female', '9876543213', 'anita@example.com', 160, 55, 6, 'Personal Escort', 'Gandhinagar', 500, 3500, 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://example.com/id4.jpg', 4.6);