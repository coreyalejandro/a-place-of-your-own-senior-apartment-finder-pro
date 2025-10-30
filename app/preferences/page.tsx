'use client';

import { useState } from 'react';
import { Sliders } from 'lucide-react';
import Link from 'next/link';

export default function PreferencesPage() {
  const [location, setLocation] = useState('Cleveland, OH');
  const [budget, setBudget] = useState([800, 2000]);
  const [bedrooms, setBedrooms] = useState(1);
  const [housingTypes, setHousingTypes] = useState<string[]>(['senior_living']);

  return (
    <div className="magazine-page min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sliders className="w-12 h-12 icon-outlined" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-[#1C1C1C] mb-4 uppercase tracking-wide">
            Preference Setup
          </h1>
          <p className="font-serif text-xl text-[#4B3E2B] italic">
            Tell us what you're looking for
          </p>
          <hr className="section-divider mt-8" />
        </div>

        {/* Preferences Form */}
        <div className="magazine-card p-10 mb-12">
          <h2 className="font-display text-3xl text-[#1C1C1C] mb-8">Search Preferences</h2>
          
          <div className="space-y-8">
            {/* Location */}
            <div>
              <label className="block font-serif text-lg text-[#1C1C1C] mb-3">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                className="w-full px-4 py-3 border border-[#D3C5A0] rounded-md bg-[#F8F3E7] text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#C48F4A] font-serif"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block font-serif text-lg text-[#1C1C1C] mb-3">
                Monthly Budget: ${budget[0]} - ${budget[1]}
              </label>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={budget[0]}
                  onChange={(e) => setBudget([parseInt(e.target.value), budget[1]])}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 mt-2 text-sm text-[#4B3E2B] font-sans">
                <span>${budget[0]}</span>
                <span className="flex-1"></span>
                <span>${budget[1]}</span>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block font-serif text-lg text-[#1C1C1C] mb-3">
                Bedrooms
              </label>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setBedrooms(num)}
                    className={`flex-1 py-3 border rounded-md font-sans transition-colors ${
                      bedrooms === num
                        ? 'bg-[#C48F4A] text-[#F5EBD1] border-[#C48F4A]'
                        : 'bg-[#F8F3E7] text-[#4B3E2B] border-[#D3C5A0] hover:border-[#C48F4A]'
                    }`}
                  >
                    {num} Bedroom{num > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Housing Types */}
            <div>
              <label className="block font-serif text-lg text-[#1C1C1C] mb-3">
                Housing Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'senior_living', label: 'Senior Living' },
                  { value: 'assisted_living', label: 'Assisted Living' },
                  { value: 'independent_living', label: 'Independent Living' },
                  { value: 'apartment', label: 'Apartment' }
                ].map(type => (
                  <button
                    key={type.value}
                    onClick={() => {
                      if (housingTypes.includes(type.value)) {
                        setHousingTypes(housingTypes.filter(t => t !== type.value));
                      } else {
                        setHousingTypes([...housingTypes, type.value]);
                      }
                    }}
                    className={`py-3 border rounded-md font-sans transition-colors ${
                      housingTypes.includes(type.value)
                        ? 'bg-[#C48F4A] text-[#F5EBD1] border-[#C48F4A]'
                        : 'bg-[#F8F3E7] text-[#4B3E2B] border-[#D3C5A0] hover:border-[#C48F4A]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-16">
          <Link
            href="/contents"
            className="px-8 py-3 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors font-sans font-medium"
          >
            Skip for Now
          </Link>
          <Link
            href="/apartments"
            className="px-8 py-3 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors font-sans font-medium"
          >
            Start Searching
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <hr className="section-divider mb-8" />
          <p className="font-serif text-[#4B3E2B] italic">
            Your preferences help us find the perfect home for you
          </p>
        </div>
      </div>
    </div>
  );
}
