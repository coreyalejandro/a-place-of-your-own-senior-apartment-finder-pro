# Test Account for Abacus.ai Contest Judges

## Login Credentials

**Email:** `judge@aplaceofyourown.com`
**Password:** `JudgeDemo2025!`

## What's Included

This test account has been pre-configured with realistic sample data so judges can immediately explore all authenticated features without completing the onboarding process.

### Account Profile
- **Name:** Demo Judge
- **Role:** Senior user
- **Preferences:** Completed
- **Account Age:** 7 days (simulated)

### Completed Preferences
The account has a fully completed preference survey with these settings:

- **Location:** Cleveland, OH (15-mile search radius)
- **Budget:** $800 - $1,500 per month
- **Size:** 1 bedroom, 1 bathroom
- **Housing Types:** Apartments & Senior Communities
- **Accessibility Needs:** Wheelchair accessible, Elevator required
- **Desired Amenities:** Fitness center, Community room, On-site laundry
- **Pet Requirements:** Pet-friendly (small dog)
- **Proximity Preferences:**
  - Near grocery stores ✅
  - Near medical facilities ✅
  - Near family ✅
  - Near parks ✅

### Sample Bookmarks (5)

The account includes 5 saved apartment listings in various stages of the search process:

#### 1. Sunrise Senior Living ⭐⭐⭐⭐⭐
**Status:** Toured
**Location:** 123 Main St, Cleveland, OH 44101
**User Rating:** 5/5
**Notes:** "Toured on 10/20. Very impressed with staff and amenities. Wheelchair accessible with excellent elevator system. Close to family."

#### 2. Parkview Senior Apartments
**Status:** Saved (Tour Scheduled)
**Location:** 456 Oak Avenue, Cleveland, OH 44102
**Tour Date:** Scheduled for next week
**Notes:** "Tour scheduled for next week. Pet-friendly and has beautiful garden areas. Budget-friendly option."

#### 3. Golden Years Community ⭐⭐⭐⭐
**Status:** Application Submitted
**Location:** 789 Elm Street, Cleveland Heights, OH 44118
**User Rating:** 4/5
**Notes:** "Application submitted. They have excellent medical facilities nearby and shuttle service. Second choice after Sunrise."

#### 4. Meadowbrook Senior Living
**Status:** Saved for Consideration
**Location:** 101 Maple Drive, Lakewood, OH 44107
**Notes:** "Slightly over budget but has excellent amenities. Will consider if other options fall through."

#### 5. Valley View Apartments ⭐⭐
**Status:** Declined
**Location:** 202 Cedar Lane, Shaker Heights, OH 44120
**User Rating:** 2/5
**Notes:** "Toured but not wheelchair accessible enough. No elevator in building. Too many stairs."

### Search History (3 recent searches)

1. **"senior apartments near Cleveland OH"**
   - 15 results found
   - Filters: Budget $1,500 max, 1 bedroom, wheelchair accessible
   - Searched 1 day ago

2. **"pet friendly senior housing Cleveland"**
   - 8 results found
   - Filters: Budget $1,500 max, pet-friendly
   - Searched 3 days ago

3. **"wheelchair accessible apartments Cleveland Heights"**
   - 12 results found
   - Filters: Wheelchair accessible, elevator required
   - Searched 5 days ago

## What You Can Test

With this test account, you can immediately explore:

### Authenticated Features
- ✅ **Dashboard** (`/dashboard`) - See bookmarks and activity overview
- ✅ **Bookmarks** (`/bookmarks`) - View saved apartments in different statuses
- ✅ **Search** (`/search`) - Search state is already populated with preferences
- ✅ **Search History** - View past searches
- ✅ **Account Settings** - Modify preferences

### Public Features (No Login Required)

Even without the test account, judges can explore our unique features:

- ✅ **Black Realtor Directory** (`/realtors`) - Our main differentiator
- ✅ **Individual Realtor Profiles** (e.g., `/realtors/mcmullan-realty`)
- ✅ **Vetting Guide** (`/realtors/guide`) - Questions to ask realtors
- ✅ **AI Concierge** - Available on any page via chat button
- ✅ **Editorial Articles** (`/articles/*`) - 6 long-form articles
- ✅ **Table of Contents** (`/contents`) - Magazine navigation

## Alternative: Create Your Own Account

If you prefer not to use the test account, you can:

1. Visit `/auth/register`
2. Sign up with any email address
3. Complete the 7-screen preference survey
4. Start searching and bookmarking

**Note:** Self-registration requires email verification.

## Test Account Usage Tips

### Recommended Testing Flow

1. **Start with Public Features** (5 minutes)
   - Explore Black Realtor Directory
   - View a realtor profile (McMullan Realty recommended)
   - Read the vetting guide
   - Chat with AI Concierge (try: "I'm looking for senior housing in Cleveland")
   - Read one editorial article (love article is most popular)

2. **Log In to Test Account** (10 minutes)
   - Use credentials above
   - View dashboard
   - Explore bookmarks (different statuses)
   - Perform a new search
   - Add a bookmark
   - View search history

3. **Mobile Testing** (3 minutes)
   - Open on phone or use DevTools mobile view
   - Test navigation
   - Try AI chat on mobile
   - Test search interface responsiveness

## Important Notes

**Data Privacy:**
- This is a demo account with fictional data
- No real apartment listings in bookmarks
- Sample data for demonstration purposes only

**Account Limitations:**
- Read-only for judging purposes
- Changes will be visible to other judges using same account
- Will be disabled after contest evaluation

**Best Experience:**
- Desktop/laptop recommended for initial evaluation
- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Stable internet connection for AI features

## Unique Features to Highlight

When evaluating, please note:

### 🏆 **Black Realtor Directory** (Our Main Differentiator)
- First and only platform with curated Black realtor directory
- 6 vetted professionals in Northeast Ohio
- Individual profile pages with credentials
- Comprehensive vetting guide
- Direct contact information

### 🤖 **AI Concierge**
- Powered by Anthropic Claude 3.5 Sonnet
- Empathy-focused, not sales-focused
- Text-to-speech accessibility
- Conversation context retention
- Available globally (no login required)

### 📚 **Magazine Experience**
- Editorial-first approach
- 6 long-form articles (30,000+ words)
- Addresses emotional aspects of transitions
- Content for seniors AND their adult children

### ♿ **Accessibility-First**
- Large text (18-24px)
- High contrast mode
- Text-to-speech throughout
- Senior-optimized UX
- Wheelchair accessibility filters

## Troubleshooting

### Cannot Log In
- Ensure password is exactly: `JudgeDemo2025!` (case-sensitive)
- Try clearing browser cache
- Verify email: `judge@aplaceofyourown.com`

### Bookmarks Not Showing
- Navigate to `/dashboard` or `/bookmarks`
- Refresh page
- Check browser console for errors

### Search Not Working
- Ensure Google Maps API is active (should be pre-configured)
- Try searching: "apartments near Cleveland OH"
- Check that location services are enabled

## Contact

If you encounter any issues with the test account or need assistance:

- **GitHub Repo:** coreyalejandro/a-place-of-your-own-senior-apartment-finder
- **Branch:** finish-foundation
- **Support:** [Your contact info if applicable]

---

## For Contest Submission Form

**Copy this section into your Abacus.ai submission:**

---

### **Test Account for Judges**

To explore all features immediately:

**Email:** `judge@aplaceofyourown.com`
**Password:** `JudgeDemo2025!`

**Pre-configured with:**
- ✅ Completed preference survey (Cleveland, OH area)
- ✅ 5 sample bookmarks (saved, toured, applied, declined statuses)
- ✅ Recent search history
- ✅ Realistic usage patterns

**Note:** Most unique features (Black Realtor Directory, AI Concierge, Editorial Articles) are accessible without login at `/realtors`, just click the AI chat button, and `/articles`.

**Alternative:** Judges can also register with any email to experience the full onboarding flow.

---

**Created:** October 25, 2025
**Purpose:** Abacus.ai Weekly Design Contest
**Status:** Ready for Evaluation
