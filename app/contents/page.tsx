
import Link from 'next/link';
import Image from 'next/image';
import { SkipLinks } from '@/components/ui/SkipLinks';
import { Button } from '@/components/ui/Button';
import { articles } from '@/lib/data/articles';

export default function ContentsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <SkipLinks />

      <main className="container mx-auto px-4 py-12 max-w-5xl" role="main" id="main-content">
        {/* Magazine Cover - Full Page */}
        <div className="bg-white border-4 border-[#D4C4B0] rounded-lg shadow-2xl mb-12 overflow-hidden">
          {/* Cover Image - Full Page Height */}
          <div className="relative h-[calc(100vh-6rem)] min-h-[800px] overflow-hidden">
            <Image
              src="/cover-collage.png"
              alt="A vibrant collage of diverse seniors and their families, celebrating life, wisdom, and connection across generations"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>

            {/* Magazine Masthead */}
            <div className="absolute top-0 left-0 right-0 p-8 md:p-12 text-center">
              <div className="mb-4">
                <span className="text-sm uppercase tracking-widest text-white/90 drop-shadow-lg">Volume 1 • 2024</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl mb-4 leading-tight text-white drop-shadow-2xl">
                A Place of Your Own
              </h1>
              <p className="font-serif text-2xl md:text-3xl mb-3 italic text-white/95 drop-shadow-lg">
                Magazine
              </p>
              <div className="w-32 h-1 bg-white/70 mx-auto drop-shadow-lg"></div>
            </div>

            {/* Cover Story Teaser */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl mx-auto">
                <p className="text-sm uppercase tracking-wider text-[#8B7355] mb-2">Featured Story</p>
                <h2 className="font-serif text-2xl md:text-4xl text-[#5C4A3C] mb-3 leading-tight">
                  Stories, Wisdom, and Guidance for Your Next Chapter
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="text-3xl mb-1">📖</div>
                    <p className="text-sm text-[#5C4A3C] font-medium">6 Stories</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-1">✨</div>
                    <p className="text-sm text-[#5C4A3C] font-medium">Life Transitions</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-1">💡</div>
                    <p className="text-sm text-[#5C4A3C] font-medium">Real Wisdom</p>
                  </div>
                </div>
                <Link href={`/articles/${articles[0].id}`}>
                  <Button size="lg" className="w-full md:w-auto">Begin Reading</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <section className="mb-12">
          <h2 className="font-serif text-4xl text-[#5C4A3C] mb-8 text-center border-b-2 border-[#D4C4B0] pb-4">
            Table of Contents
          </h2>
          
          <div className="space-y-8">
            {articles.map((article, index) => (
              <article key={article.id} className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-[#8B7355] bg-[#FAF8F5] px-3 py-1 rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-sm text-[#8B7355]">{article.readTime}</span>
                    </div>
                    
                    <h3 className="font-serif text-xl text-[#5C4A3C] mb-2">
                      {article.title}
                    </h3>
                    
                    <p className="font-serif text-lg text-[#8B7355] mb-3 italic">
                      {article.subtitle}
                    </p>
                    
                    <p className="text-[#5C4A3C] mb-4 leading-relaxed">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-[#8B7355]">
                      <span>By {article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  
                  <div className="md:ml-6">
                    <Link href={`/articles/${article.id}`}>
                      <Button variant="outline" size="sm">
                        Read Article
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
