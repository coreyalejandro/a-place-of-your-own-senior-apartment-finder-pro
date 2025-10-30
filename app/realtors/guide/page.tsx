
import Link from 'next/link';
import { SkipLinks } from '@/components/ui/SkipLinks';
import { Button } from '@/components/ui/Button';

export default function RealtorGuidePage() {
  const questionsToAsk = [
    "How many years of experience do you have working specifically with senior clients?",
    "Are you a Certified Seniors Real Estate Specialist (SRES)?",
    "Can you provide references from recent senior clients?",
    "How do you help seniors evaluate different types of housing (condos, communities, single-family homes)?",
    "What's your approach to helping families navigate emotional aspects of downsizing?",
    "Do you have relationships with professionals who can help with moving, estate sales, or home modifications?",
    "How do you handle situations where adult children and parents disagree on housing choices?",
    "Can you explain how different housing choices might affect taxes, estate planning, or Medicaid eligibility?",
    "What accessibility features do you look for when showing properties to seniors?",
    "How do you help clients evaluate the long-term suitability of a property as needs change?",
    "What questions do you ask to understand a senior's lifestyle preferences and priorities?",
    "Can you walk me through your typical process from initial consultation to closing?",
    "How do you communicate throughout the process, and how often should I expect updates?",
    "What happens if we find issues with a property that affect safety or accessibility?",
    "Do you provide educational resources about senior housing options and the buying/selling process?"
  ];

  const redFlags = [
    "Pressures you to make quick decisions without adequate time to consider options",
    "Shows impatience with questions or seems dismissive of concerns about accessibility or safety",
    "Doesn't ask detailed questions about your current and future needs",
    "Focuses only on price without discussing lifestyle, community, or long-term suitability",
    "Lacks knowledge about senior-specific housing options, communities, and services",
    "Cannot provide recent references from senior clients or seems evasive about experience",
    "Doesn't understand or dismisses the emotional aspects of moving in later life",
    "Makes promises that seem unrealistic about timing, pricing, or outcomes",
    "Doesn't have relationships with other professionals who serve seniors (moving companies, estate sale specialists, etc.)",
    "Shows properties without considering accessibility needs or future mobility changes"
  ];

  const greenFlags = [
    "Takes time to understand your complete situation, including emotional and practical needs",
    "Asks thoughtful questions about your lifestyle, family situation, and future plans",
    "Demonstrates specific knowledge about senior housing options and communities in your area",
    "Provides educational materials and resources to help you make informed decisions",
    "Shows patience with your pace and respects your need to discuss decisions with family",
    "Has established relationships with other professionals who can support your transition",
    "Offers to arrange meetings with current residents of communities you're considering",
    "Understands accessibility features and can spot potential safety or mobility issues",
    "Communicates clearly and regularly, keeping you informed throughout the process",
    "Advocates strongly for your interests and isn't afraid to advise against properties that don't meet your needs",
    "Provides honest market insights and realistic expectations about timing and pricing",
    "Shows genuine care for your wellbeing beyond just completing a transaction"
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <SkipLinks />

      <main className="container mx-auto px-4 py-8 max-w-4xl" role="main" id="main-content">
        <div className="mb-6">
          <Link href="/realtors">
            <Button variant="outline">
              ← Back to Directory
            </Button>
          </Link>
        </div>

        <article className="prose prose-lg max-w-none">
          <header className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-[#5C4A3C] mb-4">
              How to Choose the Right Realtor
            </h1>
            <p className="text-xl text-[#8B7355] max-w-3xl mx-auto">
              A comprehensive guide to finding a real estate professional who understands 
              your unique needs as a senior housing seeker.
            </p>
          </header>

          <section className="mb-12">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8 mb-8">
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                Why Choosing the Right Realtor Matters
              </h2>
              <div className="text-lg text-[#5C4A3C] leading-relaxed space-y-4">
                <p>
                  Finding the right home in your senior years is about much more than square footage 
                  and price per square foot. It's about finding a place where you can thrive, maintain 
                  your independence, and enjoy this next chapter of your life. The right realtor understands 
                  this and brings specialized knowledge, patience, and genuine care to the process.
                </p>
                <p>
                  Senior housing transitions often involve complex considerations: accessibility needs, 
                  proximity to healthcare, community and social opportunities, long-term care planning, 
                  and the emotional weight of leaving a longtime family home. A realtor who specializes 
                  in senior clients brings expertise in all these areas.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                Essential Questions to Ask Potential Realtors
              </h2>
              <p className="text-[#8B7355] mb-6">
                Use these questions to evaluate whether a realtor has the experience, 
                knowledge, and approach that align with your needs:
              </p>
              <div className="space-y-4">
                {questionsToAsk.map((question, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-[#8B7355] mr-3 mt-1 font-bold">{index + 1}.</span>
                    <p className="text-[#5C4A3C]">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
              <h2 className="font-serif text-3xl text-red-800 mb-6">
                🚩 Red Flags: Warning Signs to Watch For
              </h2>
              <p className="text-red-700 mb-6">
                Be cautious if a realtor exhibits any of these concerning behaviors:
              </p>
              <div className="space-y-3">
                {redFlags.map((flag, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">⚠️</span>
                    <p className="text-red-800">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8">
              <h2 className="font-serif text-3xl text-green-800 mb-6">
                ✅ Green Flags: Signs of an Excellent Senior Realtor
              </h2>
              <p className="text-green-700 mb-6">
                Look for realtors who demonstrate these positive qualities:
              </p>
              <div className="space-y-3">
                {greenFlags.map((flag, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✨</span>
                    <p className="text-green-800">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
                Our Vetting Process
              </h2>
              <div className="text-lg text-[#5C4A3C] leading-relaxed space-y-4">
                <p>
                  Every realtor in our directory has been carefully vetted to ensure they meet 
                  our high standards for senior housing expertise and client care. Our evaluation process includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Verification of senior housing specialization and relevant certifications</li>
                  <li>Review of client testimonials and references</li>
                  <li>Assessment of knowledge about accessibility, senior communities, and aging-in-place options</li>
                  <li>Evaluation of communication style and approach to client relationships</li>
                  <li>Confirmation of professional standing and ethical business practices</li>
                </ul>
                <p>
                  When you work with any realtor from our directory, you can be confident they 
                  understand your unique needs and will provide the respectful, knowledgeable 
                  service you deserve.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Link href="/realtors">
              <Button size="lg">
                Browse Our Trusted Realtor Directory
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
