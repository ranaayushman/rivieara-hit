-- Enable RLS on both tables
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow the service role full access
CREATE POLICY "Service role full access" ON public.registrations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON public.payments
  FOR ALL USING (true) WITH CHECK (true);

-- Index the foreign key for better query performance
CREATE INDEX IF NOT EXISTS idx_payments_registration_id ON public.payments(registration_id);

/* ================================================================== */
/*  Admin & Event tables                                               */
/* ================================================================== */

-- Admins table
CREATE TABLE IF NOT EXISTS public.admins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'admin',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON public.admins
  FOR ALL USING (true) WITH CHECK (true);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  date        TIMESTAMPTZ NOT NULL,
  venue       TEXT NOT NULL,
  banner_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON public.events
  FOR ALL USING (true) WITH CHECK (true);

/* ================================================================== */
/*  Supabase Storage – event-banners bucket                            */
/* ================================================================== */

-- Create the bucket (public read, no size limit enforced at DB level)
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-banners', 'event-banners', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read from the bucket (public banners)
CREATE POLICY "Public read event-banners" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-banners');

-- Only the service role can insert / update / delete
CREATE POLICY "Service role upload event-banners" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'event-banners');

CREATE POLICY "Service role update event-banners" ON storage.objects
  FOR UPDATE USING (bucket_id = 'event-banners');

CREATE POLICY "Service role delete event-banners" ON storage.objects
  FOR DELETE USING (bucket_id = 'event-banners');
