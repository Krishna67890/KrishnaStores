import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Gamepad2, Code2, Eye, Sparkles, CheckCircle2, Shield, Heart } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product, CategoryFilter } from '../../types/store';
import { ProductCard } from '../ProductCard';
import gsap from 'gsap';

interface AboutShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const AboutShowcase: React.FC<AboutShowcaseProps> = ({ onSelectProduct, onSelectCategory }) => {
  const [hoveredWord, setHoveredWord] = useState<'learn' | 'play' | 'build' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-showcase-item', {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Dynamically calculate catalog counts from source data
  const bookCount = PRODUCTS.length;

  const showcaseProducts = PRODUCTS.slice(0, 3);

  // Artwork for signature Learn/Play/Build typography hover
  const wordImages = {
    learn: PRODUCTS[0]?.image || '/assets/Android Native 2026 Thumbnail.png',
    play: PRODUCTS[2]?.image || '/assets/Why Was I Only An Option.png',
    build: PRODUCTS[1]?.image || '/assets/web-dev-roadmap-2026.png'
  };

  return (
    <section ref={containerRef} style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        {/* Section 18: WHAT CAN YOU FIND HERE? */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            MARKETPLACE CATALOG OVERVIEW
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            WHAT CAN YOU FIND HERE?
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            maxWidth: '600px',
            margin: '0 auto',
            gap: '1.5rem',
            marginBottom: '4.5rem'
          }}
        >
          <div
            onClick={() => onSelectCategory('book')}
            className="gsap-showcase-item"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '2px solid var(--primary)',
              borderRadius: '20px',
              padding: '2rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-card)',
              transition: 'all 0.25s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', marginInline: 'auto' }}>
              <BookOpen size={22} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em' }}>FLAGSHIP COLLECTION</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>
              03 ELITE MASTERY BOOKS
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Developer roadmaps & strategic mastery guides anchored at ₹2,096 total value.
            </p>
          </div>
        </div>

        {/* Section 22: SIGNATURE VISUAL TYPOGRAPHY: LEARN. PLAY. BUILD. */}
        <div
          className="gsap-showcase-item"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            marginBottom: '4.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            THE KRISHNAELITE MOTTO — 03 FLAGSHIP ROADMAPS
          </span>

          <div
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-main)',
              letterSpacing: '-0.03em',
              margin: '1rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <span
              onMouseEnter={() => setHoveredWord('learn')}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                cursor: 'pointer',
                color: hoveredWord === 'learn' ? 'var(--primary)' : 'var(--text-main)',
                transition: 'color 0.2s ease'
              }}
            >
              LEARN.
            </span>
            <span
              onMouseEnter={() => setHoveredWord('play')}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                cursor: 'pointer',
                color: hoveredWord === 'play' ? '#EC4899' : 'var(--text-main)',
                transition: 'color 0.2s ease'
              }}
            >
              PLAY.
            </span>
            <span
              onMouseEnter={() => setHoveredWord('build')}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                cursor: 'pointer',
                color: hoveredWord === 'build' ? '#4F46E5' : 'var(--text-main)',
                transition: 'color 0.2s ease'
              }}
            >
              BUILD.
            </span>
          </div>

          {/* Dynamic Artwork Hover Preview */}
          {hoveredWord && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', animation: 'fadeIn 0.25s ease forwards' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-hover)', padding: '6px', backgroundColor: 'var(--bg-secondary)' }}>
                <img
                  src={wordImages[hoveredWord]}
                  alt={hoveredWord}
                  style={{ height: '120px', width: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 19: A FEW THINGS YOU CAN DISCOVER */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              THE 03 FLAGSHIP ROADMAPS
            </h3>
            <button onClick={() => onSelectCategory('all')} style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
              Explore The Catalog →
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {showcaseProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={false}
                onToggleWishlist={() => {}}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>

        {/* Section 21: WHAT MATTERS HERE (VALUES) */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
              OUR CORE VALUES
            </span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              WHAT MATTERS HERE
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem'
            }}
          >
            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>VALUE 01</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>CLARITY</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Products should be easy to understand before deciding to buy.</p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EC4899' }}>VALUE 02</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>CURIOSITY</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>There should always be something interesting to discover.</p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4F46E5' }}>VALUE 03</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>CREATIVITY</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Digital products should be a place for ideas to become real.</p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669' }}>VALUE 04</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>USEFULNESS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Products should provide genuine value rather than complexity.</p>
            </div>
          </div>
        </div>

        {/* Section 23 & 24: THE KRISHNASTORES PROMISE & NO FAKE PROOF */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <Shield size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              THE KRISHNAELITE PROMISE
            </h3>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            We prioritize transparency and simple discovery above all else:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" /> Clear & honest product descriptions
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" /> Straightforward external purchase paths
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" /> Zero mandatory account creation requirements
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" /> Growing collection of independent digital products
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
