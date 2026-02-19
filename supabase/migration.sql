-- ================================================================== --
--  Riviera Fest — Database Migration                                  --
--  Run this against your Supabase Postgres database.                  --
-- ================================================================== --

/* ── Admins (email + password auth) ──────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.admins (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'admins' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.admins
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

/* ── Users (Google OAuth) ────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'users' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.users
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

/* ── Events ──────────────────────────────────────────────────────── */

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

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'events' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.events
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

/* ── Payments (Razorpay) ─────────────────────────────────────────── */

CREATE TABLE IF NOT EXISTS public.payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT NOT NULL,
  razorpay_order_id   TEXT UNIQUE NOT NULL,
  razorpay_payment_id TEXT,
  amount              INTEGER NOT NULL DEFAULT 0,
  status              TEXT NOT NULL DEFAULT 'created',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'payments' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.payments
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Index for cron cleanup query (status + created_at)
CREATE INDEX IF NOT EXISTS idx_payments_status_created
  ON public.payments(status, created_at);

-- Index for webhook lookup
CREATE INDEX IF NOT EXISTS idx_payments_order_id
  ON public.payments(razorpay_order_id);

/* ── Supabase Storage — event-banners bucket ─────────────────────── */

INSERT INTO storage.buckets (id, name, public)
VALUES ('event-banners', 'event-banners', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Public read event-banners'
  ) THEN
    CREATE POLICY "Public read event-banners" ON storage.objects
      FOR SELECT USING (bucket_id = 'event-banners');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Service role upload event-banners'
  ) THEN
    CREATE POLICY "Service role upload event-banners" ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'event-banners');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Service role update event-banners'
  ) THEN
    CREATE POLICY "Service role update event-banners" ON storage.objects
      FOR UPDATE USING (bucket_id = 'event-banners');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'Service role delete event-banners'
  ) THEN
    CREATE POLICY "Service role delete event-banners" ON storage.objects
      FOR DELETE USING (bucket_id = 'event-banners');
  END IF;
END $$;
