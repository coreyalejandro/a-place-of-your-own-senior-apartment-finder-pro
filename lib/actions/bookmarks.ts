'use server';

import type { SearchResult } from '@/lib/google-maps/search';

export async function addBookmark(
  userId: string,
  placeId: string,
  placeData: SearchResult
): Promise<void> {
  console.log('Add bookmark:', userId, placeId, placeData);
}

export async function removeBookmark(
  userId: string,
  placeId: string
): Promise<void> {
  console.log('Remove bookmark:', userId, placeId);
}

export async function updateBookmarkNotes(
  bookmarkId: string,
  notes: string
): Promise<void> {
  console.log('Update notes:', bookmarkId, notes);
}

export async function updateBookmarkStatus(
  bookmarkId: string,
  status: 'saved' | 'toured' | 'applied' | 'declined'
): Promise<void> {
  console.log('Update status:', bookmarkId, status);
}
