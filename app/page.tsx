'use client';

import { MagazineNavigation } from '@/components/MagazineNavigation';
import { MAGAZINE_PAGES } from '@/components/MagazineLayout';

export default function Home() {
  const currentPageIndex = 0; // Cover page is first
  const currentPage = MAGAZINE_PAGES[currentPageIndex];
  const totalPages = MAGAZINE_PAGES.length;
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '200vh',
        backgroundImage: 'url(/image.png)',
        backgroundSize: '110%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#F5EBD1'
      }}
    >
      {/* Original Masthead */}
      <header 
        className="masthead-new-yorker"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          fontFamily: '"Playfair Display", "Georgia", serif'
        }}
      >
        {/* Issue Date - Top Left */}
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#000000',
          textTransform: 'uppercase',
          textShadow: '0 2px 4px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 0.8)'
        }}>
          FALL 2025
        </div>

        {/* Title - Top Center */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: '#000000',
            marginBottom: '0.2rem',
            lineHeight: 1.2,
            textShadow: '0 2px 4px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 0.8)'
          }}>
            THE
          </div>
          <div style={{
            fontSize: '6rem',
            fontWeight: 900,
            letterSpacing: '0.02em',
            color: '#000000',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 4px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 0.8)'
          }}>
            APT FINDER
          </div>
        </div>

        {/* Price - Top Right */}
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#000000',
          textTransform: 'uppercase',
          textShadow: '0 2px 4px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 0.8)'
        }}>
          FREE
        </div>
      </header>

      {/* Magazine Navigation */}
      <MagazineNavigation
        currentPage={currentPageIndex + 1}
        totalPages={totalPages}
        pageTitle={currentPage?.shortTitle || 'Cover'}
        transparent={true}
        hideCenterContent={true}
      />
    </div>
  );
}
