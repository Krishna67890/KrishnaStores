import React from 'react';
import { ArrowRight, BookOpen, Gamepad2, Code2 } from 'lucide-react';
import { CategoryFilter } from '../../types/store';

interface AboutFinalCTAProps {
  onSelectCategory: (category: CategoryFilter) => void;
}

export const AboutFinalCTA: React.FC<AboutFinalCTAProps> = ({ onSelectCategory }) => {
  return (
    <section
      style={{
        padding: '5rem 0',
        backgroundColor: 'var(--bg-blue-tint)',
        borderTop: '1px solid var(--border-color)',
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
          DISCOVER SOMETHING NEW
        </span>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.15,
            margin: '0.5rem 0 1.25rem 0',
            letterSpacing: '-0.02em'
          }}
        >
          SOMETHING HERE MIGHT BE YOUR NEXT FAVORITE.
        </h2>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2.25rem' }}>
          Explore the collection and find something to learn, play or build.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button
            onClick={() => onSelectCategory('all')}
            className="btn-primary"
            style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem' }}
          >
            EXPLORE ALL PRODUCTS <ArrowRight size={18} />
          </button>
          <button
            onClick={() => onSelectCategory('book')}
            className="btn-secondary"
            style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
          >
            <BookOpen size={18} color="var(--primary)" /> VISIT BOOKSTORE →
          </button>
        </div>

        {/* Small Elegant Product Collage */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            maxWidth: '520px',
            margin: '0 auto'
          }}
        >
          <img
            src="/assets/Android Native 2026 Thumbnail.png"
            alt="Book preview"
            style={{ width: '130px', height: '90px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}
          />
          <img
            src="/assets/Candy-Match 2.png"
            alt="Game preview"
            style={{ width: '140px', height: '100px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-hover)' }}
          />
          <img
            src="/assets/web-dev-roadmap-2026.png"
            alt="Web project preview"
            style={{ width: '130px', height: '90px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}
          />
        </div>
      </div>
    </section>
  );
};
