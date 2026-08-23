import React, { useEffect, useRef } from 'react';
import { BookOpen, Gamepad2, Code2, ArrowRight } from 'lucide-react';
import { CategoryFilter } from '../../types/store';
import gsap from 'gsap';

interface AboutThreeWorldsProps {
  onSelectCategory: (category: CategoryFilter) => void;
}

export const AboutThreeWorlds: React.FC<AboutThreeWorldsProps> = ({ onSelectCategory }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-world-card', {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '4rem 0 4.5rem 0', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            THE THREE WORLDS
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            DISCOVER YOUR NEXT EXPERIENCE
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* 01 — BOOKSTORE */}
          <div
            className="gsap-world-card"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>
                01 — BOOKSTORE
              </span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0.75rem 0' }}>
                LEARN.
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Discover digital books covering development, technology, practical learning and other useful topics.
              </p>
              <button
                onClick={() => onSelectCategory('book')}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
              >
                EXPLORE BOOKS <ArrowRight size={16} />
              </button>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '1rem' }}>
              <img
                src="/assets/Android Native 2026 Thumbnail.png"
                alt="Bookstore showcase"
                style={{ width: '100%', maxHeight: '280px', objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>
          </div>

          {/* 02 — GAMESTORE */}
          <div
            className="gsap-world-card"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div style={{ order: 1 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#EC4899', letterSpacing: '0.1em' }}>
                02 — GAMESTORE
              </span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0.75rem 0' }}>
                PLAY.
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Explore small games created to provide simple, enjoyable digital experiences.
              </p>
              <button
                onClick={() => onSelectCategory('game')}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', backgroundColor: '#EC4899' }}
              >
                EXPLORE GAMES <ArrowRight size={16} />
              </button>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '1rem' }}>
              <img
                src="/assets/BlockCraft-Builder-Dream-House-Edition.png"
                alt="Gamestore showcase"
                style={{ width: '100%', maxHeight: '280px', objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>
          </div>

          {/* 03 — WEBSTORE */}
          <div
            className="gsap-world-card"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.1em' }}>
                03 — WEBSTORE
              </span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0.75rem 0' }}>
                BUILD.
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Explore web projects, source-code products and digital tools designed for developers and learners.
              </p>
              <button
                onClick={() => onSelectCategory('web')}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', backgroundColor: '#4F46E5' }}
              >
                EXPLORE WEBSTORE <ArrowRight size={16} />
              </button>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '1rem' }}>
              <img
                src="/assets/Linked in 2.png"
                alt="Webstore showcase"
                style={{ width: '100%', maxHeight: '280px', objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
