
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SkipLinks } from '@/components/ui/SkipLinks';
import { Button } from '@/components/ui/Button';
import { getRealtorBySlug } from '@/lib/data/realtors';

interface RealtorProfilePageProps {
  params: {
    slug: string;
  };
}

export default function RealtorProfilePage({ params }: RealtorProfilePageProps) {
  const realtor = getRealtorBySlug(params.slug);

  if (!realtor) {
    notFound();
  }

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

        <article className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
          <header className="mb-8">
            {/* Photo/Initials */}
            <div className="w-32 h-32 bg-[#8B7355] rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-[#FAF8F5]">
                {realtor.initials}
              </span>
            </div>

            <h1 className="font-serif text-4xl text-[#5C4A3C] mb-2">
              {realtor.name}
            </h1>
            
            <div className="text-xl text-[#8B7355] mb-4">
              <p>{realtor.type === 'firm' ? 'Real Estate Firm' : 'Real Estate Professional'}</p>
              <p>{realtor.location}</p>
            </div>

            <div className="inline-block bg-[#D4C4B0] px-4 py-2 rounded-md mb-6">
              <span className="text-[#5C4A3C] font-medium">
                Specialty: {realtor.specialty}
              </span>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-[#5C4A3C] mb-4">About</h2>
            <div className="text-lg text-[#5C4A3C] leading-relaxed space-y-4">
              {realtor.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-[#5C4A3C] mb-4">Credentials & Experience</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#5C4A3C] mb-3">Professional Credentials</h3>
                <ul className="space-y-2">
                  {realtor.credentials.map((credential, index) => (
                    <li key={index} className="text-[#8B7355] flex items-start">
                      <span className="text-[#8B7355] mr-2">✓</span>
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#5C4A3C] mb-3">Experience</h3>
                <p className="text-[#8B7355] text-lg">
                  <strong>{realtor.yearsExperience}</strong> years in real estate
                </p>
                <p className="text-[#8B7355] mt-2">
                  Specializing in <strong>{realtor.specialty.toLowerCase()}</strong>
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[#FAF8F5] p-6 rounded-lg">
            <h2 className="font-serif text-2xl text-[#5C4A3C] mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href={`tel:${realtor.phone}`}
                className="flex items-center justify-center px-4 py-3 bg-[#8B7355] text-[#FAF8F5] rounded-md hover:bg-[#5C4A3C] transition-colors min-h-[48px]"
              >
                <span className="mr-2">📞</span>
                Call {realtor.phone}
              </a>
              <a
                href={`mailto:${realtor.email}`}
                className="flex items-center justify-center px-4 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors min-h-[48px]"
              >
                <span className="mr-2">✉️</span>
                Email
              </a>
              <a
                href={realtor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors min-h-[48px]"
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
