# Art Pipeline System - Setup & Usage Guide

## Overview

The Art Pipeline System is an automated, agentic architecture for generating monthly magazine artwork for "A Place of Your Own." It combines:
- **Sourcing Agent**: Fetches curated images from Unsplash
- **Generation Agent**: Creates unique artwork using Google's Gemini AI
- **Storage Agent**: Manages uploads to Supabase Storage and metadata

This system helps build a proprietary library of high-quality, unique artwork over time.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Monthly Art Pipeline                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────┐  │
│  │   Sourcing   │      │  Generation  │      │ Storage  │  │
│  │    Agent     │─────▶│    Agent     │─────▶│  Agent   │  │
│  │  (Unsplash)  │      │   (Gemini)   │      │(Supabase)│  │
│  └──────────────┘      └──────────────┘      └──────────┘  │
│         │                      │                     │       │
│         │                      │                     │       │
│         ▼                      ▼                     ▼       │
│  5 Sourced Images      5 Generated Images     Database +    │
│                                                 Storage      │
└─────────────────────────────────────────────────────────────┘
```

---

## Setup

### 1. Environment Variables

Add the following to your `.env.local` file:

```bash
# Required: Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Required: Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Unsplash (for sourcing images)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

#### Getting API Keys:

**Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the key and add to `.env.local`

**Unsplash Access Key (Optional):**
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Register your application
3. Copy the "Access Key" from your app dashboard
4. Add to `.env.local`

### 2. Database Setup

Run the Supabase migration to create the `artwork_library` table:

```bash
# If using Supabase CLI locally
supabase migration up

# Or apply the migration directly in Supabase Dashboard:
# 1. Go to SQL Editor in your Supabase project
# 2. Run the contents of supabase/migrations/004_create_artwork_library.sql
```

### 3. Storage Bucket Setup

Create the `artwork` storage bucket in Supabase:

1. Go to **Storage** in your Supabase dashboard
2. Click **New Bucket**
3. Set name as `artwork`
4. Make it **public** (so images can be displayed)
5. Click **Create**

Then set storage policies:

```sql
-- Allow public viewing of artwork
CREATE POLICY "Public can view artwork"
ON storage.objects FOR SELECT
USING (bucket_id = 'artwork');

-- Allow authenticated users to upload artwork
CREATE POLICY "Authenticated users can upload artwork"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'artwork' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their artwork
CREATE POLICY "Authenticated users can delete artwork"
ON storage.objects FOR DELETE
USING (bucket_id = 'artwork' AND auth.role() = 'authenticated');
```

### 4. Install Dependencies

```bash
npm install
```

---

## Usage

### Manual Pipeline Trigger

#### Via API Call

Trigger the pipeline manually using the API:

```bash
curl -X POST http://localhost:3000/api/art-pipeline \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "Generational Wisdom",
    "issueDate": "2025-12-01",
    "sourcedCount": 5,
    "generatedCount": 5
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Art pipeline completed successfully",
  "stats": {
    "sourced": 5,
    "generated": 5,
    "saved": 10,
    "failed": 0
  }
}
```

#### Via Code

```typescript
import { runMonthlyArtPipeline } from '@/lib/services/artPipelineService';

const result = await runMonthlyArtPipeline({
  geminiApiKey: process.env.GEMINI_API_KEY!,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
  theme: 'Second Chapters',
  issueDate: '2026-01-01',
  sourcedCount: 5,
  generatedCount: 5,
});

console.log(result);
```

### Automated Monthly Execution

For automated execution, set up a cron job:

#### Option 1: Using Vercel Cron Jobs

Create `app/api/cron/monthly-art/route.ts`:

```typescript
import { runMonthlyArtPipeline } from '@/lib/services/artPipelineService';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Calculate next issue date (3 months in advance)
  const issueDate = new Date();
  issueDate.setMonth(issueDate.getMonth() + 3);

  // Define this month's theme (could come from a database)
  const theme = 'Joy in Community'; // Update as needed

  const result = await runMonthlyArtPipeline({
    geminiApiKey: process.env.GEMINI_API_KEY!,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
    theme,
    issueDate: issueDate.toISOString().split('T')[0],
  });

  return Response.json(result);
}
```

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/monthly-art",
    "schedule": "0 0 1 * *"
  }]
}
```

#### Option 2: Using GitHub Actions

Create `.github/workflows/monthly-art-pipeline.yml`:

```yaml
name: Monthly Art Pipeline

on:
  schedule:
    - cron: '0 0 1 * *' # First day of every month at midnight
  workflow_dispatch: # Manual trigger

jobs:
  generate-art:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Art Pipeline
        run: |
          curl -X POST ${{ secrets.APP_URL }}/api/art-pipeline \
            -H "Content-Type: application/json" \
            -d '{
              "theme": "Monthly Theme",
              "issueDate": "$(date -d '+3 months' '+%Y-%m-01')",
              "sourcedCount": 5,
              "generatedCount": 5
            }'
```

---

## Artwork Management

### Viewing Generated Artwork

```bash
# Get all artwork
curl http://localhost:3000/api/artwork

# Filter by theme
curl http://localhost:3000/api/artwork?theme=Generational%20Wisdom

# Filter by approval status
curl http://localhost:3000/api/artwork?approved=false

# Filter by issue date
curl http://localhost:3000/api/artwork?issueDate=2025-12-01
```

### Approving/Rejecting Artwork

```bash
# Approve artwork
curl -X PATCH http://localhost:3000/api/artwork \
  -H "Content-Type: application/json" \
  -d '{
    "id": "artwork-uuid-here",
    "isApproved": true
  }'

# Reject artwork (mark as not approved)
curl -X PATCH http://localhost:3000/api/artwork \
  -H "Content-Type: application/json" \
  -d '{
    "id": "artwork-uuid-here",
    "isApproved": false
  }'
```

### Deleting Artwork

```bash
curl -X DELETE "http://localhost:3000/api/artwork?id=artwork-uuid-here"
```

---

## Prompts for First Cover Art

Based on your vision inspired by Kadir Nelson's "Say Their Names," here are the prompts to generate the first cover art in Gemini:

### Step 1: Generate Base Skyline & Reflection

```
A minimalist digital art piece. The top two-thirds of the image is a solid, warm golden tan background (#FAF8F5).
In the center, place a stark, matted black silhouette of the Akron, Ohio skyline.
The bottom third of the image is a shimmering, stylized water reflection of the skyline. The reflection glows with warm, hopeful oranges and golds, as if reflecting a sunrise.
The style is clean, graphic, and high-resolution.
```

### Step 2: Generate Final Composite Cover Art

```
Create a vibrant and hopeful digital mural in the artistic spirit of Kadir Nelson.
The central element is a stark, matted black silhouette of the Akron, Ohio skyline.
This silhouette is completely filled with a dense, rich, and overlapping collage of painterly portraits.
These portraits depict a myriad of seniors of all racial, ethnic, gender, and sexual-orientation diversities. Interspersed are vignettes of them with their families: grandchildren, children, and partners of all generations.
The faces are full of life, wisdom, and hope, with sparkling eyes looking out past the horizon towards the future. Their clothing is a mix of modern and traditional styles.
The background behind the skyline is a solid, warm golden tan (#FAF8F5).
Below the skyline, the bottom third of the image is a shimmering water reflection. The reflection is not of the portraits, but of the glowing colors of a hopeful sunrise, in warm oranges and golds.
The overall mood is alive, breathing, and celebratory. High-resolution, detailed, and emotionally resonant.
```

---

## Customization

### Adding More Prompt Templates

Edit `lib/services/artPipelineService.ts` and add to the `generationAgent` function:

```typescript
const myCustomPromptTemplate = `
  Your custom prompt for generating artwork related to "${theme}".
  Add style instructions, mood, composition details, etc.
`;

const promptTemplates = [
  cartoonPromptTemplate,
  artisticPromptTemplate,
  portraitPromptTemplate,
  vignettesPromptTemplate,
  myCustomPromptTemplate, // Add your custom template
];
```

### Adjusting Generation Counts

Change default counts in the API route or when calling the function:

```typescript
const result = await runMonthlyArtPipeline({
  // ... other config
  sourcedCount: 10,  // More sourced images
  generatedCount: 15, // More generated images
});
```

---

## Troubleshooting

### Gemini API Errors

**Error: API key not valid**
- Verify your `GEMINI_API_KEY` in `.env.local`
- Ensure the key is active in Google AI Studio

**Error: Model not found**
- Check if you're using the correct model name
- Update to latest Gemini model if needed

### Supabase Storage Errors

**Error: Bucket not found**
- Create the `artwork` bucket in Supabase Dashboard
- Ensure it's set to public

**Error: Permission denied**
- Check storage policies are set correctly
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct

### Unsplash API Errors

**Error: Rate limit exceeded**
- Unsplash free tier has rate limits
- Consider upgrading or reducing `sourcedCount`

---

## Cost Considerations

### Gemini API
- Check [Google AI Studio Pricing](https://ai.google.dev/pricing)
- Image generation costs vary by model
- Monitor usage in Google Cloud Console

### Unsplash API
- Free tier: 50 requests/hour
- Paid plans available for higher volume

### Supabase Storage
- Free tier: 1GB storage
- Monitor usage in Supabase Dashboard

---

## Next Steps

1. **Build an Admin UI**: Create a dashboard to:
   - View all generated artwork
   - Approve/reject images with one click
   - Preview artwork before approval
   - Manage monthly themes

2. **Implement Scheduling**: Set up automated monthly generation

3. **Add Analytics**: Track which artwork performs best

4. **Enhance Prompts**: Refine generation prompts based on results

---

## Support

For issues or questions:
- Check the [main documentation](../README.md)
- Review [Gemini API docs](https://ai.google.dev/docs)
- Review [Supabase docs](https://supabase.com/docs)
