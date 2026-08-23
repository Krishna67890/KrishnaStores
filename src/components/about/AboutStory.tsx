import React, { useEffect, useRef } from 'react';
import { BookOpen, Gamepad2, Code2 } from 'lucide-react';
import gsap from 'gsap';

export const AboutStory: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!storyRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-story-content', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={storyRef} style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="gsap-story-content" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            THE IDEA BEHIND KRISHNASTORES
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.25,
              marginTop: '0.75rem',
              letterSpacing: '-0.02em'
            }}
          >
            "Digital products should be easy to discover, easy to understand and easy to access."
          </h2>
        </div>

        <div
          className="gsap-story-content"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
            KrishnaStores was created as a single destination for digital products across three distinct worlds. Rather than scattering ebooks, games, and web templates across disparate marketplaces, KrishnaStores gathers them into one cohesive, customer-focused catalog.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em' }}>LEARN</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>DIGITAL BOOKS</h3>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FCE7F3', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gamepad2 size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EC4899', letterSpacing: '0.05em' }}>PLAY</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>WEB GAMES</h3>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#E0E7FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code2 size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.05em' }}>BUILD</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>WEB PROJECTS</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
