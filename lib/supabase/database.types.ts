export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          created_at: string
          updated_at: string
          last_login: string
          role: 'senior' | 'family_helper'
          preferences_completed: boolean
        }
        Insert: {
          id: string
          full_name: string
          role?: 'senior' | 'family_helper'
          preferences_completed?: boolean
        }
        Update: {
          full_name?: string
          last_login?: string
          role?: 'senior' | 'family_helper'
          preferences_completed?: boolean
        }
      }
      preferences: {
        Row: {
          id: string
          user_id: string
          search_city: string
          search_state: string
          search_radius: number
          search_lat: number | null
          search_lng: number | null
          preferred_neighborhoods: string[]
          budget_min: number
          budget_max: number
          bedrooms: number
          bathrooms: number | null
          housing_types: string[]
          required_amenities: string[]
          desired_amenities: string[]
          wheelchair_accessible: boolean
          no_stairs_required: boolean
          hearing_accessible: boolean
          vision_accessible: boolean
          social_preference: string | null
          pet_friendly_required: boolean
          pet_type: string | null
          near_grocery: boolean
          near_medical: boolean
          near_family: boolean
          near_transit: boolean
          near_religious: boolean
          near_parks: boolean
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          user_id: string
          search_city: string
          search_state: string
          budget_min: number
          budget_max: number
          bedrooms: number
          housing_types: string[]
          search_radius?: number
          search_lat?: number | null
          search_lng?: number | null
          preferred_neighborhoods?: string[]
          bathrooms?: number | null
          required_amenities?: string[]
          desired_amenities?: string[]
          wheelchair_accessible?: boolean
          no_stairs_required?: boolean
          hearing_accessible?: boolean
          vision_accessible?: boolean
          social_preference?: string | null
          pet_friendly_required?: boolean
          pet_type?: string | null
          near_grocery?: boolean
          near_medical?: boolean
          near_family?: boolean
          near_transit?: boolean
          near_religious?: boolean
          near_parks?: boolean
          completed_at?: string | null
        }
        Update: {
          search_city?: string
          search_state?: string
          search_radius?: number
          search_lat?: number | null
          search_lng?: number | null
          preferred_neighborhoods?: string[]
          budget_min?: number
          budget_max?: number
          bedrooms?: number
          bathrooms?: number | null
          housing_types?: string[]
          required_amenities?: string[]
          desired_amenities?: string[]
          wheelchair_accessible?: boolean
          no_stairs_required?: boolean
          hearing_accessible?: boolean
          vision_accessible?: boolean
          social_preference?: string | null
          pet_friendly_required?: boolean
          pet_type?: string | null
          near_grocery?: boolean
          near_medical?: boolean
          near_family?: boolean
          near_transit?: boolean
          near_religious?: boolean
          near_parks?: boolean
          completed_at?: string | null
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          place_id: string
          place_name: string
          formatted_address: string
          lat: number | null
          lng: number | null
          photo_reference: string | null
          rating: number | null
          price_level: number | null
          user_notes: string | null
          user_rating: number | null
          tour_scheduled: boolean
          tour_date: string | null
          shared_with: string[]
          family_comments: Json
          status: 'saved' | 'toured' | 'applied' | 'declined'
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          place_id: string
          place_name: string
          formatted_address: string
          lat?: number | null
          lng?: number | null
          photo_reference?: string | null
          rating?: number | null
          price_level?: number | null
          user_notes?: string | null
          user_rating?: number | null
          tour_scheduled?: boolean
          tour_date?: string | null
          shared_with?: string[]
          family_comments?: Json
          status?: 'saved' | 'toured' | 'applied' | 'declined'
        }
        Update: {
          place_name?: string
          formatted_address?: string
          lat?: number | null
          lng?: number | null
          photo_reference?: string | null
          rating?: number | null
          price_level?: number | null
          user_notes?: string | null
          user_rating?: number | null
          tour_scheduled?: boolean
          tour_date?: string | null
          shared_with?: string[]
          family_comments?: Json
          status?: 'saved' | 'toured' | 'applied' | 'declined'
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          query_text: string | null
          filters_applied: Json
          results_count: number | null
          results_place_ids: string[]
          searched_at: string
        }
        Insert: {
          user_id: string
          filters_applied: Json
          query_text?: string | null
          results_count?: number | null
          results_place_ids?: string[]
        }
        Update: {}
      }
      family_connections: {
        Row: {
          id: string
          senior_user_id: string
          helper_user_id: string
          relationship: string | null
          can_view_bookmarks: boolean
          can_add_comments: boolean
          can_add_bookmarks: boolean
          status: 'pending' | 'accepted' | 'declined'
          invited_at: string
          accepted_at: string | null
        }
        Insert: {
          senior_user_id: string
          helper_user_id: string
          relationship?: string | null
          can_view_bookmarks?: boolean
          can_add_comments?: boolean
          can_add_bookmarks?: boolean
          status?: 'pending' | 'accepted' | 'declined'
        }
        Update: {
          relationship?: string | null
          can_view_bookmarks?: boolean
          can_add_comments?: boolean
          can_add_bookmarks?: boolean
          status?: 'pending' | 'accepted' | 'declined'
          accepted_at?: string | null
        }
      }
    }
  }
}
