'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SurveyPage() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    searchCity: '',
    searchState: 'OH',
    searchRadius: 10,
    budgetMin: 800,
    budgetMax: 2000,
    bedrooms: 1,
    housingTypes: [] as string[],
    amenities: [] as string[]
  });

  const handleNext = () => {
    if (currentScreen < 7) {
      setCurrentScreen(currentScreen + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#8B7355] font-medium">Step {currentScreen} of 7</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-12 rounded-full ${
                    step <= currentScreen ? 'bg-[#8B7355]' : 'bg-[#D4C4B0]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
          {currentScreen === 1 && (
            <div>
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-4">
                Let's Find Your Perfect Place
              </h2>
              <p className="text-[#8B7355] mb-6">
                First, help us understand your situation
              </p>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border-2 border-[#D4C4B0] rounded-md cursor-pointer hover:border-[#8B7355]">
                  <input
                    type="radio"
                    name="role"
                    value="senior"
                    checked={formData.role === 'senior'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-6 h-6"
                  />
                  <span className="text-lg text-[#5C4A3C]">I'm searching for myself</span>
                </label>
                <label className="flex items-center gap-4 p-4 border-2 border-[#D4C4B0] rounded-md cursor-pointer hover:border-[#8B7355]">
                  <input
                    type="radio"
                    name="role"
                    value="family_helper"
                    checked={formData.role === 'family_helper'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-6 h-6"
                  />
                  <span className="text-lg text-[#5C4A3C]">I'm helping a parent or loved one</span>
                </label>
              </div>
            </div>
          )}

          {currentScreen === 2 && (
            <div>
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                Where Would You Like to Live?
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-serif text-lg text-[#5C4A3C] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.searchCity}
                    onChange={(e) => setFormData({ ...formData, searchCity: e.target.value })}
                    className="w-full px-4 py-3 text-lg border-2 border-[#D4C4B0] rounded-md"
                    placeholder="Cleveland"
                  />
                </div>
                <div>
                  <label className="block font-serif text-lg text-[#5C4A3C] mb-2">
                    Search Radius: {formData.searchRadius} miles
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={formData.searchRadius}
                    onChange={(e) => setFormData({ ...formData, searchRadius: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {currentScreen === 3 && (
            <div>
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                What's Your Monthly Budget?
              </h2>
              <div className="space-y-6">
                <div>
                  <p className="text-2xl text-[#8B7355] mb-4">
                    ${formData.budgetMin} - ${formData.budgetMax} per month
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#5C4A3C] mb-2">Minimum</label>
                      <input
                        type="range"
                        min="500"
                        max="5000"
                        step="50"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({ ...formData, budgetMin: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C4A3C] mb-2">Maximum</label>
                      <input
                        type="range"
                        min="500"
                        max="5000"
                        step="50"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({ ...formData, budgetMax: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 4 && (
            <div>
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                How Much Space Do You Need?
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-serif text-lg text-[#5C4A3C] mb-3">
                    Bedrooms
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Studio', '1 Bedroom', '2 Bedrooms', '3+ Bedrooms'].map((option, idx) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-4 border-2 border-[#D4C4B0] rounded-md cursor-pointer hover:border-[#8B7355]"
                      >
                        <input
                          type="radio"
                          name="bedrooms"
                          value={idx}
                          checked={formData.bedrooms === idx}
                          onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                          className="w-6 h-6"
                        />
                        <span className="text-lg text-[#5C4A3C]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 5 && (
            <div>
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                What Type of Living Situation?
              </h2>
              <p className="text-[#8B7355] mb-6">Select all that interest you</p>
              <div className="space-y-4">
                {[
                  { value: 'independent', label: 'Independent Apartment', desc: 'A regular apartment where you handle your own daily needs' },
                  { value: 'active_adult', label: 'Active Adult Community (55+)', desc: 'Age-restricted community with maintenance-free living' },
                  { value: 'assisted', label: 'Assisted Living', desc: 'Support with daily activities like bathing, meals, medication' },
                  { value: 'memory_care', label: 'Memory Care', desc: 'Specialized care for those with Alzheimer\'s or dementia' }
                ].map((type) => (
                  <label
                    key={type.value}
                    className="flex items-start gap-4 p-4 border-2 border-[#D4C4B0] rounded-md cursor-pointer hover:border-[#8B7355]"
                  >
                    <input
                      type="checkbox"
                      checked={formData.housingTypes.includes(type.value)}
                      onChange={(e) => {
                        const newTypes = e.target.checked
                          ? [...formData.housingTypes, type.value]
                          : formData.housingTypes.filter(t => t !== type.value);
                        setFormData({ ...formData, housingTypes: newTypes });
                      }}
                      className="w-6 h-6 mt-1"
                    />
                    <div>
                      <div className="text-lg text-[#5C4A3C] font-medium">{type.label}</div>
                      <div className="text-sm text-[#8B7355] mt-1">{type.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentScreen === 6 && (
            <div>
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                What Features Are Essential?
              </h2>
              <p className="text-[#8B7355] mb-6">We'll prioritize these in your results</p>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">Accessibility</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Elevator building', 'Ground floor', 'Wheelchair accessible', 'No stairs'].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-3 p-3 border border-[#D4C4B0] rounded-md cursor-pointer hover:bg-[#FAF8F5]">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={(e) => {
                            const newAmenities = e.target.checked
                              ? [...formData.amenities, amenity]
                              : formData.amenities.filter(a => a !== amenity);
                            setFormData({ ...formData, amenities: newAmenities });
                          }}
                          className="w-5 h-5"
                        />
                        <span className="text-[#5C4A3C]">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['In-unit laundry', 'Parking', 'Pet friendly', 'Fitness center', 'Pool', 'Activities'].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-3 p-3 border border-[#D4C4B0] rounded-md cursor-pointer hover:bg-[#FAF8F5]">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={(e) => {
                            const newAmenities = e.target.checked
                              ? [...formData.amenities, amenity]
                              : formData.amenities.filter(a => a !== amenity);
                            setFormData({ ...formData, amenities: newAmenities });
                          }}
                          className="w-5 h-5"
                        />
                        <span className="text-[#5C4A3C]">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">Proximity</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Near grocery', 'Near medical', 'Near family', 'Near transit', 'Near worship', 'Near parks'].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-3 p-3 border border-[#D4C4B0] rounded-md cursor-pointer hover:bg-[#FAF8F5]">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={(e) => {
                            const newAmenities = e.target.checked
                              ? [...formData.amenities, amenity]
                              : formData.amenities.filter(a => a !== amenity);
                            setFormData({ ...formData, amenities: newAmenities });
                          }}
                          className="w-5 h-5"
                        />
                        <span className="text-[#5C4A3C]">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 7 && (
            <div>
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                One Last Thing: Your Lifestyle
              </h2>
              <div className="space-y-8">
                <div>
                  <label className="block font-serif text-xl text-[#5C4A3C] mb-4">
                    How social would you like your living situation to be?
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'very_social', label: 'Very social - I love activities and meeting neighbors' },
                      { value: 'moderately_social', label: 'Moderately social - I enjoy some activities but value privacy' },
                      { value: 'private', label: 'Private - I prefer to keep to myself' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-4 p-4 border-2 border-[#D4C4B0] rounded-md cursor-pointer hover:border-[#8B7355]"
                      >
                        <input
                          type="radio"
                          name="social"
                          value={option.value}
                          className="w-6 h-6"
                        />
                        <span className="text-lg text-[#5C4A3C]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-serif text-xl text-[#5C4A3C] mb-4">
                    Do you have pets or plan to get one?
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'dog', label: 'Yes, I have a dog' },
                      { value: 'cat', label: 'Yes, I have a cat' },
                      { value: 'both', label: 'Yes, I have both' },
                      { value: 'none', label: 'No pets' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-4 p-4 border-2 border-[#D4C4B0] rounded-md cursor-pointer hover:border-[#8B7355]"
                      >
                        <input
                          type="radio"
                          name="pets"
                          value={option.value}
                          className="w-6 h-6"
                        />
                        <span className="text-lg text-[#5C4A3C]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {currentScreen > 1 && (
              <button
                onClick={handleBack}
                className="px-8 py-4 border-2 border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors text-lg font-medium min-h-[48px]"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={currentScreen === 1 && !formData.role}
              className="flex-1 px-8 py-4 bg-[#8B7355] text-[#FAF8F5] rounded-md hover:bg-[#5C4A3C] transition-colors text-lg font-medium min-h-[48px] disabled:opacity-50"
            >
              {currentScreen === 7 ? 'Complete Survey' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
