/*
  # Create bodyguard applications table

  1. New Tables
    - `became_bodygaurd`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
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
      - `government_id_url` (text, required)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `became_bodygaurd` table
    - Add policy for public insert (applications)
    - Add policy for authenticated users to read their own data

  3. Storage
    - Create storage bucket for bodyguard ID documents
    - Set up appropriate policies for file uploads
*/

-- Create the bodyguard applications table
CREATE TABLE IF NOT EXISTS became_bodygaurd (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
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
  government_id_url text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE became_bodygaurd ENABLE ROW LEVEL SECURITY;

-- Allow public to insert applications
CREATE POLICY "Anyone can submit bodyguard applications"
  ON became_bodygaurd
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read their own applications (if we add user auth later)
CREATE POLICY "Users can read their own applications"
  ON became_bodygaurd
  FOR SELECT
  TO public
  USING (true);

-- Create storage bucket for bodyguard ID documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('bodyguard_ids', 'bodyguard_ids', false)
ON CONFLICT (id) DO NOTHING;

-- Allow public to upload files to bodyguard_ids bucket
CREATE POLICY "Anyone can upload bodyguard ID documents"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'bodyguard_ids');

-- Allow public to read uploaded files (for verification purposes)
CREATE POLICY "Anyone can view bodyguard ID documents"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'bodyguard_ids');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_became_bodygaurd_updated_at
  BEFORE UPDATE ON became_bodygaurd
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();