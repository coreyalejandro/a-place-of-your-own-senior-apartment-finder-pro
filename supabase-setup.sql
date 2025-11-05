-- -*- mode: postgresql; -*-
-- PostgreSQL/Supabase SQL
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role VARCHAR(20) CHECK (role IN ('senior', 'family_helper')),
  preferences_completed BOOLEAN DEFAULT false
);

-- Create preferences table
CREATE TABLE preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  search_city VARCHAR(100) NOT NULL,
  search_state CHAR(2) NOT NULL,
  search_radius INTEGER NOT NULL DEFAULT 10,
  search_lat DECIMAL(10, 8),
  search_lng DECIMAL(11, 8),
  preferred_neighborhoods TEXT[],
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DECIMAL(2,1),
  housing_types TEXT[] NOT NULL,
  required_amenities TEXT[],
  desired_amenities TEXT[],
  wheelchair_accessible BOOLEAN DEFAULT false,
  no_stairs_required BOOLEAN DEFAULT false,
  hearing_accessible BOOLEAN DEFAULT false,
  vision_accessible BOOLEAN DEFAULT false,
  social_preference VARCHAR(20),
  pet_friendly_required BOOLEAN DEFAULT false,
  pet_type VARCHAR(20),
  near_grocery BOOLEAN DEFAULT true,
  near_medical BOOLEAN DEFAULT true,
  near_family BOOLEAN DEFAULT true,
  near_transit BOOLEAN DEFAULT false,
  near_religious BOOLEAN DEFAULT false,
  near_parks BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  place_id VARCHAR(255) NOT NULL,
  place_name VARCHAR(255) NOT NULL,
  formatted_address TEXT NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  photo_reference VARCHAR(500),
  rating DECIMAL(2,1),
  price_level INTEGER,
  user_notes TEXT,
  user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
  tour_scheduled BOOLEAN DEFAULT false,
  tour_date TIMESTAMP WITH TIME ZONE,
  shared_with UUID[],
  family_comments JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(20) DEFAULT 'saved' CHECK (status IN ('saved', 'toured', 'applied', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, place_id)
);

-- Create search history table
CREATE TABLE search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  query_text TEXT,
  filters_applied JSONB NOT NULL,
  results_count INTEGER,
  results_place_ids TEXT[],
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create family connections table
CREATE TABLE family_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  senior_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  helper_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  relationship VARCHAR(50),
  can_view_bookmarks BOOLEAN DEFAULT true,
  can_add_comments BOOLEAN DEFAULT true,
  can_add_bookmarks BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(senior_user_id, helper_user_id)
);

-- Create indexes
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_place ON bookmarks(place_id);
CREATE INDEX idx_search_history_user ON search_history(user_id);
CREATE INDEX idx_search_history_date ON search_history(searched_at DESC);
CREATE INDEX idx_family_senior ON family_connections(senior_user_id);
CREATE INDEX idx_family_helper ON family_connections(helper_user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preferences_updated_at BEFORE UPDATE ON preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookmarks_updated_at BEFORE UPDATE ON bookmarks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_connections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for preferences
CREATE POLICY "Users can view own preferences" ON preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for bookmarks
CREATE POLICY "Users can view own bookmarks" ON bookmarks
  FOR SELECT USING (
    auth.uid() = user_id 
    OR auth.uid() = ANY(shared_with)
  );

CREATE POLICY "Users can insert own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks" ON bookmarks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for search history
CREATE POLICY "Users can view own search history" ON search_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own search history" ON search_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for family connections
CREATE POLICY "Users can view connections where they are involved" ON family_connections
  FOR SELECT USING (
    auth.uid() = senior_user_id 
    OR auth.uid() = helper_user_id
  );

CREATE POLICY "Seniors can create connections" ON family_connections
  FOR INSERT WITH CHECK (auth.uid() = senior_user_id);

CREATE POLICY "Users can update connections where they are involved" ON family_connections
  FOR UPDATE USING (
    auth.uid() = senior_user_id 
    OR auth.uid() = helper_user_id
  );
