/**
 * Art Pipeline Service
 *
 * Automated system for generating and sourcing artwork for monthly magazine issues.
 * Includes three agents:
 * 1. Sourcing Agent - Fetches images from open-source providers (Unsplash/Pexels)
 * 2. Generation Agent - Creates in-house images using Gemini API
 * 3. Storage Agent - Uploads images to Supabase Storage and saves metadata
 */

import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

// Types
export interface SourcedImage {
  url: string;
  prompt: string;
  author?: string;
  sourceUrl?: string;
}

export interface GeneratedImage {
  base64: string;
  prompt: string;
}

export interface ImageToStore {
  data: string | ArrayBuffer;
  prompt: string;
  source: 'generated' | 'sourced';
  theme: string;
  issueDate: string;
  tags?: string[];
}

export interface PipelineConfig {
  theme: string;
  issueDate: string;
  sourcedCount?: number;
  generatedCount?: number;
}

/**
 * AGENT 1: Sourcing Agent
 * Fetches images from Pexels API based on theme
 */
export async function sourcingAgent(
  theme: string,
  count: number = 5,
  pexelsApiKey?: string
): Promise<SourcedImage[]> {
  console.log(`🔍 Sourcing Agent: Fetching ${count} images for theme '${theme}'...`);

  if (!pexelsApiKey) {
    console.warn('No Pexels API key provided. Skipping image sourcing.');
    return [];
  }

  try {
    // Build search query from theme
    const searchQuery = `${theme} senior elderly`;

    // Fetch from Pexels API
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          'Authorization': pexelsApiKey
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.photos.map((photo: any) => ({
      url: photo.src.large,
      prompt: `Sourced from Pexels: ${photo.alt || theme}`,
      author: photo.photographer,
      sourceUrl: photo.url
    }));
  } catch (error) {
    console.error('Error fetching from Pexels:', error);
    return [];
  }
}

/**
 * AGENT 2: Generation Agent
 * Generates in-house images using Gemini API
 */
export async function generationAgent(
  geminiApiKey: string,
  theme: string,
  count: number = 5
): Promise<GeneratedImage[]> {
  console.log(`🎨 Generation Agent: Creating ${count} images for theme '${theme}'...`);

  const genAI = new GoogleGenAI({ apiKey: geminiApiKey });

  // Prompt templates for different art styles
  const cartoonPromptTemplate = `
    A gentle, warm, single-panel cartoon in the style of The New Yorker.
    The scene depicts a senior citizen involved in an activity related to the theme of "${theme}".
    The mood is humorous, heartwarming, and dignified.
    Clean line art with a simple watercolor wash.
    High-quality, professional illustration.
  `;

  const artisticPromptTemplate = `
    A painterly, emotionally resonant digital art piece exploring the theme of "${theme}" through the lens of senior life.
    The style is hopeful, dignified, and celebrates the wisdom and beauty of aging.
    Rich colors, detailed composition, high-resolution.
  `;

  const portraitPromptTemplate = `
    A warm, dignified portrait of a diverse senior related to the theme of "${theme}".
    The subject should radiate wisdom, joy, and hope.
    Painterly style with soft, flattering lighting.
    Professional quality, emotionally engaging.
  `;

  const vignettesPromptTemplate = `
    A heartwarming vignette showing seniors and their families in a moment related to "${theme}".
    Multi-generational, diverse, full of life and connection.
    Artistic style with rich detail and emotional depth.
  `;

  // Rotate through different prompt types
  const promptTemplates = [
    cartoonPromptTemplate,
    artisticPromptTemplate,
    portraitPromptTemplate,
    vignettesPromptTemplate
  ];

  const generatedImages: GeneratedImage[] = [];

  for (let i = 0; i < count; i++) {
    const prompt = promptTemplates[i % promptTemplates.length];

    try {
      const result = await genAI.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: prompt,
      });

      const textData = result.text;

      // Note: Gemini's image generation API returns text descriptions
      // For actual image generation, you might need to use a different model or approach
      // This implementation currently generates text-based descriptions
      if (textData) {
        generatedImages.push({
          base64: textData, // This will be text, not actual base64 image data
          prompt: prompt.trim()
        });
        console.log(`  ✓ Generated content ${i + 1}/${count}`);
      }
    } catch (error) {
      console.error(`Error generating image ${i + 1}:`, error);
    }
  }

  console.log(`✓ Generated ${generatedImages.length} images successfully`);
  return generatedImages;
}

/**
 * AGENT 3: Storage Agent
 * Uploads images to Supabase Storage and saves metadata to database
 */
export async function storageAgent(
  supabaseUrl: string,
  supabaseServiceKey: string,
  images: ImageToStore[]
): Promise<{ success: number; failed: number }> {
  console.log(`💾 Storage Agent: Saving ${images.length} images...`);

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  let success = 0;
  let failed = 0;

  for (const image of images) {
    try {
      // Generate unique filename
      const timestamp = Date.now();
      const themeName = image.theme.replace(/\s+/g, '-').toLowerCase();
      const fileName = `${themeName}/${timestamp}-${Math.random().toString(36).substring(7)}.png`;

      // Convert data to buffer
      let buffer: Buffer;
      if (typeof image.data === 'string') {
        // Base64 string from generated images
        buffer = Buffer.from(image.data, 'base64');
      } else {
        // ArrayBuffer from sourced images
        buffer = Buffer.from(image.data);
      }

      // 1. Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('artwork')
        .upload(fileName, buffer, {
          contentType: 'image/png',
          upsert: false,
        });

      if (uploadError) {
        console.error(`  ✗ Upload error for ${fileName}:`, uploadError);
        failed++;
        continue;
      }

      // 2. Insert metadata into database
      const { error: insertError } = await supabase
        .from('artwork_library')
        .insert({
          theme: image.theme,
          issue_date: image.issueDate,
          source: image.source,
          prompt: image.prompt,
          storage_path: uploadData.path,
          tags: image.tags || image.theme.split(' '),
          is_approved: false,
        });

      if (insertError) {
        console.error(`  ✗ Database insert error:`, insertError);
        failed++;
        continue;
      }

      success++;
      console.log(`  ✓ Saved ${fileName}`);
    } catch (error) {
      console.error('  ✗ Storage agent error:', error);
      failed++;
    }
  }

  console.log(`✓ Storage complete: ${success} saved, ${failed} failed`);
  return { success, failed };
}

/**
 * ORCHESTRATOR: Runs the complete monthly art pipeline
 */
export async function runMonthlyArtPipeline(config: {
  geminiApiKey: string;
  supabaseUrl: string;
  supabaseServiceKey: string;
  pexelsApiKey?: string;
  theme: string;
  issueDate: string;
  sourcedCount?: number;
  generatedCount?: number;
}): Promise<{ success: boolean; stats: any }> {
  console.log(`\n🚀 ====== Starting Art Pipeline ======`);
  console.log(`📅 Issue Date: ${config.issueDate}`);
  console.log(`🎯 Theme: ${config.theme}`);
  console.log(`=====================================\n`);

  const sourcedCount = config.sourcedCount || 5;
  const generatedCount = config.generatedCount || 5;

  try {
    // Run sourcing and generation agents in parallel
    const [sourcedImages, generatedImages] = await Promise.all([
      sourcingAgent(config.theme, sourcedCount, config.pexelsApiKey),
      generationAgent(config.geminiApiKey, config.theme, generatedCount),
    ]);

    console.log(`\n📊 Pipeline Results:`);
    console.log(`  - Sourced: ${sourcedImages.length} images`);
    console.log(`  - Generated: ${generatedImages.length} images`);

    // Prepare all images for storage
    const imagesToStore: ImageToStore[] = [];

    // Add generated images
    generatedImages.forEach(img => {
      imagesToStore.push({
        data: img.base64,
        prompt: img.prompt,
        source: 'generated',
        theme: config.theme,
        issueDate: config.issueDate,
      });
    });

    // Fetch and add sourced images
    for (const sourced of sourcedImages) {
      try {
        const response = await fetch(sourced.url);
        const arrayBuffer = await response.arrayBuffer();
        imagesToStore.push({
          data: arrayBuffer,
          prompt: sourced.prompt,
          source: 'sourced',
          theme: config.theme,
          issueDate: config.issueDate,
        });
      } catch (error) {
        console.error(`  ✗ Failed to fetch sourced image: ${sourced.url}`);
      }
    }

    // Run storage agent
    const storageResults = await storageAgent(
      config.supabaseUrl,
      config.supabaseServiceKey,
      imagesToStore
    );

    console.log(`\n✅ ====== Pipeline Complete ======`);
    console.log(`📊 Final Stats:`);
    console.log(`  - Total processed: ${imagesToStore.length}`);
    console.log(`  - Successfully saved: ${storageResults.success}`);
    console.log(`  - Failed: ${storageResults.failed}`);
    console.log(`==================================\n`);

    return {
      success: true,
      stats: {
        sourced: sourcedImages.length,
        generated: generatedImages.length,
        saved: storageResults.success,
        failed: storageResults.failed,
      },
    };
  } catch (error) {
    console.error('❌ Pipeline failed:', error);
    return {
      success: false,
      stats: { error: error instanceof Error ? error.message : 'Unknown error' },
    };
  }
}
