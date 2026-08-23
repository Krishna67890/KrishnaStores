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
            ELITE MASTERY ROADMAPS
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            03 FLAGSHIP EXPERIENCES
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* 01 — ELITE MASTERY ROADMAPS */}
          <div
            className="gsap-world-card"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '2px solid var(--primary)',
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
                SIGNATURE FLAGSHIP COLLECTION
              </span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.25rem 0 0.75rem 0' }}>
                ELITE MASTERY.
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Access our signature 3-book flagship series: Web Development fundamentals, Android Mastery with React Native, and Emotional Growth roadmaps.
              </p>
              <button
                onClick={() => onSelectCategory('book')}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
              >
                EXPLORE ELITE MASTERY <ArrowRight size={16} />
              </button>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '1rem' }}>
              <img
                src="/assets/Android Native 2026 Thumbnail.png"
                alt="Elite Mastery showcase"
                style={{ width: '100%', maxHeight: '280px', objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
