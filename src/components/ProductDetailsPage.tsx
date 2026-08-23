import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Heart,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info,
  BookOpen,
  Gamepad2,
  Code2,
  ChevronRight,
  Zap,
  Clock,
  Award,
  TrendingUp,
  XCircle,
  Star
} from 'lucide-react';
import { Product, CategoryFilter } from '../types/store';
import { ProductCard } from './ProductCard';
import gsap from 'gsap';

interface ProductDetailsPageProps {
  product: Product;
  allProducts: Product[];
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onBackToStore: () => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  allProducts,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onBackToStore,
  onSelectCategory
}) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImage(product.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!detailsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-detail-item', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out'
      });
    }, detailsRef);

    return () => ctx.revert();
  }, [product]);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(allProducts.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 3);

  return (
    <div ref={detailsRef} style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', paddingBottom: '5rem', transition: 'background-color 0.3s ease' }}>
      {/* Sticky Desktop Top Purchase Bar */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 7000,
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sticky)',
          padding: '0.6rem 0',
          transition: 'background-color 0.3s ease'
        }}
        className="sticky-purchase-bar"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px' }}
            />
            <div>
              <span className="line-clamp-1" style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {product.title}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {product.categoryLabel} · {product.priceDisplay}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={product.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
            >
              BUY ON GUMROAD ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '1.5rem'
          }}
        >
          <button
            onClick={onBackToStore}
            style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <ArrowLeft size={14} /> Home Store
          </button>
          <ChevronRight size={14} color="var(--text-light)" />
          <button
            onClick={() => onSelectCategory(product.category)}
            style={{ color: 'var(--primary)', textTransform: 'uppercase' }}
          >
            Elite Mastery
          </button>
          <ChevronRight size={14} color="var(--text-light)" />
          <span style={{ color: 'var(--text-main)', fontWeight: 700 }} className="line-clamp-1">
            {product.title}
          </span>
        </nav>

        {/* TOP MAIN PRODUCT SECTION (55% Visual, 45% Info) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '3.5rem'
          }}
        >
          {/* Visual Gallery Area (55%) */}
          <div className="gsap-detail-item">
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                minHeight: '380px'
              }}
            >
              <img
                src={activeImage}
                alt={product.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                }}
              />
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '10px',
                      border: activeImage === img ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      padding: '4px',
                      backgroundColor: 'var(--bg-secondary)',
                      overflow: 'hidden'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information Area (45%) */}
          <div className="gsap-detail-item" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span className="category-badge" style={{ marginBottom: '0.5rem' }}>
                {product.categoryLabel}
              </span>
              <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.15 }}>
                {product.title}
              </h1>
              {product.subtitle && (
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginTop: '0.25rem' }}>
                  {product.subtitle}
                </p>
              )}
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {product.description}
            </p>

            {/* Conversion Impact Box */}
            {product.whyBuyNow && (
              <div
                style={{
                  backgroundColor: 'var(--primary-light)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <Sparkles size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.4 }}>
                  {product.whyBuyNow}
                </p>
              </div>
            )}

            {/* Price Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  INSTANT DIGITAL ACCESS
                </span>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
                  {product.priceDisplay}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.25rem' }}>
                  <CheckCircle2 size={14} /> 100% Verified Gumroad Fulfill
                </span>
              </div>

              {product.estimatedValue && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>ESTIMATED VALUE</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-warm)', textDecoration: 'line-through' }}>
                    {product.estimatedValue}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={product.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', padding: '0.95rem 1.5rem', fontSize: '1.05rem', gap: '8px' }}
              >
                BUY ON GUMROAD ↗ <Zap size={18} />
              </a>

              <button
                onClick={(e) => onToggleWishlist(product, e)}
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  color: isWishlisted ? '#EF4444' : 'var(--text-main)',
                  borderColor: isWishlisted ? '#FCA5A5' : 'var(--border-color)',
                  backgroundColor: isWishlisted ? '#FEF2F2' : 'var(--bg-card)'
                }}
              >
                <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} color={isWishlisted ? '#EF4444' : 'var(--text-main)'} />
                {isWishlisted ? '✓ SAVED IN WISHLIST' : 'SAVE TO WISHLIST'}
              </button>
            </div>
          </div>
        </div>

        {/* HIGH-CONVERTING "WHY YOU SHOULD PURCHASE THIS PRODUCT" SECTION */}
        <section className="gsap-detail-item" style={{ marginBottom: '3.5rem', backgroundColor: 'var(--bg-blue-tint)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              BUYER CONFIDENCE & VALUE
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              WHY YOU SHOULD PURCHASE THIS PRODUCT TODAY
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Designed directly by Krishna Ajaysing Rajput | Krishna Patil Rajput to provide real outcomes, lifetime utility, and instant deployment.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Metric Card 1: Time Saved */}
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Clock size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>EFFICIENCY ROI</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                {product.hoursSaved || 'Saves Dozens of Hours'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Skip frustrating trial & error. Get structured, battle-tested knowledge & components ready to use immediately.
              </p>
            </div>

            {/* Metric Card 2: 100% Authentic Code & Content */}
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>QUALITY GUARANTEE</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                Direct Author Delivery
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Created by Krishna Ajaysing Rajput | Krishna Patil Rajput. No broken dependencies or outdated synthetic snippets.
              </p>
            </div>

            {/* Metric Card 3: Instant 1-Click Download */}
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Award size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-warm)' }}>LIFETIME ACCESS</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                Zero Subscription Overhead
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Pay once, own forever. Delivered securely to your inbox via Gumroad / itch.io with offline access.
              </p>
            </div>
          </div>
        </section>

        {/* COMPARISON: SIGNATURE STORE VS OTHER SOURCES */}
        <section className="gsap-detail-item" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', textAlign: 'center' }}>
            WHY SIGNATURE MASTERY VS SCATTERED INTERNET TUTORIALS
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* KrishnaStores Column */}
            <div style={{ border: '2px solid var(--primary)', backgroundColor: 'var(--bg-card)', padding: '1.75rem', borderRadius: '16px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <CheckCircle2 size={22} color="var(--primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ELITE MASTERY SIGNATURE PRODUCT
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                <p>✓ 100% Code-Grounded & 2026 Production Standards</p>
                <p>✓ Instant Gumroad & Official Digital Fulfillment</p>
                <p>✓ Structured End-to-End Practical Architecture</p>
                <p>✓ Direct Dual-Creator Support & Lifetime Updates</p>
              </div>
            </div>

            {/* Generic Tutorials Column */}
            <div style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '1.75rem', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <XCircle size={22} color="var(--text-muted)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                  SCATTERED ONLINE TUTORIALS
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#CBD5E1' }}>
                <p>✕ Outdated syntax and deprecated dependencies</p>
                <p>✕ Fragmented snippets with zero real context</p>
                <p>✕ Wasted hours debugging syntax errors</p>
                <p>✕ No structured reference materials provided</p>
              </div>
            </div>
          </div>
        </section>

        {/* AT A GLANCE GRID */}
        <section className="gsap-detail-item" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            AT A GLANCE
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem'
            }}
          >
            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>PRODUCT TYPE</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.details.type}</span>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>CATEGORY</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.details.category}</span>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>EDITION / STATUS</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.details.edition}</span>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>PRICE</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.priceDisplay}</span>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>DELIVERY</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.details.delivery}</span>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>PURCHASE PLATFORM</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.details.purchasePlatform}</span>
            </div>
          </div>
        </section>

        {/* WHY THIS PRODUCT? */}
        <section className="gsap-detail-item" style={{ marginBottom: '3.5rem', backgroundColor: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            VALUE & HIGHLIGHTS
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            WHY THIS PRODUCT?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {product.benefits.map((benefit) => (
              <div
                key={benefit.number}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  padding: '1.5rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    backgroundColor: 'var(--primary-light)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {benefit.number}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.75rem 0 0.4rem 0' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* YOU MIGHT WANT THIS IF... */}
        <section className="gsap-detail-item" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            YOU MIGHT WANT THIS IF...
          </h2>

          <div
            style={{
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            {product.youMightWantThisIf.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WHO IS THIS FOR? */}
        <section className="gsap-detail-item" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            WHO IS THIS FOR?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {product.audience.map((aud, idx) => (
              <div key={idx} style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  {aud.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {aud.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT YOU GET & WHAT MAKES IT USEFUL */}
        <div
          className="gsap-detail-item"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* What You Get */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              WHAT YOU GET
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {product.whatYouGet.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <ShieldCheck size={18} color="var(--accent-emerald)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What Makes It Useful */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              WHAT MAKES THIS USEFUL?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {product.whatMakesItUseful.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <Sparkles size={18} color="var(--primary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BEFORE YOU BUY */}
        <section className="gsap-detail-item" style={{ marginBottom: '3.5rem', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', padding: '1.75rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <Info size={20} color="#D97706" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#92400E' }}>
              BEFORE YOU BUY — TRANSPARENT DETAILS
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {product.beforeYouBuy.map((note, idx) => (
              <p key={idx} style={{ fontSize: '0.9rem', color: '#78350F', fontWeight: 600 }}>
                • {note}
              </p>
            ))}
          </div>
        </section>

        {/* PURCHASE PANEL */}
        <section
          className="gsap-detail-item"
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            marginBottom: '4rem',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.3)'
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.1em' }}>
            READY TO GET INSTANT ACCESS?
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>
            {product.title}
          </h2>
          <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem' }}>
            {product.priceDisplay}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={product.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: '#2563EB' }}
            >
              BUY ON GUMROAD ↗
            </a>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '1.25rem' }}>
            Secure checkout powered by official Gumroad platform services. Instant digital delivery to your email.
          </p>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              YOU MAY ALSO LIKE
            </h2>
            <button
              onClick={onBackToStore}
              style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}
            >
              View Full Catalog →
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                isWishlisted={false}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>

        {/* ELITE MASTERY BUNDLE UPSell */}
        <section className="gsap-detail-item" style={{ marginBottom: '3.5rem', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--primary)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px 20px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 900, fontSize: '0.75rem', borderBottomLeftRadius: '15px' }}>
            BEST VALUE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>GET THE ELITE MASTERY BUNDLE</h2>
            <p style={{ color: '#94A3B8', maxWidth: '600px', marginBottom: '2rem' }}>
              Unlock the complete 3-book flagship collection including Web Development, Android Mastery, and Personal Growth. Total value anchored at ₹2,096.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {allProducts.map(p => (
                <div key={p.id} style={{ width: '80px', textAlign: 'center' }}>
                  <img src={p.image} alt="" style={{ width: '100%', borderRadius: '8px', border: '1px solid #334155', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#CBD5E1' }} className="line-clamp-1">{p.title}</div>
                </div>
              ))}
            </div>

            <a
              href="https://krishnapatilrajput.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '1rem 3rem', fontSize: '1.2rem', background: 'white', color: '#0F172A' }}
            >
              ACCESS ALL 3 BOOKS NOW
            </a>
          </div>
        </section>

        {/* KEEP EXPLORING ELITE MASTERY */}
        <section className="gsap-detail-item" style={{ backgroundColor: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            COMPLETE YOUR ELITE COLLECTION
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onSelectCategory('book')}
              className="btn-secondary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              <BookOpen size={18} color="var(--primary)" /> ELITE MASTERY (03) →
            </button>
          </div>
        </section>
      </div>

      {/* MOBILE FIXED BOTTOM PURCHASE BAR */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 8000,
          backgroundColor: 'var(--bg-card)',
          borderTop: '1px solid var(--border-color)',
          padding: '12px 16px',
          boxShadow: 'var(--shadow-sticky)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        className="mobile-bottom-bar"
      >
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>PRICE</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.priceDisplay}</span>
        </div>
        <a
          href={product.gumroadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
        >
          BUY NOW ↗
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sticky-purchase-bar { display: none !important; }
          .mobile-bottom-bar { display: flex !important; }
        }
      `}</style>
    </div>
  );
};
