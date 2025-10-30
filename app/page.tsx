import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* MAGAZINE COVER - MASSIVE FULL SCREEN - SCROLL TO SEE IT ALL */}
      <div className="relative h-[200vh] w-full">
        {/* Cover Image - EXTENDS TO END OF PAGE */}
        <Image
          src="/cover-collage.png"
          alt="A vibrant collage celebrating diverse seniors and their families - the heart of community and belonging"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={95}
        />

        {/* Vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>

        {/* Magazine Masthead - DIRECTLY ON IMAGE */}
        <div className="absolute top-0 left-0 right-0 pt-8 pb-6 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Issue Info */}
            <div className="text-center mb-2">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-light">
                Volume 1, Issue 1 • Winter 2024
              </p>
            </div>

            {/* Title - Classic Magazine Masthead */}
            <h1 className="font-serif text-center mb-1">
              <span className="block text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontStyle: 'italic' }}>
                A Place of Your Own
              </span>
            </h1>

            {/* Tagline */}
            <div className="text-center">
              <p className="text-lg md:text-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide font-light">
                Stories of Home, Belonging, and New Beginnings
              </p>
            </div>
          </div>
        </div>

        {/* COVER LINES - COSMO STYLE - CLICKABLE HEADLINES SCATTERED ACROSS IMAGE */}
        <div className="absolute inset-0 px-6 md:px-12 py-12">

          {/* Left Side - Upper Third - CLICKABLE */}
          <Link href="/articles/when-children-become-caregivers" className="absolute left-6 md:left-12 top-[35%] space-y-3 max-w-sm block group cursor-pointer">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] leading-tight font-bold group-hover:text-yellow-300 transition-colors">
              When Children Become Caregivers
            </h2>
            <p className="text-lg md:text-xl text-yellow-300 drop-shadow-[0_3px_12px_rgba(0,0,0,1)] uppercase tracking-wide font-black group-hover:text-white transition-colors">
              Navigating role reversal with grace
            </p>
          </Link>

          {/* Right Side - Middle - CLICKABLE */}
          <Link href="/articles/the-math-of-a-finite-life" className="absolute right-6 md:right-12 top-[45%] space-y-3 max-w-sm text-right block group cursor-pointer">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] leading-tight font-bold group-hover:text-pink-300 transition-colors">
              The Math of a Finite Life
            </h2>
            <p className="text-base md:text-lg text-pink-200 drop-shadow-[0_3px_12px_rgba(0,0,0,1)] uppercase tracking-wide font-black group-hover:text-white transition-colors">
              Financial wisdom for your next chapter
            </p>
          </Link>

          {/* Left Side - Lower - CLICKABLE */}
          <Link href="/articles/second-chapter-of-the-heart" className="absolute left-6 md:left-12 top-[65%] max-w-md block group cursor-pointer">
            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] leading-tight font-bold group-hover:text-cyan-300 transition-colors">
              The Second Chapter of the Heart
            </h3>
            <p className="text-sm md:text-base text-cyan-200 drop-shadow-[0_3px_12px_rgba(0,0,0,1)] uppercase tracking-wide font-bold mt-2 group-hover:text-white transition-colors">
              Love & romance in senior living
            </p>
          </Link>

          {/* Right Side - Lower - CLICKABLE */}
          <Link href="/search" className="absolute right-6 md:right-12 top-[70%] max-w-xs text-right block group cursor-pointer">
            <h3 className="font-serif text-xl md:text-2xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] leading-tight font-bold group-hover:text-lime-300 transition-colors">
              Smart Search That Understands You
            </h3>
            <p className="text-sm md:text-base text-lime-200 drop-shadow-[0_3px_12px_rgba(0,0,0,1)] uppercase tracking-wide font-bold mt-2 group-hover:text-white transition-colors">
              Find housing that fits your life
            </p>
          </Link>

          {/* Center Bottom - Main Feature - CLICKABLE */}
          <Link href="/articles/a-place-to-call-home" className="absolute bottom-32 left-0 right-0 px-6 md:px-12 block group cursor-pointer">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <p className="text-sm md:text-base uppercase tracking-[0.4em] text-yellow-300 drop-shadow-[0_3px_12px_rgba(0,0,0,1)] font-black">
                Special Feature
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] leading-tight font-bold group-hover:text-yellow-300 transition-colors">
                A Place to Call Home
              </h2>
              <p className="text-lg md:text-2xl text-white drop-shadow-[0_3px_12px_rgba(0,0,0,1)] font-serif italic group-hover:text-yellow-200 transition-colors">
                What makes a house become home in senior years
              </p>
            </div>
          </Link>

          {/* Bottom Left Corner - CLICKABLE */}
          <div className="absolute bottom-16 left-6 md:left-12 max-w-sm flex gap-4">
            <Link href="/realtors" className="text-base md:text-lg text-white drop-shadow-[0_3px_12px_rgba(0,0,0,1)] uppercase tracking-wide font-black hover:text-yellow-300 transition-colors">
              Trusted Realtors
            </Link>
            <span className="text-white">•</span>
            <Link href="/dashboard" className="text-base md:text-lg text-white drop-shadow-[0_3px_12px_rgba(0,0,0,1)] uppercase tracking-wide font-black hover:text-yellow-300 transition-colors">
              AI Assistant
            </Link>
          </div>

          {/* Bottom Right Corner */}
          <div className="absolute bottom-16 right-6 md:right-12">
            <Link href="/contents" className="text-base md:text-lg text-yellow-300 drop-shadow-[0_3px_12px_rgba(0,0,0,1)] uppercase tracking-wide font-black hover:text-white transition-colors">
              Read Inside →
            </Link>
          </div>

          {/* Top Right - Additional Headline - CLICKABLE */}
          <Link href="/articles/the-art-of-transition" className="absolute right-6 md:right-12 top-[28%] max-w-xs text-right block group cursor-pointer">
            <h3 className="font-serif text-xl md:text-2xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] leading-tight font-bold group-hover:text-orange-300 transition-colors">
              The Art of Transition
            </h3>
            <p className="text-sm text-orange-200 drop-shadow-[0_3px_12px_rgba(0,0,0,1)] uppercase tracking-wide font-bold mt-1 group-hover:text-white transition-colors">
              Finding grace in life's changes
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
