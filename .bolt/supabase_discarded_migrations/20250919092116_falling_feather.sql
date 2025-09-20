/*
  # Create bookings table for client-bodyguard bookings

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `client_id` (uuid, FK to clients.id)
      - `bodyguard_id` (uuid, FK to bodyguards.id)
      - `booking_date` (timestamp, required)
      - `duration_hours` (integer, default 1)
      - `total_amount` (numeric, required)
      - `status` (text, default 'pending')
      - `notes` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for clients to read their own bookings
    - Add policy for clients to create bookings
    - Add policy for bodyguards to view their bookings (future)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  bodyguard_id uuid NOT NULL REFERENCES bodyguards(id) ON DELETE CASCADE,
  booking_date timestamptz NOT NULL,
  duration_hours integer DEFAULT 1 CHECK (duration_hours > 0),
  total_amount numeric(10,2) NOT NULL CHECK (total_amount > 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow clients to read their own bookings
CREATE POLICY "Clients can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

-- Allow clients to create bookings
CREATE POLICY "Clients can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

-- Allow clients to update their own bookings (for cancellation)
CREATE POLICY "Clients can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- Create updated_at trigger for bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();