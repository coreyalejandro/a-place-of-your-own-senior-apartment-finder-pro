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
      className="bg-[#FAF8F5] border-2 border-[#D4C4B0] rounded-lg p-6 transition-all duration-200 hover:shadow-lg flex flex-col h-full"
      aria-label={`${listing.name} listing`}
    >
      {listing.photoUrl && (
        <div className="relative aspect-video mb-4 rounded-md overflow-hidden">
          <img
            src={listing.photoUrl}
            alt={`${listing.name} exterior`}
            className="w-full h-full object-cover"
          />
          {onBookmarkToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle(listing.id);
              }}
              className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {isBookmarked ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      )}

      <div className="space-y-2 flex-grow">
        <h3 className="font-serif text-2xl text-[#5C4A3C] leading-tight line-clamp-2">
          {listing.name}
        </h3>

        <p className="text-[#8B7355] text-base line-clamp-2">
          {listing.address}
        </p>

        {listing.rating && (
          <div className="flex items-center gap-2">
            <span className="text-[#8B7355] text-sm">
              ⭐ {listing.rating.toFixed(1)} rating
            </span>
          </div>
        )}

        {listing.price && (
          <p className="text-xl text-[#5C4A3C] font-medium">
            {listing.price}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[#D4C4B0] flex gap-3">
        <button
          onClick={handleViewDetails}
          className="flex-1 px-4 py-2 bg-[#8B7355] text-[#FAF8F5] rounded-md hover:bg-[#5C4A3C] transition-colors text-sm font-medium"
        >
          View Details
        </button>
        <button className="px-4 py-2 border border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors text-sm font-medium">
          Share
        </button>
      </div>
    </article>
  );
}
