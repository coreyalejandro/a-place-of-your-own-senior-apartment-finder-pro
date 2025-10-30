# A Place of Your Own - Deployment Guide

## 🚀 Complete Deployment Instructions

This guide walks you through deploying "A Place of Your Own" to production.

---

## Prerequisites

Before you begin, ensure you have:

- [ ] Node.js 18+ installed
- [ ] A Supabase account and project
- [ ] A Google Cloud account (for Maps API)
- [ ] A Vercel account (recommended) or alternative hosting platform
- [ ] Git repository with your code

---

## Phase 1: Pre-Deployment Checklist

### 1.1 Replace Image Placeholders

**Required Images**:
```
public/kadir-nelson-portrait.jpg    # Group portrait for landing page
public/mary-ann-portrait.jpg         # Mary Ann's portrait for landing page
```

**Optional** (currently working with placeholders):
```
public/professional-african-american-woman-realtor.jpg
public/professional-african-american-woman-realtor-smilin.jpg
public/professional-african-american-woman-realtor-confid.jpg
public/professional-african-american-man-realtor.jpg
public/professional-african-american-woman-realtor-warm-s.jpg
public/professional-woman-realtor-elegant.jpg
```

### 1.2 Verify All Pages Load Locally

Run the development server and test each route:

```bash
npm run dev
```

**Test These Routes**:
- [ ] `/` - Landing page (two-page spread)
- [ ] `/letter` - Letter from editor
- [ ] `/contents` - Table of contents
- [ ] `/articles/children` - Article 1 + cartoon
- [ ] `/articles/transition` - Article 2 + cartoon
- [ ] `/articles/money` - Article 3 + cartoon
- [ ] `/articles/realtors` - Article 4 + cartoon
- [ ] `/articles/home` - Article 5 + cartoon
- [ ] `/survey` - 7-screen preferences survey
- [ ] `/search` - Main search page
- [ ] `/realtors` - Realtor finder (with accessibility cartoon)
- [ ] `/bookmarks` - Saved favorites
- [ ] `/family` - Family connections (with family visit cartoon)
- [ ] `/dashboard` - User dashboard

### 1.3 Run Build Test

```bash
npm run build
```

Fix any TypeScript errors or build warnings before proceeding.

---

## Phase 2: Environment Configuration

### 2.1 Supabase Setup

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for database provisioning

2. **Get Supabase Credentials**:
   - Navigate to Project Settings → API
   - Copy `Project URL` and `anon public` key

3. **Set Up Database Tables**:

Refer to `A_PLACE_OF_YOUR_OWN_SUPABASE_BUILD.md` for complete schema, but key tables include:

```sql
-- User profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Preferences
CREATE TABLE preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  role TEXT,
  budget_min INTEGER,
  budget_max INTEGER,
  cities TEXT[],
  amenities TEXT[],
  accessibility_features TEXT[],
  social_preference TEXT,
  pet_type TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bookmarks
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  place_id TEXT,
  place_name TEXT,
  address TEXT,
  notes TEXT,
  status TEXT DEFAULT 'saved',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Family connections
CREATE TABLE family_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  senior_user_id UUID REFERENCES profiles(id),
  helper_user_id UUID REFERENCES profiles(id),
  relationship TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. **Deploy Edge Function**:

The `maps-proxy-auth-assistant` Edge Function is critical for search functionality.

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy the edge function
supabase functions deploy maps-proxy-auth-assistant
```

**Configure Edge Function Secrets**:
```bash
supabase secrets set GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

5. **Implement Filter Handling**:

Refer to `EDGE_FUNCTION_FILTER_GUIDE.md` to enhance the Edge Function with filter parameter handling.

### 2.2 Google Maps API Setup

1. **Create Google Cloud Project**:
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project

2. **Enable Required APIs**:
   - Maps JavaScript API
   - Places API
   - Geocoding API

3. **Create API Key**:
   - Navigate to APIs & Services → Credentials
   - Create credentials → API key
   - **Restrict the API key** for security:
     - Application restrictions: HTTP referrers
     - Add your domain (e.g., `yourapp.vercel.app/*`)
     - API restrictions: Select only the 3 APIs above

4. **Set Up Billing**:
   - Google Maps requires a billing account
   - You get $200 free credit per month
   - Estimated cost for MVP: $0-50/month depending on usage

### 2.3 Environment Variables

Create `.env.local` for local development:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

**IMPORTANT**: Never commit `.env.local` to Git. It's already in `.gitignore`.

---

## Phase 3: Deployment to Vercel (Recommended)

### 3.1 Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your Git repository

### 3.2 Configure Project

**Framework Preset**: Next.js (auto-detected)

**Build Settings**:
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**Root Directory**: `./` (unless your project is in a subdirectory)

### 3.3 Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = your-google-maps-api-key-here
```

**Apply to**: Production, Preview, and Development

### 3.4 Deploy

Click "Deploy" and wait for the build to complete (usually 2-5 minutes).

### 3.5 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `aplaceofyourown.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5 minutes to 48 hours)

---

## Phase 4: Post-Deployment Verification

### 4.1 Test Critical Flows

Visit your production URL and verify:

**Magazine Experience**:
- [ ] Landing page loads with images
- [ ] Navigation between articles works
- [ ] All 8 editorial cartoons display correctly
- [ ] Typography and colors match New Yorker aesthetic

**Search Functionality**:
- [ ] Text search works
- [ ] Voice search button appears and functions (requires HTTPS)
- [ ] AI assistant panel opens and responds
- [ ] Google Maps loads and displays markers
- [ ] Filters apply correctly

**User Features**:
- [ ] Survey saves progress
- [ ] Bookmarks can be added/removed
- [ ] Family invitations can be sent
- [ ] Realtor finder displays and filters work

### 4.2 Mobile Testing

Test on actual devices:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad or Android)

**Key Areas**:
- [ ] Two-page spread responsive on mobile
- [ ] Filter sidebar toggles properly
- [ ] Touch targets are 48px minimum
- [ ] Text is readable without zooming

### 4.3 Performance Check

Use [PageSpeed Insights](https://pagespeed.web.dev/):
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90

**Common Issues & Fixes**:
- **Slow images**: Compress images, use Next.js Image component
- **Large JavaScript**: Enable Vercel compression (automatic)
- **Missing alt text**: Add to all images

---

## Phase 5: Monitoring & Analytics

### 5.1 Error Monitoring

**Option 1: Vercel Analytics** (Built-in)
- Enable in Vercel Project Settings → Analytics
- Free tier includes basic metrics

**Option 2: Sentry** (Advanced)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

Add Sentry DSN to environment variables.

### 5.2 User Analytics

**Option 1: Vercel Analytics** (Privacy-focused)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Option 2: Google Analytics**
- Create GA4 property
- Add tracking code to layout

### 5.3 Uptime Monitoring

Use [UptimeRobot](https://uptimerobot.com) (free):
- Monitor every 5 minutes
- Get alerts via email/SMS if site goes down

---

## Phase 6: Security Hardening

### 6.1 Supabase Row Level Security (RLS)

Enable RLS on all tables:

```sql
-- Profiles: Users can only read/update their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Preferences: Users can only access their own
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences"
ON preferences FOR ALL
USING (auth.uid() = user_id);

-- Bookmarks: Users can only access their own
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own bookmarks"
ON bookmarks FOR ALL
USING (auth.uid() = user_id);

-- Family connections: Users can see connections they're part of
ALTER TABLE family_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see own family connections"
ON family_connections FOR SELECT
USING (auth.uid() = senior_user_id OR auth.uid() = helper_user_id);
```

### 6.2 API Key Restrictions

**Google Maps API**:
- [ ] Restrict to your domain only
- [ ] Enable only necessary APIs
- [ ] Set daily quotas (e.g., 10,000 requests/day)

**Supabase**:
- [ ] Use anon key (not service role key) on frontend
- [ ] Enable email confirmation for signups
- [ ] Configure SMTP for transactional emails

### 6.3 Rate Limiting

Add to Edge Function:

```typescript
// Check rate limit before processing
const { data: rateLimitCheck } = await supabase.rpc('check_rate_limit', {
  user_id: userId,
  endpoint: 'search',
  max_requests: 100,
  window_minutes: 60
});

if (!rateLimitCheck.allowed) {
  return new Response('Rate limit exceeded', { status: 429 });
}
```

---

## Phase 7: Ongoing Maintenance

### 7.1 Weekly Checks

- [ ] Review error logs in Vercel/Sentry
- [ ] Check Supabase usage (database size, API calls)
- [ ] Monitor Google Maps API usage and costs

### 7.2 Monthly Tasks

- [ ] Update dependencies: `npm outdated`, `npm update`
- [ ] Review analytics for user behavior insights
- [ ] Check uptime reports

### 7.3 Backup Strategy

**Supabase Database**:
- Daily backups included in Supabase Pro plan ($25/mo)
- Free tier: Manual exports via Supabase Dashboard

**Code**:
- Use Git tags for each release: `git tag v1.0.0`
- Keep staging branch for testing updates

---

## Phase 8: Optional Enhancements

### 8.1 Content Improvements

**Editorial Cartoons**:
- Commission actual illustrations from a cartoonist
- Convert text descriptions to images
- Budget: $100-500 per cartoon

**Photography**:
- Hire photographer for authentic portraits
- Alternative: Use AI-generated portraits (Midjourney, DALL-E)
- Update image paths in code

### 8.2 Feature Additions

**Email Notifications**:
```bash
# Install Resend or SendGrid
npm install resend
```

Use for:
- Family invitation emails
- New listing alerts
- Weekly digest of saved properties

**PDF Export**:
```bash
npm install jspdf
```

Allow users to export:
- Saved bookmarks as PDF
- Articles for offline reading
- Comparison charts for apartments

**Print Styles**:

Add to `globals.css`:
```css
@media print {
  .no-print { display: none; }

  /* Article print formatting */
  article {
    font-family: Georgia, serif;
    font-size: 12pt;
    line-height: 1.5;
  }
}
```

### 8.3 SEO Optimization

**Add to each page**:
```typescript
export const metadata = {
  title: 'A Place of Your Own - Senior Apartment Finder',
  description: 'Find your perfect senior living space with dignity and joy',
  openGraph: {
    title: 'A Place of Your Own',
    description: 'Senior apartment finder with a New Yorker magazine experience',
    images: ['/og-image.jpg'],
  }
};
```

**Create sitemap**:
```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    { url: 'https://yoursite.com/', lastModified: new Date() },
    { url: 'https://yoursite.com/articles/children', lastModified: new Date() },
    // ... more routes
  ];
}
```

**Create robots.txt**:
```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}
```

---

## Troubleshooting Common Issues

### Build Fails with TypeScript Errors

```bash
# Check for type errors
npm run build

# If needed, add to tsconfig.json temporarily:
{
  "compilerOptions": {
    "strict": false
  }
}
```

### Google Maps Not Loading

1. **Check API key is set**: Verify in Vercel environment variables
2. **Check API is enabled**: Maps JavaScript API must be enabled
3. **Check domain restrictions**: Add Vercel domain to allowed referrers
4. **Check browser console**: Look for specific error messages

### Supabase Connection Issues

1. **Verify URL/Key**: Double-check environment variables
2. **Check CORS**: Supabase should allow your Vercel domain
3. **Test Edge Function**: Use `curl` to test endpoint directly
4. **Check RLS policies**: Ensure policies allow intended access

### Voice Search Not Working

Voice search requires HTTPS (works on Vercel, not on `localhost` HTTP).

**Workaround for local testing**:
```bash
# Use ngrok to create HTTPS tunnel
npx ngrok http 3000
```

### Layout Broken on Mobile

1. **Check viewport meta tag** in `app/layout.tsx`:
```typescript
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

2. **Test responsive breakpoints**: Tailwind breakpoints are `sm:`, `md:`, `lg:`, `xl:`

3. **Check overflow**: Ensure no elements exceed viewport width

---

## Cost Estimates

### MVP (0-100 users/month)

| Service | Free Tier | Paid Plan | Estimated Cost |
|---------|-----------|-----------|----------------|
| Vercel | 100GB bandwidth | Pro: $20/mo | **$0** (free tier sufficient) |
| Supabase | 500MB database, 2GB bandwidth | Pro: $25/mo | **$0** (free tier sufficient) |
| Google Maps | $200 free credit/month | Pay-as-you-go | **$0-20** depending on usage |
| Domain | N/A | $10-15/year | **$1/mo** |
| **Total** | | | **~$1-21/month** |

### Growth (100-1,000 users/month)

| Service | Estimated Cost |
|---------|----------------|
| Vercel Pro | $20/mo |
| Supabase Pro | $25/mo |
| Google Maps | $20-100/mo |
| Domain | $1/mo |
| **Total** | **~$66-146/month** |

---

## Success Criteria

Your deployment is successful when:

- [ ] All pages load without errors
- [ ] Search returns results from Google Maps API
- [ ] Users can sign up and save preferences
- [ ] Bookmarks persist across sessions
- [ ] Mobile experience is smooth and responsive
- [ ] All 8 editorial cartoons display correctly
- [ ] Performance scores are acceptable (>80)
- [ ] No console errors on any page

---

## Support & Resources

**Documentation**:
- `README.md` - Project overview
- `A_PLACE_OF_YOUR_OWN_SUPABASE_BUILD.md` - Database schema
- `EDGE_FUNCTION_FILTER_GUIDE.md` - Backend implementation
- `APPLICATION_STATUS.md` - Complete feature inventory

**External Docs**:
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Google Maps Platform](https://developers.google.com/maps)

**Getting Help**:
- Next.js Discord: [nextjs.org/discord](https://nextjs.org/discord)
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)

---

## Final Checklist

Before going live:

- [ ] All environment variables set in Vercel
- [ ] Supabase database tables created with RLS enabled
- [ ] Edge Function deployed and tested
- [ ] Google Maps API configured with restrictions
- [ ] All pages tested in production
- [ ] Mobile testing completed
- [ ] Performance scores acceptable
- [ ] Error monitoring configured
- [ ] Domain configured (if using custom domain)
- [ ] Backup strategy in place

---

**Built with care for Mary Ann and all who navigate this passage with grace.**

🎨 *May your deployment be smooth, your users delighted, and your mission fulfilled.*
