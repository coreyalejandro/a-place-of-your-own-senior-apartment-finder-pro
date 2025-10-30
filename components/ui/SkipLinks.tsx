'use client';

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-0 left-0 z-50 px-6 py-3 bg-[#8B7355] text-[#FAF8F5] font-medium focus:outline-2 focus:outline-[#8B7355] focus:outline-offset-2"
      >
        Skip to main content
      </a>
      <a
        href="#search-results"
        className="absolute top-0 left-40 z-50 px-6 py-3 bg-[#8B7355] text-[#FAF8F5] font-medium focus:outline-2 focus:outline-[#8B7355] focus:outline-offset-2"
      >
        Skip to search results
      </a>
    </div>
  );
}
