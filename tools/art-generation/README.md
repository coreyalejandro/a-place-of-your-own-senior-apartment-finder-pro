# Art Generation Tools

This directory contains tools for batch-generating cohesive artwork for "A Place of Your Own" magazine and marketing materials.

## Files

### 1. `the_heart_of_home_batch_full.json`
Complete batch prompt file containing 30 professionally crafted prompts for generating senior housing scenes:
- Diverse seniors in various housing scenarios
- Consistent visual theme: "digital art, painterly realism, warm light"
- Covers apartments, community spaces, courtyards, and shared activities
- Each scene emphasizes dignity, connection, and belonging

### 2. `generate_heart_of_home.ipynb`
Google Colab notebook for executing the batch generation:
- Uses Google's Imagen 3.0 / Gemini Pro 2.5
- Generates all 30 images with consistent styling
- Includes preview, download, and metadata export
- Can upload to Google Cloud Storage

## Quick Start

### Option 1: Google Colab (Recommended)

1. Open `generate_heart_of_home.ipynb` in [Google Colab](https://colab.research.google.com)
2. Upload `the_heart_of_home_batch_full.json` when prompted
3. Set your `PROJECT_ID` in the configuration cell
4. Run all cells to generate images
5. Download the ZIP file with all images

### Option 2: Local Execution

If you have Vertex AI credentials configured locally:

```bash
# Install dependencies
pip install google-cloud-aiplatform google-cloud-storage pillow tqdm

# Run the generation script
jupyter notebook generate_heart_of_home.ipynb
```

## Configuration

Before running, update these values in the notebook:

```python
PROJECT_ID = "your-gcp-project-id"
LOCATION = "us-central1"
OUTPUT_BUCKET = "gs://your-bucket/heart_of_home_outputs"
```

## Output

The notebook generates:
- **30 PNG images** (one per scene)
- **Metadata CSV** with prompts, scene types, and housing categories
- **ZIP archive** for easy download

### Naming Convention

Images are named by their scene ID:
```
01_grandmother_balcony_evening.png
02_couple_kitchen_morning.png
03_grandfather_woodworking.png
...
30_welcome_new_resident.png
```

## Best Practices

### 🎨 Style Consistency
- All prompts include `"digital art, painterly realism, warm light"`
- Ensures cohesive visual theme across the entire collection
- Do NOT modify the style descriptors unless regenerating all images

### 🏠 Housing Continuity
- Scenes reference specific housing elements (balconies, courtyards, community rooms)
- Maintains architectural consistency throughout
- Backgrounds always show senior housing context

### 💾 Storage & Curation

After generation:
1. Review all images for quality and consistency
2. Store metadata CSV for caption generation and licensing
3. Upload high-quality versions to cloud storage
4. Keep originals; create web-optimized versions separately

### 🖥️ Post-Processing (Optional)

For final polish:
1. Apply a unified color LUT in Photoshop/Lightroom
2. Export web-safe PNGs at consistent dimensions (1920×1080 or 2048×1152)
3. Optimize for web (use tools like TinyPNG or ImageOptim)

## Integration with Art Pipeline

These tools complement the automated monthly art pipeline (`/lib/services/artPipelineService.ts`):

- **Monthly Pipeline**: Sources + generates artwork automatically
- **Batch Tools**: Generates large cohesive collections for special projects
- **Combined Use**: Use batch-generated images as "sourced" content in monthly pipeline

## Use Cases

### Marketing & Website
- Hero images for landing pages
- Carousel showcasing housing diversity
- Blog post headers and featured images

### Magazine Content
- Article illustrations
- Full-page spreads
- Cover art candidates
- Section dividers

### Investor & Partnership Materials
- Pitch deck imagery
- Partner presentations
- Grant applications
- Media kit assets

## Cost Considerations

**Imagen 3.0 Pricing** (as of 2024):
- ~$0.02 per image generation
- Full batch (30 images): ~$0.60
- Very affordable for high-quality, cohesive artwork

## Troubleshooting

### "Authentication failed"
- Run `gcloud auth application-default login`
- Or use Google Colab authentication cell

### "Quota exceeded"
- Vertex AI has rate limits
- Add `time.sleep(3)` between requests if needed
- Consider breaking into smaller batches

### "Content filtered"
- Imagen has safety filters
- All prompts are pre-validated to pass filters
- If issues occur, contact Google Cloud support

## Support

For questions about:
- **Art pipeline integration**: See `/docs/ART_PIPELINE_SETUP.md`
- **Gemini API usage**: See `/docs/AUTOMATING_A_PLACE_OF_YOUR_OWN_ART_SYSTEM.md`
- **General setup**: See main project README

---

**Created for A Place of Your Own — Celebrating Seniors, Wisdom, and Home**
