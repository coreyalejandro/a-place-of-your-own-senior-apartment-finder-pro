# Test Account Setup Guide

This guide explains how to set up the demo/test account for Abacus.ai contest judges.

## Quick Overview

**Test Account Credentials:**
- Email: `judge@aplaceofyourown.com`
- Password: `JudgeDemo2025!`

**What's Included:**
- Completed preference survey (Cleveland, OH area)
- 5 sample bookmarks in various states (saved, toured, applied, declined)
- Recent search history
- Realistic usage patterns

## Setup Instructions

### Option 1: Automatic Setup (Recommended)

If you have admin access to the deployed Supabase instance:

1. **Create Auth User via Supabase Dashboard:**
   - Go to Supabase Dashboard > Authentication > Users
   - Click "Add User" > "Create new user"
   - Email: `judge@aplaceofyourown.com`
   - Password: `JudgeDemo2025!`
   - Enable "Auto Confirm User" (skip email verification)
   - Click "Create User"

2. **Get the User ID:**
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'judge@aplaceofyourown.com';
   ```
   Copy the UUID (something like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

3. **Run Seed Script:**
   - Open `seed-test-data.sql` in a text editor
   - Replace ALL instances of `YOUR_USER_ID_HERE` with the UUID from step 2
   - Go to Supabase Dashboard > SQL Editor
   - Paste the modified SQL
   - Click "Run"

4. **Verify Setup:**
   - Log in at your deployed app with the test credentials
   - Verify you see:
     - Completed preferences
     - 5 bookmarks on the dashboard
     - Search history

### Option 2: Manual Registration

If you prefer not to use SQL:

1. **Register via the App:**
   - Go to your deployed app
   - Navigate to `/auth/register`
   - Email: `judge@aplaceofyourown.com`
   - Password: `JudgeDemo2025!`
   - Full Name: `Demo Judge`

2. **Verify Email:**
   - Check email inbox for verification
   - OR manually verify in Supabase Dashboard > Authentication > Users

3. **Complete Onboarding:**
   - Log in
   - Complete the 7-screen preference survey
   - Use Cleveland, OH as location
   - Add a few sample bookmarks

**Note:** This option requires more manual work but doesn't require SQL access.

## Test Account Data Details

### Profile
- **Full Name:** Demo Judge
- **Role:** Senior
- **Preferences Completed:** Yes

### Preferences (Cleveland, OH Area)
- **Location:** Cleveland, OH (15-mile radius)
- **Budget:** $800 - $1,500/month
- **Size:** 1 bedroom, 1 bathroom
- **Housing Types:** Apartments, Senior Communities
- **Required Amenities:** Wheelchair accessible, Elevator
- **Desired Amenities:** Fitness center, Community room, Laundry
- **Accessibility Needs:** Wheelchair accessible
- **Pet:** Small dog (pet-friendly required)
- **Proximity Preferences:** Near grocery, medical, family, and parks

### Sample Bookmarks (5 total)

1. **Sunrise Senior Living** ⭐⭐⭐⭐⭐ (Toured)
   - Status: Toured
   - Rating: 5/5
   - Notes: "Very impressed with staff and amenities. Wheelchair accessible."

2. **Parkview Senior Apartments** (Tour Scheduled)
   - Status: Saved
   - Tour Date: 7 days from creation
   - Notes: "Pet-friendly with beautiful garden areas."

3. **Golden Years Community** ⭐⭐⭐⭐ (Applied)
   - Status: Applied
   - Rating: 4/5
   - Notes: "Application submitted. Excellent medical facilities nearby."

4. **Meadowbrook Senior Living** (Saved)
   - Status: Saved
   - Notes: "Slightly over budget but excellent amenities."

5. **Valley View Apartments** ⭐⭐ (Declined)
   - Status: Declined
   - Rating: 2/5
   - Notes: "Not wheelchair accessible enough. Too many stairs."

### Search History (3 recent searches)
- "senior apartments near Cleveland OH"
- "pet friendly senior housing Cleveland"
- "wheelchair accessible apartments Cleveland Heights"

## Verification Checklist

After setup, verify the following:

- [ ] Can log in with test credentials
- [ ] Dashboard shows 5 bookmarks
- [ ] Preferences are completed (no survey prompt)
- [ ] Can view individual bookmark details
- [ ] Search history appears in appropriate views
- [ ] Can perform new searches
- [ ] Can add new bookmarks

## Troubleshooting

### "User not found" on login
- Verify the auth user was created in Supabase Auth
- Check that email verification was completed or auto-confirmed

### "No bookmarks found"
- Verify the seed script ran successfully
- Check that USER_ID_HERE was replaced with correct UUID
- Run verification queries at bottom of `seed-test-data.sql`

### "Survey required"
- The `preferences_completed` flag should be `true`
- Check the `profiles` table has the correct data
- Verify a row exists in `preferences` table

## Security Notes

**For Contest Submission:**
- This is a demo account for judges only
- Do NOT use in production
- Change/disable after contest evaluation
- Password follows contest best practices (strong, memorable)

**After Contest:**
```sql
-- Disable test account after contest
UPDATE auth.users
SET email_confirmed_at = NULL
WHERE email = 'judge@aplaceofyourown.com';

-- Or delete entirely
DELETE FROM auth.users WHERE email = 'judge@aplaceofyourown.com';
```

## Support

If judges encounter issues:
1. Verify deployment is accessible
2. Check Supabase connection is active
3. Confirm test account exists and is verified
4. Review browser console for errors
5. Provide alternative: Self-registration with any email

---

**Created:** October 25, 2025
**For:** Abacus.ai Contest Submission
**Status:** Ready for deployment
