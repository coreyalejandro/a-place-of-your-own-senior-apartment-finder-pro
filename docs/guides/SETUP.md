# Setup Guide - A Place of Your Own

Complete setup instructions for development and production deployment.

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git
- Google Cloud Platform account
- Supabase account
- Vercel account (for deployment)

## Step 1: Clone and Install

```bash
git clone https://github.com/coreyalejandro/a-place-of-your-own-senior-apartment-finder.git
cd a-place-of-your-own-senior-apartment-finder
npm install
```

## Step 2: Google Maps Platform Setup

### Create Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Name: `home-finder` (or your preferred name)
4. Click "Create"

### Enable APIs

Navigate to "APIs & Services" → "Library" and enable:

1. **Places API (New)** - For apartment search
2. **Maps JavaScript API** - For map display
3. **Geocoding API** - For address conversion
4. **Places Aggregate API** - For neighborhood scoring (future)

### Create API Keys

#### Browser Key (Client-side)

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Name: `Browser Key - Home Finder`
4. Click "Restrict Key"
5. Application restrictions:
   - Select "HTTP referrers (web sites)"
   - Add referrers:
     - `http://localhost:3000/*`
     - `https://localhost:3000/*`
     - `https://*.vercel.app/*`
     - `https://your-production-domain.com/*`
6. API restrictions:
   - Select "Restrict key"
   - Select all 4 APIs enabled above
7. Save and copy the key

#### Server Key (Server-side)

1. Create another API key
2. Name: `Server Key - Home Finder`
3. Application restrictions:
   - Select "IP addresses"
   - Add: `0.0.0.0/0` (temporary - restrict after deployment)
4. API restrictions:
   - Select "Restrict key"
   - Select all 4 APIs enabled above
5. Save and copy the key

**Important**: After deploying to Vercel, update server key IP restrictions with Vercel's IP ranges.

## Step 3: Supabase Setup

### Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Organization: Select or create
4. Name: `home-finder`
5. Database Password: Generate strong password (save securely)
6. Region: `East US (North Virginia)` (closest to Ohio)
7. Click "Create new project"
8. Wait 2-3 minutes for provisioning

### Get API Credentials

1. Go to Project Settings → API
2. Copy these values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### Run Database Schema

1. Go to SQL Editor in Supabase dashboard
2. Click "New query"
3. Copy entire contents of `supabase-setup.sql`
4. Paste into editor
5. Click "Run"
6. Verify success (should see "Success. No rows returned")

### Verify Tables Created

1. Go to Table Editor
2. Confirm these tables exist:
   - profiles
   - preferences
   - bookmarks
   - search_history
   - family_connections

### Configure Authentication

1. Go to Authentication → Settings
2. Site URL: `http://localhost:3000` (update for production)
3. Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-production-domain.com/auth/callback`
4. Email Auth: Enabled (default)
5. Disable all social providers (Google, GitHub, etc.)
6. Email Templates:
   - Customize confirmation and reset templates (optional)
7. Save changes

## Step 4: Environment Configuration

1. Copy example environment file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` with your credentials:

```env
# Google Maps Platform
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAfYM-gg7gb5QeOfsSrw2BfXoY3QY4h3M4
GOOGLE_MAPS_API_KEY_SERVER=AIzaSyBcZ2oG-GbckX8ocilA9sn5aQOxTJ0W0_o

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Save file

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see the landing page with "A Place of Your Own" heading.

## Step 6: Test Core Functionality

### Test Authentication

1. Click "Get Started"
2. Fill out registration form
3. Check email for verification link
4. Click verification link
5. Should redirect to survey

### Test Survey

1. Complete preference survey
2. Verify data saves between screens
3. Complete all 7 screens
4. Should redirect to dashboard

### Test Search (After Supabase configured)

1. Navigate to Search page
2. Adjust filters
3. View listings (will be empty until Google Maps API is fully integrated)

## Step 7: Production Deployment (Vercel)

### Prepare for Deployment

1. Commit all changes:
```bash
git add .
git commit -m "Initial setup complete"
git push origin main
```

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
5. Add Environment Variables:
   - Copy all variables from `.env.local`
   - Update `NEXT_PUBLIC_BASE_URL` to your Vercel URL
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)

### Post-Deployment Configuration

#### Update Supabase

1. Go to Supabase → Authentication → Settings
2. Update Site URL: `https://your-app.vercel.app`
3. Add Redirect URL: `https://your-app.vercel.app/auth/callback`
4. Save

#### Update Google Maps API Keys

1. Go to Google Cloud Console → Credentials
2. Edit Browser Key:
   - Add referrer: `https://your-app.vercel.app/*`
3. Edit Server Key:
   - Update IP restrictions with Vercel IPs
   - Or use Vercel environment variables for dynamic IPs

#### Test Production

1. Visit your Vercel URL
2. Test registration flow
3. Test authentication
4. Test survey
5. Test search functionality

## Troubleshooting

### Build Errors

**Error**: `Missing environment variables`
- Solution: Verify all env vars are set in Vercel dashboard

**Error**: `Supabase connection failed`
- Solution: Check Supabase URL and keys are correct
- Verify Supabase project is running

### Runtime Errors

**Error**: `Google Maps API key invalid`
- Solution: Verify API key restrictions
- Check referrer URLs match exactly
- Ensure APIs are enabled

**Error**: `Database query failed`
- Solution: Verify RLS policies are set correctly
- Check user is authenticated
- Verify table structure matches schema

### Authentication Issues

**Error**: `Email not verified`
- Solution: Check spam folder for verification email
- Resend verification email from Supabase dashboard

**Error**: `Redirect loop`
- Solution: Verify redirect URLs in Supabase settings
- Check callback route exists

## Next Steps

1. Complete remaining survey screens
2. Integrate Google Places API for real listings
3. Implement bookmark functionality
4. Add family sharing features
5. Implement accessibility features
6. Add editorial content
7. Test with real users

## Support

For issues or questions:
- Check GitHub Issues
- Review documentation
- Contact development team

## Security Notes

- Never commit `.env.local` to Git
- Keep service role key secret
- Restrict API keys properly
- Use environment variables in Vercel
- Enable RLS policies in Supabase
- Regular security audits

---

Setup complete! Start building amazing features. 🚀
