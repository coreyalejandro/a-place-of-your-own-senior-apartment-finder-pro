import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/artwork
 *
 * Retrieves artwork from the library with optional filtering
 *
 * Query parameters:
 * - theme: Filter by theme
 * - issueDate: Filter by issue date
 * - source: Filter by source (generated|sourced)
 * - approved: Filter by approval status (true|false)
 * - limit: Number of results to return (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get('theme');
    const issueDate = searchParams.get('issueDate');
    const source = searchParams.get('source');
    const approved = searchParams.get('approved');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    let query = supabase
      .from('artwork_library')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Apply filters
    if (theme) {
      query = query.eq('theme', theme);
    }

    if (issueDate) {
      query = query.eq('issue_date', issueDate);
    }

    if (source && (source === 'generated' || source === 'sourced')) {
      query = query.eq('source', source);
    }

    if (approved !== null) {
      query = query.eq('is_approved', approved === 'true');
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch artwork', details: error.message },
        { status: 500 }
      );
    }

    // Get public URLs for each artwork
    const artworkWithUrls = data.map((artwork) => ({
      ...artwork,
      publicUrl: supabase.storage
        .from('artwork')
        .getPublicUrl(artwork.storage_path).data.publicUrl,
    }));

    return NextResponse.json({
      success: true,
      count: artworkWithUrls.length,
      artwork: artworkWithUrls,
    });
  } catch (error) {
    console.error('Artwork API error:', error);
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
 * PATCH /api/artwork
 *
 * Updates artwork (typically for approval/rejection)
 *
 * Body parameters:
 * - id: string (required) - Artwork ID
 * - isApproved: boolean (optional) - Approval status
 * - tags: string[] (optional) - Updated tags
 */
export async function PATCH(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const body = await request.json();
    const { id, isApproved, tags } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }

    // Build update object
    const updates: any = {};

    if (typeof isApproved === 'boolean') {
      updates.is_approved = isApproved;
      if (isApproved) {
        updates.approved_at = new Date().toISOString();
      }
    }

    if (Array.isArray(tags)) {
      updates.tags = tags;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Update the artwork
    const { data, error } = await supabase
      .from('artwork_library')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update artwork', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Artwork updated successfully',
      artwork: data,
    });
  } catch (error) {
    console.error('Artwork update API error:', error);
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
 * DELETE /api/artwork
 *
 * Deletes artwork from the library and storage
 *
 * Query parameters:
 * - id: string (required) - Artwork ID to delete
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }

    // Get artwork details first to delete from storage
    const { data: artwork, error: fetchError } = await supabase
      .from('artwork_library')
      .select('storage_path')
      .eq('id', id)
      .single();

    if (fetchError || !artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('artwork')
      .remove([artwork.storage_path]);

    if (storageError) {
      console.error('Failed to delete from storage:', storageError);
      // Continue with database deletion even if storage deletion fails
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('artwork_library')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to delete artwork', details: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Artwork deleted successfully',
    });
  } catch (error) {
    console.error('Artwork delete API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
