'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export interface RealtorFilterState {
  // Location
  cities: string[];

  // Specialties
  specialties: string[];

  // Experience
  minYearsExperience: number;

  // Languages
  languages: string[];

  // Services
  services: string[];

  // Certifications
  certifications: string[];

  // Availability
  availability: string[];
}

export const defaultRealtorFilters: RealtorFilterState = {
  cities: [],
  specialties: [],
  minYearsExperience: 0,
  languages: [],
  services: [],
  certifications: [],
  availability: [],
};

interface RealtorFilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: RealtorFilterState;
  onFilterChange: (filters: RealtorFilterState) => void;
  resultCount: number;
}

export function RealtorFilterSidebar({
  isOpen,
  onToggle,
  filters,
  onFilterChange,
  resultCount
}: RealtorFilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    specialty: true,
    experience: false,
    services: false,
  });

  const updateFilter = (key: keyof RealtorFilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof RealtorFilterState, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    onFilterChange(defaultRealtorFilters);
  };

  return (
    <>
      {/* Toggle button for mobile/collapsed */}
      <button
        onClick={onToggle}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-[#8B7355] text-white p-3 rounded-r-lg shadow-lg z-40 hover:bg-[#5C4A3C] transition-colors"
        aria-label={isOpen ? 'Close filters' : 'Open filters'}
      >
        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-80 bg-white border-r-2 border-[#D4C4B0] overflow-y-auto transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Realtor search filters"
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-[#5C4A3C] mb-2">Filter Realtors</h2>
            <p className="text-sm text-[#8B7355]">{resultCount} matches</p>
          </div>

          {/* Clear All */}
          <button
            onClick={clearAllFilters}
            className="w-full mb-6 px-4 py-2 text-sm text-[#8B7355] border border-[#D4C4B0] rounded hover:bg-[#F5EFE7] transition-colors"
          >
            Clear All Filters
          </button>

          {/* Location Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('location')}
              className="w-full flex items-center justify-between mb-3 text-left"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C]">Location</h3>
              {expandedSections.location ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {expandedSections.location && (
              <div className="space-y-2 pl-2">
                {['Cleveland', 'Akron', 'Columbus', 'Cincinnati', 'Toledo', 'Youngstown'].map((city) => (
                  <label key={city} className="flex items-center gap-2 text-[#5C4A3C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.cities.includes(city)}
                      onChange={() => toggleArrayFilter('cities', city)}
                      className="rounded border-[#D4C4B0] focus:ring-[#8B7355]"
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Specialty Section */}
          <div className="mb-6 pb-6 border-b border-[#D4C4B0]">
            <button
              onClick={() => toggleSection('specialty')}
              className="w-full flex items-center justify-between mb-3 text-left"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C]">Specialty</h3>
              {expandedSections.specialty ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {expandedSections.specialty && (
              <div className="space-y-2 pl-2">
                {[
                  'Senior Housing',
                  'Assisted Living',
                  'Independent Living',
                  'Downsizing',
                  'First-Time Seniors',
                  'Investment Properties'
                ].map((specialty) => (
                  <label key={specialty} className="flex items-center gap-2 text-[#5C4A3C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.specialties.includes(specialty)}
                      onChange={() => toggleArrayFilter('specialties', specialty)}
                      className="rounded border-[#D4C4B0] focus:ring-[#8B7355]"
                    />
                    <span className="text-sm">{specialty}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Experience Section */}
          <div className="mb-6 pb-6 border-b border-[#D4C4B0]">
            <button
              onClick={() => toggleSection('experience')}
              className="w-full flex items-center justify-between mb-3 text-left"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C]">Experience</h3>
              {expandedSections.experience ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {expandedSections.experience && (
              <div className="space-y-4 pl-2">
                <div>
                  <label className="block text-sm text-[#5C4A3C] mb-2">
                    Minimum Years: {filters.minYearsExperience}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="5"
                    value={filters.minYearsExperience}
                    onChange={(e) => updateFilter('minYearsExperience', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#8B7355] mt-1">
                    <span>0</span>
                    <span>15</span>
                    <span>30+</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#5C4A3C]">Certifications</p>
                  {['Certified Senior Advisor', 'Accredited Buyer Representative', 'Senior Real Estate Specialist'].map((cert) => (
                    <label key={cert} className="flex items-center gap-2 text-[#5C4A3C] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.certifications.includes(cert)}
                        onChange={() => toggleArrayFilter('certifications', cert)}
                        className="rounded border-[#D4C4B0] focus:ring-[#8B7355]"
                      />
                      <span className="text-sm">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('services')}
              className="w-full flex items-center justify-between mb-3 text-left"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C]">Services</h3>
              {expandedSections.services ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {expandedSections.services && (
              <div className="space-y-2 pl-2">
                {[
                  'Home Valuation',
                  'Downsizing Consultation',
                  'Moving Coordination',
                  'Senior Community Tours',
                  'Financial Planning Referrals',
                  'Estate Sale Coordination'
                ].map((service) => (
                  <label key={service} className="flex items-center gap-2 text-[#5C4A3C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service)}
                      onChange={() => toggleArrayFilter('services', service)}
                      className="rounded border-[#D4C4B0] focus:ring-[#8B7355]"
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
}
