-- Create artwork_library table for storing generated and sourced magazine artwork
CREATE TABLE artwork_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  theme VARCHAR(100) NOT NULL,
  issue_date DATE NOT NULL,
  source VARCHAR(20) NOT NULL CHECK (source IN ('generated', 'sourced')),
  prompt TEXT, -- The prompt used for generated images
  storage_path TEXT NOT NULL, -- Path in Supabase Storage
  tags TEXT[],
  is_approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Create index on issue_date for faster queries
CREATE INDEX idx_artwork_library_issue_date ON artwork_library(issue_date);

-- Create index on theme for faster queries
CREATE INDEX idx_artwork_library_theme ON artwork_library(theme);

-- Create index on is_approved for filtering approved artwork
CREATE INDEX idx_artwork_library_approved ON artwork_library(is_approved);

-- Enable Row Level Security
ALTER TABLE artwork_library ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all artwork
CREATE POLICY "Admins can view all artwork" ON artwork_library
  FOR SELECT
  USING (true);

-- Policy: Admins can insert artwork
CREATE POLICY "Admins can insert artwork" ON artwork_library
  FOR INSERT
  WITH CHECK (true);

-- Policy: Admins can update artwork
CREATE POLICY "Admins can update artwork" ON artwork_library
  FOR UPDATE
  USING (true);

-- Policy: Admins can delete artwork
CREATE POLICY "Admins can delete artwork" ON artwork_library
  FOR DELETE
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_artwork_library_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER artwork_library_updated_at
  BEFORE UPDATE ON artwork_library
  FOR EACH ROW
  EXECUTE FUNCTION update_artwork_library_updated_at();

-- Create storage bucket for artwork (run this separately in Supabase dashboard or via Supabase CLI)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('artwork', 'artwork', true);

-- Create storage policies (run after bucket is created)
-- CREATE POLICY "Public can view artwork" ON storage.objects FOR SELECT USING (bucket_id = 'artwork');
-- CREATE POLICY "Authenticated users can upload artwork" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'artwork' AND auth.role() = 'authenticated');
