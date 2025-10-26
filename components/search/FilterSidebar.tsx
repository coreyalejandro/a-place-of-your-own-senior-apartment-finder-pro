'use client';

import { useState, useEffect } from 'react';
import { Save, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export interface FilterState {
  // Housing Preferences
  propertyTypes: string[];
  budgetMin: number;
  budgetMax: number;
  bedrooms: number;
  floorLevel: string;
  elevator: boolean;
  amenities: string[];

  // Pets
  hasPets: boolean;
  petTypes: string[];
  petSize: string;

  // Lifestyle
  gardening: boolean;
  gardenSpaces: string[];
  activities: string[];
  shoppingPreference: string;

  // Location
  cities: string[];
  proximityToFamily: string;
  proximities: string[];

  // Security
  securityFeatures: string[];

  // Accessibility
  mobilityConcerns: boolean;
  accessibilityFeatures: string[];
  medicalProximity: string;
  assistiveDevices: string[];
}

export const defaultFilters: FilterState = {
  propertyTypes: [],
  budgetMin: 500,
  budgetMax: 3000,
  bedrooms: 0,
  floorLevel: 'any',
  elevator: false,
  amenities: [],
  hasPets: false,
  petTypes: [],
  petSize: 'any',
  gardening: false,
  gardenSpaces: [],
  activities: [],
  shoppingPreference: 'both',
  cities: [],
  proximityToFamily: 'flexible',
  proximities: [],
  securityFeatures: [],
  mobilityConcerns: false,
  accessibilityFeatures: [],
  medicalProximity: 'flexible',
  assistiveDevices: [],
};

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}

export function FilterSidebar({ isOpen, onToggle, filters, onFilterChange, resultCount }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    housing: true,
    lifestyle: false,
    location: true,
    security: false,
    accessibility: false,
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed left-0 top-0 z-40 h-screen w-80 transition-transform duration-300 bg-white border-r-2 border-[#D4C4B0] overflow-hidden flex-shrink-0 lg:sticky lg:translate-x-0`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-[#5C4A3C] mb-2">Refine Your Search</h2>
            <p className="font-serif text-sm text-[#8B7355] italic">
              Customize your preferences
            </p>
          </div>

          {/* Housing Preferences */}
          <div className="mb-6 border-b border-[#D4C4B0] pb-6">
            <button
              onClick={() => toggleSection('housing')}
              className="w-full flex items-center justify-between mb-4 group"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C] group-hover:text-[#8B7355] transition-colors">
                Housing Preferences
              </h3>
              {expandedSections.housing ? (
                <ChevronUp className="w-5 h-5 text-[#8B7355]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#8B7355]" />
              )}
            </button>

            {expandedSections.housing && (
              <div className="space-y-4">
                {/* Property Types */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Apartment Size</label>
                  <div className="space-y-2">
                    {['Studio', '1 Bedroom', '2 Bedrooms', '3+ Bedrooms'].map((type) => (
                      <label key={type} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.propertyTypes.includes(type)}
                          onChange={() => toggleArrayFilter('propertyTypes', type)}
                          className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget Slider */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">
                    Monthly Budget: ${filters.budgetMin} - ${filters.budgetMax}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={500}
                      max={3000}
                      step={50}
                      value={filters.budgetMin}
                      onChange={(e) => updateFilter('budgetMin', Number(e.target.value))}
                      className="w-full h-2 bg-[#F5EFE7] rounded-lg appearance-none cursor-pointer accent-[#8B7355]"
                    />
                    <input
                      type="range"
                      min={500}
                      max={3000}
                      step={50}
                      value={filters.budgetMax}
                      onChange={(e) => updateFilter('budgetMax', Number(e.target.value))}
                      className="w-full h-2 bg-[#F5EFE7] rounded-lg appearance-none cursor-pointer accent-[#8B7355]"
                    />
                  </div>
                </div>

                {/* Floor Level */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Floor Preference</label>
                  <div className="space-y-2">
                    {[
                      { value: 'ground', label: 'Ground floor preferred' },
                      { value: 'higher', label: 'Higher floors (with elevator)' },
                      { value: 'any', label: 'No preference' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="floorLevel"
                          checked={filters.floorLevel === option.value}
                          onChange={() => updateFilter('floorLevel', option.value)}
                          className="w-4 h-4 border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Elevator Required */}
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.elevator}
                    onChange={(e) => updateFilter('elevator', e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                  />
                  <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                    Elevator is required
                  </span>
                </label>

                {/* Amenities */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Must-Have Amenities</label>
                  <div className="space-y-2">
                    {['Washer/Dryer', 'Balcony', 'Parking', 'Pet-Friendly', 'Quiet'].map((amenity) => (
                      <label key={amenity} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={() => toggleArrayFilter('amenities', amenity)}
                          className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pets */}
                <div>
                  <label className="flex items-center cursor-pointer group mb-2">
                    <input
                      type="checkbox"
                      checked={filters.hasPets}
                      onChange={(e) => updateFilter('hasPets', e.target.checked)}
                      className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                    />
                    <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                      I have pets
                    </span>
                  </label>

                  {filters.hasPets && (
                    <div className="ml-6 space-y-2 mt-2">
                      {['Dog', 'Cat', 'Other'].map((pet) => (
                        <label key={pet} className="flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.petTypes.includes(pet)}
                            onChange={() => toggleArrayFilter('petTypes', pet)}
                            className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                          />
                          <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                            {pet}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Lifestyle & Hobbies */}
          <div className="mb-6 border-b border-[#D4C4B0] pb-6">
            <button
              onClick={() => toggleSection('lifestyle')}
              className="w-full flex items-center justify-between mb-4 group"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C] group-hover:text-[#8B7355] transition-colors">
                Lifestyle & Hobbies
              </h3>
              {expandedSections.lifestyle ? (
                <ChevronUp className="w-5 h-5 text-[#8B7355]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#8B7355]" />
              )}
            </button>

            {expandedSections.lifestyle && (
              <div className="space-y-4">
                {/* Gardening */}
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.gardening}
                    onChange={(e) => updateFilter('gardening', e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                  />
                  <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                    I enjoy gardening
                  </span>
                </label>

                {/* Shopping Preference */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Shopping Preferences</label>
                  <div className="space-y-2">
                    {[
                      { value: 'online', label: 'Mostly online' },
                      { value: 'in-person', label: 'Prefer in-person' },
                      { value: 'both', label: 'Both' },
                    ].map((pref) => (
                      <label key={pref.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="shopping"
                          checked={filters.shoppingPreference === pref.value}
                          onChange={() => updateFilter('shoppingPreference', pref.value)}
                          className="w-4 h-4 border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {pref.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location Preferences */}
          <div className="mb-6 border-b border-[#D4C4B0] pb-6">
            <button
              onClick={() => toggleSection('location')}
              className="w-full flex items-center justify-between mb-4 group"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C] group-hover:text-[#8B7355] transition-colors">
                Location Preferences
              </h3>
              {expandedSections.location ? (
                <ChevronUp className="w-5 h-5 text-[#8B7355]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#8B7355]" />
              )}
            </button>

            {expandedSections.location && (
              <div className="space-y-4">
                {/* Cities */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Preferred Cities</label>
                  <div className="space-y-2">
                    {['Akron', 'Cleveland', 'Canton', 'Parma', 'Lakewood'].map((city) => (
                      <label key={city} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.cities.includes(city)}
                          onChange={() => toggleArrayFilter('cities', city)}
                          className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {city}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Proximity to Family */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Proximity to Family</label>
                  <div className="space-y-2">
                    {[
                      { value: 'very-close', label: 'Within 5 miles' },
                      { value: 'close', label: 'Within 10 miles' },
                      { value: 'moderate', label: 'Within 20 miles' },
                      { value: 'flexible', label: "Distance doesn't matter" },
                    ].map((prox) => (
                      <label key={prox.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="proximityToFamily"
                          checked={filters.proximityToFamily === prox.value}
                          onChange={() => updateFilter('proximityToFamily', prox.value)}
                          className="w-4 h-4 border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {prox.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Important Proximities */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Important Proximities</label>
                  <div className="space-y-2">
                    {['Transit', 'Shopping', 'Medical', 'Parks', 'Restaurants'].map((prox) => (
                      <label key={prox} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.proximities.includes(prox)}
                          onChange={() => toggleArrayFilter('proximities', prox)}
                          className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {prox}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security & Safety */}
          <div className="mb-6 border-b border-[#D4C4B0] pb-6">
            <button
              onClick={() => toggleSection('security')}
              className="w-full flex items-center justify-between mb-4 group"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C] group-hover:text-[#8B7355] transition-colors">
                Security & Safety
              </h3>
              {expandedSections.security ? (
                <ChevronUp className="w-5 h-5 text-[#8B7355]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#8B7355]" />
              )}
            </button>

            {expandedSections.security && (
              <div className="space-y-2">
                {[
                  { value: 'gated', label: 'Gated community' },
                  { value: '24-7-security', label: '24/7 building security' },
                  { value: 'secure-entry', label: 'Secure entry' },
                  { value: 'cameras', label: 'Security cameras' },
                  { value: 'well-lit', label: 'Well-lit areas' },
                ].map((feature) => (
                  <label key={feature.value} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.securityFeatures.includes(feature.value)}
                      onChange={() => toggleArrayFilter('securityFeatures', feature.value)}
                      className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                    />
                    <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                      {feature.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Health & Accessibility */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('accessibility')}
              className="w-full flex items-center justify-between mb-4 group"
            >
              <h3 className="font-serif text-lg text-[#5C4A3C] group-hover:text-[#8B7355] transition-colors">
                Health & Accessibility
              </h3>
              {expandedSections.accessibility ? (
                <ChevronUp className="w-5 h-5 text-[#8B7355]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#8B7355]" />
              )}
            </button>

            {expandedSections.accessibility && (
              <div className="space-y-4">
                {/* Mobility Concerns */}
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.mobilityConcerns}
                    onChange={(e) => updateFilter('mobilityConcerns', e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                  />
                  <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                    I have mobility concerns
                  </span>
                </label>

                {/* Accessibility Features */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Accessibility Features</label>
                  <div className="space-y-2">
                    {[
                      { value: 'grab-bars', label: 'Grab bars' },
                      { value: 'wide-doorways', label: 'Wide doorways' },
                      { value: 'walk-in-shower', label: 'Walk-in shower' },
                      { value: 'no-stairs', label: 'No stairs' },
                    ].map((feature) => (
                      <label key={feature.value} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.accessibilityFeatures.includes(feature.value)}
                          onChange={() => toggleArrayFilter('accessibilityFeatures', feature.value)}
                          className="w-4 h-4 rounded border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {feature.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Medical Proximity */}
                <div>
                  <label className="font-serif text-sm text-[#5C4A3C] block mb-2">Medical Care Proximity</label>
                  <div className="space-y-2">
                    {[
                      { value: 'essential', label: 'Essential - very close' },
                      { value: 'important', label: 'Important - within 30 min' },
                      { value: 'moderate', label: 'Moderate - within 1 hour' },
                      { value: 'flexible', label: 'Flexible' },
                    ].map((prox) => (
                      <label key={prox.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="medicalProximity"
                          checked={filters.medicalProximity === prox.value}
                          onChange={() => updateFilter('medicalProximity', prox.value)}
                          className="w-4 h-4 border-2 border-[#D4C4B0] text-[#8B7355] focus:ring-[#8B7355] focus:ring-offset-0"
                        />
                        <span className="ml-2 font-serif text-sm text-[#8B7355] group-hover:text-[#5C4A3C]">
                          {prox.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result Count */}
          <div className="text-center pt-6 border-t-2 border-[#D4C4B0]">
            <p className="font-serif text-sm text-[#8B7355]">
              {resultCount} {resultCount === 1 ? 'residence' : 'residences'} found
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Toggle button for mobile */}
      <button
        onClick={onToggle}
        className="fixed left-4 top-24 z-50 bg-white border-2 border-[#D4C4B0] rounded-lg p-2 shadow-lg hover:bg-[#FAF8F5] transition-colors lg:hidden"
        aria-label={isOpen ? 'Close filters' : 'Open filters'}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-[#8B7355]" />
        ) : (
          <ChevronRight className="w-5 h-5 text-[#8B7355]" />
        )}
      </button>
    </>
  );
}
