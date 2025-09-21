/*
  # Add RLS policies for clients table

  1. Security
    - Add policy for authenticated users to insert their own client profile
    - Add policy for authenticated users to read their own client profile
    - Add policy for authenticated users to update their own client profile

  2. Changes
    - Enable RLS on clients table (if not already enabled)
    - Create insert policy for new user registration
    - Create select policy for reading own profile
    - Create update policy for profile updates
*/

-- Enable RLS on clients table (if not already enabled)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own client profile
CREATE POLICY "Users can insert own client profile"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow authenticated users to read their own client profile
CREATE POLICY "Users can read own client profile"
  ON clients
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow authenticated users to update their own client profile
CREATE POLICY "Users can update own client profile"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);