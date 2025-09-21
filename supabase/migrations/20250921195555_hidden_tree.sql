/*
  # Add RLS policies for bookings table

  1. Security
    - Enable RLS on bookings table
    - Add policy for authenticated users to insert their own bookings
    - Add policy for authenticated users to read their own bookings
    - Add policy for authenticated users to update their own bookings

  2. Changes
    - Create insert policy for new bookings
    - Create select policy for reading own bookings
    - Create update policy for booking updates
*/

-- Enable RLS on bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own bookings
CREATE POLICY "Users can insert own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

-- Allow authenticated users to read their own bookings
CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

-- Allow authenticated users to update their own bookings
CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id)
  WITH CHECK (auth.uid() = client_id);