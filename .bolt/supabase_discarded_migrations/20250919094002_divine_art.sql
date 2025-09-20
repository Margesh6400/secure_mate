/*
  # Fix client insert policy for registration

  1. Changes
    - Drop existing restrictive insert policy
    - Create new policy allowing public insert during registration
    - Maintain security by checking auth.uid() = id

  2. Security
    - Users can only insert their own profile data
    - Policy ensures user ID matches authenticated user ID
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can insert own profile" ON clients;

-- Create new policy allowing public insert with proper auth check
CREATE POLICY "Users can insert own profile during registration"
  ON clients
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = id);