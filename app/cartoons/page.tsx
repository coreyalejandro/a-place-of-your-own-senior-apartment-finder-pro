'use client';

import { Smile } from 'lucide-react';

export default function CartoonsPage() {
  const cartoons = [
    {
      id: 1,
      caption: "When the realtor says 'age in place' and you're thinking 'Yes, but WHERE?'",
      illustrator: "The Editorial Team"
    },
    {
      id: 2,
      caption: "'It's a walkable neighborhood,' they said. They didn't say who would be doing the walking.",
      illustrator: "The Editorial Team"
    },
    {
      id: 3,
      caption: "Three phases of apartment hunting: Excitement → Exhaustion → 'Where are my glasses?'",
      illustrator: "The Editorial Team"
    }
  ];

  return (
    <div className="magazine-page min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Smile className="w-12 h-12 icon-outlined" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-[#1C1C1C] mb-4 uppercase tracking-wide">
            Cartoons
          </h1>
          <p className="font-serif text-xl text-[#4B3E2B] italic">
            A little humor for the journey
          </p>
          <hr className="section-divider mt-8" />
        </div>

        {/* Cartoons */}
        <div className="space-y-12 mb-16">
          {cartoons.map((cartoon, index) => (
            <div
              key={cartoon.id}
              className="magazine-card p-8 group"
            >
              {/* Placeholder for cartoon illustration */}
              <div className="mb-6 bg-gradient-to-br from-[#D3C5A0] to-[#C48F4A]/30 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">😊</div>
                  <p className="font-serif text-sm text-[#4B3E2B] uppercase tracking-wide">
                    Cartoon #{index + 1}
                  </p>
                </div>
              </div>

              {/* Caption */}
              <p className="font-serif text-xl text-[#1C1C1C] leading-relaxed mb-4 text-center italic">
                "{cartoon.caption}"
              </p>
              
              {/* Illustrator credit */}
              <p className="font-sans text-sm text-[#855E2B] text-center">
                By {cartoon.illustrator}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <hr className="section-divider mb-8" />
          <p className="font-serif text-[#4B3E2B] italic">
            Laughter helps, always
          </p>
        </div>
      </div>
    </div>
  );
}

