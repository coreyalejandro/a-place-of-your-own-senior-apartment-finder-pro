import { NextRequest, NextResponse } from 'next/server';
import { runMonthlyArtPipeline } from '@/lib/services/artPipelineService';

/**
 * POST /api/art-pipeline
 *
 * Triggers the monthly art generation pipeline.
 *
 * Body parameters:
 * - theme: string (required) - The theme for this month's issue
 * - issueDate: string (required) - ISO date string for the issue (e.g., "2025-12-01")
 * - sourcedCount: number (optional) - Number of images to source (default: 5)
 * - generatedCount: number (optional) - Number of images to generate (default: 5)
 *
 * Example request:
 * POST /api/art-pipeline
 * {
 *   "theme": "Generational Wisdom",
 *   "issueDate": "2025-12-01",
 *   "sourcedCount": 5,
 *   "generatedCount": 5
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { theme, issueDate, sourcedCount = 5, generatedCount = 5 } = body;

    // Validate required fields
    if (!theme || typeof theme !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid required field: theme' },
        { status: 400 }
      );
    }

    if (!issueDate || typeof issueDate !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid required field: issueDate' },
        { status: 400 }
      );
    }

    // Validate environment variables
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY environment variable not configured' },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase environment variables not configured' },
        { status: 500 }
      );
    }

    // Optional: Unsplash API key
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    // Run the pipeline
    const result = await runMonthlyArtPipeline({
      geminiApiKey,
      supabaseUrl,
      supabaseServiceKey,
      unsplashAccessKey,
      theme,
      issueDate,
      sourcedCount,
      generatedCount,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Pipeline execution failed',
          details: result.stats,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Art pipeline completed successfully',
      stats: result.stats,
    });
  } catch (error) {
    console.error('Art pipeline API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/art-pipeline
 *
 * Returns information about the art pipeline system
 */
export async function GET() {
  return NextResponse.json({
    name: 'Art Pipeline System',
    version: '1.0.0',
    description: 'Automated monthly artwork generation for A Place of Your Own magazine',
    endpoints: {
      POST: {
        description: 'Trigger the art generation pipeline',
        requiredFields: ['theme', 'issueDate'],
        optionalFields: {
          sourcedCount: 'Number of images to source (default: 5)',
          generatedCount: 'Number of images to generate (default: 5)',
        },
      },
    },
    status: {
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      supabaseConfigured: !!(
        process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
      ),
      unsplashConfigured: !!process.env.UNSPLASH_ACCESS_KEY,
    },
  });
}
