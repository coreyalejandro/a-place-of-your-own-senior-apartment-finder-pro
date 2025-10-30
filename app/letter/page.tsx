export default function LetterPage() {
  return (
    <div className="magazine-page min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-8">
        {/* Gradient Header */}
        <div className="bg-gradient-to-b from-[#D6B57C] to-[#F5EBD1] -mx-8 px-8 pt-12 pb-8 mb-12">
          <h1 className="font-display text-5xl md:text-6xl text-[#1C1C1C] text-center mb-4">
            Letter from the Editor
          </h1>
          <p className="text-center text-[#4B3E2B] font-serif italic text-lg">
            A note on belonging, dignity, and home
          </p>
        </div>

        {/* Two-Column Editorial Text with Drop Cap */}
        <div className="two-column-text">
          <p className="drop-cap text-lg leading-relaxed text-[#4B3E2B] mb-6">
            Welcome to <em>The Apt Finder</em>, a different kind of housing search. This isn't
            a cold database of listings or a clinical catalog of facilities. This is a magazine—a
            guide, a companion—for one of life's most profound transitions: finding a new place
            to call home in your later years.
          </p>

          <p className="text-lg leading-relaxed text-[#4B3E2B] mb-6">
            We created this because we saw a gap. A chasm, really. On one side: glossy
            brochures promising "luxury living" with stock photos of white-haired models
            playing chess. On the other: overwhelming spreadsheets of square footage,
            monthly fees, and amenity lists that reduce a life decision to data points.
          </p>

          <p className="text-lg leading-relaxed text-[#4B3E2B] mb-6">
            The truth is, searching for senior housing is deeply personal. It's about
            more than walk-in showers and proximity to hospitals. It's about community.
            Independence. Dignity. It's about finding a place where you can still be
            <em> yourself</em>—where Sunday morning coffee tastes like Sunday morning coffee,
            where neighbors know your name, where life continues with purpose and joy.
          </p>

          <p className="text-lg leading-relaxed text-[#4B3E2B] mb-6">
            That's why we built <em>The Apt Finder</em> like a magazine. Because magazines
            tell stories. They offer perspective. They respect your intelligence and your
            agency. You're not a "placement" or a "resident number." You're a person with
            a lifetime of experiences, preferences, quirks, and dreams for what comes next.
          </p>

          <p className="text-lg leading-relaxed text-[#4B3E2B] mb-6">
            In these pages, you'll find practical tools—a smart search that understands
            context, vetted realtors who specialize in senior housing, filters that go
            beyond square footage to ask about lifestyle and values. But you'll also find
            essays, cartoons, and honest conversations about the emotional terrain of this
            journey.
          </p>

          <p className="text-lg leading-relaxed text-[#4B3E2B] mb-6">
            Whether you're searching for yourself or helping a parent navigate this
            transition, we hope this magazine becomes a trusted companion. One that respects
            the weight of the decision, celebrates the possibilities ahead, and reminds you
            that "home" isn't just a place—it's a feeling worth fighting for.
          </p>

          <p className="text-lg leading-relaxed text-[#4B3E2B] mb-8">
            Thank you for being here. Turn the page when you're ready.
          </p>

          <div className="border-t border-[#D3C5A0] pt-8 mt-12">
            <p className="font-display text-2xl text-[#1C1C1C] mb-2">With respect and care,</p>
            <p className="font-sans text-[#4B3E2B] text-sm uppercase tracking-widest">
              The Editorial Team
            </p>
            <p className="font-serif text-[#4B3E2B] italic text-sm mt-2">
              Cleveland, Ohio • Winter 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
