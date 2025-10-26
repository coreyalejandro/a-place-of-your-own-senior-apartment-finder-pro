'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagazineNavigation } from '@/components/MagazineNavigation';
import { Button } from '@/components/ui/Button';
import { AssistantPanel } from '@/components/search/AssistantPanel';
import { VoiceSearchButton } from '@/components/search/VoiceSearchButton';
import { RealtorFilterSidebar, type RealtorFilterState, defaultRealtorFilters } from '@/components/search/RealtorFilterSidebar';
import { realtors } from '@/lib/data/realtors';
import { Search, Loader2 } from 'lucide-react';

export default function RealtorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<RealtorFilterState>(defaultRealtorFilters);

  // Apply filters to realtors
  const filteredRealtors = realtors.filter(realtor => {
    // Text search
    const matchesSearch = searchQuery === '' ||
      realtor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      realtor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      realtor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      realtor.description.toLowerCase().includes(searchQuery.toLowerCase());

    // City filter
    const matchesCity = filters.cities.length === 0 || filters.cities.includes(realtor.city);

    // Specialty filter
    const matchesSpecialty = filters.specialties.length === 0 ||
      filters.specialties.some(spec => realtor.specialty.toLowerCase().includes(spec.toLowerCase()));

    // Experience filter
    const matchesExperience = realtor.yearsExperience >= filters.minYearsExperience;

    // Services filter
    const matchesServices = filters.services.length === 0 ||
      filters.services.every(service =>
        realtor.services?.some(s => s.toLowerCase().includes(service.toLowerCase()))
      );

    return matchesSearch && matchesCity && matchesSpecialty && matchesExperience && matchesServices;
  });

  // Handle assistant search (conversational)
  const handleAssistantSearch = (query: string) => {
    setSearchQuery(query);
    // The filtering will happen automatically through filteredRealtors
  };

  // Handle voice search
  const handleVoiceTranscript = (transcript: string) => {
    setSearchQuery(transcript);
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 500);
  };

  // Handle traditional search
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 300);
  };

  return (
    <>
      <MagazineNavigation />
      <div className="min-h-screen bg-[#FAF8F5] flex pt-16">
        {/* Filter Sidebar - Traditional checkbox approach */}
        <RealtorFilterSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          filters={filters}
          onFilterChange={setFilters}
          resultCount={filteredRealtors.length}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with Search */}
          <header className="bg-white border-b-2 border-[#D4C4B0]" role="banner">
            <div className="container mx-auto px-4 py-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <Link href="/contents" className="font-serif text-3xl text-[#5C4A3C] hover:text-[#8B7355] transition-colors">
                    A Place of Your Own
                  </Link>
                  <div className="h-px bg-[#D4C4B0] w-24 mx-auto mt-2" />
                </div>

                <h1 className="font-serif text-3xl text-[#5C4A3C] mb-2 text-center">
                  Trusted Real Estate Professionals
                </h1>
                <p className="text-[#8B7355] mb-6 text-center max-w-2xl mx-auto">
                  Connect with carefully vetted, experienced professionals who understand the unique needs of senior housing transitions.
                </p>

                {/* Search Bar with Voice */}
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search by name, location, or specialty..."
                      className="w-full px-6 py-4 pr-32 border-2 border-[#D4C4B0] rounded-lg font-serif text-lg text-[#5C4A3C] placeholder:text-[#A0826D] focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                      <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="p-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[40px] min-h-[40px]"
                        aria-label="Search"
                      >
                        {isSearching ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Search className="w-5 h-5" />
                        )}
                      </button>
                      <VoiceSearchButton
                        onTranscript={handleVoiceTranscript}
                        onSearchStart={() => setIsSearching(true)}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-[#8B7355] mt-3 text-center font-serif italic">
                    Try: "senior housing specialist in Cleveland" or use the filters on the left
                  </p>
                </div>

                <div className="text-center mt-4">
                  <Link href="/realtors/guide">
                    <Button variant="outline" size="sm">
                      📖 Read Our Realtor Vetting Guide
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Results */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="container mx-auto max-w-6xl">
              <div className="mb-6">
                <p className="text-[#8B7355] text-lg">
                  {filteredRealtors.length} professional{filteredRealtors.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {filteredRealtors.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRealtors.map(realtor => (
                    <div key={realtor.id} className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 hover:shadow-lg transition-all h-full flex flex-col">
                      {/* Photo/Initials */}
                      <div className="w-20 h-20 bg-[#8B7355] rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-[#FAF8F5]">
                          {realtor.initials}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl text-[#5C4A3C] mb-2">
                        {realtor.name}
                      </h3>
                      <p className="text-[#8B7355] mb-2">{realtor.location}</p>
                      <p className="text-sm text-[#8B7355] mb-3">
                        <strong>Specialty:</strong> {realtor.specialty}
                      </p>

                      <p className="text-[#5C4A3C] mb-4 line-clamp-3 flex-grow">
                        {realtor.description}
                      </p>

                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#D4C4B0]">
                        <span className="text-sm text-[#8B7355]">
                          {realtor.yearsExperience} years exp.
                        </span>
                        <Link href={`/realtors/${realtor.id}`}>
                          <Button size="sm">View Profile</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-[#8B7355] mb-4 font-serif">
                    No realtors found matching your criteria
                  </p>
                  <p className="text-sm text-[#A0826D] mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters(defaultRealtorFilters);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <div className="text-center mt-12">
                <Link href="/dashboard">
                  <Button variant="outline">
                    ← Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>

        {/* Assistant Panel - Conversational approach */}
        <AssistantPanel onSearch={handleAssistantSearch} />
      </div>
    </>
  );
}
