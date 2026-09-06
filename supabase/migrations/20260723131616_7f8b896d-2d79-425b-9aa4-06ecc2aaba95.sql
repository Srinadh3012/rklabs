
CREATE TABLE public.appointment_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  repair_id UUID NOT NULL REFERENCES public.repairs(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('scheduled','rescheduled','cancelled')),
  previous_at TIMESTAMPTZ,
  new_at TIMESTAMPTZ,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX appointment_events_repair_idx ON public.appointment_events(repair_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointment_events TO authenticated;
GRANT ALL ON public.appointment_events TO service_role;
ALTER TABLE public.appointment_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage their appointment events" ON public.appointment_events
  FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
