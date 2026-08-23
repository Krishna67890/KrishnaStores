import React, { useEffect, useRef } from 'react';
import { ExternalLink, Code2, Globe, ShoppingBag, Github } from 'lucide-react';
import gsap from 'gsap';

export const AboutCreator: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-creator-item', {
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const creator = {
    name: 'KRISHNA PATIL RAJPUT',
    role: 'Developer • Creator • Builder',
    bio: 'KrishnaStores is an independent digital storefront bringing together books, games, web projects and other digital products created and published by Krishna Patil Rajput.',
    portfolioUrl: 'https://krishna-patil-rajput.vercel.app/',
    portfolioAltUrl: 'https://krishna-ajaysing-patil.vercel.app',
    githubUrl: 'https://github.com/Krishna67890',
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/'
  };

  return (
    <section ref={sectionRef} id="creator-section" style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            INDEPENDENT PUBLISHER
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            MEET THE CREATOR
          </h2>
        </div>

        {/* Creator Main Card */}
        <div
          className="gsap-creator-item"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            maxWidth: '960px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          {/* Typographic Creator Identity */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}
            >
              {creator.name}
            </h3>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--primary)',
                marginTop: '0.5rem',
                letterSpacing: '0.05em'
              }}
            >
              {creator.role}
            </span>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                maxWidth: '680px',
                margin: '1.25rem auto 0 auto',
                lineHeight: 1.6
              }}
            >
              {creator.bio}
            </p>
          </div>

          {/* Official Creator Link Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              marginTop: '2.5rem'
            }}
          >
            {/* Portfolio Link Card */}
            <a
              href={creator.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-creator-item"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '140px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>CREATOR PORTFOLIO</span>
                  <Globe size={18} color="var(--primary)" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>Personal Website</h4>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                VISIT PORTFOLIO <ExternalLink size={14} />
              </div>
            </a>

            {/* GitHub Link Card */}
            <a
              href={creator.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-creator-item"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '140px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#475569';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B' }}>SOURCE CODE</span>
                  <Github size={18} color="#64748B" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>GitHub Profile</h4>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                VIEW GITHUB <ExternalLink size={14} />
              </div>
            </a>

            {/* Gumroad Link Card */}
            <a
              href={creator.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-creator-item"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '140px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#EC4899';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EC4899' }}>STOREFRONT</span>
                  <ShoppingBag size={18} color="#EC4899" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>Gumroad Profile</h4>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#EC4899', display: 'flex', alignItems: 'center', gap: '4px' }}>
                VISIT GUMROAD <ExternalLink size={14} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
