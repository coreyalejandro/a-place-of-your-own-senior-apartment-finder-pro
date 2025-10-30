# Image Inventory - A Place of Your Own

This document tracks all images used throughout the application, celebrating diverse people and community.

## Local Images (In /public folder)

### 1. Mary Ann Portrait (`/mary-ann-portrait.jpg`)
**Used in:**
- Homepage: Magazine feature card
- Letter from the Editor article: Hero image
- Letter from the Editor article: Author profile image

**Description:** Warm, dignified portrait representing the grace and wisdom of life's next chapter

**Alt Text:** "Thoughtful senior woman in warm, dignified portrait"

### 2. Cover Lounge Scene (`/cover-lounge-scene.jpg`)
**Used in:**
- Magazine contents page: Cover art

**Description:** Welcoming lounge scene with diverse seniors in conversation, celebrating community

**Alt Text:** "Warm, welcoming lounge scene with diverse seniors in conversation, celebrating community and connection in a light-filled, comfortable space"

---

## Unsplash Images (External CDN)

### Homepage Hero
**URL:** `https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1920&q=85&fm=webp`
**Alt Text:** "Diverse group of seniors sharing joyful conversation in a warm, welcoming community space with natural light"
**Represents:** Community, connection, diversity, joy

### Feature Card: Smart Search
**URL:** `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80&fm=webp`
**Alt Text:** "Modern, welcoming apartment interior with natural light"
**Represents:** Housing, home, comfort

### Feature Card: Trusted Realtors
**URL:** `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fm=webp`
**Alt Text:** "Professional Black real estate agent smiling confidently"
**Represents:** Black professionals, trust, expertise

### Feature Card: AI Assistant
**URL:** `https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&q=80&fm=webp`
**Alt Text:** "Senior woman using tablet with caring assistant providing guidance"
**Represents:** Technology, support, guidance, intergenerational care

---

## Image Strategy & Philosophy

### Core Principles

1. **Diversity is Non-Negotiable**
   - Every page shows people of different races/ethnicities
   - Age range: 60-90 years old
   - Different body types, abilities, presentations
   - LGBTQ+ representation where appropriate

2. **Dignity Above All**
   - No medical/institutional settings
   - No "decline" imagery
   - Subjects are active, engaged, joyful
   - High-quality photography only

3. **Warmth & Community**
   - Natural lighting preferred (golden hour quality)
   - People in conversation or connection
   - Comfortable, lived-in spaces
   - Brand colors present: warm creams, browns, tans

4. **Cultural Authenticity**
   - African-American design aesthetic: image-rich, warm, maximalist
   - No minimalism for its own sake
   - Walls filled with pictures = welcoming home
   - Celebrates people, not products

---

## Planned Images (To Add)

### High Priority
- [ ] **Realtor Profiles**: Individual headshots for each of the 6 realtors
  - McMullan Realty (Cleveland)
  - James Washington (Akron)
  - Diana Brooks (Shaker Heights)
  - Marcus Coleman (Euclid)
  - Patricia Johnson (Lakewood)
  - Robert Davis (Cleveland Heights)

- [ ] **Article Headers**: Diverse images for each article
  - "When Children Become Caregivers": Intergenerational moment
  - "The Art of Transition": Moving/packing/new beginnings
  - "Second Chapter of the Heart": Romance/connection in senior years
  - "The Math of a Finite Life": Financial planning/wisdom
  - "A Place to Call Home": Home interior/personal space

- [ ] **Dashboard**: Background or section images
  - User's saved favorites visualization
  - Search progress/journey imagery
  - Family collaboration scenes

### Medium Priority
- [ ] **Search Page**: Apartment/community images
- [ ] **Bookmarks Page**: Curated housing imagery
- [ ] **Survey Page**: Lifestyle/preference images

---

## Image Sources & Attribution

### Current Sources
1. **Unsplash** (Free, high-quality stock)
   - Search terms used: "diverse seniors", "elderly friends", "Black professionals", "senior community"
   - Attribution: Not required but encouraged
   - License: Free for commercial use

2. **Personal/Custom**
   - Mary Ann Portrait: Personal photo
   - Cover Lounge Scene: Custom/personal photo

### Future Sources (When Budget Allows)
1. **Commission Custom Photography**
   - Hire photographer for authentic Cleveland/Akron senior community
   - Budget: $500-2000
   - Deliverables: 20-30 high-quality images of diverse seniors

2. **Commission Kadir Nelson-Style Illustration**
   - For magazine covers and key brand moments
   - Budget: $2000-5000
   - See: `docs/COVER_ART_DIRECTION.md`

---

## Image Specifications

### Technical Requirements
- **Format**: WebP preferred, JPG fallback
- **Size Limits**:
  - Hero images: <500KB
  - Feature cards: <200KB
  - Profile images: <100KB
- **Dimensions**:
  - Hero: 1920x1080px (16:9)
  - Feature cards: 800x600px (4:3)
  - Profiles: 400x400px (1:1)
- **Quality**: 80-85% compression
- **Alt Text**: Always required, descriptive, 50-150 characters

### Accessibility Standards
- All images have meaningful alt text
- Text overlays have sufficient contrast (WCAG AA)
- Images support content, never replace it
- Decorative images marked as such (aria-hidden)

---

## Unsplash Search Terms (For Finding More Images)

### Successful Searches
✅ "diverse seniors community"
✅ "elderly friends conversation"
✅ "Black professional portrait"
✅ "senior woman technology"
✅ "diverse elderly happy"
✅ "older adults laughing"
✅ "African American senior"
✅ "Hispanic elderly community"
✅ "Asian senior portrait"
✅ "multi-ethnic seniors"
✅ "grandparent grandchild moment"
✅ "senior apartment interior"
✅ "welcoming community space"

### Avoid These Terms (Get Wrong Vibe)
❌ "nursing home"
❌ "elderly care medical"
❌ "assisted living facility"
❌ "old age home"
❌ "senior citizen healthcare"
(These return institutional/medical imagery we don't want)

---

## Next Steps for Complete Image Integration

1. **Create Realtor Image Placeholders** (Today)
   - Use diverse professional headshots from Unsplash
   - 6 images needed, representing each realtor profile
   - Add to `/public/realtors/` folder

2. **Add Article Header Images** (This Week)
   - 6 article images needed
   - Each should visually represent the article theme
   - Store in `/public/articles/` folder

3. **Dashboard Imagery** (Next Week)
   - Background images or section headers
   - User journey visualization
   - Progress/milestone imagery

4. **Performance Optimization** (Ongoing)
   - Convert all images to WebP
   - Add responsive srcset for mobile
   - Implement lazy loading below fold
   - Add blur placeholders for premium UX

---

## Image Credits & Attributions

### Unsplash Photographers (Optional Credits)
When possible, credit photographers in image alt text or footer:
- Homepage Hero: [Photographer name from Unsplash]
- Feature Cards: [Respective photographers]

### Personal Images
- Mary Ann Portrait: Personal family photo (no attribution needed)
- Cover Lounge Scene: Personal/custom photo (no attribution needed)

---

Last Updated: October 25, 2024
Maintained by: Development Team
