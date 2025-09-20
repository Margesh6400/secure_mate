@@ .. @@
-- Allow users to insert their own profile during registration
CREATE POLICY "Users can insert own profile"
  ON clients
  FOR INSERT
-  TO authenticated
+  TO public
  WITH CHECK (auth.uid() = id);