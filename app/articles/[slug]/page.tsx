
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SkipLinks } from '@/components/ui/SkipLinks';
import { Button } from '@/components/ui/Button';
import { getArticleBySlug, getNextArticle, getPreviousArticle } from '@/lib/data/articles';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const nextArticle = getNextArticle(params.slug);
  const previousArticle = getPreviousArticle(params.slug);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <SkipLinks />

      <main className="container mx-auto px-4 py-8 max-w-4xl" role="main" id="main-content">
        <div className="mb-6">
          <Link href="/contents">
            <Button variant="outline">
              ← Back to Contents
            </Button>
          </Link>
        </div>

        <article className="prose prose-lg max-w-none">
          {/* Hero Image */}
          {article.imageUrl && (
            <div className="relative mb-12 rounded-lg overflow-hidden border-4 border-[#D4C4B0] shadow-xl h-[400px] md:h-[500px]">
              <Image
                src={article.imageUrl}
                alt={article.imageAlt || article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          )}

          <header className="text-center mb-12 pb-8 border-b-2 border-[#D4C4B0]">
            <h1 className="font-serif text-4xl md:text-5xl text-[#5C4A3C] mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="font-serif text-xl text-[#8B7355] mb-6 italic">
              {article.subtitle}
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-6 text-[#8B7355]">
              {article.authorImage && (
                <div className="flex items-center justify-center gap-3 mb-2 md:mb-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4C4B0]">
                    <Image
                      src={article.authorImage}
                      alt={article.author}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <span>By {article.author}</span>
                </div>
              )}
              {!article.authorImage && <span>By {article.author}</span>}
              <span className="hidden md:inline">•</span>
              <span>{article.date}</span>
              <span className="hidden md:inline">•</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8 md:p-12">
            <div 
              className="text-lg text-[#5C4A3C] leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ 
                __html: article.content
                  .split('\n\n')
                  .map(paragraph => {
                    // Handle headers
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      const text = paragraph.slice(2, -2);
                      return `<h2 class="font-serif text-2xl text-[#5C4A3C] mt-8 mb-4 font-bold">${text}</h2>`;
                    }
                    
                    // Handle bold text within paragraphs
                    const formattedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    
                    // Handle italic text
                    const finalParagraph = formattedParagraph.replace(/\*(.*?)\*/g, '<em>$1</em>');
                    
                    return `<p class="mb-4">${finalParagraph}</p>`;
                  })
                  .join('')
              }}
            />
          </div>
        </article>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t-2 border-[#D4C4B0]">
          <div>
            {previousArticle && (
              <Link href={`/articles/${previousArticle.id}`}>
                <Button variant="outline">
                  ← {previousArticle.title}
                </Button>
              </Link>
            )}
          </div>
          <div>
            <Link href="/contents">
              <Button>Contents</Button>
            </Link>
          </div>
          <div>
            {nextArticle && (
              <Link href={`/articles/${nextArticle.id}`}>
                <Button variant="outline">
                  {nextArticle.title} →
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/dashboard">
            <Button variant="outline">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'letter-from-the-editor' },
    { slug: 'when-children-become-caregivers' },
    { slug: 'the-art-of-transition' },
    { slug: 'second-chapter-of-the-heart' },
    { slug: 'the-math-of-a-finite-life' },
    { slug: 'a-place-to-call-home' }
  ];
}
