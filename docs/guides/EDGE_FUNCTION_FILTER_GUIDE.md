# Supabase Edge Function - Filter Parameters Guide

## Overview

The client-side search now passes comprehensive filter parameters to the `maps-proxy-auth-assistant` Edge Function. This guide explains how to use these parameters to enhance Google Maps searches.

## Filter Parameters

The Edge Function `/search` endpoint now receives the following query parameters:

### Core Search Parameters
- `q` (string): The main search query text
- `use_profile` (boolean): Whether to use user profile preferences

### Location Filters
- `cities` (comma-separated string): Preferred cities (e.g., "Akron,Cleveland,Canton")
  - **Implementation**: Add location bias to Google Places API, search in each city
  - **Example**: If `cities=Cleveland,Akron`, construct searches like "senior apartments in Cleveland" and "senior apartments in Akron"

### Budget Filters
- `budget_min` (number): Minimum monthly budget (e.g., 500)
- `budget_max` (number): Maximum monthly budget (e.g., 3000)
  - **Implementation**: While Google Places doesn't have rent prices, you can:
    - Use `price_level` (1-4) as a proxy
    - Budget < $1000 → price_level: 1
    - Budget $1000-1500 → price_level: 2
    - Budget $1500-2500 → price_level: 3
    - Budget > $2500 → price_level: 4
    - Add to response metadata for client-side filtering

### Property Filters
- `bedrooms` (number): Minimum bedrooms (e.g., 1, 2, 3)
  - **Implementation**: Add to search query keywords
  - **Example**: "1 bedroom senior apartments"

- `property_types` (comma-separated string): Types like "Studio,1 Bedroom,2 Bedrooms"
  - **Implementation**: Include in search keywords
  - **Example**: "studio apartments for seniors"

### Amenities Filters
- `amenities` (comma-separated string): Required amenities like "Washer/Dryer,Balcony,Parking,Pet-Friendly,Quiet"
  - **Implementation**: Add to search query as keywords
  - **Example**: "pet-friendly apartments with balcony and parking"

- `pets` (boolean): Pet-friendly required
  - **Implementation**: Add "pet-friendly" to search query

- `elevator` (boolean): Elevator required
  - **Implementation**: Add "with elevator" to search query

- `floor_level` (string): "ground", "higher", or "any"
  - **Implementation**:
    - ground → Add "ground floor" to search
    - higher → Add "upper floors" to search

### Accessibility Filters
- `accessibility` (comma-separated string): Features like "grab-bars,wide-doorways,walk-in-shower,no-stairs"
  - **Implementation**: Add "wheelchair accessible" or specific features to query

### Proximity Filters
- `proximities` (comma-separated string): Important proximities like "Transit,Shopping,Medical,Parks,Restaurants"
  - **Implementation**: Add to search query
  - **Example**: "near public transit and shopping"

## Implementation Strategy

### 1. Query Construction

```typescript
function buildSearchQuery(baseQuery: string, filters: FilterParams): string {
  let query = baseQuery;

  // Add bedrooms
  if (filters.bedrooms) {
    query += ` ${filters.bedrooms} bedroom`;
  }

  // Add property types
  if (filters.property_types) {
    const types = filters.property_types.split(',');
    query += ` ${types.join(' or ')}`;
  }

  // Add amenities
  if (filters.amenities) {
    const amenities = filters.amenities.split(',');
    query += ` with ${amenities.join(' and ')}`;
  }

  // Add elevator
  if (filters.elevator) {
    query += ' with elevator';
  }

  // Add pets
  if (filters.pets) {
    query += ' pet-friendly';
  }

  // Add proximities
  if (filters.proximities) {
    const prox = filters.proximities.split(',');
    query += ` near ${prox.join(' and ')}`;
  }

  return query;
}
```

### 2. Location Bias

```typescript
function getLocationBias(cities: string[]): LocationBias[] {
  return cities.map(city => ({
    locationBias: {
      circle: {
        center: getCityCoordinates(city), // Look up city coordinates
        radius: 16000 // 10 miles in meters
      }
    }
  }));
}
```

### 3. Multiple City Searches

When multiple cities are specified, perform searches for each city and combine results:

```typescript
async function searchMultipleCities(query: string, cities: string[], filters: FilterParams) {
  const allResults = [];

  for (const city of cities) {
    const cityQuery = `${query} in ${city}`;
    const results = await searchGooglePlaces(cityQuery, filters);
    allResults.push(...results);
  }

  // Remove duplicates by place_id
  return deduplicateResults(allResults);
}
```

### 4. Response Enhancement

Add filter-related metadata to each result:

```typescript
interface EnhancedSearchResult extends GooglePlaceResult {
  metadata: {
    estimated_rent_range?: string; // Based on price_level
    matches_filters: {
      city: boolean;
      budget: boolean;
      bedrooms: boolean;
      amenities: string[]; // Which amenities match
    };
    filter_confidence: number; // 0-1 score
  };
}
```

## Example API Call

**Request:**
```
GET /functions/v1/maps-proxy-auth-assistant/search?q=senior+apartments&cities=Cleveland,Akron&bedrooms=1&amenities=Balcony,Parking&elevator=true&budget_min=1200&budget_max=1800
```

**Constructed Query:**
```
"1 bedroom senior apartments with Balcony and Parking with elevator in Cleveland"
```

**Response:**
```json
{
  "query": "1 bedroom senior apartments with Balcony and Parking with elevator in Cleveland",
  "filters_applied": {
    "cities": ["Cleveland", "Akron"],
    "bedrooms": 1,
    "amenities": ["Balcony", "Parking"],
    "elevator": true,
    "budget_range": [1200, 1800]
  },
  "results": {
    "places": [
      {
        "place_id": "ChIJ...",
        "name": "Cleveland Senior Living",
        "formatted_address": "123 Main St, Cleveland, OH",
        "geometry": {...},
        "metadata": {
          "estimated_rent_range": "$1,200-$1,800",
          "matches_filters": {
            "city": true,
            "budget": true,
            "bedrooms": true,
            "amenities": ["Balcony", "Parking"]
          },
          "filter_confidence": 0.95
        }
      }
    ]
  }
}
```

## Client-Side Filtering

While the Edge Function enhances the search query, the client still performs additional filtering because:

1. Google Places API doesn't have all the data we need (e.g., actual rent prices, bedroom counts)
2. Some filters are preference-based (floor level, proximity to family)
3. Client-side filtering provides instant feedback as users adjust filters

## Testing

Test the Edge Function with various filter combinations:

```bash
# Basic search
curl "$SUPABASE_URL/functions/v1/maps-proxy-auth-assistant/search?q=senior+apartments"

# With city filter
curl "$SUPABASE_URL/functions/v1/maps-proxy-auth-assistant/search?q=senior+apartments&cities=Cleveland"

# With multiple filters
curl "$SUPABASE_URL/functions/v1/maps-proxy-auth-assistant/search?q=senior+apartments&cities=Cleveland,Akron&bedrooms=1&elevator=true&amenities=Parking,Balcony"

# Budget filter
curl "$SUPABASE_URL/functions/v1/maps-proxy-auth-assistant/search?q=senior+apartments&budget_min=1200&budget_max=1800"
```

## Next Steps

1. **Implement filter handling in Edge Function**
   - Parse filter parameters
   - Construct enhanced search queries
   - Add location bias for cities
   - Return filter metadata

2. **Add rent estimation**
   - Integrate with a rental data API (RentCast, Zillow, etc.)
   - Store rent ranges in Supabase
   - Return estimated prices with results

3. **Improve filter matching**
   - Use Google Places Details API to get more info about each result
   - Check amenities from place details
   - Score results based on filter matches

4. **Cache filter results**
   - Cache search results by filter combination
   - Invalidate cache periodically
   - Reduce API calls
