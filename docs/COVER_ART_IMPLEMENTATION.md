# Cover Art Implementation Guide

## Overview

This guide shows you how to add your commissioned cover art to the magazine homepage once it's ready.

---

## File Preparation

### 1. Optimize Your Images

Before adding to the site, optimize files for web:

**Using Online Tools** (Easiest):
1. Go to [Squoosh.app](https://squoosh.app/)
2. Upload your high-res cover art
3. **For hero image**:
   - Format: WebP
   - Quality: 80-85
   - Target size: <500KB
4. **For mobile version**:
   - Resize to 1080px wide
   - Format: WebP
   - Quality: 80
5. Download optimized files

**File Naming Convention**:
```
cover-hero.webp          (main desktop cover)
cover-hero-mobile.webp   (mobile version)
cover-hero.jpg           (fallback for older browsers)
```

---

## Step-by-Step Implementation

### Step 1: Add Image Files to Project

1. Place your optimized images in the `public` folder:
```
/public/
  └── images/
      └── cover/
          ├── cover-hero.webp
          ├── cover-hero-mobile.webp
          └── cover-hero.jpg
```

2. Create the folder if it doesn't exist:
```bash
mkdir -p /Users/coreyalejandro/dev/a-place-of-your-own-senior-apartment-finder/public/images/cover
```

3. Copy your files:
```bash
# Example (replace with your actual file paths)
cp ~/Downloads/cover-hero.webp public/images/cover/
cp ~/Downloads/cover-hero-mobile.webp public/images/cover/
```

---

### Step 2: Update Homepage Component

Open `app/page.tsx` and update the hero section:

**Current Code** (with placeholder):
```tsx
<div className="relative min-h-[70vh] bg-gradient-to-br from-[#8B7355]/20 to-[#5C4A3C]/30 flex items-center justify-center">
  <div className="text-center p-12">
    <p className="font-serif text-2xl md:text-3xl text-[#5C4A3C] mb-4">
      [Kadir Nelson-Inspired Group Portrait]
    </p>
    <p className="font-serif text-base md:text-lg text-[#8B7355] italic">
      A celebration of seniors beginning their next chapter
    </p>
  </div>
  {/* ... rest of code */}
</div>
```

**New Code** (with real cover art):
```tsx
<div className="relative min-h-[70vh] overflow-hidden">
  {/* Background Cover Image */}
  <div className="absolute inset-0">
    <picture>
      {/* Mobile version */}
      <source
        media="(max-width: 768px)"
        srcSet="/images/cover/cover-hero-mobile.webp"
        type="image/webp"
      />
      {/* Desktop WebP */}
      <source
        srcSet="/images/cover/cover-hero.webp"
        type="image/webp"
      />
      {/* Fallback JPG */}
      <img
        src="/images/cover/cover-hero.jpg"
        alt="Diverse group of seniors in a welcoming, light-filled community space, celebrating their next chapter with dignity and joy"
        className="w-full h-full object-cover"
      />
    </picture>
    {/* Optional: Subtle gradient overlay for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF8F5]/80" />
  </div>

  {/* Magazine Masthead - Now overlays the image */}
  <div className="relative z-10 absolute top-12 left-0 right-0 px-8 md:px-16">
    <div className="text-center">
      <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white drop-shadow-lg tracking-wider mb-3">
        A Place of Your Own
      </h1>
      <div className="h-px bg-white/60 w-48 mx-auto mb-3" />
      <p className="font-serif text-sm md:text-base text-white/90 drop-shadow tracking-widest uppercase">
        A Special Edition
      </p>
    </div>
  </div>

  {/* Content area at bottom */}
  <div className="relative z-10 min-h-[70vh] flex items-end pb-12">
    <div className="w-full px-8 md:px-16">
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-[#5C4A3C] bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          The Art of Beginning Again
        </h2>
      </div>
    </div>
  </div>
</div>
```

---

### Step 3: Adjust Text Color for Legibility

Depending on your cover art's colors, you may need to adjust text colors:

**If cover art is light/bright**:
- Use dark text (#5C4A3C)
- Remove or lighten gradient overlay

**If cover art is dark/rich**:
- Use white/cream text (#FAF8F5)
- Add subtle text shadow for legibility

**Example for light artwork**:
```tsx
<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-[#5C4A3C] tracking-wider mb-3">
  A Place of Your Own
</h1>
```

**Example for dark artwork**:
```tsx
<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white drop-shadow-lg tracking-wider mb-3">
  A Place of Your Own
</h1>
```

---

### Step 4: Test Across Devices

1. **Desktop** (large screen):
```bash
npm run dev
# Open http://localhost:3000
# View at full width (1920px+)
```

2. **Tablet** (iPad):
- Use browser dev tools (F12 or Cmd+Option+I)
- Toggle device toolbar
- Select iPad Pro or similar
- Verify image looks good at 1024px width

3. **Mobile** (iPhone):
- Test at 375px width (iPhone SE)
- Test at 428px width (iPhone Pro Max)
- Ensure mobile image loads
- Check text is legible

4. **Check Performance**:
- Open Network tab in dev tools
- Verify image size is <500KB
- Verify WebP is loading (not fallback JPG)

---

## Optional Enhancements

### Add Lazy Loading
```tsx
<img
  src="/images/cover/cover-hero.jpg"
  alt="..."
  className="w-full h-full object-cover"
  loading="lazy"
  decoding="async"
/>
```

### Add Blur Placeholder (Next.js Image)
If you want fancy blur-up effect:

1. Convert to use Next.js Image component:
```tsx
import Image from 'next/image';

<div className="relative min-h-[70vh] overflow-hidden">
  <Image
    src="/images/cover/cover-hero.webp"
    alt="..."
    fill
    className="object-cover"
    priority
    quality={85}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // generate this
  />
</div>
```

2. Generate blur placeholder:
```bash
npm install plaiceholder
npx plaiceholder public/images/cover/cover-hero.jpg
# Copy the base64 string to blurDataURL prop
```

---

## Troubleshooting

### Image Not Showing
**Check**:
- File path is correct (case-sensitive!)
- File is actually in `/public/images/cover/`
- File extension matches code (.webp not .WEBP)
- Restart dev server: `npm run dev`

### Image Too Large/Slow
**Solution**:
- Compress more aggressively at squoosh.app
- Reduce quality to 75-80
- Ensure WebP format (not PNG)
- Check file size: should be <500KB

### Text Hard to Read
**Solution 1** - Add gradient overlay:
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
```

**Solution 2** - Add background to text:
```tsx
<h1 className="font-serif ... bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg">
  A Place of Your Own
</h1>
```

**Solution 3** - Add stronger text shadow:
```tsx
<h1 className="font-serif ... drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
  A Place of Your Own
</h1>
```

### Mobile Image Not Loading
**Check**:
- Mobile file exists: `public/images/cover/cover-hero-mobile.webp`
- Media query is correct: `(max-width: 768px)`
- Mobile file is optimized (<300KB)

---

## Alternative: Using Unsplash (Temporary)

If you're waiting for commissioned art, use high-quality stock:

```tsx
<div className="relative min-h-[70vh] overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-XXXXX?w=1920&q=85&fm=webp"
    alt="..."
    className="w-full h-full object-cover"
  />
  {/* Credit photographer */}
  <div className="absolute bottom-2 right-2 text-xs text-white/60">
    Photo by [Name] on Unsplash
  </div>
  {/* Rest of overlay content */}
</div>
```

**Good Unsplash searches**:
- "diverse seniors talking"
- "elderly friends community"
- "older adults conversation"
- "senior citizens happy"

**Pick images that**:
- Show dignity and joy (not medical/sad)
- Have good lighting (golden hour quality)
- Leave space for text overlay
- Match brand colors (warm tones)

---

## Performance Checklist

Before going live, verify:

- [ ] Image files are WebP format (<500KB)
- [ ] Fallback JPG exists for older browsers
- [ ] Mobile version is separate and optimized (<300KB)
- [ ] Alt text is descriptive and meaningful
- [ ] Text is legible on all screen sizes
- [ ] Layout doesn't shift when image loads
- [ ] Images load in < 2 seconds on 3G connection

---

## Example: Full Updated Homepage Hero

Here's the complete code for the hero section with cover art:

```tsx
{/* Hero Cover Image Section */}
<div className="relative min-h-[75vh] overflow-hidden">
  {/* Cover Image */}
  <div className="absolute inset-0 z-0">
    <picture>
      <source
        media="(max-width: 768px)"
        srcSet="/images/cover/cover-hero-mobile.webp"
        type="image/webp"
      />
      <source
        srcSet="/images/cover/cover-hero.webp"
        type="image/webp"
      />
      <img
        src="/images/cover/cover-hero.jpg"
        alt="Warm, dignified portrait of diverse seniors in a welcoming community space, bathed in golden afternoon light, celebrating life's next chapter with joy and connection"
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
    </picture>

    {/* Gradient overlay for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FAF8F5]" />
  </div>

  {/* Magazine Masthead */}
  <div className="relative z-10 pt-24 pb-16 px-8 md:px-16">
    <div className="text-center">
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white drop-shadow-2xl tracking-wider mb-4">
        A Place of Your Own
      </h1>
      <div className="h-px bg-white/70 w-56 mx-auto mb-4" />
      <p className="font-serif text-base md:text-lg text-white/95 drop-shadow-lg tracking-widest uppercase">
        A Special Edition • Volume 1
      </p>
    </div>
  </div>

  {/* Cover Story Teaser */}
  <div className="relative z-10 px-8 md:px-16 pb-16">
    <div className="max-w-3xl">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-[#5C4A3C] leading-tight mb-4">
          The Art of Beginning Again
        </h2>
        <p className="font-serif text-xl md:text-2xl text-[#8B7355] italic mb-8 leading-relaxed">
          Finding your place in the next chapter
        </p>

        <div className="space-y-3 text-lg text-[#5C4A3C] mb-8 border-l-4 border-[#8B7355] pl-6">
          <p>• Celebrating Transitions with Grace</p>
          <p>• Your Guide to Akron-Cleveland Living</p>
          <p>• When Children Become Caregivers</p>
          <p>• The Second Chapter of the Heart</p>
        </div>

        <Link href="/letter">
          <Button
            size="lg"
            className="group min-w-[240px] bg-[#8B7355] text-[#FAF8F5] hover:bg-[#5C4A3C] font-serif text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center">
              Open Magazine
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  </div>
</div>
```

---

## Ready to Implement?

1. ✅ Commission cover art using `docs/COVER_ART_DIRECTION.md`
2. ✅ Receive files from artist
3. ✅ Optimize images (WebP, <500KB)
4. ✅ Add to `/public/images/cover/`
5. ✅ Update `app/page.tsx` with code above
6. ✅ Test on all devices
7. ✅ Deploy!

**Questions?** Refer back to `docs/COVER_ART_DIRECTION.md` for commissioning guidance.
