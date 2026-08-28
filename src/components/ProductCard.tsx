import React, { useState, useRef, useEffect } from 'react';
import { Heart, ArrowRight, Clock } from 'lucide-react';
import { Product } from '../types/store';
import gsap from 'gsap';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    if (isHovered) {
      gsap.to(cardRef.current, {
        y: -6,
        scale: 1.01,
        borderColor: 'var(--primary)',
        duration: 0.25,
        ease: 'power2.out'
      });
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.05,
          duration: 0.35,
          ease: 'power2.out'
        });
      }
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        borderColor: 'var(--border-color)',
        duration: 0.25,
        ease: 'power2.out'
      });
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.35,
          ease: 'power2.out'
        });
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: isHovered ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      {/* Visual Image Area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '62%',
          backgroundColor: 'var(--bg-secondary)',
          overflow: 'hidden'
        }}
      >
        <img
          ref={imageRef}
          src={product.image}
          alt={product.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          loading="lazy"
        />

        {/* Hours Saved / Value Pill Badge */}
        {product.hoursSaved && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              zIndex: 10,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(4px)',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Clock size={12} color="#38BDF8" /> {product.hoursSaved.split(' ')[0]} {product.hoursSaved.split(' ')[1]} Saved
          </div>
        )}

        {/* Wishlist Floating Button */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isWishlisted ? '#EF4444' : '#64748B',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save product to wishlist'}
        >
          <Heart
            size={18}
            fill={isWishlisted ? '#EF4444' : 'none'}
            color={isWishlisted ? '#EF4444' : '#64748B'}
          />
        </button>

        {/* Hover Action Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none'
          }}
        >
          <span
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.55rem 1.15rem',
              borderRadius: '9999px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            WHY BUY? DETAILS <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div
        style={{
          padding: '1.25rem 1.25rem 1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* Category Badge & Estimated Value Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="category-badge">
              {product.categoryLabel}
            </span>
            {product.estimatedValue && (
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 6px', borderRadius: '4px' }}>
                {product.estimatedValue}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            className="line-clamp-2"
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.3,
              marginBottom: '0.4rem'
            }}
          >
            {product.title}
          </h3>

          {/* Value Proposition */}
          <p
            className="line-clamp-2"
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.45,
              marginBottom: '1rem'
            }}
          >
            {product.valueProp}
          </p>
        </div>

        {/* Card Footer */}
        <div
          style={{
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', display: 'block', lineHeight: 1 }}>
              {product.priceDisplay}
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
              {product.category === 'roblox' ? '✓ Play Instantly' : '✓ Instant Access'}
            </span>
          </div>

          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: isHovered ? 'var(--primary-hover)' : 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {product.category === 'roblox' ? 'VIEW ON ROBLOX' : 'BUY NOW'} <ArrowRight size={14} style={{ transform: isHovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.2s' }} />
          </span>
        </div>
      </div>
    </div>
  );
};
