import React, { useState, useRef, useEffect } from 'react';
import { useProductReviewStats } from '../hooks/useProductReviewStats';
import {
  Heart,
  ArrowRight,
  Clock,
  Camera,
  Star
} from 'lucide-react';
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
  const [cardImageIndex, setCardImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const {
  averageRating,
  reviewCount,
  loading: reviewsLoading
} = useProductReviewStats(product.id);
  const sellingPrice = product.discountPrice ?? product.priceINR;

const originalPrice =
  product.price && product.price > sellingPrice
    ? product.price
    : null;

const discountPercentage = originalPrice
  ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
  : null;

  

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
    setCardImageIndex(0);

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
          src={galleryImages[cardImageIndex] || product.image}
          alt={product.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.2s ease'
          }}
          loading="lazy"
        />

        {/* Gallery Photo Count Badge */}
        {galleryImages.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 10,
              backgroundColor: 'rgba(15, 23, 42, 0.82)',
              backdropFilter: 'blur(6px)',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '4px 9px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <Camera size={11} color="#38BDF8" /> {galleryImages.length} Photos
          </div>
        )}

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
           VIEW PRODUCT <ArrowRight size={14} />
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
            {product.isBestseller ? (
  <span
    style={{
      fontSize: '0.68rem',
      fontWeight: 800,
      color: '#92400E',
      backgroundColor: '#FEF3C7',
      padding: '4px 7px',
      borderRadius: '5px'
    }}
  >
    BESTSELLER
  </span>
) : product.isNew ? (
  <span
    style={{
      fontSize: '0.68rem',
      fontWeight: 800,
      color: '#166534',
      backgroundColor: '#DCFCE7',
      padding: '4px 7px',
      borderRadius: '5px'
    }}
  >
    NEW
  </span>
) : null}
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
          <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '0.55rem'
  }}
>
  <span
  style={{
    fontSize: '0.82rem',
    fontWeight: 800,
    color: '#B45309'
  }}
>
  {reviewsLoading
    ? '...'
    : reviewCount > 0
      ? averageRating
      : 'New'}
</span>
  <div style={{ display: 'flex', color: '#F59E0B' }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={14}
        fill={
          star <= Math.round(product.rating ?? 4.5)
            ? 'currentColor'
            : 'none'
        }
      />
    ))}
  </div>

  <span
    style={{
      color: 'var(--text-muted)',
      fontSize: '0.75rem'
    }}
  >
    ({product.reviewsCount ?? 0})
  </span>
</div>

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
        {/** Card Footer */}
<div
  style={{
    paddingTop: '0.9rem',
    borderTop: '1px solid var(--border-color)'
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '5px'
    }}
  >
    <span
      style={{
        fontSize: '1.35rem',
        fontWeight: 800,
        color: 'var(--text-main)'
      }}
    >
      ₹{sellingPrice.toLocaleString('en-IN')}
    </span>

    {originalPrice && (
      <del
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}
      >
        ₹{originalPrice.toLocaleString('en-IN')}
      </del>
    )}

    {discountPercentage && (
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#168342'
        }}
      >
        {discountPercentage}% off
      </span>
    )}
  </div>

  <p
    style={{
      marginBottom: '0.85rem',
      color: '#168342',
      fontSize: '0.72rem',
      fontWeight: 700
    }}
  >
    {product.category === 'roblox'
      ? '✓ Play instantly'
      : '✓ Instant digital delivery'}
  </p>

  <button
    type="button"
    onClick={(event) => {
      event.stopPropagation();
      onSelectProduct(product);
    }}
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '7px',
      padding: '0.72rem 1rem',
      color: '#111827',
      backgroundColor: 'var(--marketplace-accent)',
      borderRadius: '8px',
      fontSize: '0.82rem',
      fontWeight: 800
    }}
  >
    {product.category === 'roblox'
      ? 'View on Roblox'
      : 'View product'}

    <ArrowRight size={15} />
  </button>
</div>
      </div>
    </div>
  );
}