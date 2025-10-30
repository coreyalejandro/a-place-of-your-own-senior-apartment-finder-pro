# Black Realtor Directory - Design Document

**Date**: October 24, 2025
**Priority**: CRITICAL - Mom needs this first
**Target**: Northeast Ohio (Cleveland, Akron, surrounding areas)

---

## Product Vision

**Goal**: Help users find trusted Black real estate professionals in Northeast Ohio with comprehensive vetting information, making the search personal, community-focused, and trustworthy.

**Differentiator**: Unlike generic directories, we provide:
- Curated, vetted professionals
- Association affiliations (NAREB, Realtist chapters)
- Specialties in senior housing and first-time buyers
- Built-in vetting guidance ("What to ask", "Red flags")
- Community-focused approach

---

## Data Structure

### Realtor Profile Schema

```typescript
interface RealtorProfile {
  // Basic Info
  id: string;
  name: string;
  type: 'individual' | 'firm';
  photo?: string;

  // Contact
  phone: string;
  email?: string;
  website?: string;
  officeAddress?: string;

  // Location & Service Area
  serviceAreas: string[]; // ["Cleveland", "Cleveland Heights", "Shaker Heights"]
  county: string[]; // ["Cuyahoga", "Summit"]

  // Professional Details
  licenseNumber?: string;
  yearsExperience?: number;
  firmName?: string; // If individual realtor

  // Affiliations & Credentials
  affiliations: string[]; // ["NAREB", "Greater Cleveland Realtist Association"]
  certifications: string[]; // ["Senior Real Estate Specialist", "Accredited Buyer Representative"]

  // Specialties
  specialties: string[]; // ["Senior housing", "First-time buyers", "Downsizing"]
  languagesSpoken: string[];

  // Community & Background
  communityInvolvement?: string;
  biography?: string;

  // Verification
  verified: boolean;
  verificationDate?: string;
  addedDate: string;
  lastUpdated: string;

  // Social Proof
  testimonials?: Testimonial[];
  featuredInArticle?: boolean; // Link to your "Choosing the Right Guide" article
}

interface Testimonial {
  quote: string;
  author: string;
  date: string;
}
```

---

## Initial Curated List

### Priority 1: Associations & Firms (Verified Sources)

**1. Greater Cleveland Realtist Association**
- President: Deborah Bonner
- Website: [Link if available]
- Members: Request member directory

**2. Akron Realtist Association**
- Contact for member list
- Focus on Summit County

**3. McMullan Realty, Inc.**
- Type: Firm
- Location: Greater Cleveland
- Status: One of largest minority-owned firms
- Specialties: Full-service residential

**4. Ohio Realtist Association**
- State-level network
- Can provide regional contacts

### Priority 2: Individual Realtors (From Research)

**Verified Names:**
- Deborah Bonner (President, Greater Cleveland Realtist)
- Michelle McQuade (Northeast Cleveland area)
- Loreen Banks Kendricks (Toledo - can reference for comparison)

### Priority 3: Directory Integration

**Resources to Mine:**
- BlackRealEstateAgents.com (Cleveland, Akron searches)
- BlackAgent.com (Ohio listings)
- Black Real Estate Brokers Association (BREBA)

---

## UI/UX Design

### Page Structure: `/realtors`

#### Hero Section
```
┌─────────────────────────────────────────────────┐
│  Find Your Trusted Real Estate Guide           │
│  Connecting you with experienced Black         │
│  realtors in Northeast Ohio                    │
│                                                 │
│  [Search by name, city, or specialty]          │
└─────────────────────────────────────────────────┘
```

#### Filter Sidebar (Left)
```
Service Area
├─ Cleveland
├─ Akron
├─ Cleveland Heights
├─ Shaker Heights
├─ Lakewood
└─ View all cities...

County
├─ Cuyahoga
├─ Summit
└─ Lorain

Specialties
├─ Senior Housing
├─ Downsizing
├─ First-time Buyers
├─ Investment Properties
└─ Assisted Living

Type
├─ Individual Agents
└─ Firms

Affiliations
├─ NAREB Member
├─ Realtist Association
└─ Verified by A Place of Your Own
```

#### Main Content (Right)
```
Realtor Cards (Grid Layout)

┌─────────────────────────────────────┐
│ 📷 Photo   McMullan Realty, Inc.   │
│            ★★★★★ Verified           │
│                                     │
│ FIRM • Greater Cleveland            │
│                                     │
│ Specialties:                        │
│ • Senior Housing                    │
│ • Downsizing                        │
│ • First-time Buyers                 │
│                                     │
│ Affiliations:                       │
│ • NAREB                             │
│ • Greater Cleveland Realtist Assn   │
│                                     │
│ 📞 (216) XXX-XXXX                   │
│ 🌐 Website                          │
│                                     │
│ [View Full Profile] [Contact]      │
└─────────────────────────────────────┘
```

#### Individual Profile Page: `/realtors/[id]`

**Sections:**
1. **Header**
   - Photo
   - Name, credentials
   - Contact buttons (Call, Email, Website)
   - Verification badge

2. **Quick Facts**
   - Service areas
   - Years of experience
   - Languages spoken
   - Specialties

3. **About**
   - Biography
   - Community involvement
   - Why they chose real estate

4. **Professional Credentials**
   - License number
   - Affiliations (with logos if possible)
   - Certifications
   - Awards

5. **How to Work With Them**
   - Approach to clients
   - Availability
   - Initial consultation process

6. **Testimonials** (if available)

7. **Vetting Questions** (Educational)
   - "Questions to ask any realtor"
   - "Red flags to watch for"
   - "What makes a good realtor-client fit?"

---

## Key Features

### Phase 1: MVP (This Weekend)
- ✅ Static curated directory (10-15 realtors)
- ✅ Search by name, city
- ✅ Filter by service area, specialties
- ✅ Individual profile pages
- ✅ Vetting guidance section
- ✅ Mobile-responsive design
- ✅ Integration with magazine navigation

### Phase 2: Enhanced (Week 2)
- User reviews/ratings
- "Request consultation" form
- Email notifications to realtors
- Analytics on views/contacts
- Featured realtor spotlights
- Integration with AI Concierge (suggest realtors)

### Phase 3: Community (Month 2)
- Realtor self-registration (with verification)
- Realtor dashboard
- Success stories
- Virtual open house calendar
- Educational webinars

---

## Vetting Guidance Content

### "How to Choose Your Realtor" Section

**Questions to Ask:**
1. How long have you been practicing in this area?
2. What's your experience with [senior housing/downsizing]?
3. How do you communicate with clients? (Frequency, method)
4. Can you provide references from recent clients?
5. Are you a member of NAREB or local Realtist associations?
6. What's your approach to pricing and negotiation?
7. How familiar are you with the neighborhoods I'm interested in?
8. Will you be my primary contact, or will I work with a team?

**Green Flags:**
- Active in local community
- Member of professional associations
- Transparent about fees and process
- Provides references readily
- Listens more than talks
- Asks about YOUR needs and timeline
- Honest about market conditions

**Red Flags:**
- Pressures you to buy/sell quickly
- Won't provide references
- Poor communication/responsiveness
- Unwilling to explain their process
- Makes guarantees about outcomes
- Focuses only on commission
- Dismisses your concerns

**Financial Considerations:**
- Standard commission: 5-6% (split between buyer/seller agents)
- Never pay upfront fees to view listings
- Get everything in writing
- Understand dual agency (avoid if possible)

---

## Integration Points

### 1. AI Concierge Integration
When user mentions needing a realtor:
```
AI: "I can help you find a trusted Black realtor in your area.
     We have a curated directory of experienced professionals.
     Would you like me to suggest someone based on your location?"

[Yes] → Direct to /realtors with filters pre-applied
```

### 2. Article Integration
In "Choosing the Right Guide" article (app/articles/realtors/page.tsx):
- Add prominent link to directory
- Feature 2-3 realtors with mini-profiles
- CTA: "Browse our full directory"

### 3. Homepage Integration
Magazine cover → "Find a Realtor" button → /realtors

### 4. Search Page Integration
After viewing properties:
- "Ready to visit? Connect with a trusted realtor"
- Suggest realtors in that area

---

## Technical Implementation

### File Structure
```
app/
  realtors/
    page.tsx           # Main directory/search page
    [id]/
      page.tsx         # Individual realtor profile

lib/
  data/
    realtors.ts        # Realtor data (start with static)
  types/
    realtor.ts         # TypeScript interfaces

components/
  realtors/
    RealtorCard.tsx    # Card component for grid
    RealtorFilter.tsx  # Filter sidebar
    VettingGuide.tsx   # Vetting questions component
    ContactForm.tsx    # Contact realtor form
```

### Data Storage: Phase 1 (Static)
- `lib/data/realtors.ts` - TypeScript array
- Advantages: Fast, no DB needed, version controlled
- Easy to curate manually

### Data Storage: Phase 2 (Dynamic)
- Supabase table: `realtor_profiles`
- Admin panel to add/edit
- User reviews table

---

## SEO Strategy

**Target Keywords:**
- "Black realtors in Cleveland"
- "Black real estate agents Northeast Ohio"
- "African American realtors Akron"
- "NAREB realtors Cleveland"
- "Minority real estate agents Ohio"

**Content Marketing:**
- Blog post: "How to Find a Black Realtor in Cleveland"
- Success stories: "Meet the Realtors Helping Seniors Downsize"
- Partnership content with NAREB

---

## Success Metrics

**Week 1:**
- Directory launched with 10+ realtors
- Page views
- Click-through rate to contact info

**Month 1:**
- 50+ directory profiles
- 100+ unique visitors
- 10+ realtor contacts made

**Quarter 1:**
- Realtor partnerships established
- First successful placement
- Featured in local media

---

## User Scenarios

### Scenario 1: Mom Looking for Help
1. Lands on homepage
2. Clicks "Find a Realtor"
3. Filters by Cleveland + Senior Housing
4. Sees McMullan Realty + 3 individuals
5. Reads profile, reviews vetting questions
6. Calls realtor directly or requests consultation

### Scenario 2: AI Concierge Referral
1. Chatting with AI about moving
2. AI suggests: "Would you like me to connect you with a trusted realtor?"
3. User agrees
4. AI opens /realtors?specialty=senior-housing&city=cleveland
5. User browses curated matches

### Scenario 3: Research Mode
1. Reading "Choosing the Right Guide" article
2. Sees "Browse our directory" CTA
3. Explores multiple realtor profiles
4. Bookmarks 2-3 favorites
5. Returns later to make contact

---

## Content to Create

### 1. Vetting Guide Standalone Page
`/realtors/guide` - Comprehensive guide to choosing a realtor

### 2. FAQ Section
- How is this directory different?
- How do you verify realtors?
- Is this service free?
- How do realtors join?
- What if I have a bad experience?

### 3. About the Directory
- Our mission
- Why Black representation matters
- Partnership with NAREB and local chapters
- How we curate

---

## Next Steps

**Immediate (Today):**
1. Create static data file with 5-7 verified realtors
2. Build `/realtors` page with grid layout
3. Add basic search/filter
4. Create profile page template

**This Week:**
1. Contact Greater Cleveland Realtist Association for member list
2. Research McMullan Realty team members
3. Mine BlackRealEstateAgents.com for verified profiles
4. Add vetting guidance content
5. Integrate with AI Concierge

**Next Week:**
1. Expand to 15-20 profiles
2. Add photos (with permission)
3. Get testimonials
4. Launch and announce

---

## Legal & Ethical Considerations

**Verification:**
- Confirm active license via Ohio Division of Real Estate
- Verify NAREB/Realtist membership
- Get consent to list
- Update contact info regularly

**Disclaimers:**
- We don't endorse specific agents
- Users should do their own due diligence
- We don't receive referral fees (if true)
- Information provided as-is

**Privacy:**
- Only public professional information
- Realtors can request removal
- No personal home addresses

---

## Inspiration & References

**Similar Directories:**
- BlackRealEstateAgents.com - Clean, simple
- NAREB.com - Professional, association-focused
- Zillow agent directory - Rich profiles

**Our Advantage:**
- Curated, not just a dump
- Educational content (vetting guide)
- Magazine aesthetic
- Senior-focused
- Community trust

---

**Ready to Build!** 🚀
