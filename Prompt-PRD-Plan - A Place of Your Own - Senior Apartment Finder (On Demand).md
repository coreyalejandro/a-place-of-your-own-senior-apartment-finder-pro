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
  * "I'm searching for myself"
  * "I'm helping a parent or loved one"
- CTA Button: "Continue" (disabled until selection)
- Progress: 1/7

**Screen 2: Location Preferences**
- Title: "Where Would You Like to Live?"
- Fields:
  * City (text input, required, autocomplete enabled)
  * State (dropdown, required, US states only)
  * Search Radius (slider, 5-50 miles, default 10, step 5)
  * Preferred Neighborhoods (text input with chips, optional, "Add a neighborhood" placeholder)
- Validation: City and State MUST be filled
- CTA Button: "Next"
- Progress: 2/7

**Screen 3: Budget**
- Title: "What's Your Monthly Budget?"
- Subtitle: "This helps us show you the right options"
- Fields:
  * Budget Range (dual-handle slider, $500-$5,000, step $50)
  * Display format: "$1,200 - $2,000 per month"
  * Quick presets below slider:
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
  * Bedrooms (radio buttons, required):
    - "Studio"
    - "1 Bedroom"
    - "2 Bedrooms"
    - "3+ Bedrooms"
  * Bathrooms (radio buttons, required):
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
  * "Independent Apartment" 
    - Helper text: "A regular apartment where you handle your own daily needs"
  * "Active Adult Community (55+)"
    - Helper text: "Age-restricted community with maintenance-free living"
  * "Assisted Living"
    - Helper text: "Support with daily activities like bathing, meals, medication"
  * "Memory Care"
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
  * Primary text: #5C4A3C on #FAF8F5 background (ratio: 8.2:1 ✓)
  * Secondary text: #8B7355 on #FAF8F5 background (ratio: 4.8:1 ✓)
  * Accent: #D4C4B0 borders (ratio: 1.8:1 - decorative only)

**3.6.3 Keyboard Navigation**
MUST support full keyboard navigation:
- Tab order MUST follow logical reading order
- All interactive elements MUST be keyboard accessible
- Focus indicators MUST be visible (2px solid #8B7355 outline)
- Skip links MUST be provided:
  * "Skip to main content" (appears on first Tab press)
  * "Skip to search results" (on search page)
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