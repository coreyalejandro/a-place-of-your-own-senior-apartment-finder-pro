'use client';

export default function Home() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#F5EBD1' }}>
      {/* Masthead */}
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
          fontSize: '0.875rem',
          fontWeight: 400,
          letterSpacing: '0.1em',
          color: '#1C1C1C',
          textTransform: 'uppercase'
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
            fontSize: '1.5rem',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: '#1C1C1C',
            marginBottom: '0.1rem',
            lineHeight: 1.2
          }}>
            THE
          </div>
          <div style={{
            fontSize: '4rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: '#1C1C1C',
            lineHeight: 1,
            whiteSpace: 'nowrap'
          }}>
            APT FINDER
          </div>
        </div>

        {/* Price - Top Right */}
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 400,
          letterSpacing: '0.1em',
          color: '#1C1C1C',
          textTransform: 'uppercase'
        }}>
          FREE
        </div>
      </header>

      {/* Cover Image */}
      <img 
        src="/cover-collage.png" 
        alt="The Apt Finder Magazine Cover"
        style={{
          width: '100%',
          height: '100vh',
          objectFit: 'contain',
          backgroundColor: '#F5EBD1',
          display: 'block',
          paddingTop: '6rem'
        }}
      />
    </div>
  );
}
