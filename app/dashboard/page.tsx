'use client';

import Link from 'next/link';
import { SkipLinks } from '@/components/ui/SkipLinks';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-16">
      <SkipLinks />

      <main className="container mx-auto px-4 py-8" role="main" id="main-content">
          <h2 className="font-serif text-4xl text-[#5C4A3C] mb-6">Welcome Back!</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6">
              <h3 className="font-serif text-2xl text-[#5C4A3C] mb-4">Start Searching</h3>
              <p className="text-[#8B7355] mb-4">
                Find apartments that match your preferences
              </p>
              <Link
                href="/search"
                className="inline-block px-6 py-3 bg-[#8B7355] text-[#FAF8F5] rounded-md hover:bg-[#5C4A3C] transition-colors"
              >
                Search Now
              </Link>
            </div>

            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6">
              <h3 className="font-serif text-2xl text-[#5C4A3C] mb-4">Find Trusted Realtors</h3>
              <p className="text-[#8B7355] mb-4">
                Connect with vetted Black real estate professionals
              </p>
              <Link
                href="/realtors"
                className="inline-block px-6 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors"
              >
                Browse Directory
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6">
              <h3 className="font-serif text-2xl text-[#5C4A3C] mb-4">Read Our Magazine</h3>
              <p className="text-[#8B7355] mb-4">
                Stories and wisdom for your housing journey
              </p>
              <Link
                href="/contents"
                className="inline-block px-6 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors"
              >
                Browse Articles
              </Link>
            </div>

            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6">
              <h3 className="font-serif text-2xl text-[#5C4A3C] mb-4">Your Bookmarks</h3>
              <p className="text-[#8B7355] mb-4">
                View and manage your saved listings
              </p>
              <Link
                href="/bookmarks"
                className="inline-block px-6 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors"
              >
                View Bookmarks
              </Link>
            </div>
          </div>

          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
            <h3 className="font-serif text-2xl text-[#5C4A3C] mb-4">Your Search Preferences</h3>
            <div className="space-y-2 text-[#8B7355]">
              <p><strong>Location:</strong> Cleveland, OH (10 mile radius)</p>
              <p><strong>Budget:</strong> $800 - $2,000/month</p>
              <p><strong>Bedrooms:</strong> 1+</p>
            </div>
            <Link
              href="/survey"
              className="inline-block mt-4 text-[#8B7355] underline hover:text-[#5C4A3C]"
            >
              Update Preferences
            </Link>
          </div>

          {/* AI Assistant Callout */}
          <div className="bg-[#8B7355] text-[#FAF8F5] rounded-lg p-6 mt-8">
            <h3 className="font-serif text-2xl mb-4">Need Help?</h3>
            <p className="mb-4">
              Our AI Housing Assistant is available 24/7 to answer questions about senior housing options, 
              guide you through the search process, or simply listen to your concerns.
            </p>
            <p className="text-sm opacity-90">
              Look for the chat bubble in the bottom-right corner of your screen →
            </p>
          </div>
        </main>
    </div>
  );
}
