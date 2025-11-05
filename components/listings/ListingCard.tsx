'use client';

interface Listing {
  id: string;
  name: string;
  address: string;
  price?: string;
  rating?: number;
  photoUrl?: string;
}

interface ListingCardProps {
  listing: Listing;
  isBookmarked?: boolean;
  onBookmarkToggle?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function ListingCard({
  listing,
  isBookmarked = false,
  onBookmarkToggle,
  onClick
}: ListingCardProps) {
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(listing.id);
  };

  return (
    <article
      className="magazine-card group hover:shadow-lg transition-all flex flex-col h-full"
      aria-label={`${listing.name} listing`}
    >
      {listing.photoUrl && (
        <div className="relative aspect-video mb-4 rounded-md overflow-hidden bg-[#D3C5A0]">
          {/* Use regular img tag - Next.js Image optimization doesn't work with Google Places API media URLs */}
          <img
            src={listing.photoUrl}
            alt={`${listing.name} exterior`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load:', listing.photoUrl);
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {onBookmarkToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle(listing.id);
              }}
              className="absolute top-3 right-3 w-10 h-10 bg-[#F8F3E7]/95 rounded-full flex items-center justify-center hover:bg-[#C48F4A] transition-colors"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {isBookmarked ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      )}

      <div className="space-y-2 flex-grow">
        <h3 className="font-display text-2xl text-[#1C1C1C] leading-tight line-clamp-2 group-hover:text-[#C48F4A] transition-colors">
          {listing.name}
        </h3>

        <p className="font-serif text-[#4B3E2B] text-base line-clamp-2">
          {listing.address}
        </p>

        {listing.rating && (
          <div className="flex items-center gap-2">
            <span className="font-sans text-[#855E2B] text-sm">
              ⭐ {listing.rating.toFixed(1)} rating
            </span>
          </div>
        )}

        {listing.price && (
          <p className="text-xl text-[#1C1C1C] font-serif font-medium">
            {listing.price}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[#D3C5A0] flex gap-3">
        <button
          onClick={handleViewDetails}
          className="flex-1 px-4 py-2 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors font-sans font-medium"
        >
          View Details
        </button>
        <button className="px-4 py-2 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors font-sans font-medium">
          Share
        </button>
      </div>
    </article>
  );
}
