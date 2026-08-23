import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, User, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

interface AboutHeroProps {
  onExploreProducts: () => void;
  onMeetCreator: () => void;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onExploreProducts, onMeetCreator }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance Animation Sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.gsap-about-badge', { y: -15, opacity: 0, duration: 0.5 })
        .from('.gsap-about-title', { y: 25, opacity: 0, duration: 0.7 }, '-=0.3')
        .from('.gsap-about-subtitle', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.gsap-about-cta', { y: 15, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.gsap-about-collage', { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.5');

      // Mouse Parallax Micro-interaction (Desktop only)
      const handleMouseMove = (e: MouseEvent) => {
        if (window.matchMedia('(hover: none)').matches) return;
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 30;
        const yPercent = (clientY / window.innerHeight - 0.5) * 30;

        if (bookRef.current) {
          gsap.to(bookRef.current, { x: xPercent * 0.4, y: yPercent * 0.4, duration: 0.6, ease: 'power1.out' });
        }
        if (gameRef.current) {
          gsap.to(gameRef.current, { x: xPercent * 0.7, y: yPercent * 0.7, duration: 0.6, ease: 'power1.out' });
        }
        if (webRef.current) {
          gsap.to(webRef.current, { x: xPercent * 0.5, y: yPercent * 0.5, duration: 0.6, ease: 'power1.out' });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '4rem 0 4.5rem 0',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Text & CTAs */}
          <div>
            <div
              className="gsap-about-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                border: '1px solid var(--border-color)',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                marginBottom: '1.25rem'
              }}
            >
              <Sparkles size={14} color="var(--primary)" />
              <span>ABOUT KRISHNAELITE</span>
            </div>

            <h1
              className="gsap-about-title"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'var(--text-main)',
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}
            >
              ELITE MASTERY.<br />
              <span style={{ color: 'var(--primary)' }}>03 FLAGSHIP EXPERIENCES.</span>
            </h1>

            <p
              className="gsap-about-subtitle"
              style={{
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}
            >
              KrishnaElite focuses exclusively on the three flagship roadmaps created by Krishna Ajaysing Rajput | Krishna Patil Rajput. We believe in depth over breadth, providing world-class guides for developers and individuals.
            </p>

            <div className="gsap-about-cta" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={onExploreProducts} className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                EXPLORE PRODUCTS <ArrowRight size={18} />
              </button>
              <button onClick={onMeetCreator} className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                <User size={18} color="var(--primary)" /> MEET THE CREATORS →
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Product Collage with Mouse Parallax */}
          <div
            className="gsap-about-collage"
            style={{
              position: 'relative',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Collage Background Glow */}
            <div
              style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 0
              }}
            />

            {/* Item 1: Book Cover (0.4x parallax) */}
            <div
              ref={bookRef}
              style={{
                position: 'absolute',
                top: '20px',
                left: '10px',
                width: '180px',
                zIndex: 3,
                backgroundColor: 'var(--bg-card)',
                borderRadius: '12px',
                padding: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                transition: 'transform 0.2s ease-out'
              }}
            >
              <img
                src="/assets/Android Native 2026 Thumbnail.png"
                alt="Book preview"
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={{ marginTop: '6px', textAlign: 'center' }}>
                <span className="category-badge" style={{ fontSize: '0.6rem' }}>BOOKSTORE</span>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }} className="line-clamp-1">
                  Android Native 2026
                </span>
              </div>
            </div>

            {/* Item 2: Relationship Artwork (0.7x parallax) */}
            <div
              ref={gameRef}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '20px',
                width: '190px',
                zIndex: 4,
                backgroundColor: 'var(--bg-card)',
                borderRadius: '12px',
                padding: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-hover)',
                transition: 'transform 0.2s ease-out'
              }}
            >
              <img
                src="/assets/Why Was I Only An Option.png"
                alt="Personal Growth preview"
                style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={{ marginTop: '6px', textAlign: 'center' }}>
                <span className="category-badge" style={{ fontSize: '0.6rem', color: '#EC4899', backgroundColor: '#FCE7F3' }}>ELITE MASTERY</span>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }} className="line-clamp-1">
                  Why Was I Only An Option?
                </span>
              </div>
            </div>

            {/* Item 3: Web Project (0.5x parallax) */}
            <div
              ref={webRef}
              style={{
                position: 'absolute',
                top: '60px',
                right: '40px',
                width: '200px',
                zIndex: 2,
                backgroundColor: 'var(--bg-card)',
                borderRadius: '12px',
                padding: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                transition: 'transform 0.2s ease-out'
              }}
            >
              <img
                src="/assets/Web Development Fundamentals & Advanced Concepts (2026 Edition) Thumbnail.png"
                alt="Web project preview"
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={{ marginTop: '6px', textAlign: 'center' }}>
                <span className="category-badge" style={{ fontSize: '0.6rem', color: '#4F46E5', backgroundColor: '#E0E7FF' }}>ELITE MASTERY</span>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }} className="line-clamp-1">
                  Web Dev Roadmap 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
