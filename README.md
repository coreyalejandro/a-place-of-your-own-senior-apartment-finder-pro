# A Place of Your Own - Senior Apartment Finder

Finding your place in the next chapter.

## Overview

A dignified, senior-friendly apartment finder that transforms housing search from a stressful chore into a joyful life passage. Built with Next.js 14+, React 18+, TailwindCSS, and TypeScript.

## Features

- **Personalized Search**: Magazine-style preference survey
- **Google Maps Integration**: Real apartment listings via Places API
- **Family Collaboration**: Share bookmarks and collaborate with family members
- **Senior-Friendly UX**: Large text (18px default), high contrast mode, WCAG 2.1 AA compliant
- **Bookmark System**: Save, organize, and track apartment tours
- **Supabase Backend**: Secure authentication and data persistence

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Backend**: Supabase (PostgreSQL + Auth)
- **Maps**: Google Maps Platform (Places API New, Maps JavaScript API, Geocoding API)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- Google Maps Platform API keys
- Supabase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/coreyalejandro/a-place-of-your-own-senior-apartment-finder.git
cd a-place-of-your-own-senior-apartment-finder
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Google Maps Platform
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_browser_key
GOOGLE_MAPS_API_KEY_SERVER=your_server_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Set up Supabase database:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL script from `supabase-setup.sql`

5. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Google Maps Platform Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project: "home-finder"
3. Enable APIs:
   - Places API (New)
   - Maps JavaScript API
   - Geocoding API
   - Places Aggregate API

4. Create two API keys:
   - **Browser Key**: Restrict to HTTP referrers (*.vercel.app/*, localhost:3000/*)
   - **Server Key**: Restrict to IP addresses (Vercel IPs)

## Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Run `supabase-setup.sql` in SQL Editor
3. Configure Auth:
   - Enable email/password authentication
   - Set Site URL and Redirect URLs
   - Customize email templates

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── survey/            # Preference survey
│   ├── search/            # Apartment search
│   └── bookmarks/         # Saved listings
├── components/            # React components
│   ├── auth/             # Auth forms
│   ├── survey/           # Survey screens
│   ├── search/           # Search filters
│   ├── listings/         # Listing cards
│   ├── bookmarks/        # Bookmark management
│   ├── map/              # Map components
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and libraries
│   ├── supabase/         # Supabase client & types
│   ├── google-maps/      # Google Maps integration
│   ├── actions/          # Server actions
│   └── hooks/            # React hooks
└── public/               # Static assets
```

## Key Features Implementation

### Authentication
- Email/password via Supabase Auth
- Email verification required
- Password reset flow
- Session management (30-day persistence)

### Preference Survey
- 7-screen progressive questionnaire
- Auto-save progress after each screen
- Location, budget, space, amenities, accessibility
- Stored in Supabase `preferences` table

### Apartment Search
- Google Places Text Search API integration
- Real-time filtering (price, bedrooms, amenities)
- Map view with markers
- Listing cards with photos, ratings, pricing

### Bookmarks
- Save/unsave listings
- Personal notes per listing
- Status tracking (saved, toured, applied, declined)
- Family sharing and collaboration

### Accessibility
- Default 18px text (adjustable 16-24px)
- High contrast mode toggle
- WCAG 2.1 AA compliant
- 48px minimum touch targets
- Full keyboard navigation
- Screen reader support

## Color Palette

- Background: `#FAF8F5` (warm cream)
- Primary Text: `#5C4A3C` (warm brown)
- Secondary Text: `#8B7355` (medium brown)
- Borders/Accents: `#D4C4B0` (light tan)
- Interactive: `#8B7355` (hover: `#5C4A3C`)

## Database Schema

### Tables
- `profiles` - User accounts
- `preferences` - Search preferences
- `bookmarks` - Saved listings
- `search_history` - Search tracking
- `family_connections` - Family sharing

See `supabase-setup.sql` for complete schema.

## Deployment

### Vercel Deployment

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Environment Variables (Production)
- Update `NEXT_PUBLIC_BASE_URL` to production URL
- Update Google Maps API key restrictions
- Update Supabase redirect URLs

## Development Roadmap

### Phase 1: Foundation ✅
- [x] Next.js project setup
- [x] Google Maps Platform integration
- [x] Supabase backend setup
- [x] Authentication system
- [x] Database schema

### Phase 2: Core Features (In Progress)
- [x] Preference survey (basic)
- [ ] Complete survey (all 7 screens)
- [ ] Apartment search with Google Places API
- [ ] Listing display with map
- [ ] Bookmark system
- [ ] Family sharing

### Phase 3: UX & Accessibility
- [ ] Text size controls
- [ ] High contrast mode
- [ ] WCAG 2.1 AA compliance
- [ ] Touch target optimization
- [ ] Screen reader testing

### Phase 4: Polish & Deploy
- [ ] Editorial content
- [ ] Neighborhood scoring
- [ ] User flow testing
- [ ] Production deployment

## Contributing

This is a private project. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved

## Support

For support, email support@aplaceofyourown.com

---

Built with ❤️ for seniors and their families
