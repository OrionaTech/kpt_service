-- =============================================================================
-- KPT Service – Supabase Database Initialisation Script
-- EOT Cranes Website
-- Run this once against a fresh Supabase project (SQL Editor → Run)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- EXTENSIONS
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()

-- ---------------------------------------------------------------------------
-- 1. PAGE_VIEWS  – website visitor analytics
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS page_views (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path   TEXT        NOT NULL,
  session_id  TEXT,
  referrer    TEXT,
  country     TEXT,
  state       TEXT,
  city        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_session_id  ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at  ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path   ON page_views (page_path);

-- ---------------------------------------------------------------------------
-- 2. LEADS  – contact form submissions / customer enquiries
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_person   TEXT        NOT NULL,
  company_name     TEXT,
  email            TEXT        NOT NULL,
  phone            TEXT        NOT NULL,
  message          TEXT        NOT NULL,
  city             TEXT,
  state            TEXT,
  country          TEXT,
  source_page      TEXT,
  status           TEXT        NOT NULL DEFAULT 'new'
                               CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
  admin_notes      TEXT,
  follow_up_date   DATE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status      ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at  ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email       ON leads (email);

-- ---------------------------------------------------------------------------
-- 3. QUOTATION_REQUESTS  – enquiries from the public quote form
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quotation_requests (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_email   TEXT        NOT NULL,
  client_phone   TEXT,
  project_page   TEXT,
  estimate_data  JSONB,
  product_name   TEXT,
  product_slug   TEXT,
  admin_notes    TEXT,
  status         TEXT        NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotation_requests_status      ON quotation_requests (status);
CREATE INDEX IF NOT EXISTS idx_quotation_requests_created_at  ON quotation_requests (created_at DESC);

-- ---------------------------------------------------------------------------
-- 4. QUOTATIONS  – quotation documents created by admin
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quotations (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name     TEXT        NOT NULL,
  client_email    TEXT,
  client_phone    TEXT,
  project_type    TEXT,
  request_id      UUID        REFERENCES quotation_requests (id) ON DELETE SET NULL,
  status          TEXT        NOT NULL DEFAULT 'draft'
                              CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'in_progress')),
  version         INTEGER     NOT NULL DEFAULT 1,
  total_amount    NUMERIC(14, 2) NOT NULL DEFAULT 0,
  public_token    UUID        UNIQUE DEFAULT gen_random_uuid(),
  valid_until     DATE,
  email_sent_at   TIMESTAMPTZ,
  email_sent_to   TEXT,
  admin_notes     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotations_status        ON quotations (status);
CREATE INDEX IF NOT EXISTS idx_quotations_request_id    ON quotations (request_id);
CREATE INDEX IF NOT EXISTS idx_quotations_public_token  ON quotations (public_token);
CREATE INDEX IF NOT EXISTS idx_quotations_created_at    ON quotations (created_at DESC);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_quotations_updated_at
  BEFORE UPDATE ON quotations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- 5. QUOTATION_ITEMS  – line items within a quotation
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quotation_items (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id   UUID        NOT NULL REFERENCES quotations (id) ON DELETE CASCADE,
  description    TEXT        NOT NULL,
  quantity       NUMERIC(12, 3) NOT NULL DEFAULT 1,
  rate           NUMERIC(14, 2) NOT NULL DEFAULT 0,
  amount         NUMERIC(14, 2) GENERATED ALWAYS AS (quantity * rate) STORED,
  sort_order     INTEGER     NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotation_items_quotation_id ON quotation_items (quotation_id);

-- ---------------------------------------------------------------------------
-- 6. ESTIMATIONS  – project estimation records
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS estimations (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_type  TEXT        NOT NULL,
  industry      TEXT,
  budget_range  TEXT,
  summary       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 7. CLICK_EVENTS  – user interaction / click tracking
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS click_events (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path   TEXT        NOT NULL,
  element     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_click_events_page_path  ON click_events (page_path);
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON click_events (created_at DESC);

-- ---------------------------------------------------------------------------
-- 8. INSIGHTS  – generated business insights from analytics
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS insights (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_type  TEXT        NOT NULL,
  message       TEXT        NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ---------------------------------------------------------------------------
-- Strategy:
--   • Public (anon) key  → INSERT only on tracking / contact tables
--   • Admin (service role key) → full access, bypasses RLS automatically
--   • Authenticated users (Supabase Auth admin account) → full access via policy
-- ---------------------------------------------------------------------------

ALTER TABLE page_views          ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads               ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events        ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights            ENABLE ROW LEVEL SECURITY;

-- ---- page_views: public insert (tracker), authenticated read ----
CREATE POLICY "anon can insert page_views"
  ON page_views FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated can manage page_views"
  ON page_views FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ---- leads: public insert (contact form), authenticated manage ----
CREATE POLICY "anon can insert leads"
  ON leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated can manage leads"
  ON leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ---- quotation_requests: public insert (quote form), authenticated manage ----
CREATE POLICY "anon can insert quotation_requests"
  ON quotation_requests FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated can manage quotation_requests"
  ON quotation_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ---- quotations: authenticated full access + public token read ----
CREATE POLICY "authenticated can manage quotations"
  ON quotations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow unauthenticated clients to read a quotation via its public_token
-- (used for the shareable /quote/[token] page)
CREATE POLICY "public token read quotations"
  ON quotations FOR SELECT TO anon
  USING (public_token IS NOT NULL);

-- ---- quotation_items: mirrors quotations access ----
CREATE POLICY "authenticated can manage quotation_items"
  ON quotation_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "public token read quotation_items"
  ON quotation_items FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM quotations q
      WHERE q.id = quotation_items.quotation_id
        AND q.public_token IS NOT NULL
    )
  );

-- ---- estimations: public insert, authenticated read ----
CREATE POLICY "anon can insert estimations"
  ON estimations FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated can manage estimations"
  ON estimations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ---- click_events: public insert, authenticated manage ----
CREATE POLICY "anon can insert click_events"
  ON click_events FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated can manage click_events"
  ON click_events FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ---- insights: authenticated only ----
CREATE POLICY "authenticated can manage insights"
  ON insights FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- ADMIN USER SETUP
-- ---------------------------------------------------------------------------
-- After running this script:
--   1. Go to Supabase Dashboard → Authentication → Users
--   2. Click "Add user" and create your admin account (email + password)
--   3. That user will have full access to all tables via the "authenticated" policies above.
--
-- The application uses supabase.auth.signInWithPassword() for admin login
-- (see src/app/api/admin/login/route.ts)
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- DONE
-- ---------------------------------------------------------------------------
-- Tables created:
--   page_views, leads, quotation_requests, quotations,
--   quotation_items, estimations, click_events, insights
-- ---------------------------------------------------------------------------
