import React, { useEffect, useRef } from 'react';
import { ArrowRight, Star, Heart, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Product } from '../types/store';
import gsap from 'gsap';

interface FeaturedProductProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-featured-badge', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.5)'
      });

      gsap.from('.gsap-featured-card', {
        y: 35,
        opacity: 0,
        duration: 0.75,
        delay: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '2.5rem 0 1.5rem 0', backgroundColor: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        <div className="gsap-featured-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <Star size={18} fill="#D97706" color="#D97706" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', color: '#D97706', textTransform: 'uppercase' }}>
            FEATURED DIGITAL SPOTLIGHT — ELITE MASTERY ROADMAPS
          </span>
        </div>

        <div
          className="gsap-featured-card"
          onClick={() => onSelectProduct(product)}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
            padding: '2.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Left: Large Image Cover */}
          <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#FFFFFF', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                maxHeight: '380px',
                objectFit: 'contain',
                padding: '1rem',
                display: 'block'
              }}
            />
            <button
              onClick={(e) => onToggleWishlist(product, e)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} color={isWishlisted ? '#EF4444' : '#64748B'} />
            </button>
          </div>

          {/* Right: Rich Information */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <span className="category-badge">
                {product.categoryLabel} · 2026 EDITION
              </span>
              {product.estimatedValue && (
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: '4px' }}>
                  {product.estimatedValue}
                </span>
              )}
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.2,
                margin: '0.5rem 0 0.75rem 0'
              }}
            >
              {product.title}
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {product.shortDescription}
            </p>

            {/* Quick Benefits Bullet List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {product.benefits.slice(0, 3).map((b) => (
                <div key={b.number} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <ShieldCheck size={16} color="var(--primary)" />
                  <span>{b.title}: <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>{b.desc}</span></span>
                </div>
              ))}
            </div>

            {/* Price & Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>REGULAR PRICE</span>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.priceDisplay}</span>
              </div>

              <button className="btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                EXPLORE DETAILS & BUY NOW <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
