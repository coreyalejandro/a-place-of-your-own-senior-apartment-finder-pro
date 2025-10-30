import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SkipLinks } from '@/components/ui/SkipLinks';
import { Button } from '@/components/ui/Button';
import { getRealtorBySlug } from '@/lib/data/realtors';

interface RealtorProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RealtorProfilePage({ params }: RealtorProfilePageProps) {
  const { slug } = await params;
  const realtor = getRealtorBySlug(slug);

  if (!realtor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F3E7] to-[#F1E5C2] pt-24">
      <SkipLinks />

      <main className="container mx-auto px-4 py-8 max-w-4xl" role="main" id="main-content">
        <div className="mb-6">
          <Link href="/realtors">
            <Button variant="outline">
              ← Back to Directory
            </Button>
          </Link>
        </div>

        <article className="magazine-card p-8">
          <header className="mb-8">
            {/* Photo/Initials */}
            <div className="w-32 h-32 bg-[#C48F4A] rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-[#F5EBD1]">
                {realtor.initials}
              </span>
            </div>

            <h1 className="font-display text-4xl text-[#1C1C1C] mb-2">
              {realtor.name}
            </h1>
            
            <div className="text-xl font-serif text-[#4B3E2B] mb-4">
              <p>{realtor.type === 'firm' ? 'Real Estate Firm' : 'Real Estate Professional'}</p>
              <p>{realtor.location}</p>
            </div>

            <div className="inline-block bg-[#C48F4A] px-4 py-2 rounded-md mb-6">
              <span className="text-[#F5EBD1] font-sans font-medium">
                Specialty: {realtor.specialty}
              </span>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="font-display text-2xl text-[#1C1C1C] mb-4">About</h2>
            <div className="text-lg font-serif text-[#4B3E2B] leading-relaxed space-y-4">
              {realtor.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl text-[#1C1C1C] mb-4">Credentials & Experience</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-serif font-semibold text-[#1C1C1C] mb-3">Professional Credentials</h3>
                <ul className="space-y-2">
                  {realtor.credentials.map((credential, index) => (
                    <li key={index} className="font-serif text-[#4B3E2B] flex items-start">
                      <span className="text-[#C48F4A] mr-2">✓</span>
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-[#1C1C1C] mb-3">Experience</h3>
                <p className="font-serif text-[#4B3E2B] text-lg">
                  <strong>{realtor.yearsExperience}</strong> years in real estate
                </p>
                <p className="font-serif text-[#4B3E2B] mt-2">
                  Specializing in <strong>{realtor.specialty.toLowerCase()}</strong>
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[#F8F3E7] p-6 rounded-lg border border-[#D3C5A0]">
            <h2 className="font-display text-2xl text-[#1C1C1C] mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href={`tel:${realtor.phone}`}
                className="flex items-center justify-center px-4 py-3 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors min-h-[48px] font-sans"
              >
                <span className="mr-2">📞</span>
                Call {realtor.phone}
              </a>
              <a
                href={`mailto:${realtor.email}`}
                className="flex items-center justify-center px-4 py-3 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors min-h-[48px] font-sans"
              >
                <span className="mr-2">✉️</span>
                Email
              </a>
              <a
                href={realtor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors min-h-[48px] font-sans"
              >
                <span className="mr-2">🌐</span>
                Website
              </a>
            </div>
          </section>
        </article>

        <div className="text-center mt-8">
          <Link href="/realtors">
            <Button variant="outline">
              ← Back to Directory
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  // This would normally come from your data source
  return [
    { slug: 'mcmullan-realty' },
    { slug: 'james-washington' },
    { slug: 'diana-brooks' },
    { slug: 'marcus-coleman' },
    { slug: 'patricia-johnson' },
    { slug: 'robert-davis' }
  ];
}
