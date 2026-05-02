-- ================================================================== --
--  Riviera Fest — Migration V2: Admin Panel Dynamic Content           --
--  Run this against your Supabase Postgres database.                  --
-- ================================================================== --

/* ── Sponsors ────────────────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.sponsors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  tier        TEXT NOT NULL DEFAULT 'Sponsor',
  logo_url    TEXT NOT NULL,
  website_url TEXT,
  bg_color    TEXT DEFAULT '#111111',
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'sponsors' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.sponsors
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

/* ── Gallery Albums ──────────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  cover_url   TEXT,
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gallery_albums' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.gallery_albums
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

/* ── Gallery Images ──────────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.gallery_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id    UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  caption     TEXT,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gallery_images' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.gallery_images
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_gallery_images_album
  ON public.gallery_images(album_id);

/* ── Schedule Items ──────────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.schedule_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_label   TEXT NOT NULL,
  time        TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.schedule_items ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'schedule_items' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.schedule_items
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

/* ── Activities ──────────────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.activities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name   TEXT NOT NULL DEFAULT 'Code',
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'activities' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.activities
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

/* ── Site Settings (key-value) ───────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.site_settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'site_settings' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.site_settings
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Seed default settings
INSERT INTO public.site_settings (key, value) VALUES
  ('hero', '{"title": "Riviera", "year": "2026", "subtitle": "Biggest Private College Fest in West Bengal"}'),
  ('fest_info', '{"dates": "March 25–28, 2026", "venue": "HIT Campus, Haldia", "registration_open": true}'),
  ('contact', '{"email": "info@riviera2026.com", "phone": "+91 9142047263", "address": "HIT Campus, Haldia, West Bengal 721657"}')
ON CONFLICT (key) DO NOTHING;

/* ── Contact Inquiries ───────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'contact_inquiries' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.contact_inquiries
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

/* ── Add tag + category columns to events table ──────────────────── */

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'tag'
  ) THEN
    ALTER TABLE public.events ADD COLUMN tag TEXT DEFAULT 'Event';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE public.events ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE public.events ADD COLUMN sort_order INT DEFAULT 0;
  END IF;
END $$;

/* ── Supabase Storage buckets ────────────────────────────────────── */

INSERT INTO storage.buckets (id, name, public)
VALUES ('sponsor-logos', 'sponsor-logos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read for sponsor logos
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Public read sponsor-logos'
  ) THEN
    CREATE POLICY "Public read sponsor-logos" ON storage.objects
      FOR SELECT USING (bucket_id = 'sponsor-logos');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Service role upload sponsor-logos'
  ) THEN
    CREATE POLICY "Service role upload sponsor-logos" ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'sponsor-logos');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Service role delete sponsor-logos'
  ) THEN
    CREATE POLICY "Service role delete sponsor-logos" ON storage.objects
      FOR DELETE USING (bucket_id = 'sponsor-logos');
  END IF;
END $$;

-- Public read for gallery images
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Public read gallery-images'
  ) THEN
    CREATE POLICY "Public read gallery-images" ON storage.objects
      FOR SELECT USING (bucket_id = 'gallery-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Service role upload gallery-images'
  ) THEN
    CREATE POLICY "Service role upload gallery-images" ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'gallery-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Service role delete gallery-images'
  ) THEN
    CREATE POLICY "Service role delete gallery-images" ON storage.objects
      FOR DELETE USING (bucket_id = 'gallery-images');
  END IF;
END $$;
