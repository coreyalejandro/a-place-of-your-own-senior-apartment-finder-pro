
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section with Image */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden mb-16">
        <Image
          src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1920&q=85&fm=webp"
          alt="Diverse group of seniors sharing joyful conversation in a warm, welcoming community space with natural light"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#FAF8F5]"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
              A Place of Your Own
            </h1>
            <p className="text-2xl md:text-3xl text-white/95 mb-4 drop-shadow-lg">
              Finding your place in the next chapter
            </p>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 drop-shadow-lg">
              Transform your housing search from a stressful chore into a dignified,
              even joyful life passage.
            </p>
          
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/auth/register">
                <Button size="lg" className="bg-[#8B7355] hover:bg-[#5C4A3C] text-white shadow-xl">
                  Get Started
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="bg-white/95 border-white text-[#5C4A3C] hover:bg-white shadow-xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-6xl">

        {/* Feature Highlights with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80&fm=webp"
                alt="Modern, welcoming apartment interior with natural light"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">Smart Search</h3>
              <p className="text-[#8B7355] mb-4">
                Find senior-friendly housing with our curated search that understands your unique needs.
              </p>
              <Link href="/search">
                <Button size="sm" variant="outline">Search Now</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fm=webp"
                alt="Professional Black real estate agent smiling confidently"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">Trusted Realtors</h3>
              <p className="text-[#8B7355] mb-4">
                Connect with carefully vetted Black real estate professionals who specialize in senior housing.
              </p>
              <Link href="/realtors">
                <Button size="sm" variant="outline">Find Realtors</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&q=80&fm=webp"
                alt="Senior woman using tablet with caring assistant providing guidance"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">AI Assistant</h3>
              <p className="text-[#8B7355] mb-4">
                Get personalized guidance from our empathetic AI that understands senior housing transitions.
              </p>
              <div className="text-sm text-[#8B7355]">
                Look for the chat icon →
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image
                src="/mary-ann-portrait.jpg"
                alt="Thoughtful senior woman in warm, dignified portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">Magazine</h3>
              <p className="text-[#8B7355] mb-4">
                Read thoughtful stories and practical wisdom about housing transitions and life changes.
              </p>
              <Link href="/contents">
                <Button size="sm" variant="outline">Read Stories</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8 mb-16">
          <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6 text-center">
            Why A Place of Your Own is Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">No Pressure, Just Support</h3>
              <p className="text-[#8B7355]">
                We believe housing decisions should never be rushed. Take your time, ask questions, and move at your own pace.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">Expert Guidance</h3>
              <p className="text-[#8B7355]">
                Our network of specialists understands the unique challenges and opportunities of senior housing transitions.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl text-[#5C4A3C] mb-3">Dignity First</h3>
              <p className="text-[#8B7355]">
                Every interaction respects your autonomy, wisdom, and right to make decisions about your own life.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
            Ready to Begin?
          </h2>
          <p className="text-xl text-[#8B7355] mb-8 max-w-3xl mx-auto">
            Whether you're exploring options for yourself or supporting a loved one, 
            we're here to help you navigate this transition with grace and confidence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/register">
              <Button size="lg">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/contents">
              <Button variant="outline" size="lg">
                Read Our Magazine
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
