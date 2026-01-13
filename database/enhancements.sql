-- Additional schema enhancements for production-grade admin system

-- Add email tracking to quotations
ALTER TABLE quotations 
ADD COLUMN IF NOT EXISTS email_sent_at timestamp,
ADD COLUMN IF NOT EXISTS email_sent_to text,
ADD COLUMN IF NOT EXISTS admin_notes text,
ADD COLUMN IF NOT EXISTS valid_until date,
ADD COLUMN IF NOT EXISTS client_email text,
ADD COLUMN IF NOT EXISTS client_phone text;

-- Add timestamps to quotation_items
ALTER TABLE quotation_items
ADD COLUMN IF NOT EXISTS created_at timestamp default now(),
ADD COLUMN IF NOT EXISTS sort_order integer default 0;

-- Enhance quotation_requests with more fields
ALTER TABLE quotation_requests
ADD COLUMN IF NOT EXISTS product_name text,
ADD COLUMN IF NOT EXISTS product_slug text,
ADD COLUMN IF NOT EXISTS admin_notes text;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);
CREATE INDEX IF NOT EXISTS idx_quotations_request_id ON quotations(request_id);
CREATE INDEX IF NOT EXISTS idx_quotations_public_token ON quotations(public_token);
CREATE INDEX IF NOT EXISTS idx_quotation_items_quotation_id ON quotation_items(quotation_id);
CREATE INDEX IF NOT EXISTS idx_quotation_requests_status ON quotation_requests(status);
CREATE INDEX IF NOT EXISTS idx_quotation_requests_created_at ON quotation_requests(created_at DESC);

-- Add RLS policies (example - adjust based on your Supabase setup)
-- Enable RLS on tables
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Note: You'll need to create policies in Supabase dashboard or via SQL
-- For admin access, create policies that check auth.uid() against admin_users table
-- For now, we assume anon key is used for reads/writes (adjust based on your security model)


