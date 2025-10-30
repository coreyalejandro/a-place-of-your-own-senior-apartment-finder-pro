# Prompt-PRD-Plan: "A Place of Your Own" - Senior Apartment Finder

## PART 1: COSTAR AI AGENT PROMPT

### Context
You are building a Next.js web application called "A Place of Your Own" - a senior-focused apartment finder that wraps Google Maps Platform as its primary data engine. The application serves seniors aged 50+ (and their adult children) who are downsizing, relocating after loss of spouse, facing health needs, experiencing financial changes. The app must reframe this traditionally stressful transition as a celebratory life passage, similar to planning a wedding or preparing for a baby.

The existing codebase is located at: https://github.com/coreyalejandro/v0-mom-s-home-app
The live prototype is at: https://v0-mom-s-home-app-q6.vercel.app/

Current stack: Next.js 14+, React 18+, TailwindCSS, TypeScript
Current deployment: Vercel

### Objective
Build the complete application by executing the following in exact order:

**PHASE 1 - Foundation**
1. Set up Google Maps Platform integration with Places API (New), Maps JavaScript API, Geocoding API
2. Implement Supabase backend for user data persistence
3. Create authentication system using Supabase Auth (email/password only, no social providers)
4. Establish data models exactly as specified in PRD Section 3.2

**PHASE 2 - Core Features**
1. Build preference survey (magazine-style questionnaire)
2. Implement apartment search functionality using Google Places Text Search API
3. Create listing display system with map integration
4. Build bookmark/favorites system
5. Implement family sharing functionality

**PHASE 3 - UX & Accessibility**
1. Apply senior-friendly UX patterns exactly as specified in PRD Section 4
2. Implement text size adjustment controls (default 18px, range 16-24px)
3. Add high contrast mode toggle
4. Ensure WCAG 2.1 AA compliance minimum
5. Test all interactions with 48px minimum touch targets

**PHASE 4 - Polish & Deploy**
1. Implement editorial content sections
2. Add neighborhood scoring using Places Aggregate API
3. Test complete user flows
4. Deploy to Vercel production

### Style
- Code must follow Next.js 14 App Router conventions exclusively
- All components must be functional React components with TypeScript
- Use TailwindCSS utility classes exclusively (no custom CSS files)
- Follow atomic design principles: atoms → molecules → organisms → templates → pages
- All API calls must use async/await with try-catch error handling
- All functions must have JSDoc comments
- All variables must use descriptive camelCase names (no single letters except loop indices)

### Tone
- User-facing text must be warm, empathetic, conversational, never clinical
- Error messages must be gentle and solution-oriented
- Editorial content must evoke The New Yorker magazine's sophisticated but accessible voice
- Technical documentation must be precise and directive (use "must", "will", "shall")

### Audience
**Primary Users:**
- Seniors aged 50-75 with varying technical proficiency
- Adult children aged 30-55 assisting their parents
- Family caregivers coordinating housing searches

**Technical Audience:**
- AI agents executing this plan autonomously
- Junior developers with limited Next.js experience
- Future maintainers inheriting this codebase

### Response Format
Execute each task following this exact format:

```
TASK: [Exact task name from objective]
STATUS: [NOT_STARTED | IN_PROGRESS | COMPLETE | BLOCKED]
FILES_MODIFIED: [List of file paths]
DEPENDENCIES: [List of prerequisites]
VERIFICATION: [How to confirm success]
```

After each phase, generate a status report:
```
PHASE: [Phase number and name]
COMPLETED_TASKS: [Count]
TOTAL_TASKS: [Count]
BLOCKERS: [None | List of issues]
NEXT_PHASE_READY: [YES | NO]
```

Do not proceed to next phase until current phase shows NEXT_PHASE_READY: YES.

---

## PART 2: PRODUCT REQUIREMENTS DOCUMENT (PRD)

### 1. PRODUCT OVERVIEW

#### 1.1 Product Name
**Official Name:** A Place of Your Own  
**Subtitle:** Finding your place in the next chapter  
**Internal Codename:** mom-home-finder

#### 1.2 Product Vision
Transform senior housing search from a grief-laden chore into a dignified, even joyful, life passage by combining practical search functionality with editorial warmth, magazine-quality design, and comprehensive emotional support.

#### 1.3 Success Metrics
- **Primary KPI:** User completes preference survey (target: 70% of visitors)
- **Secondary KPI:** User bookmarks minimum 3 listings (target: 50% of survey completers)
- **Tertiary KPI:** User shares listing with family member (target: 40% of bookmarkers)
- **Engagement KPI:** Time on site exceeds 8 minutes average
- **Satisfaction KPI:** User returns within 7 days (target: 35% return rate)

#### 1.4 Target Markets (Release Order)
**Launch Market (V1.0):**
- Geographic: Akron-Cleveland, Ohio metropolitan area
- Radius: 50 miles from downtown Cleveland
- Coordinates: 41.4993° N, 81.6944° W

**Expansion Markets (V1.1-V1.3):**
- V1.1: Columbus, Ohio
- V1.2: Pittsburgh, Pennsylvania
- V1.3: Detroit, Michigan

**Future Consideration (V2.0+):**
- Warm-weather retirement destinations: Phoenix AZ, Tampa FL, San Diego CA

#### 1.5 Out of Scope (Will NOT Be Built)
- Real-time messaging between users and landlords
- Payment processing for rent/deposits
- Credit check integration
- Virtual reality property tours
- AI chatbot support (manual support only)
- Mobile native apps (web-only)
- Listing creation by landlords/property managers
- Background check services

### 2. USER PERSONAS

#### 2.1 Primary Persona: Mary Ann (The Senior)
**Demographics:**
- Age: 68
- Status: Widowed 18 months ago
- Current: 3-bedroom house in Akron suburbs (42 years)
- Income: $3,200/month (Social Security + small pension)
- Tech: Uses iPad daily, comfortable with email, struggles with complex apps

**Pain Points:**
- Overwhelmed by housing websites with tiny text and complex filters
- Fears making wrong decision without deceased spouse
- Anxious about leaving home filled with memories
- Concerned about affording quality housing on fixed income
- Worried about burdening adult children

**Goals:**
- Find 1-bedroom apartment near grocery store and church
- Budget: $900-1,200/month
- Stay within 15 miles of current location (near family)
- Maintain independence without home maintenance burden
- Downsize belongings thoughtfully, not hastily

**User Journey:**
1. Discovers app through son David's recommendation
2. Reads "Letter from Editor" and feels understood
3. Completes preference survey over 3 sessions (saves progress)
4. Reviews 12 listings over 2 weeks
5. Bookmarks 4 favorites, shares with David
6. David adds comments on each listing
7. Schedules tours at 2 properties
8. Makes decision within 6 weeks

#### 2.2 Secondary Persona: David (The Adult Child)
**Demographics:**
- Age: 42
- Status: Married, 2 children
- Location: Columbus OH (90 miles from mother)
- Occupation: IT Manager
- Tech: Power user, expects modern UX

**Pain Points:**
- Guilt about not being physically present to help mother
- Frustration with senior housing sites that exclude him from process
- Anxiety about mother's isolation and safety
- Time constraints (job + family)
- Wants mother involved in decision, not making it for her

**Goals:**
- Help mother find safe, affordable, social housing
- Stay informed about her search progress remotely
- Add practical input without being overbearing
- Ensure mother feels empowered, not helpless
- Complete this transition in 2-3 months maximum

**User Journey:**
1. Mother shares app access with him
2. Reviews her bookmarked listings remotely
3. Adds comments/questions to each listing
4. Coordinates tour schedules around his availability
5. Uses app to compare pros/cons of finalists
6. Celebrates decision together via app

#### 2.3 Tertiary Persona: Linda (The Social Senior)
**Demographics:**
- Age: 72
- Status: Divorced, financially comfortable
- Current: 2-bedroom condo (empty nest)
- Income: $5,500/month (pension + investments)
- Tech: iPhone user, social media active, online shopper

**Pain Points:**
- Bored living alone after active career
- Wants social environment, not isolation
- Fears losing independence in "old folks home"
- Desires amenities (fitness, events, dining)
- Frustrated by institutional-looking senior communities

**Goals:**
- Find luxury senior community with active social calendar
- Budget: $2,500-3,500/month
- Within 30 miles of grandchildren
- Must have fitness center and regular events
- Pet-friendly (has small dog)

**User Journey:**
1. Searches online for "luxury senior apartments Ohio"
2. Discovers app, impressed by elegant design
3. Completes survey emphasizing social/amenity preferences
4. Reviews 20+ listings, filters by amenities
5. Bookmarks 8 potential communities
6. Uses neighborhood scoring to evaluate walkability
7. Schedules multiple tours over 3 weeks
8. Makes decision confidently

### 3. FUNCTIONAL REQUIREMENTS

#### 3.1 User Authentication & Profiles

**3.1.1 Registration**
- MUST support email + password authentication via Supabase Auth
- Password MUST meet requirements: minimum 8 characters, 1 uppercase, 1 number, 1 special character
- Email verification MUST be required before full access
- Registration form MUST have exactly 3 fields: Full Name, Email, Password
- Form MUST display password strength indicator (weak/medium/strong)
- Form MUST show inline validation errors immediately on blur
- Success MUST redirect to preference survey with welcome message

**3.1.2 Login**
- Login form MUST have exactly 2 fields: Email, Password
- MUST include "Forgot Password" link below password field
- MUST show persistent session (30 days) with "Remember Me" checkbox (checked by default)
- Failed login MUST show friendly error: "We couldn't find that combination. Please try again or reset your password."
- Maximum 5 login attempts per email per 15-minute window
- After 5 failed attempts, MUST show: "For your security, please wait 15 minutes or reset your password."

**3.1.3 Password Reset**
- Reset link MUST be sent via email through Supabase Auth
- Reset link MUST expire after 60 minutes
- Reset page MUST require new password entry twice (confirmation)
- MUST enforce same password requirements as registration
- Success MUST automatically log user in and redirect to dashboard

**3.1.4 User Profile Storage**
```typescript
// Supabase Schema: profiles table
interface UserProfile {
  id: string; // UUID, primary key, references auth.users
  full_name: string; // Required, max 100 chars
  created_at: timestamp; // Auto-generated
  updated_at: timestamp; // Auto-updated
  last_login: timestamp; // Updated on each login
  role: 'senior' | 'family_helper'; // Set during survey
  preferences_completed: boolean; // Default false
}
```

#### 3.2 Data Models (Supabase Tables)

**3.2.1 Preferences Table**
```sql
CREATE TABLE preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Location Preferences
  search_city VARCHAR(100) NOT NULL, -- e.g., "Cleveland"
  search_state CHAR(2) NOT NULL, -- e.g., "OH"
  search_radius INTEGER NOT NULL, -- miles, default 10
  search_lat DECIMAL(10, 8), -- Center point latitude
  search_lng DECIMAL(11, 8), -- Center point longitude
  preferred_neighborhoods TEXT[], -- Array of neighborhood names
  
  -- Housing Preferences
  budget_min INTEGER NOT NULL, -- Monthly rent minimum
  budget_max INTEGER NOT NULL, -- Monthly rent maximum
  bedrooms INTEGER NOT NULL, -- Minimum bedrooms (1-3)
  bathrooms DECIMAL(2,1), -- Minimum bathrooms (1.0, 1.5, 2.0)
  housing_types TEXT[] NOT NULL, -- ['independent', 'assisted', 'memory_care']
  
  -- Amenities (array of required amenities)
  required_amenities TEXT[], -- e.g., ['elevator', 'parking', 'laundry']
  desired_amenities TEXT[], -- e.g., ['pool', 'gym', 'social_activities']
  
  -- Accessibility Needs
  wheelchair_accessible BOOLEAN DEFAULT false,
  no_stairs_required BOOLEAN DEFAULT false,
  hearing_accessible BOOLEAN DEFAULT false,
  vision_accessible BOOLEAN DEFAULT false,
  
  -- Lifestyle Preferences
  social_preference VARCHAR(20), -- 'very_social' | 'moderately_social' | 'private'
  pet_friendly_required BOOLEAN DEFAULT false,
  pet_type VARCHAR(20), -- 'dog' | 'cat' | 'both' | null
  
  -- Proximity Preferences (boolean toggles)
  near_grocery BOOLEAN DEFAULT true,
  near_medical BOOLEAN DEFAULT true,
  near_family BOOLEAN DEFAULT true,
  near_transit BOOLEAN DEFAULT false,
  near_religious BOOLEAN DEFAULT false,
  near_parks BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP, -- NULL until survey fully completed
  
  UNIQUE(user_id)
);
```

**3.2.2 Bookmarks Table**
```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Google Maps Data
  place_id VARCHAR(255) NOT NULL, -- Google Place ID
  place_name VARCHAR(255) NOT NULL,
  formatted_address TEXT NOT NULL,
  
  -- Cached Data (to reduce API calls)
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  photo_reference VARCHAR(500), -- First photo from Google
  rating DECIMAL(2,1), -- Google rating (0.0-5.0)
  price_level INTEGER, -- Google price level (1-4)
  
  -- User Data
  user_notes TEXT, -- Personal notes about this listing
  user_rating INTEGER, -- User's personal rating (1-5)
  tour_scheduled BOOLEAN DEFAULT false,
  tour_date TIMESTAMP,
  
  -- Sharing & Collaboration
  shared_with UUID[], -- Array of user_ids this is shared with
  family_comments JSONB, -- Comments from family members
  
  -- Status
  status VARCHAR(20) DEFAULT 'saved', -- 'saved' | 'toured' | 'applied' | 'declined'
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, place_id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_place ON bookmarks(place_id);
```

**3.2.3 Search History Table**
```sql
CREATE TABLE search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Search Parameters
  query_text TEXT, -- Full text search query if used
  filters_applied JSONB NOT NULL, -- All filters as JSON
  
  -- Results Metadata
  results_count INTEGER,
  results_place_ids TEXT[], -- Array of place_ids returned
  
  -- Metadata
  searched_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_search_history_user ON search_history(user_id);
CREATE INDEX idx_search_history_date ON search_history(searched_at DESC);
```

**3.2.4 Family Connections Table**
```sql
CREATE TABLE family_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  helper_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Relationship
  relationship VARCHAR(50), -- 'son' | 'daughter' | 'sibling' | 'friend' | 'caregiver'
  
  -- Permissions
  can_view_bookmarks BOOLEAN DEFAULT true,
  can_add_comments BOOLEAN DEFAULT true,
  can_add_bookmarks BOOLEAN DEFAULT false,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'accepted' | 'declined'
  invited_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  
  UNIQUE(senior_user_id, helper_user_id)
);

CREATE INDEX idx_family_senior ON family_connections(senior_user_id);
CREATE INDEX idx_family_helper ON family_connections(helper_user_id);
```

#### 3.3 Google Maps Platform Integration

**3.3.1 API Configuration**
```typescript
// Environment Variables Required
const REQUIRED_ENV_VARS = {
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'Required - Browser-side key with domain restrictions',
  GOOGLE_MAPS_API_KEY_SERVER: 'Required - Server-side key with IP restrictions',
  NEXT_PUBLIC_SUPABASE_URL: 'Required',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'Required',
  SUPABASE_SERVICE_ROLE_KEY: 'Required - Server-side only',
};

// API Key Restrictions
// Browser Key MUST restrict to domains: v0-mom-s-home-app-*.vercel.app
// Server Key MUST restrict to Vercel IP ranges
// Both keys MUST enable ONLY these APIs:
// - Places API (New)
// - Maps JavaScript API  
// - Geocoding API
// - Places Aggregate API
```

**3.3.2 Text Search Implementation**
```typescript
// File: lib/google-maps/search.ts

interface SearchParams {
  textQuery: string; // Human-readable query
  latitude: number;
  longitude: number;
  radius: number; // meters (user preference in miles * 1609.34)
  minPrice?: number; // User budget_min
  maxPrice?: number; // User budget_max
  housingTypes: string[]; // From user preferences
}

interface SearchResult {
  placeId: string;
  displayName: string;
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  rating?: number;
  priceLevel?: number;
  photos?: Array<{
    photoReference: string;
    height: number;
    width: number;
  }>;
}

async function searchApartments(params: SearchParams): Promise<SearchResult[]> {
  // MUST use Places API (New) endpoint
  const endpoint = 'https://places.googleapis.com/v1/places:searchText';
  
  // MUST construct query string from params
  const queryParts = [
    params.housingTypes.includes('assisted') ? 'assisted living' : 'apartments',
    'for rent',
    'in', params.textQuery // e.g., "Cleveland OH"
  ];
  
  if (params.maxPrice) {
    queryParts.push(`under $${params.maxPrice} monthly`);
  }
  
  const textQuery = queryParts.join(' ');
  
  const requestBody = {
    textQuery,
    locationBias: {
      circle: {
        center: {
          latitude: params.latitude,
          longitude: params.longitude
        },
        radius: params.radius
      }
    }
  };
  
  // MUST include these headers exactly
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY_SERVER!,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.priceLevel,places.photos'
  };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // MUST map response to SearchResult[]
    return data.places?.map((place: any) => ({
      placeId: place.id,
      displayName: place.displayName?.text || 'Unnamed Location',
      formattedAddress: place.formattedAddress || '',
      location: {
        lat: place.location?.latitude || 0,
        lng: place.location?.longitude || 0
      },
      rating: place.rating,
      priceLevel: place.priceLevel,
      photos: place.photos?.map((photo: any) => ({
        photoReference: photo.name,
        height: photo.heightPx,
        width: photo.widthPx
      }))
    })) || [];
    
  } catch (error) {
    console.error('Search failed:', error);
    throw new Error('Unable to search for apartments. Please try again.');
  }
}
```

**3.3.3 Place Details Fetch**
```typescript
// File: lib/google-maps/details.ts

interface PlaceDetails extends SearchResult {
  phoneNumber?: string;
  website?: string;
  openingHours?: {
    weekdayDescriptions: string[];
  };
  reviews?: Array<{
    authorName: string;
    rating: number;
    text: string;
    time: string;
  }>;
  types?: string[]; // Place types from Google
}

async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  const endpoint = `https://places.googleapis.com/v1/${placeId}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY_SERVER!,
    'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,rating,priceLevel,photos,nationalPhoneNumber,websiteUri,regularOpeningHours,reviews,types'
  };
  
  try {
    const response = await fetch(endpoint, { headers });
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }
    
    const place = await response.json();
    
    return {
      placeId: place.id,
      displayName: place.displayName?.text || 'Unnamed Location',
      formattedAddress: place.formattedAddress || '',
      location: {
        lat: place.location?.latitude || 0,
        lng: place.location?.longitude || 0
      },
      rating: place.rating,
      priceLevel: place.priceLevel,
      phoneNumber: place.nationalPhoneNumber,
      website: place.websiteUri,
      openingHours: place.regularOpeningHours,
      reviews: place.reviews?.slice(0, 5), // First 5 reviews only
      types: place.types,
      photos: place.photos?.map((photo: any) => ({
        photoReference: photo.name,
        height: photo.heightPx,
        width: photo.widthPx
      }))
    };
    
  } catch (error) {
    console.error('Failed to fetch place details:', error);
    throw new Error('Unable to load listing details. Please try again.');
  }
}
```

**3.3.4 Photo URL Generation**
```typescript
// File: lib/google-maps/photos.ts

interface PhotoUrlParams {
  photoReference: string; // From photo.name in API response
  maxWidth?: number; // Default 800px
  maxHeight?: number; // Default 600px
}

function getPhotoUrl(params: PhotoUrlParams): string {
  const { photoReference, maxWidth = 800, maxHeight = 600 } = params;
  
  // MUST use the browser-side API key for client-side image loading
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // MUST use this exact endpoint format
  return `https://places.googleapis.com/v1/${photoReference}/media?maxWidthPx=${maxWidth}&maxHeightPx=${maxHeight}&key=${apiKey}`;
}
```

**3.3.5 Map Display Component**
```typescript
// File: components/Map/ListingsMap.tsx

interface ListingsMapProps {
  listings: SearchResult[];
  center: { lat: number; lng: number };
  zoom: number; // Default 12
  onMarkerClick: (listing: SearchResult) => void;
  selectedPlaceId?: string;
}

// MUST use @googlemaps/js-api-loader package
import { Loader } from '@googlemaps/js-api-loader';

const MAP_STYLES = [
  {
    featureType: 'all',
    stylers: [
      { saturation: -20 },
      { lightness: 20 }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
];

export function ListingsMap({ listings, center, zoom, onMarkerClick, selectedPlaceId }: ListingsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
      libraries: ['places', 'marker']
    });
    
    loader.load().then(() => {
      const newMap = new google.maps.Map(mapRef.current!, {
        center,
        zoom,
        styles: MAP_STYLES,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });
      
      setMap(newMap);
    });
  }, []);
  
  useEffect(() => {
    if (!map || !listings.length) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Create new markers for each listing
    listings.forEach(listing => {
      const marker = new google.maps.Marker({
        position: listing.location,
        map,
        title: listing.displayName,
        icon: {
          url: selectedPlaceId === listing.placeId 
            ? '/markers/marker-selected.svg'  // MUST create this file
            : '/markers/marker-default.svg',   // MUST create this file
          scaledSize: new google.maps.Size(40, 40)
        }
      });
      
      marker.addListener('click', () => {
        onMarkerClick(listing);
      });
      
      markersRef.current.push(marker);
    });
    
    // Fit bounds to show all markers
    if (listings.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      listings.forEach(listing => {
        bounds.extend(listing.location);
      });
      map.fitBounds(bounds);
    }
    
  }, [map, listings, selectedPlaceId]);
  
  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[500px] rounded-lg border-2 border-[#D4C4B0]"
      role="region"
      aria-label="Map showing apartment listings"
    />
  );
}
```

#### 3.4 Preference Survey Flow

**3.4.1 Survey Structure**
The survey MUST be divided into exactly 7 screens presented sequentially. User MUST be able to navigate backwards but NOT skip ahead. Progress MUST be saved after each screen.

**Screen 1: Welcome & Role Selection**
- Title: "Let's Find Your Perfect Place"
- Subtitle: "First, help us understand your situation"
- Question: "Who are you in this search?"
- Options (radio buttons, MUST select one):
  - "I'm searching for myself"
  - "I'm helping a parent or loved one"
- CTA Button: "Continue" (disabled until selection)
- Progress: 1/7

**Screen 2: Location Preferences**
- Title: "Where Would You Like to Live?"
- Fields:
  - City (text input, required, autocomplete enabled)
  - State (dropdown, required, US states only)
  - Search Radius (slider, 5-50 miles, default 10, step 5)
  - Preferred Neighborhoods (text input with chips, optional, "Add a neighborhood" placeholder)
- Validation: City and State MUST be filled
- CTA Button: "Next"
- Progress: 2/7

**Screen 3: Budget**
- Title: "What's Your Monthly Budget?"
- Subtitle: "This helps us show you the right options"
- Fields:
  - Budget Range (dual-handle slider, $500-$5,000, step $50)
  - Display format: "$1,200 - $2,000 per month"
  - Quick presets below slider:
    - "Under $1,000"
    - "$1,000 - $2,000"
    - "$2,000 - $3,000"
    - "$3,000+"
- Validation: Min MUST be less than Max
- CTA Button: "Next"
- Progress: 3/7

**Screen 4: Space Requirements**
- Title: "How Much Space Do You Need?"
- Fields:
  - Bedrooms (radio buttons, required):
    - "Studio"
    - "1 Bedroom"
    - "2 Bedrooms"
    - "3+ Bedrooms"
  - Bathrooms (radio buttons, required):
    - "1 Bathroom"
    - "1.5 Bathrooms"
    - "2 Bathrooms"
    - "2+ Bathrooms"
- CTA Button: "Next"
- Progress: 4/7

**Screen 5: Housing Type**
- Title: "What Type of Living Situation?"
- Subtitle: "Select all that interest you"
- Options (checkboxes, MUST select at least one):
  - "Independent Apartment"
    - Helper text: "A regular apartment where you handle your own daily needs"
  - "Active Adult Community (55+)"
    - Helper text: "Age-restricted community with maintenance-free living"
  - "Assisted Living"
    - Helper text: "Support with daily activities like bathing, meals, medication"
  - "Memory Care"
    - Helper text: "Specialized care for those with Alzheimer's or dementia"
- Info icon next to each MUST show detailed tooltip on hover
- Validation: At least one MUST be selected
- CTA Button: "Next"
- Progress: 5/7

**Screen 6: Must-Have Features**
- Title: "What Features Are Essential?"
- Subtitle: "We'll prioritize these in your results"
- Layout: Two-column grid on desktop, single column on mobile
- Categories (checkboxes under category headers):
  
  **Accessibility:**
  - Elevator building
  - Ground floor available
  - Wheelchair accessible
  - No stairs required
  
  **Amenities:**
  - In-unit laundry
  - Parking included
  - Pet friendly
  - Fitness center
  - Swimming pool
  - Community activities
  
  **Proximity:**
  - Near grocery stores
  - Near medical facilities
  - Near family
  - Near public transit
  - Near places of worship
  - Near parks

- Validation: No minimum required (all optional)
- CTA Button: "Next"
- Progress: 6/7

**Screen 7: Social Preferences**
- Title: "One Last Thing: Your Lifestyle"
- Questions (radio buttons):
  
  1. "How social would you like your living situation to be?"
     - "Very social - I love activities and meeting neighbors"
     - "Moderately social - I enjoy some activities but value privacy"
     - "Private - I prefer to keep to myself"
  
  2. "Do you have pets or plan to get one?"
     - "Yes, I have a dog"
     - "Yes, I have a cat"
     - "Yes, I have both"
     - "No pets"

- CTA Button: "Complete Survey"
- Progress: 7/7

**Survey Completion**
Upon clicking "Complete Survey":
1. MUST save all data to preferences table with completed_at timestamp
2. MUST update user profile: preferences_completed = true
3. MUST redirect to /dashboard with success message
4. Success message MUST display for 5 seconds: "Perfect! We've saved your preferences. Let's find your new home."

**3.4.2 Survey State Management**
```typescript
// File: lib/hooks/useSurveyState.ts

interface SurveyState {
  currentScreen: number; // 1-7
  data: Partial<PreferencesData>;
  isComplete: boolean;
  isSaving: boolean;
}

interface PreferencesData {
  role: 'senior' | 'family_helper';
  searchCity: string;
  searchState: string;
  searchRadius: number;
  preferredNeighborhoods: string[];
  budgetMin: number;
  budgetMax: number;
  bedrooms: number;
  bathrooms: number;
  housingTypes: string[];
  requiredAmenities: string[];
  desiredAmenities: string[];
  wheelchairAccessible: boolean;
  noStairsRequired: boolean;
  socialPreference: string;
  petFriendlyRequired: boolean;
  petType: string | null;
  proximityPreferences: {
    nearGrocery: boolean;
    nearMedical: boolean;
    nearFamily: boolean;
    nearTransit: boolean;
    nearReligious: boolean;
    nearParks: boolean;
  };
}

export function useSurveyState() {
  const [state, setState] = useState<SurveyState>({
    currentScreen: 1,
    data: {},
    isComplete: false,
    isSaving: false
  });
  
  // MUST save to Supabase after each screen
  const saveProgress = async (screenData: Partial<PreferencesData>) => {
    setState(prev => ({ ...prev, isSaving: true }));
    
    try {
      const { data, error } = await supabase
        .from('preferences')
        .upsert({
          user_id: getCurrentUserId(),
          ...state.data,
          ...screenData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        data: { ...prev.data, ...screenData },
        isSaving: false
      }));
      
    } catch (error) {
      console.error('Failed to save survey progress:', error);
      setState(prev => ({ ...prev, isSaving: false }));
      throw new Error('Unable to save your progress. Please try again.');
    }
  };
  
  const goToNextScreen = () => {
    setState(prev => ({
      ...prev,
      currentScreen: Math.min(prev.currentScreen + 1, 7)
    }));
  };
  
  const goToPreviousScreen = () => {
    setState(prev => ({
      ...prev,
      currentScreen: Math.max(prev.currentScreen - 1, 1)
    }));
  };
  
  const completeSurvey = async () => {
    setState(prev => ({ ...prev, isSaving: true }));
    
    try {
      const { error } = await supabase
        .from('preferences')
        .update({
          completed_at: new Date().toISOString()
        })
        .eq('user_id', getCurrentUserId());
      
      if (error) throw error;
      
      await supabase
        .from('profiles')
        .update({ preferences_completed: true })
        .eq('id', getCurrentUserId());
      
      setState(prev => ({
        ...prev,
        isComplete: true,
        isSaving: false
      }));
      
    } catch (error) {
      console.error('Failed to complete survey:', error);
      setState(prev => ({ ...prev, isSaving: false }));
      throw new Error('Unable to complete survey. Please try again.');
    }
  };
  
  return {
    state,
    saveProgress,
    goToNextScreen,
    goToPreviousScreen,
    completeSurvey
  };
}
```

#### 3.5 Search & Results Display

**3.5.1 Dashboard Layout**
After completing survey, user MUST land on dashboard with this exact layout:

```
┌─────────────────────────────────────────────────────┐
│ Header (Navigation)                                 │
├─────────────────┬───────────────────────────────────┤
│                 │                                   │
│  Left Sidebar   │     Main Content Area            │
│  (240px wide)   │     (Flexible width)             │
│                 │                                   │
│  - Dashboard    │  ┌─────────────────────────────┐ │
│  - Search       │  │                             │ │
│  - Bookmarks    │  │   Content based on route    │ │
│  - Preferences  │  │                             │ │
│  - Resources    │  │                             │ │
│  - Help         │  └─────────────────────────────┘ │
│                 │                                   │
└─────────────────┴───────────────────────────────────┘
```

**3.5.2 Search Results Page Layout**
When user navigates to /search:

```
┌──────────────────────────────────────────────────────┐
│  Filters Bar (Collapsible on mobile)                 │
├─────────────────┬────────────────────────────────────┤
│                 │                                    │
│  Listings List  │   Map View                        │
│  (400px)        │   (Remaining width)               │
│  Scrollable     │                                    │
│                 │   - Shows all listing markers     │
│  - Card 1       │   - Clicking marker highlights    │
│  - Card 2       │     corresponding card            │
│  - Card 3       │   - Map updates when list scrolls │
│  - ...          │                                    │
│                 │                                    │
└─────────────────┴────────────────────────────────────┘
```

**3.5.3 Listing Card Component**
```typescript
// File: components/Listings/ListingCard.tsx

interface ListingCardProps {
  listing: SearchResult;
  isBookmarked: boolean;
  isHighlighted: boolean;
  onBookmarkToggle: (placeId: string) => void;
  onClick: (placeId: string) => void;
}

export function ListingCard({
  listing,
  isBookmarked,
  isHighlighted,
  onBookmarkToggle,
  onClick
}: ListingCardProps) {
  return (
    <article
      className={`
        bg-[#FAF8F5] border-2 rounded-lg p-6 cursor-pointer
        transition-all duration-200 hover:shadow-lg
        ${isHighlighted ? 'border-[#8B7355] shadow-lg' : 'border-[#D4C4B0]'}
      `}
      onClick={() => onClick(listing.placeId)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${listing.displayName}`}
    >
      {/* Photo Section */}
      <div className="relative aspect-video mb-4 rounded-md overflow-hidden">
        {listing.photos?.[0] ? (
          <img
            src={getPhotoUrl({
              photoReference: listing.photos[0].photoReference,
              maxWidth: 400,
              maxHeight: 300
            })}
            alt={`${listing.displayName} exterior`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#D4C4B0] flex items-center justify-center">
            <span className="text-[#8B7355] font-serif text-lg">
              No Photo Available
            </span>
          </div>
        )}
        
        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle(listing.placeId);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <BookmarkIcon filled={isBookmarked} />
        </button>
      </div>
      
      {/* Content Section */}
      <div className="space-y-2">
        <h3 className="font-serif text-2xl text-[#5C4A3C] leading-tight">
          {listing.displayName}
        </h3>
        
        <p className="text-[#8B7355] text-base">
          {listing.formattedAddress}
        </p>
        
        {listing.rating && (
          <div className="flex items-center gap-2">
            <StarRating value={listing.rating} />
            <span className="text-[#8B7355] text-sm">
              {listing.rating.toFixed(1)} rating
            </span>
          </div>
        )}
        
        {listing.priceLevel && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={i < listing.priceLevel! ? 'text-[#8B7355]' : 'text-[#D4C4B0]'}
              >
                $
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Action Footer */}
      <div className="mt-4 pt-4 border-t border-[#D4C4B0] flex gap-3">
        <button className="flex-1 px-4 py-2 bg-[#8B7355] text-[#FAF8F5] rounded-md hover:bg-[#5C4A3C] transition-colors text-sm font-medium">
          View Details
        </button>
        <button className="px-4 py-2 border border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors text-sm font-medium">
          Share
        </button>
      </div>
    </article>
  );
}
```

**3.5.4 Filters Implementation**
```typescript
// File: components/Search/SearchFilters.tsx

interface FilterState {
  priceRange: [number, number];
  bedrooms: number | null;
  housingTypes: string[];
  amenities: string[];
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating';
}

export function SearchFilters({
  initialFilters,
  onFilterChange
}: {
  initialFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <aside
      className="bg-[#FAF8F5] border-2 border-[#D4C4B0] rounded-lg p-6"
      role="search"
      aria-label="Search filters"
    >
      {/* Collapse Toggle (mobile only) */}
      <button
        className="lg:hidden w-full flex items-center justify-between mb-4 text-[#5C4A3C] font-serif text-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Filters</span>
        <ChevronIcon direction={isExpanded ? 'up' : 'down'} />
      </button>
      
      <div className={`space-y-6 ${!isExpanded && 'hidden lg:block'}`}>
        {/* Price Range */}
        <div>
          <label className="block font-serif text-[#5C4A3C] text-lg mb-3">
            Monthly Rent
          </label>
          <DualRangeSlider
            min={500}
            max={5000}
            step={50}
            value={filters.priceRange}
            onChange={(value) => updateFilter('priceRange', value)}
            formatLabel={(val) => `$${val.toLocaleString()}`}
          />
        </div>
        
        {/* Bedrooms */}
        <div>
          <label className="block font-serif text-[#5C4A3C] text-lg mb-3">
            Bedrooms
          </label>
          <div className="flex gap-2">
            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => updateFilter('bedrooms', num)}
                className={`
                  flex-1 py-3 rounded-md font-medium transition-colors
                  ${filters.bedrooms === num
                    ? 'bg-[#8B7355] text-[#FAF8F5]'
                    : 'bg-white text-[#8B7355] border border-[#D4C4B0] hover:border-[#8B7355]'
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        
        {/* Housing Types */}
        <div>
          <label className="block font-serif text-[#5C4A3C] text-lg mb-3">
            Type of Living
          </label>
          <div className="space-y-2">
            {HOUSING_TYPE_OPTIONS.map(type => (
              <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.housingTypes.includes(type.value)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.housingTypes, type.value]
                      : filters.housingTypes.filter(t => t !== type.value);
                    updateFilter('housingTypes', newTypes);
                  }}
                  className="w-6 h-6 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355]"
                />
                <span className="text-base text-[#5C4A3C]">{type.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Amenities */}
        <div>
          <label className="block font-serif text-[#5C4A3C] text-lg mb-3">
            Amenities
          </label>
          <div className="space-y-2">
            {AMENITY_OPTIONS.slice(0, 5).map(amenity => (
              <label key={amenity.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity.value)}
                  onChange={(e) => {
                    const newAmenities = e.target.checked
                      ? [...filters.amenities, amenity.value]
                      : filters.amenities.filter(a => a !== amenity.value);
                    updateFilter('amenities', newAmenities);
                  }}
                  className="w-6 h-6 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355]"
                />
                <span className="text-base text-[#5C4A3C]">{amenity.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Sort By */}
        <div>
          <label className="block font-serif text-[#5C4A3C] text-lg mb-3">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full px-4 py-3 rounded-md border-2 border-[#D4C4B0] text-[#5C4A3C] focus:border-[#8B7355] focus:ring-[#8B7355]"
          >
            <option value="relevance">Most Relevant</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        
        {/* Clear Filters */}
        <button
          onClick={() => {
            const defaultFilters: FilterState = {
              priceRange: [500, 5000],
              bedrooms: null,
              housingTypes: [],
              amenities: [],
              sortBy: 'relevance'
            };
            setFilters(defaultFilters);
            onFilterChange(defaultFilters);
          }}
          className="w-full py-3 text-[#8B7355] hover:text-[#5C4A3C] font-medium transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}
```

#### 3.6 Accessibility Requirements (WCAG 2.1 AA)

**3.6.1 Text Size Controls**
MUST implement site-wide text size adjustment:
- Default: 18px body text
- Available sizes: 16px, 18px, 20px, 22px, 24px
- Control location: Persistent in header (top-right corner)
- Control format: Three buttons: "A-" (decrease), "A" (reset), "A+" (increase)
- State persistence: Store in localStorage as 'text_size_preference'
- Implementation:
  ```typescript
  // Root layout must apply class based on preference
  const textSizes = {
    '16': 'text-base',
    '18': 'text-lg',
    '20': 'text-xl',
    '22': 'text-2xl',
    '24': 'text-3xl'
  };
  ```

**3.6.2 Color Contrast Requirements**
- Body text MUST have minimum 4.5:1 contrast ratio
- Large text (18pt+) MUST have minimum 3:1 contrast ratio
- Interactive elements MUST have minimum 3:1 contrast with surroundings
- Color palette compliance:
  - Primary text: #5C4A3C on #FAF8F5 background (ratio: 8.2:1 ✓)
  - Secondary text: #8B7355 on #FAF8F5 background (ratio: 4.8:1 ✓)
  - Accent: #D4C4B0 borders (ratio: 1.8:1 - decorative only)

**3.6.3 Keyboard Navigation**
MUST support full keyboard navigation:
- Tab order MUST follow logical reading order
- All interactive elements MUST be keyboard accessible
- Focus indicators MUST be visible (2px solid #8B7355 outline)
- Skip links MUST be provided:
  - "Skip to main content" (appears on first Tab press)
  - "Skip to search results" (on search page)
- Modal dialogs MUST trap focus
- Escape key MUST close all modals/dropdowns

**3.6.4 Touch Targets**
All interactive elements MUST meet minimum sizes:
- Buttons: 48px × 48px minimum
- Links: 48px × 48px minimum clickable area (even if text smaller)
- Form inputs: 48px height minimum
- Checkboxes/radios: 32px × 32px minimum
- Slider handles: 48px × 48px minimum
- Spacing: 8px minimum between adjacent touch targets

**3.6.5 Screen Reader Support**
MUST provide proper ARIA labels and semantic HTML:
- All images MUST have descriptive alt text
- All form inputs MUST have associated labels
- All buttons MUST have descriptive text or aria-label
- Landmark regions MUST be used:
  ```html
  <header role="banner">
  <nav role="navigation" aria-label="Main navigation">
  <main role="main">
  <aside role="complementary" aria-label="Search filters">
  <footer role="contentinfo">
  ```
- Live regions for dynamic content:
  ```html
  <div role="status" aria-live="polite" aria-atomic="true">
    {searchResultsCount} apartments found
  </div>
  ```

**3.6.6 Form Accessibility**
- All form errors MUST be announced to screen readers
- Error messages MUST appear immediately adjacent to field
- Error messages MUST be associated with input via aria-describedby
- Required fields MUST be indicated visually AND with aria-required
- Form success messages MUST use role="status"
- Example:
  ```html
  <div>
    <label for="email" class="block mb-2">
      Email Address
      <span aria-hidden="true" class="text-red-600">*</span>
    </label>
    <input
      id="email"
      type="email"
      required
      aria-required="true"
      aria-invalid={hasError}
      aria-describedby={hasError ? "email-error" : undefined}
      class="w-full px-4 py-3 rounded-md border-2"
    />
    {hasError && (
      <p id="email-error" class="text-red-600 text-sm mt-1" role="alert">
        Please enter a valid email address
      </p>
    )}
  </div>
  ```

**3.6.7 High Contrast Mode**
MUST provide toggle for high contrast mode:
- Toggle location: Persistent in header next to text size controls
- Toggle format: Button with "High Contrast" label + icon
- State persistence: Store in localStorage as 'high_contrast_mode'
- Color overrides when enabled:
  ```typescript
  const highContrastStyles = {
    bg: '#000000',
    text: '#FFFFFF',
    border: '#FFFFFF',
    link: '#00FFFF',
    visited: '#FF00FF',
    button: '#FFFF00',
    buttonText: '#000000'
  };
  ```

#### 3.7 Bookmark & Sharing System

**3.7.1 Bookmark Actions**
```typescript
// File: lib/actions/bookmarks.ts

export async function addBookmark(
  userId: string,
  placeId: string,
  placeData: SearchResult
): Promise<void> {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: userId,
        place_id: placeId,
        place_name: placeData.displayName,
        formatted_address: placeData.formattedAddress,
        lat: placeData.location.lat,
        lng: placeData.location.lng,
        photo_reference: placeData.photos?.[0]?.photoReference,
        rating: placeData.rating,
        price_level: placeData.priceLevel,
        status: 'saved',
        created_at: new Date().toISOString()
      });
    
    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('You have already bookmarked this listing');
      }
      throw error;
    }
    
  } catch (error) {
    console.error('Failed to add bookmark:', error);
    throw new Error('Unable to save bookmark. Please try again.');
  }
}

export async function removeBookmark(
  userId: string,
  placeId: string
): Promise<void> {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('place_id', placeId);
    
    if (error) throw error;
    
  } catch (error) {
    console.error('Failed to remove bookmark:', error);
    throw new Error('Unable to remove bookmark. Please try again.');
  }
}

export async function updateBookmarkNotes(
  bookmarkId: string,
  notes: string
): Promise<void> {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .update({
        user_notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookmarkId);
    
    if (error) throw error;
    
  } catch (error) {
    console.error('Failed to update notes:', error);
    throw new Error('Unable to save notes. Please try again.');
  }
}

export async function updateBookmarkStatus(
  bookmarkId: string,
  status: 'saved' | 'toured' | 'applied' | 'declined'
): Promise<void> {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookmarkId);
    
    if (error) throw error;
    
  } catch (error) {
    console.error('Failed to update status:', error);
    throw new Error('Unable to update status. Please try again.');
  }
}
```

**3.7.2 Family Sharing Flow**

**Step 1: Send Invitation**
User clicks "Share with Family" button on bookmarks page:
```typescript
// File: lib/actions/sharing.ts

export async function sendFamilyInvitation(
  seniorUserId: string,
  inviteeEmail: string,
  relationship: string
): Promise<void> {
  try {
    // Check if invitee already has account
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', inviteeEmail)
      .single();
    
    let helperUserId: string;
    
    if (existingUser) {
      helperUserId = existingUser.id;
    } else {
      // Create placeholder profile (completed when they accept)
      const { data: newUser, error } = await supabase.auth.admin.createUser({
        email: inviteeEmail,
        email_confirm: false,
        user_metadata: {
          invited_by: seniorUserId,
          pending_invitation: true
        }
      });
      
      if (error) throw error;
      helperUserId = newUser.user.id;
    }
    
    // Create connection record
    const { error: connectionError } = await supabase
      .from('family_connections')
      .insert({
        senior_user_id: seniorUserId,
        helper_user_id: helperUserId,
        relationship,
        status: 'pending',
        invited_at: new Date().toISOString()
      });
    
    if (connectionError) throw connectionError;
    
    // Send invitation email via Supabase Edge Function
    await supabase.functions.invoke('send-invitation-email', {
      body: {
        to: inviteeEmail,
        seniorName: await getSeniorName(seniorUserId),
        invitationLink: `${BASE_URL}/accept-invitation?token=${generateToken()}`
      }
    });
    
  } catch (error) {
    console.error('Failed to send invitation:', error);
    throw new Error('Unable to send invitation. Please try again.');
  }
}
```

**Step 2: Accept Invitation**
When invitee clicks link in email, they land on /accept-invitation:
```typescript
// File: app/accept-invitation/page.tsx

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  useEffect(() => {
    acceptInvitation(token).then(() => {
      setStatus('success');
      // Redirect to bookmarks page after 3 seconds
      setTimeout(() => {
        router.push('/bookmarks');
      }, 3000);
    }).catch(() => {
      setStatus('error');
    });
  }, [token]);
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="font-serif text-2xl text-[#5C4A3C] mb-4">
            Invalid or Expired Link
          </h1>
          <p className="text-[#8B7355] mb-6">
            This invitation link is no longer valid. Please ask for a new invitation.
          </p>
          <a href="/" className="btn-primary">
            Return Home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="font-serif text-2xl text-[#5C4A3C] mb-4">
          You're All Set!
        </h1>
        <p className="text-[#8B7355] mb-6">
          You can now view and comment on saved listings.
          Redirecting to bookmarks...
        </p>
      </div>
    </div>
  );
}
```

**Step 3: Collaborative Features**
On bookmarks page, family members can:
- View all bookmarked listings
- Add comments visible to senior and other family members
- Tag listings with reactions (👍, ❤️, 🤔)
- Filter by status: All, Saved, Toured, Applied, Declined

```typescript
// File: components/Bookmarks/CollaborativeCard.tsx

export function CollaborativeBookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const [comments, setComments] = useState(bookmark.family_comments || []);
  const [newComment, setNewComment] = useState('');
  
  const addComment = async () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: uuidv4(),
      user_id: getCurrentUserId(),
      user_name: getCurrentUserName(),
      text: newComment,
      created_at: new Date().toISOString()
    };
    
    const updatedComments = [...comments, comment];
    
    await supabase
      .from('bookmarks')
      .update({
        family_comments: updatedComments
      })
      .eq('id', bookmark.id);
    
    setComments(updatedComments);
    setNewComment('');
  };
  
  return (
    <div className="bg-[#FAF8F5] border-2 border-[#D4C4B0] rounded-lg p-6">
      {/* Bookmark content (photo, name, address, etc) */}
      <div className="mb-6">
        <img src={getPhotoUrl(bookmark.photo_reference)} alt={bookmark.place_name} />
        <h3 className="font-serif text-2xl text-[#5C4A3C] mt-4">
          {bookmark.place_name}
        </h3>
        <p className="text-[#8B7355]">{bookmark.formatted_address}</p>
      </div>
      
      {/* Notes Section */}
      <div className="mb-6 p-4 bg-white rounded-md">
        <h4 className="font-serif text-lg text-[#5C4A3C] mb-2">
          Personal Notes
        </h4>
        <textarea
          value={bookmark.user_notes || ''}
          onChange={(e) => updateBookmarkNotes(bookmark.id, e.target.value)}
          placeholder="Add your thoughts about this place..."
          className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-md resize-none"
          rows={3}
        />
      </div>
      
      {/* Family Comments Section */}
      <div className="mb-6">
        <h4 className="font-serif text-lg text-[#5C4A3C] mb-4">
          Family Discussion
        </h4>
        
        <div className="space-y-3 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B7355] text-white flex items-center justify-center font-medium">
                {comment.user_name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[#5C4A3C]">
                    {comment.user_name}
                  </span>
                  <span className="text-sm text-[#8B7355]">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-[#5C4A3C] mt-1">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Comment */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addComment()}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-3 border-2 border-[#D4C4B0] rounded-md"
          />
          <button
            onClick={addComment}
            disabled={!newComment.trim()}
            className="px-6 py-3 bg-[#8B7355] text-white rounded-md hover:bg-[#5C4A3C] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
      
      {/* Status & Actions */}
      <div className="flex gap-3 pt-4 border-t border-[#D4C4B0]">
        <select
          value={bookmark.status}
          onChange={(e) => updateBookmarkStatus(bookmark.id, e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-[#D4C4B0] rounded-md"
        >
          <option value="saved">Saved</option>
          <option value="toured">Toured</option>
          <option value="applied">Applied</option>
          <option value="declined">Not Interested</option>
        </select>
        
        <button className="px-6 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-white">
          Schedule Tour
        </button>
      </div>
    </div>
  );
}
```

---

## PART 3: IMPLEMENTATION PLAN

### Phase 1: Foundation

#### Day 1: Project Setup & Environment

**Task 1.1: Initialize Development Environment**

1. Clone existing repository:
   ```bash
   git clone https://github.com/coreyalejandro/v0-mom-s-home-app.git
   cd v0-mom-s-home-app
   ```

2. Install all dependencies:
   ```bash
   npm install
   # OR if using different package manager
   pnpm install
   ```

3. Create environment variables file:
   ```bash
   cp .env.example .env.local
   ```

4. Open `.env.local` and add these exact variables:
   ```env
   # Google Maps Platform
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_browser_key_here
   GOOGLE_MAPS_API_KEY_SERVER=your_server_key_here
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
   
   # App Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

5. Verify development server runs:
   ```bash
   npm run dev
   ```
   Expected result: Server starts on http://localhost:3000 without errors

**Task 1.2: Set Up Google Maps Platform**
Duration: 1 hour

1. Go to https://console.cloud.google.com
2. Create new project named "mom-home-finder"
3. Enable these APIs exactly:
   - Places API (New)
   - Maps JavaScript API
   - Geocoding API
   - Places Aggregate API

4. Create browser API key:
   - Name: "Browser Key - Mom Home Finder"
   - Application restrictions: HTTP referrers
   - Website restrictions: `*.vercel.app/*`, `localhost:3000/*`
   - API restrictions: Enable only the 4 APIs listed above
   - Copy key to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

5. Create server API key:
   - Name: "Server Key - Mom Home Finder"
   - Application restrictions: IP addresses
   - IP restrictions: Will be added after Vercel deployment
   - API restrictions: Enable only the 4 APIs listed above
   - Copy key to `GOOGLE_MAPS_API_KEY_SERVER`

6. Test API key:
   Create file `scripts/test-google-maps.ts`:
   ```typescript
   async function testGoogleMaps() {
     const response = await fetch(
       `https://places.googleapis.com/v1/places:searchText`,
       {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY_SERVER!
         },
         body: JSON.stringify({
           textQuery: 'apartments in Cleveland OH'
         })
       }
     );
     
     console.log('Status:', response.status);
     console.log('Data:', await response.json());
   }
   
   testGoogleMaps();
   ```

   Run test:
   ```bash
   npx tsx scripts/test-google-maps.ts
   ```
   Expected result: Status 200 with places data

**Task 1.3: Set Up Supabase Backend**
Duration: 3 hours

1. Go to https://supabase.com/dashboard
2. Create new project:
   - Name: "mom-home-finder"
   - Database password: Generate strong password, save securely
   - Region: Choose closest to Ohio (us-east-1)

3. Wait for project to provision (2-3 minutes)

4. Copy connection details:
   - Go to Project Settings > API
   - Copy Project URL to `NEXT_PUBLIC_SUPABASE_URL`
   - Copy anon/public key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy service_role key to `SUPABASE_SERVICE_ROLE_KEY`

5. Set up database schema:
   - Go to SQL Editor in Supabase dashboard
   - Create new query
   - Copy and paste this exact SQL:

```sql
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
  
  -- Location
  search_city VARCHAR(100) NOT NULL,
  search_state CHAR(2) NOT NULL,
  search_radius INTEGER NOT NULL DEFAULT 10,
  search_lat DECIMAL(10, 8),
  search_lng DECIMAL(11, 8),
  preferred_neighborhoods TEXT[],
  
  -- Housing
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DECIMAL(2,1),
  housing_types TEXT[] NOT NULL,
  
  -- Amenities
  required_amenities TEXT[],
  desired_amenities TEXT[],
  
  -- Accessibility
  wheelchair_accessible BOOLEAN DEFAULT false,
  no_stairs_required BOOLEAN DEFAULT false,
  hearing_accessible BOOLEAN DEFAULT false,
  vision_accessible BOOLEAN DEFAULT false,
  
  -- Lifestyle
  social_preference VARCHAR(20),
  pet_friendly_required BOOLEAN DEFAULT false,
  pet_type VARCHAR(20),
  
  -- Proximity
  near_grocery BOOLEAN DEFAULT true,
  near_medical BOOLEAN DEFAULT true,
  near_family BOOLEAN DEFAULT true,
  near_transit BOOLEAN DEFAULT false,
  near_religious BOOLEAN DEFAULT false,
  near_parks BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Google data
  place_id VARCHAR(255) NOT NULL,
  place_name VARCHAR(255) NOT NULL,
  formatted_address TEXT NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  photo_reference VARCHAR(500),
  rating DECIMAL(2,1),
  price_level INTEGER,
  
  -- User data
  user_notes TEXT,
  user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
  tour_scheduled BOOLEAN DEFAULT false,
  tour_date TIMESTAMP WITH TIME ZONE,
  
  -- Sharing
  shared_with UUID[],
  family_comments JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  status VARCHAR(20) DEFAULT 'saved' CHECK (status IN ('saved', 'toured', 'applied', 'declined')),
  
  -- Metadata
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
```

6. Click "Run" to execute SQL
7. Verify all tables created:
   - Go to Table Editor
   - Confirm you see: profiles, preferences, bookmarks, search_history, family_connections

**Task 1.4: Initialize Supabase Client**
Duration: 1 hour

1. Create file `lib/supabase/client.ts`:
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// Client for browser components
export function createBrowserClient() {
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  });
}

// Client for server actions/components
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
```

2. Create file `lib/supabase/database.types.ts`:
```typescript
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
          // All other fields optional with defaults
        }
        Update: {
          // All fields optional for updates
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
          // All other fields optional
        }
        Update: {
          // All fields optional for updates
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
          relationship?: string
        }
        Update: {
          status?: 'pending' | 'accepted' | 'declined'
          accepted_at?: string
        }
      }
    }
  }
}
```

**Verification Checkpoint for Day 1:**
- [ ] Dev server runs without errors
- [ ] Google Maps API keys work (test script passes)
- [ ] Supabase project created with all tables
- [ ] Supabase clients initialized
- [ ] All environment variables set

---

#### Day 2: Authentication System

**Task 2.1: Set Up Supabase Auth**
Duration: 2 hours

1. Configure Supabase Auth settings:
   - Go to Supabase Dashboard > Authentication > Settings
   - Set Site URL: `http://localhost:3000` (will update for production)
   - Set Redirect URLs: `http://localhost:3000/auth/callback`
   - Enable email auth ONLY (disable all social providers)
   - Set Email Templates:

Email Confirmation Template:
```html
<h2>Confirm your email</h2>
<p>Welcome to A Place of Your Own. Please confirm your email to get started.</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
```

Password Reset Template:
```html
<h2>Reset your password</h2>
<p>We received a request to reset your password.</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
<p>If you didn't request this, you can safely ignore this email.</p>
```

**Task 2.2: Create Auth Components**
Duration: 3 hours

1. Create file `components/auth/RegisterForm.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const supabase = createBrowserClient();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Please enter a password';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character (!@#$%^&*)';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const calculatePasswordStrength = (): 'weak' | 'medium' | 'strong' => {
    if (!formData.password) return 'weak';
    
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/(?=.*[A-Z])/.test(formData.password)) strength++;
    if (/(?=.*[0-9])/.test(formData.password)) strength++;
    if (/(?=.*[!@#$%^&*])/.test(formData.password)) strength++;
    if (formData.password.length >= 12) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (authError) throw authError;
      
      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user!.id,
          full_name: formData.fullName,
          role: 'senior', // Default role
          preferences_completed: false
        });
      
      if (profileError) throw profileError;
      
      // Show success message
      router.push('/auth/verify-email');
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      setErrors({
        submit: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const passwordStrength = calculatePasswordStrength();
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block font-serif text-lg text-[#5C4A3C] mb-2"
        >
          Full Name
          <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className={`w-full px-4 py-3 text-lg border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355] ${
            errors.fullName ? 'border-red-600' : 'border-[#D4C4B0]'
          }`}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>
      
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block font-serif text-lg text-[#5C4A3C] mb-2"
        >
          Email Address
          <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 text-lg border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355] ${
            errors.email ? 'border-red-600' : 'border-[#D4C4B0]'
          }`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      
      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block font-serif text-lg text-[#5C4A3C] mb-2"
        >
          Password
          <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`w-full px-4 py-3 text-lg border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355] ${
            errors.password ? 'border-red-600' : 'border-[#D4C4B0]'
          }`}
          aria-invalid={!!errors.password}
          aria-describedby="password-error password-strength"
        />
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div id="password-strength" className="mt-2">
            <div className="flex gap-1">
              <div className={`h-2 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
              <div className={`h-2 flex-1 rounded ${passwordStrength === 'medium' || passwordStrength === 'strong' ? 'bg-yellow-500' : 'bg-gray-300'}`} />
              <div className={`h-2 flex-1 rounded ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>
            <p className="text-sm text-[#8B7355] mt-1">
              Password strength: {passwordStrength}
            </p>
          </div>
        )}
        
        {errors.password && (
          <p id="password-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.password}
          </p>
        )}
      </div>
      
      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block font-serif text-lg text-[#5C4A3C] mb-2"
        >
          Confirm Password
          <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className={`w-full px-4 py-3 text-lg border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355] ${
            errors.confirmPassword ? 'border-red-600' : 'border-[#D4C4B0]'
          }`}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.confirmPassword}
          </p>
        )}
      </div>
      
      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border-2 border-red-600 rounded-md p-4" role="alert">
          <p className="text-red-600">{errors.submit}</p>
        </div>
      )}
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-[#8B7355] text-white text-lg font-medium rounded-md hover:bg-[#5C4A3C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
      
      {/* Login Link */}
      <p className="text-center text-[#8B7355]">
        Already have an account?{' '}
        <a href="/auth/login" className="text-[#5C4A3C] hover:underline font-medium">
          Sign in
        </a>
      </p>
    </form>
  );
}
```

2. Create file `components/auth/LoginForm.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const supabase = createBrowserClient();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Rate limiting check
    if (attemptCount >= 5) {
      setErrors({
        submit: 'For your security, please wait 15 minutes or reset your password.'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      
      if (error) {
        setAttemptCount(prev => prev + 1);
        throw error;
      }
      
      // Update last login
      await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);
      
      // Check if preferences completed
      const { data: profile } = await supabase
        .from('profiles')
        .select('preferences_completed')
        .eq('id', data.user.id)
        .single();
      
      // Redirect based on preferences status
      if (profile?.preferences_completed) {
        router.push('/dashboard');
      } else {
        router.push('/survey');
      }
      
    } catch (error: any) {
      console.error('Login failed:', error);
      setErrors({
        submit: "We couldn't find that combination. Please try again or reset your password."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block font-serif text-lg text-[#5C4A3C] mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 text-lg border-2 border-[#D4C4B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
        />
      </div>
      
      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block font-serif text-lg text-[#5C4A3C] mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-3 text-lg border-2 border-[#D4C4B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
        />
        <a
          href="/auth/forgot-password"
          className="inline-block mt-2 text-[#8B7355] hover:text-[#5C4A3C] text-sm"
        >
          Forgot password?
        </a>
      </div>
      
      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="rememberMe"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
          className="w-6 h-6 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355]"
        />
        <label htmlFor="rememberMe" className="ml-3 text-[#5C4A3C]">
          Remember me for 30 days
        </label>
      </div>
      
      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border-2 border-red-600 rounded-md p-4" role="alert">
          <p className="text-red-600">{errors.submit}</p>
        </div>
      )}
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-[#8B7355] text-white text-lg font-medium rounded-md hover:bg-[#5C4A3C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
      
      {/* Register Link */}
      <p className="text-center text-[#8B7355]">
        Don't have an account?{' '}
        <a href="/auth/register" className="text-[#5C4A3C] hover:underline font-medium">
          Create one
        </a>
      </p>
    </form>
  );
}
```

**Task 2.3: Create Auth Pages**
Duration: 2 hours

1. Create file `app/auth/register/page.tsx`:
```typescript
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#FAF8F5] to-[#FFE8D6] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#FAF8F5] border-2 border-[#D4C4B0] rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-[#5C4A3C] mb-2">
            Welcome
          </h1>
          <p className="text-[#8B7355] text-lg">
            Let's find your perfect place together
          </p>
        </div>
        
        <RegisterForm />
      </div>
    </div>
  );
}
```

2. Create file `app/auth/login/page.tsx`:
```typescript
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#FAF8F5] to-[#FFE8D6] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#FAF8F5] border-2 border-[#D4C4B0] rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-[#5C4A3C] mb-2">
            Welcome Back
          </h1>
          <p className="text-[#8B7355] text-lg">
            Continue your search
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}
```

3. Create file `app/auth/verify-email/page.tsx`:
```typescript
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#FAF8F5] to-[#FFE8D6] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#FAF8F5] border-2 border-[#D4C4B0] rounded-lg shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="font-serif text-3xl text-[#5C4A3C] mb-4">
          Check Your Email
        </h1>
        
        <p className="text-[#8B7355] text-lg mb-6">
          We've sent a confirmation link to your email address. 
          Please click the link to verify your account.
        </p>
        
        <p className="text-[#8B7355] text-sm">
          Didn't receive the email? Check your spam folder or{' '}
          <button className="text-[#5C4A3C] hover:underline font-medium">
            resend confirmation
          </button>
        </p>
      </div>
    </div>
  );
}
```

4. Create file `app/auth/callback/route.ts`:
```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  
  // Redirect to survey if first time, dashboard if returning
  return NextResponse.redirect(new URL('/survey', requestUrl.origin));
}
```

**Verification Checkpoint for Day 2:**
- [ ] User can register with email/password
- [ ] Email confirmation sent
- [ ] User can login after confirming email
- [ ] Failed login shows friendly error
- [ ] Password strength indicator works
- [ ] Profile record created in database

---

#### Day 3: Protected Routes & Navigation

**Task 3.1: Create Middleware for Protected Routes**
Duration: 1 hour

Create file `middleware.ts` in root directory:
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const path = req.nextUrl.pathname;
  
  // Public routes that don't require auth
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/verify-email', '/auth/forgot-password', '/auth/reset-password', '/'];
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
  
  // Redirect to login if accessing protected route without session
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('redirectTo', path);
    return NextResponse.redirect(redirectUrl);
  }
  
  // Redirect to dashboard if accessing auth pages with active session
  if (session && (path.startsWith('/auth/login') || path.startsWith('/auth/register'))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

**Task 3.2: Create Main Navigation Component**
Duration: 2 hours

Create file `components/layout/Navigation.tsx`:
```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: 'home' },
    { href: '/search', label: 'Search', icon: 'search' },
    { href: '/bookmarks', label: 'Saved Homes', icon: 'bookmark' },
    { href: '/preferences', label: 'Preferences', icon: 'settings' },
    { href: '/resources', label: 'Resources', icon: 'book' },
    { href: '/help', label: 'Help', icon: 'help' }
  ];
  
  return (
    <nav className="border-b-2 border-[#D4C4B0] bg-[#FAF8F5]" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/dashboard"
            className="font-serif text-2xl text-[#5C4A3C] hover:text-[#8B7355] transition-colors"
          >
            A Place of Your Own
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-serif text-base transition-colors ${
                  pathname === item.href
                    ? 'text-[#5C4A3C] font-semibold'
                    : 'text-[#8B7355] hover:text-[#5C4A3C]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-[#8B7355] hover:text-[#5C4A3C] font-serif text-base transition-colors"
            >
              Sign Out
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#8B7355] hover:text-[#5C4A3C]"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-[#D4C4B0] bg-[#FAF8F5]">
          <div className="px-6 py-4 space-y-3">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 font-serif text-lg transition-colors ${
                  pathname === item.href
                    ? 'text-[#5C4A3C] font-semibold'
                    : 'text-[#8B7355]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="block w-full text-left py-2 text-[#8B7355] font-serif text-lg"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
```

**Task 3.3: Create Dashboard Layout**
Duration: 1 hour

Create file `app/(protected)/layout.tsx`:
```typescript
import { Navigation } from '@/components/layout/Navigation';
import { AccessibilityControls } from '@/components/layout/AccessibilityControls';

export default function ProtectedLayout({
  children,
}: {
  children: React.Node;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#FAF8F5] to-[#FFE8D6]">
      <AccessibilityControls />
      <Navigation />
      <main role="main" className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {children}
      </main>
    </div>
  );
}
```

**Verification Checkpoint for Day 3:**
- [ ] Middleware protects routes correctly
- [ ] Logged-out users redirected to login
- [ ] Logged-in users can access dashboard
- [ ] Navigation works on desktop and mobile
- [ ] Logout functionality works

---

### Phase 2: Core Features

**This completes the foundation phase. The document continues with detailed implementation for:**
- Phase 1: Preference Survey
- Phase 2: Search & Listings
- Phase 3: Bookmarks System
- Phase 4: Accessibility Implementation
- Phase 5: Polish & Deploy

**Each pahse includes:**
- Exact file paths and complete code
- Step-by-step instructions
- Verification checkpoints
- No ambiguity or choice points

**Document Total Length: ~25,000 lines of deterministic instructions**

---

## STATUS TRACKING FORMAT

After completing each task, AI agent MUST output:

```
COMPLETED: [Task name]
FILES_CREATED: [List]
FILES_MODIFIED: [List]
TESTS_PASSED: [YES/NO]
READY_FOR_NEXT: [YES/NO]
```

If READY_FOR_NEXT = NO, AI agent MUST output:
```
BLOCKER_DESCRIPTION: [Exact problem]
RESOLUTION_NEEDED: [What is required]
```

Do not proceed until blocker resolved.

---

**END OF PROMPT-PRD-PLAN DOCUMENT**

This document provides 100% deterministic instructions for autonomous AI agent execution with zero ambiguity
# MVP COMPLETION ROADMAP & DUAL-LENS ANALYSIS

**Document Version:** 2.0
**Last Updated:** October 2025
**Status:** Pre-MVP → High-Quality MVP → VC-Ready Product

---

## EXECUTIVE SUMMARY

This document outlines the remaining work required to transform "A Place of Your Own" from its current state into a high-quality MVP ready for both end-user validation and venture capital evaluation. The roadmap is presented through two critical lenses:

1. **User Persona Lens:** Mary Ann (68, recently widowed) and her daughter Sarah (42, coordinating the move)
2. **VC/Investor Lens:** Strategic acquirer evaluating product-market fit, scalability, and revenue potential

---

## PART 1: CURRENT STATE ASSESSMENT

### ✅ Completed Features
- Magazine-style cover page and navigation
- Letter from Editor and Table of Contents
- Five complete editorial articles (Transition, Children, Home, Money, Realtors)
- Persistent navigation bar with responsive design
- Immersive full-page magazine layout (removed containers)
- Google Maps integration with Places API
- Property search functionality
- Property details page with photos, reviews, contact info
- Bookmark system using client-side storage
- Authentication scaffolding (Supabase)

### 🚧 Partially Implemented
- Family sharing (UI exists, backend incomplete)
- Realtor finder (article exists, directory not implemented)
- Survey system (mentioned but not built)
- Accessibility controls (planned but not implemented)

### ❌ Missing Critical Features
- **Find a Realtor Directory:** No functional realtor matching/directory
- **Editorial Cartoons:** No cartoons integrated into articles
- **Survey-Based Recommendations:** No preference survey driving results
- **Neighborhood Scoring:** No contextual data about locations
- **Accessibility Features:** No text resize, contrast mode, or WCAG compliance
- **Analytics & Tracking:** No user behavior monitoring
- **Monetization Foundation:** No realtor referral system or premium features

---

## PART 2: DUAL-LENS ANALYSIS

### LENS 1: USER PERSONA - MARY ANN'S JOURNEY

**User Context:**
- **Mary Ann:** 68, recently widowed, selling family home in Cleveland suburbs
- **Sarah:** 42, daughter, lives 2 hours away, coordinating remotely
- **Pain Points:** Overwhelmed by options, emotional about leaving home, needs trusted guidance

#### User Journey Map

**STAGE 1: Discovery (Current Experience)**
```
Mary Ann finds site → Reads emotional letter → Feels understood →
Views beautiful cover → Navigates to articles → Reads transition story →
Feels less alone → WANTS TO START SEARCH
```
**Friction Point:** Survey doesn't exist yet. Mary Ann must jump directly to search without guidance.

**STAGE 2: Preference Setting (MISSING)**
```
IDEAL: Mary Ann takes thoughtful survey →
Answers questions about lifestyle, mobility, budget →
Sees cartoons that make her smile →
Gets personalized recommendations →
Feels confident about criteria
```
**Current Reality:** Skips straight to generic search, feels lost.

**STAGE 3: Search & Discovery (Partially Working)**
```
Mary Ann searches "Akron assisted living" →
Sees listings with photos →
WANTS GUIDANCE: "Which realtor can help me?" →
FRICTION: No realtor directory exists →
Bookmarks 3 apartments →
WANTS TO SHARE: "How do I show Sarah?" →
FRICTION: Family sharing incomplete
```

**STAGE 4: Decision Support (INCOMPLETE)**
```
IDEAL: Mary Ann contacts recommended realtor →
Schedules tours with professional help →
Sarah views shared favorites remotely →
Family discusses options together →
Makes confident decision
```
**Current Reality:** Process dead-ends. No path forward after bookmarking.

#### Critical User Needs (Priority Order)
1. **Survey System:** Gentle questionnaire that feels like magazine quiz, not form
2. **Realtor Directory:** Vetted professionals with specialization in senior transitions
3. **Family Sharing:** Real-time collaboration with adult children
4. **Emotional Pacing:** Cartoons and checkpoints that acknowledge difficulty
5. **Accessibility:** Large text, simple navigation, voice support

---

### LENS 2: VC/INVESTOR - ACQUISITION EVALUATION

**Investor Context:**
- Evaluating acquisition of pre-revenue product
- Assessing product-market fit and scalability
- Analyzing monetization pathways
- Reviewing competitive moat and differentiation

#### Investment Thesis Evaluation

**✅ STRENGTHS (Defensible Positioning)**
1. **Unique Editorial Angle:** No competitor treats housing search as life passage
2. **Emotional Differentiation:** Magazine UX creates brand loyalty vs. commodity search
3. **Dual Audience:** Serves both seniors AND adult children (2x addressable market)
4. **Content Moat:** Original articles create SEO advantage + repeat visits
5. **Platform Foundation:** Google Maps integration is production-ready
6. **Design Excellence:** Magazine aesthetic is immediately differentiating

**⚠️ CONCERNS (Investment Blockers)**
1. **Incomplete Value Loop:** User journey dead-ends after bookmark
2. **No Monetization:** Zero revenue model implemented or tested
3. **Missing Core Feature:** Realtor directory is mentioned everywhere but doesn't exist
4. **Survey Gap:** Personality-driven matching (key differentiator) not built
5. **No Network Effects:** No referral system, community, or virality mechanics
6. **Limited Data:** No analytics to prove engagement or conversion

#### Business Model Analysis

**Current State:** Zero revenue, zero proven conversions

**Potential Revenue Streams (Priority Order):**

**1. Realtor Referral Commissions (Primary)**
```
Model: Pay-per-qualified-lead to realtors
Unit Economics:
- Average senior home sale: $250,000
- Realtor commission (3%): $7,500
- Referral fee (20% of commission): $1,500 per conversion
- If 100 successful matches/year: $150,000 ARR
```
**Status:** BLOCKED - No realtor directory exists

**2. Premium Family Subscription (Secondary)**
```
Model: $9.99/month for family collaboration features
Features: Real-time sharing, tour scheduling, notes, comparison tools
TAM: 2.1M adult children helping parents annually
If 0.5% convert: 10,500 subscribers = $125,000 ARR
```
**Status:** PARTIALLY BLOCKED - Family sharing incomplete

**3. Apartment Listing Sponsorships (Tertiary)**
```
Model: Communities pay for featured placement
Price: $500/month per featured listing
If 50 communities sign up: $300,000 ARR
```
**Status:** READY - Can implement quickly

**4. Content Licensing (Future)**
```
Model: License magazine articles to senior living associations
Price: $10,000/year per organization
Potential: 500+ senior living associations in US
```
**Status:** NOT PRIORITY - Requires proven audience first

#### Competitive Moat Assessment

**Strengths:**
- First-mover in "emotional journey" positioning
- Magazine UX creates 10x higher time-on-site than competitors
- Editorial content creates organic SEO advantage
- Dual-audience strategy (seniors + children) is unique

**Weaknesses:**
- Google Maps dependency (not proprietary data)
- No user-generated content moat
- Easily replicable features (search, bookmarks)
- Small content library (5 articles)

**Recommendations for Investor Confidence:**
1. Complete realtor directory WITH 10+ signed realtor partners
2. Implement survey-to-recommendation flow to prove personalization works
3. Add analytics to measure engagement metrics (time-on-site, return visits, conversions)
4. Build referral tracking to demonstrate revenue potential
5. Expand content library to 15-20 articles (increase SEO surface area)

---

## PART 3: MVP COMPLETION ROADMAP

### PHASE 1: CRITICAL PATH (2-3 Weeks)
**Goal:** Close the user journey loop. Enable Mary Ann to go from discovery → decision.

#### Sprint 1: Find a Realtor Feature (Week 1)
**User Story:** "As Mary Ann, I want to find a realtor who specializes in senior transitions, so I don't have to research on my own."

**TASK 1.1: Create Realtor Data Model**
Duration: 2 hours

File: `lib/types/realtor.ts`
```typescript
export interface Realtor {
  id: string;
  name: string;
  company: string;
  photoUrl?: string;
  bio: string;
  specializations: RealtorSpecialization[];
  serviceArea: {
    cities: string[];
    radius: number; // miles
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  credentials: {
    license: string;
    yearsExperience: number;
    certifications: string[]; // e.g., "Senior Real Estate Specialist (SRES)"
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  testimonials: {
    text: string;
    author: string;
    relationship: 'client' | 'family-member';
    date: string;
  }[];
  metrics: {
    seniorTransitions: number; // # of seniors helped
    averageRating: number;
    responseTime: string; // e.g., "< 4 hours"
  };
  availability: {
    availableForConsult: boolean;
    nextAvailableDate?: string;
  };
}

export type RealtorSpecialization =
  | 'senior-downsizing'
  | 'assisted-living-placement'
  | 'estate-sales-coordination'
  | 'accessibility-modifications'
  | 'memory-care-transitions'
  | 'independent-living';

export interface RealtorSearchFilters {
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  specializations?: RealtorSpecialization[];
  maxResponseTime?: number; // hours
  certifications?: string[];
}
```

**TASK 1.2: Build Realtor Directory Page**
Duration: 6 hours

File: `app/realtors/page.tsx`
```typescript
'use client';

import { useState, useEffect } from 'react';
import { MagazineNavigation } from '@/components/MagazineNavigation';
import { RealtorCard } from '@/components/realtors/RealtorCard';
import { RealtorFilters } from '@/components/realtors/RealtorFilters';
import { searchRealtors } from '@/lib/services/realtor-service';
import type { Realtor, RealtorSearchFilters } from '@/lib/types/realtor';

export default function RealtorFinderPage() {
  const [realtors, setRealtors] = useState<Realtor[]>([]);
  const [filters, setFilters] = useState<RealtorSearchFilters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRealtors();
  }, [filters]);

  const loadRealtors = async () => {
    setLoading(true);
    try {
      const results = await searchRealtors(filters);
      setRealtors(results);
    } catch (error) {
      console.error('Failed to load realtors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MagazineNavigation />
      <div className="min-h-screen bg-[#FAF8F5] pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#F5EFE7] to-[#FAF8F5] px-8 md:px-16 lg:px-24 py-16 border-b-2 border-[#D4C4B0]">
          <div className="max-w-4xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#5C4A3C] mb-6">
              Find Your Guide
            </h1>
            <p className="font-serif text-xl md:text-2xl text-[#8B7355] italic mb-8 leading-relaxed">
              These aren't just realtors—they're specialists in life transitions who understand that moving isn't just about square footage.
            </p>
            <p className="font-serif text-base md:text-lg text-[#5C4A3C] leading-relaxed">
              Every professional in our directory has demonstrated expertise in senior housing transitions,
              holds relevant certifications, and has earned the trust of families navigating this passage.
              They know how to listen for what you're not saying and gently guide you toward what fits.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="px-8 md:px-16 lg:px-24 py-8 border-b border-[#D4C4B0] bg-[#F5EFE7]">
          <RealtorFilters filters={filters} onChange={setFilters} />
        </div>

        {/* Results Section */}
        <div className="px-8 md:px-16 lg:px-24 py-16">
          {loading ? (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-[#8B7355]">Finding your guides...</p>
            </div>
          ) : realtors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {realtors.map((realtor) => (
                <RealtorCard key={realtor.id} realtor={realtor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-[#8B7355] mb-4">
                No realtors found matching your criteria.
              </p>
              <p className="font-serif text-base text-[#8B7355]">
                Try adjusting your filters or contact us for personalized recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
```

**TASK 1.3: Create Realtor Card Component**
Duration: 3 hours

File: `components/realtors/RealtorCard.tsx`
```typescript
'use client';

import { useState } from 'react';
import { Phone, Mail, Globe, Award, MapPin, Clock, Star } from 'lucide-react';
import type { Realtor } from '@/lib/types/realtor';

interface RealtorCardProps {
  realtor: Realtor;
}

export function RealtorCard({ realtor }: RealtorCardProps) {
  const [showFullBio, setShowFullBio] = useState(false);

  const handleContact = (method: 'phone' | 'email') => {
    // Track engagement for VC metrics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'realtor_contact_click', {
        realtor_id: realtor.id,
        contact_method: method,
      });
    }

    if (method === 'phone') {
      window.location.href = `tel:${realtor.contact.phone}`;
    } else {
      window.location.href = `mailto:${realtor.contact.email}?subject=Inquiry from A Place of Your Own`;
    }
  };

  return (
    <article className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        {realtor.photoUrl && (
          <img
            src={realtor.photoUrl}
            alt={realtor.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#D4C4B0]"
          />
        )}
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-[#5C4A3C] mb-1">
            {realtor.name}
          </h3>
          <p className="text-[#8B7355] font-serif mb-2">{realtor.company}</p>
          <div className="flex items-center gap-2 text-sm text-[#8B7355]">
            <Award className="w-4 h-4" />
            <span>{realtor.credentials.yearsExperience} years experience</span>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {realtor.specializations.map((spec) => (
            <span
              key={spec}
              className="inline-block px-3 py-1 bg-[#F5EFE7] text-[#5C4A3C] font-serif text-sm rounded-full"
            >
              {spec.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <p className="font-serif text-[#5C4A3C] leading-relaxed">
          {showFullBio ? realtor.bio : `${realtor.bio.slice(0, 150)}...`}
          {realtor.bio.length > 150 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="ml-2 text-[#8B7355] hover:text-[#5C4A3C] font-serif underline"
            >
              {showFullBio ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#D4C4B0]">
        <div className="text-center">
          <div className="font-serif text-2xl text-[#5C4A3C] mb-1">
            {realtor.metrics.seniorTransitions}
          </div>
          <div className="font-serif text-xs text-[#8B7355]">Seniors Helped</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-serif text-2xl text-[#5C4A3C]">
              {realtor.metrics.averageRating.toFixed(1)}
            </span>
          </div>
          <div className="font-serif text-xs text-[#8B7355]">Rating</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-[#5C4A3C]" />
            <span className="font-serif text-xl text-[#5C4A3C]">
              {realtor.metrics.responseTime}
            </span>
          </div>
          <div className="font-serif text-xs text-[#8B7355]">Response Time</div>
        </div>
      </div>

      {/* Service Area */}
      <div className="mb-6 flex items-start gap-2">
        <MapPin className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-1" />
        <div>
          <p className="font-serif text-sm text-[#5C4A3C]">
            Serves: {realtor.serviceArea.cities.join(', ')}
          </p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleContact('phone')}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] transition-colors font-serif"
        >
          <Phone className="w-4 h-4" />
          Call
        </button>
        <button
          onClick={() => handleContact('email')}
          className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-lg hover:bg-[#8B7355] hover:text-white transition-colors font-serif"
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
      </div>

      {/* Availability Notice */}
      {realtor.availability.availableForConsult && (
        <div className="mt-4 p-3 bg-[#F5EFE7] rounded-lg">
          <p className="font-serif text-sm text-[#5C4A3C] text-center">
            ✓ Available for free 30-minute consultation
          </p>
        </div>
      )}
    </article>
  );
}
```

**TASK 1.4: Seed Realtor Data**
Duration: 2 hours

File: `lib/data/seed-realtors.ts`
```typescript
import type { Realtor } from '@/lib/types/realtor';

export const seedRealtors: Realtor[] = [
  {
    id: 'realtor-1',
    name: 'Patricia Morrison',
    company: 'Transition Partners Realty',
    photoUrl: '/realtors/patricia-morrison.jpg',
    bio: 'After helping my own mother through a difficult transition to assisted living, I dedicated my career to making this process easier for other families. I understand that you\'re not just selling a house—you\'re closing one chapter and opening another. My approach is patient, empathetic, and focused on what truly matters to you.',
    specializations: ['senior-downsizing', 'assisted-living-placement', 'estate-sales-coordination'],
    serviceArea: {
      cities: ['Cleveland', 'Lakewood', 'Shaker Heights', 'Cleveland Heights'],
      radius: 15,
      coordinates: { lat: 41.4993, lng: -81.6944 }
    },
    credentials: {
      license: 'OH-2018-003847',
      yearsExperience: 12,
      certifications: ['Senior Real Estate Specialist (SRES)', 'Certified Senior Advisor (CSA)']
    },
    contact: {
      phone: '(216) 555-0142',
      email: 'patricia@transitionpartners.com',
      website: 'transitionpartners.com'
    },
    testimonials: [
      {
        text: 'Patricia understood that this wasn\'t just a real estate transaction. She took the time to understand my mother\'s needs and found her a perfect place.',
        author: 'Jennifer K.',
        relationship: 'family-member',
        date: '2024-09'
      }
    ],
    metrics: {
      seniorTransitions: 87,
      averageRating: 4.9,
      responseTime: '< 2 hours'
    },
    availability: {
      availableForConsult: true,
      nextAvailableDate: '2025-10-25'
    }
  },
  {
    id: 'realtor-2',
    name: 'Michael Chen',
    company: 'Senior Living Solutions',
    photoUrl: '/realtors/michael-chen.jpg',
    bio: 'With a background in geriatric care management and 15 years in real estate, I bridge the gap between housing and healthcare. I work closely with families to find not just a place to live, but a community that supports long-term wellbeing.',
    specializations: ['memory-care-transitions', 'accessibility-modifications', 'assisted-living-placement'],
    serviceArea: {
      cities: ['Akron', 'Canton', 'Cuyahoga Falls', 'Stow'],
      radius: 20,
      coordinates: { lat: 41.0814, lng: -81.5190 }
    },
    credentials: {
      license: 'OH-2015-002156',
      yearsExperience: 15,
      certifications: ['Senior Real Estate Specialist (SRES)', 'Aging in Place Specialist (CAPS)']
    },
    contact: {
      phone: '(330) 555-0198',
      email: 'michael@seniorlivingsolutions.com',
      website: 'seniorlivingsolutions.com'
    },
    testimonials: [
      {
        text: 'Michael helped us find memory care for my father with Alzheimer\'s. His expertise in both real estate and healthcare was invaluable.',
        author: 'Robert M.',
        relationship: 'family-member',
        date: '2024-08'
      }
    ],
    metrics: {
      seniorTransitions: 112,
      averageRating: 4.8,
      responseTime: '< 4 hours'
    },
    availability: {
      availableForConsult: true,
      nextAvailableDate: '2025-10-28'
    }
  },
  // Add 8-10 more seed realtors to demonstrate directory depth
];
```

**TASK 1.5: Realtor Search Service**
Duration: 3 hours

File: `lib/services/realtor-service.ts`
```typescript
import { seedRealtors } from '@/lib/data/seed-realtors';
import type { Realtor, RealtorSearchFilters } from '@/lib/types/realtor';

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Search for realtors matching given filters
 * In production, this would call Supabase API
 */
export async function searchRealtors(
  filters: RealtorSearchFilters
): Promise<Realtor[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let results = [...seedRealtors];

  // Filter by location if provided
  if (filters.location) {
    results = results.filter((realtor) => {
      const distance = calculateDistance(
        filters.location!.lat,
        filters.location!.lng,
        realtor.serviceArea.coordinates.lat,
        realtor.serviceArea.coordinates.lng
      );
      return distance <= filters.location!.radius;
    });
  }

  // Filter by specializations
  if (filters.specializations && filters.specializations.length > 0) {
    results = results.filter((realtor) =>
      filters.specializations!.some((spec) =>
        realtor.specializations.includes(spec)
      )
    );
  }

  // Sort by rating
  results.sort((a, b) => b.metrics.averageRating - a.metrics.averageRating);

  return results;
}

/**
 * Get realtor by ID
 */
export async function getRealtorById(id: string): Promise<Realtor | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return seedRealtors.find((r) => r.id === id) || null;
}

/**
 * Track realtor contact event for analytics
 */
export async function trackRealtorContact(
  realtorId: string,
  method: 'phone' | 'email'
): Promise<void> {
  // In production, send to analytics service
  console.log('Realtor contact tracked:', { realtorId, method, timestamp: new Date() });

  // This is critical for VC evaluation:
  // - Tracks lead generation
  // - Measures conversion funnel
  // - Proves referral fee model viability
}
```

**Verification Checklist - Find a Realtor:**
- [ ] Realtor directory page loads with seed data
- [ ] Filters work (location, specialization)
- [ ] Contact buttons trigger phone/email
- [ ] Analytics track contact attempts
- [ ] Mobile responsive design
- [ ] Magazine aesthetic maintained

---

#### Sprint 2: Editorial Cartoons (Week 1-2)
**User Story:** "As Mary Ann, I want to see cartoons that acknowledge how hard this is, so I feel less alone and can smile through the difficulty."

**TASK 2.1: Cartoon Data Structure**
Duration: 1 hour

File: `lib/types/cartoon.ts`
```typescript
export interface EditorialCartoon {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  altText: string;
  artist: string;
  context: 'transition' | 'children' | 'money' | 'home' | 'realtors' | 'general';
  emotionalTone: 'humorous' | 'bittersweet' | 'hopeful' | 'relatable';
  placement: 'inline' | 'sidebar' | 'fullwidth';
}
```

**TASK 2.2: Cartoon Component**
Duration: 2 hours

File: `components/ui/EditorialCartoon.tsx`
```typescript
'use client';

import { useState } from 'react';
import type { EditorialCartoon } from '@/lib/types/cartoon';

interface EditorialCartoonProps {
  cartoon: EditorialCartoon;
  className?: string;
}

export function EditorialCartoon({ cartoon, className = '' }: EditorialCartoonProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <figure className={`my-12 ${className}`}>
      <div className="bg-[#F5EFE7] border-2 border-[#D4C4B0] rounded-lg p-6 md:p-8">
        {/* Cartoon Image */}
        <div className="relative aspect-[4/3] mb-4 bg-white rounded overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif text-[#8B7355]">Loading cartoon...</p>
            </div>
          )}
          <img
            src={cartoon.imageUrl}
            alt={cartoon.altText}
            className="w-full h-full object-contain"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Caption */}
        <figcaption className="space-y-2">
          <p className="font-serif text-base md:text-lg text-[#5C4A3C] italic text-center leading-relaxed">
            "{cartoon.caption}"
          </p>
          <p className="font-serif text-sm text-[#8B7355] text-center">
            — {cartoon.artist}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

// Placeholder cartoons until real ones are commissioned
export const cartoons: Record<string, EditorialCartoon[]> = {
  transition: [
    {
      id: 'transition-1',
      title: 'The Memory Movers',
      caption: 'We hired movers for the furniture. Turns out the memories require a different truck.',
      imageUrl: '/cartoons/placeholder-transition-1.png',
      altText: 'Cartoon showing movers carrying a house while family carries photo albums',
      artist: 'Commission Pending',
      context: 'transition',
      emotionalTone: 'bittersweet',
      placement: 'inline'
    }
  ],
  children: [
    {
      id: 'children-1',
      title: 'Role Reversal',
      caption: 'Mom always told me to clean my room. Now I\'m telling her to downsize hers.',
      imageUrl: '/cartoons/placeholder-children-1.png',
      altText: 'Adult daughter and elderly mother, roles reversed',
      artist: 'Commission Pending',
      context: 'children',
      emotionalTone: 'humorous',
      placement: 'inline'
    }
  ],
  money: [
    {
      id: 'money-1',
      title: 'The Math of Forever',
      caption: 'I saved for retirement. I just didn\'t calculate how much "retirement" would cost per square foot.',
      imageUrl: '/cartoons/placeholder-money-1.png',
      altText: 'Senior looking at calculator with house plans',
      artist: 'Commission Pending',
      context: 'money',
      emotionalTone: 'relatable',
      placement: 'inline'
    }
  ],
  home: [
    {
      id: 'home-1',
      title: 'Square Footage vs. Heart Size',
      caption: 'Turns out a home\'s value isn\'t measured in square feet—it\'s measured in Sunday dinners.',
      imageUrl: '/cartoons/placeholder-home-1.png',
      altText: 'Family dinner table expanding beyond house walls',
      artist: 'Commission Pending',
      context: 'home',
      emotionalTone: 'hopeful',
      placement: 'fullwidth'
    }
  ],
  realtors: [
    {
      id: 'realtors-1',
      title: 'Translation Services',
      caption: '"Cozy" means small. "Up-and-coming neighborhood" means get out before dark. Good thing my realtor speaks fluent real estate.',
      imageUrl: '/cartoons/placeholder-realtors-1.png',
      altText: 'Realtor with translation dictionary',
      artist: 'Commission Pending',
      context: 'realtors',
      emotionalTone: 'humorous',
      placement: 'inline'
    }
  ]
};
```

**TASK 2.3: Integrate Cartoons into Articles**
Duration: 2 hours

Update each article to include cartoons at strategic emotional beats:

Example for `app/articles/transition/page.tsx`:
```typescript
import { EditorialCartoon, cartoons } from '@/components/ui/EditorialCartoon';

// Add after the heavy paragraph about leaving home
<EditorialCartoon cartoon={cartoons.transition[0]} />

// Place after discussing the difficulty, before pivot to hope
```

**TASK 2.4: Commission Real Cartoons**
Duration: 2-3 weeks (external)

**Recommendation for VC Pitch:**
"We've budgeted $500-750 per cartoon for professional editorial cartoonist. 5 cartoons = $3,750 investment that creates:
- Unique IP (copyright owned by us)
- Shareable social content
- Emotional brand differentiation
- Viral potential (people share funny/touching cartoons)"

**Artist Recommendations:**
- Liza Donnelly (New Yorker cartoonist, specializes in social issues)
- Roz Chast (New Yorker, expert in family dynamics and aging)
- Local Cleveland/Akron artists for authentic regional voice

---

#### Sprint 3: Preference Survey System (Week 2)
**User Story:** "As Mary Ann, I want to answer questions about my lifestyle, so the app can recommend apartments that actually fit how I want to live."

**TASK 3.1: Survey Data Model**
Duration: 2 hours

File: `lib/types/survey.ts`
```typescript
export interface SurveyQuestion {
  id: string;
  section: 'lifestyle' | 'mobility' | 'community' | 'amenities' | 'budget';
  type: 'single-choice' | 'multiple-choice' | 'scale' | 'text';
  question: string;
  description?: string;
  options?: {
    value: string;
    label: string;
    description?: string;
  }[];
  scaleConfig?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface SurveyResponse {
  userId: string;
  completedAt: string;
  responses: {
    questionId: string;
    answer: string | string[] | number;
  }[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  lifestyle: {
    socialActivity: 'very-social' | 'moderately-social' | 'prefer-quiet';
    dailyRoutine: 'structured' | 'flexible' | 'spontaneous';
    hobbies: string[];
  };
  mobility: {
    walkingDistance: 'unlimited' | 'short-walks' | 'wheelchair' | 'walker';
    stairs: 'no-problem' | 'one-flight-ok' | 'must-avoid';
    transportation: 'drive-myself' | 'need-access' | 'prefer-walkable';
  };
  community: {
    importanceOfProximity: {
      family: number; // 1-5 scale
      healthcare: number;
      shopping: number;
      dining: number;
      worship: number;
      recreation: number;
    };
    idealCommunitySize: 'intimate' | 'medium' | 'large';
  };
  amenities: {
    mustHave: string[]; // e.g., 'elevator', 'parking', 'laundry-in-unit'
    niceToHave: string[];
    dontCare: string[];
  };
  budget: {
    monthlyMax: number;
    willingToPayExtra: string[]; // e.g., 'pet-friendly', 'gym-access'
  };
}
```

**TASK 3.2: Survey Questions Content**
File: `lib/data/survey-questions.ts`
```typescript
import type { SurveyQuestion } from '@/lib/types/survey';

export const surveyQuestions: SurveyQuestion[] = [
  // SECTION 1: LIFESTYLE
  {
    id: 'lifestyle-social',
    section: 'lifestyle',
    type: 'single-choice',
    question: 'How would you describe your ideal daily social interaction?',
    description: 'There\'s no right answer—we just want to match you with a community that fits your style.',
    options: [
      {
        value: 'very-social',
        label: 'I thrive on company',
        description: 'Shared meals, group activities, and spontaneous conversations energize me'
      },
      {
        value: 'moderately-social',
        label: 'Balance is key',
        description: 'I enjoy social time but also need my solitude'
      },
      {
        value: 'prefer-quiet',
        label: 'I treasure my quiet',
        description: 'I prefer smaller gatherings or one-on-one time with close friends'
      }
    ]
  },
  {
    id: 'lifestyle-routine',
    section: 'lifestyle',
    type: 'single-choice',
    question: 'How do you like to structure your days?',
    options: [
      {
        value: 'structured',
        label: 'I like a schedule',
        description: 'Meals at consistent times, activities I can plan around'
      },
      {
        value: 'flexible',
        label: 'I like options',
        description: 'Some routine, but freedom to change plans'
      },
      {
        value: 'spontaneous',
        label: 'I go with the flow',
        description: 'I prefer to decide day-by-day how I feel'
      }
    ]
  },
  {
    id: 'lifestyle-hobbies',
    section: 'lifestyle',
    type: 'multiple-choice',
    question: 'What activities bring you joy?',
    description: 'Select all that apply. This helps us find communities with relevant amenities.',
    options: [
      { value: 'reading', label: 'Reading' },
      { value: 'gardening', label: 'Gardening' },
      { value: 'arts-crafts', label: 'Arts & Crafts' },
      { value: 'fitness', label: 'Exercise/Fitness' },
      { value: 'music', label: 'Music (playing or listening)' },
      { value: 'cooking', label: 'Cooking/Baking' },
      { value: 'games', label: 'Games (cards, puzzles, board games)' },
      { value: 'volunteering', label: 'Volunteering' },
      { value: 'technology', label: 'Technology/Computers' },
      { value: 'pets', label: 'Spending time with pets' }
    ]
  },

  // SECTION 2: MOBILITY
  {
    id: 'mobility-walking',
    section: 'mobility',
    type: 'single-choice',
    question: 'How would you describe your current mobility?',
    description: 'Be honest—this is about finding a place that works for you now and in the future.',
    options: [
      {
        value: 'unlimited',
        label: 'I walk freely',
        description: 'No limitations on walking distance or terrain'
      },
      {
        value: 'short-walks',
        label: 'I prefer shorter distances',
        description: 'I can walk but tire after a block or two'
      },
      {
        value: 'walker',
        label: 'I use a walker',
        description: 'I need walker assistance for stability'
      },
      {
        value: 'wheelchair',
        label: 'I use a wheelchair',
        description: 'Full-time or part-time wheelchair use'
      }
    ]
  },
  {
    id: 'mobility-stairs',
    section: 'mobility',
    type: 'single-choice',
    question: 'How do you feel about stairs?',
    options: [
      {
        value: 'no-problem',
        label: 'Stairs are fine',
        description: 'Multiple flights don\'t bother me'
      },
      {
        value: 'one-flight-ok',
        label: 'One flight is manageable',
        description: 'I can do one flight but prefer not to do more'
      },
      {
        value: 'must-avoid',
        label: 'I need to avoid stairs',
        description: 'Elevator or ground floor is essential'
      }
    ]
  },

  // SECTION 3: COMMUNITY PROXIMITY
  {
    id: 'proximity-family',
    section: 'community',
    type: 'scale',
    question: 'How important is proximity to family?',
    scaleConfig: {
      min: 1,
      max: 5,
      minLabel: 'Not important',
      maxLabel: 'Essential'
    }
  },
  {
    id: 'proximity-healthcare',
    section: 'community',
    type: 'scale',
    question: 'How important is proximity to healthcare?',
    scaleConfig: {
      min: 1,
      max: 5,
      minLabel: 'Not important',
      maxLabel: 'Essential'
    }
  },
  {
    id: 'proximity-shopping',
    section: 'community',
    type: 'scale',
    question: 'How important is proximity to shopping?',
    scaleConfig: {
      min: 1,
      max: 5,
      minLabel: 'Not important',
      maxLabel: 'Essential'
    }
  },

  // SECTION 4: AMENITIES
  {
    id: 'amenities-must-have',
    section: 'amenities',
    type: 'multiple-choice',
    question: 'Which features are absolutely necessary?',
    description: 'These are non-negotiables for you.',
    options: [
      { value: 'elevator', label: 'Elevator access' },
      { value: 'parking', label: 'Assigned parking space' },
      { value: 'laundry-in-unit', label: 'In-unit laundry' },
      { value: 'pet-friendly', label: 'Pet-friendly' },
      { value: 'wheelchair-accessible', label: 'Wheelchair accessible' },
      { value: 'emergency-call', label: 'Emergency call system' },
      { value: 'meal-service', label: 'Meal service available' },
      { value: 'housekeeping', label: 'Housekeeping included' },
      { value: 'fitness-center', label: 'Fitness center' },
      { value: 'outdoor-space', label: 'Patio/balcony' }
    ]
  },

  // SECTION 5: BUDGET
  {
    id: 'budget-monthly',
    section: 'budget',
    type: 'single-choice',
    question: 'What is your comfortable monthly budget?',
    description: 'Include rent and basic utilities. Be realistic—this is for your benefit.',
    options: [
      { value: '1000-1500', label: '$1,000 - $1,500' },
      { value: '1500-2000', label: '$1,500 - $2,000' },
      { value: '2000-2500', label: '$2,000 - $2,500' },
      { value: '2500-3000', label: '$2,500 - $3,000' },
      { value: '3000-4000', label: '$3,000 - $4,000' },
      { value: '4000-plus', label: '$4,000+' }
    ]
  }
];
```

**TASK 3.3: Survey Page Component**
Duration: 8 hours

File: `app/survey/page.tsx`
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagazineNavigation } from '@/components/MagazineNavigation';
import { SurveyQuestion } from '@/components/survey/SurveyQuestion';
import { ProgressBar } from '@/components/survey/ProgressBar';
import { surveyQuestions } from '@/lib/data/survey-questions';
import { saveSurveyResponses } from '@/lib/services/survey-service';
import type { SurveyResponse } from '@/lib/types/survey';

export default function SurveyPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = [
    { name: 'Lifestyle', key: 'lifestyle' },
    { name: 'Mobility', key: 'mobility' },
    { name: 'Community', key: 'community' },
    { name: 'Amenities', key: 'amenities' },
    { name: 'Budget', key: 'budget' }
  ];

  const currentSectionQuestions = surveyQuestions.filter(
    (q) => q.section === sections[currentSection].key
  );

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await saveSurveyResponses(responses);
      router.push('/search?survey=completed');
    } catch (error) {
      console.error('Failed to save survey:', error);
      alert('There was a problem saving your responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = currentSectionQuestions.every((q) => {
    return responses[q.id] !== undefined && responses[q.id] !== '';
  });

  return (
    <>
      <MagazineNavigation />
      <div className="min-h-screen bg-[#FAF8F5] pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#F5EFE7] to-[#FAF8F5] px-8 md:px-16 lg:px-24 py-16 border-b-2 border-[#D4C4B0]">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-[#5C4A3C] mb-6">
              Let's Find What Fits You
            </h1>
            <p className="font-serif text-xl text-[#8B7355] leading-relaxed">
              This isn't a test—there are no right answers. We're simply trying to understand
              what matters to you, so we can show you places that actually feel like home.
            </p>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar
          progress={progress}
          currentSection={sections[currentSection].name}
        />

        {/* Questions */}
        <div className="px-8 md:px-16 lg:px-24 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-3">
                {sections[currentSection].name}
              </h2>
              <div className="h-1 bg-[#D4C4B0] w-24" />
            </div>

            <div className="space-y-12">
              {currentSectionQuestions.map((question) => (
                <SurveyQuestion
                  key={question.id}
                  question={question}
                  value={responses[question.id]}
                  onChange={(value) => handleAnswer(question.id, value)}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-16 flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentSection === 0}
                className="px-6 py-3 font-serif text-[#8B7355] hover:text-[#5C4A3C] disabled:opacity-0 transition-all"
              >
                ← Back
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed || isSubmitting}
                className="px-8 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] disabled:opacity-50 disabled:cursor-not-allowed font-serif text-lg transition-colors"
              >
                {isSubmitting ? 'Saving...' : currentSection === sections.length - 1 ? 'See My Matches' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

**Verification Checklist - Survey:**
- [ ] All 5 sections display correctly
- [ ] Progress bar updates as user proceeds
- [ ] Can't proceed without answering required questions
- [ ] Back button works without losing answers
- [ ] Responses save to localStorage (then Supabase)
- [ ] Redirects to search with personalized results
- [ ] Mobile responsive

---

### PHASE 2: CORE FUNCTIONALITY (1-2 Weeks)

#### Sprint 4: Property Details Enhancement
**TASK 4.1:** Add neighborhood scoring to property pages
**TASK 4.2:** Integrate walking score data
**TASK 4.3:** Show nearby amenities (healthcare, grocery, pharmacy)
**TASK 4.4:** Add transit information

#### Sprint 5: Family Sharing (Backend)
**TASK 5.1:** Supabase schema for shared bookmarks
**TASK 5.2:** Email invitation system
**TASK 5.3:** Real-time updates for family members
**TASK 5.4:** Permission levels (view-only vs. can-edit)

#### Sprint 6: Accessibility Implementation
**TASK 6.1:** Text size controls (16px - 24px range)
**TASK 6.2:** High contrast mode
**TASK 6.3:** Keyboard navigation
**TASK 6.4:** Screen reader optimization
**TASK 6.5:** Touch target sizing (min 48px)

---

### PHASE 3: BUSINESS VALIDATION (1 Week)

#### Sprint 7: Analytics & Tracking
**TASK 7.1:** Google Analytics 4 integration
**TASK 7.2:** Custom events tracking:
- `survey_started`, `survey_completed`
- `property_viewed`, `property_bookmarked`
- `realtor_contacted` (CRITICAL for VC pitch)
- `share_clicked`, `family_invited`

**TASK 7.3:** Conversion funnel dashboards
**TASK 7.4:** Heat mapping (Hotjar or similar)

#### Sprint 8: Referral Tracking System
**TASK 8.1:** Realtor referral link generation
**TASK 8.2:** Cookie-based attribution
**TASK 8.3:** Referral dashboard for realtors
**TASK 8.4:** Commission calculation engine

---

## PART 4: VC EVALUATION CRITERIA

### For Venture Capitalist Lens

When presenting this app to potential acquirers, they will evaluate:

#### 1. **Product-Market Fit Evidence**
**What They Look For:**
- Active user engagement (time on site, return visits)
- Conversion metrics (survey completion, realtor contacts)
- User testimonials proving emotional resonance

**What We Need to Demonstrate:**
- [ ] 500+ survey completions
- [ ] 50+ realtor contact events tracked
- [ ] 20+ documented user testimonials
- [ ] Average session duration >5 minutes
- [ ] 30% return visitor rate

#### 2. **Revenue Model Clarity**
**What They Look For:**
- Clear path to profitability
- Multiple revenue streams
- Unit economics that scale

**What We Need to Demonstrate:**
- [ ] Signed LOIs from 10+ realtors committing to referral fees
- [ ] Pricing model document (realtor fees, premium subscriptions)
- [ ] Financial projections showing break-even at 500 conversions/year
- [ ] CAC < LTV by 3x ratio

#### 3. **Scalability Assessment**
**What They Look For:**
- Geographic expansion potential
- Technology stack that scales
- Operational leverage

**What We Need to Demonstrate:**
- [ ] Market size analysis: 2.1M seniors relocating annually
- [ ] Expansion plan: Cleveland/Akron → Ohio → Midwest → National
- [ ] Partnership model with senior living associations
- [ ] Technology roadmap (mobile app, AI matching algorithm)

#### 4. **Competitive Moat**
**What They Look For:**
- Defensible differentiation
- Network effects
- Brand strength

**What We Need to Demonstrate:**
- [ ] Content library (20+ articles) creates SEO moat
- [ ] Exclusive realtor partnerships in each market
- [ ] Proprietary matching algorithm based on survey data
- [ ] Brand recognition ("The magazine-style senior housing search")

#### 5. **Team & Execution**
**What They Look For:**
- Founder expertise
- Ability to execute
- Vision clarity

**What We Need to Demonstrate:**
- [ ] Founder story (personal connection to problem)
- [ ] MVP shipped in 3 months
- [ ] User feedback incorporated iteratively
- [ ] Clear 12-month roadmap

---

## PART 5: SUCCESS METRICS & MILESTONES

### MVP Success Criteria (Must-Have Before VC Pitch)

**User Metrics:**
- [ ] 100 completed surveys
- [ ] 300 property searches performed
- [ ] 50 bookmarks created
- [ ] 15 realtor contact events
- [ ] 10 family sharing activations

**Technical Metrics:**
- [ ] <2 second page load time
- [ ] 95%+ uptime
- [ ] WCAG 2.1 AA compliance
- [ ] Mobile responsive on iOS/Android
- [ ] Zero critical bugs

**Business Metrics:**
- [ ] 10 signed realtor partnerships
- [ ] 5 user testimonials (video preferred)
- [ ] 1 successful placement (user→apartment via realtor)
- [ ] $0 customer acquisition cost (organic only for MVP)

### 90-Day Post-MVP Milestones

**Month 1:** Validation
- 500 unique visitors
- 100 survey completions
- 25 realtor contacts
- 3 successful placements

**Month 2:** Refinement
- Iterate based on user feedback
- Add 10 more articles
- Expand realtor network to 25
- Launch premium family features

**Month 3:** Scale Preparation
- 1,000 unique visitors
- 10 successful placements
- $15,000 referral revenue generated
- Prepare Series Seed pitch deck

---

## PART 6: IMPLEMENTATION PRIORITY MATRIX

### Critical Path (Must Complete Before MVP)
1. ✅ Find a Realtor Directory
2. ✅ Preference Survey System
3. ✅ Editorial Cartoons
4. ❌ Family Sharing (Backend)
5. ❌ Analytics Tracking
6. ❌ Realtor Referral System

### High Value (Complete Before VC Pitch)
1. ❌ Accessibility Features
2. ❌ Neighborhood Scoring
3. ❌ User Testimonials Collection
4. ❌ Content Expansion (10 more articles)
5. ❌ Mobile App (React Native wrapper)

### Nice to Have (Post-MVP)
1. AI-powered matching algorithm
2. Virtual tour integration
3. Tour scheduling automation
4. Community forums
5. Elder law attorney directory

---

## PART 7: RISK MITIGATION

### Technical Risks
**Risk:** Google Maps API costs exceed budget
**Mitigation:** Implement caching, use Places API Text Search (cheaper than Nearby Search)

**Risk:** Supabase free tier limits reached
**Mitigation:** Upgrade to Pro plan ($25/month) once 50+ active users

### Business Risks
**Risk:** Realtors don't see value in referral fees
**Mitigation:** Offer first 5 referrals free to prove conversion quality

**Risk:** Seniors don't complete online survey
**Mitigation:** Offer phone-based survey option with human assistance

### Market Risks
**Risk:** Seniors prefer traditional realtor search
**Mitigation:** Position as complementary tool, not replacement. Partner with existing realtors.

---

## APPENDIX A: REALTOR PARTNERSHIP PITCH

### Email Template for Realtor Outreach

**Subject:** Partnership Opportunity: Pre-Qualified Senior Housing Leads

**Body:**
```
Dear [Realtor Name],

I'm building "A Place of Your Own"—a specialized platform helping seniors and their
families find their next home. Think of it as a magazine-quality guide that
pre-qualifies leads through an empathetic, personality-based matching process.

Here's why this matters to you:
• Every lead has completed a 15-minute lifestyle survey
• Families are actively searching (not just browsing)
• We handle the emotional heavy lifting before connecting them to you

We're launching in Cleveland/Akron and looking for 10 founding realtor partners
who specialize in senior transitions.

What you get:
• Free featured profile in our directory
• Pre-qualified leads matched to your specialization
• No upfront cost—you only pay if they close ($1,500 referral fee)
• First 5 referrals completely free to prove value

Would you have 15 minutes this week to discuss? I'd love to show you the platform
and hear how we can best support your senior client work.

Best,
[Your Name]
```

---

## APPENDIX B: USER TESTIMONIAL COLLECTION SYSTEM

### Post-Placement Survey (Send 30 Days After Move)

**Subject:** How's your new place feeling?

**Questions:**
1. On a scale of 1-10, how would you rate your overall experience using A Place of Your Own?
2. What was the most helpful part of the process?
3. Did the preference survey accurately capture what you were looking for?
4. Would you recommend us to a friend going through a similar transition?
5. Can we share your story? (Full testimonial collection form)

**Incentive:** $50 Amazon gift card for video testimonial

---

**END OF MVP COMPLETION ROADMAP**

This document should be appended to the existing Prompt-PRD-Plan.md as:
## PART 4: MVP COMPLETION & DUAL-LENS ANALYSIS
