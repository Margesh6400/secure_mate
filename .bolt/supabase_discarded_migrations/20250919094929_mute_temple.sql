/*
  # Update booking schema for enhanced booking system

  1. Schema Changes
    - Update `bookings` table to use booking_start and booking_end timestamps
    - Add proper constraints and indexes for conflict checking
    - Update RLS policies for the new schema

  2. Functions
    - Add function to check booking conflicts
    - Add indexes for performance

  3. Security
    - Update RLS policies for new booking flow
*/

-- Drop existing bookings table and recreate with new schema
DROP TABLE IF EXISTS bookings CASCADE;

CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  bodyguard_id uuid NOT NULL REFERENCES bodyguards(id) ON DELETE CASCADE,
  booking_start timestamptz NOT NULL,
  booking_end timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled', 'completed')),
  total_amount numeric(10,2) NOT NULL CHECK (total_amount > 0),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_booking_time CHECK (booking_end > booking_start)
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Clients can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- Create indexes for performance
CREATE INDEX idx_bookings_bodyguard_time ON bookings(bodyguard_id, booking_start, booking_end);
CREATE INDEX idx_bookings_client ON bookings(client_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Function to check booking conflicts
CREATE OR REPLACE FUNCTION check_booking_conflict(
  p_bodyguard_id uuid,
  p_start timestamptz,
  p_end timestamptz,
  p_exclude_booking_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM bookings 
    WHERE bodyguard_id = p_bodyguard_id
      AND status IN ('pending', 'confirmed')
      AND (
        (booking_start <= p_start AND booking_end > p_start) OR
        (booking_start < p_end AND booking_end >= p_end) OR
        (booking_start >= p_start AND booking_end <= p_end)
      )
      AND (p_exclude_booking_id IS NULL OR id != p_exclude_booking_id)
  );
END;
$$;

-- Create updated_at trigger for bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update bodyguards table to match the schema requirements
ALTER TABLE bodyguards 
  RENAME COLUMN hourly_rate TO pricing_hourly;

ALTER TABLE bodyguards 
  RENAME COLUMN full_day_rate TO pricing_daily;

-- Add some sample bookings for testing
INSERT INTO bookings (client_id, bodyguard_id, booking_start, booking_end, total_amount, status) 
SELECT 
  c.id,
  b.id,
  now() + interval '2 hours',
  now() + interval '5 hours',
  b.pricing_hourly * 3,
  'confirmed'
FROM clients c, bodyguards b 
WHERE c.name = 'Test Client' AND b.name = 'Rajesh Kumar'
LIMIT 1;