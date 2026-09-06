
CREATE POLICY "users upload own invoices" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'invoices' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "users read own invoices" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'invoices' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "users update own invoices" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'invoices' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "users delete own invoices" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'invoices' AND auth.uid()::text = (storage.foldername(name))[1]);
