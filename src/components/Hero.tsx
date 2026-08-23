import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      gsap.from('.gsap-hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.gsap-hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.25,
        ease: 'power3.out'
      });

      gsap.from('.gsap-hero-buttons', {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out'
      });

      gsap.from('.gsap-hero-trust', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        delay: 0.55,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '4.5rem 0 4rem 0',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
        <div
          className="gsap-hero-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            border: '1px solid var(--border-color)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.1)'
          }}
        >
          <Sparkles size={14} color="var(--primary)" />
          <span>INDEPENDENT DIGITAL STOREFRONT · 2026 EDITIONS</span>
        </div>

        <h1
          className="gsap-hero-title"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--text-main)',
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem'
          }}
        >
          KRISHNAELITE.<br />
          <span style={{ color: 'var(--primary)' }}>03 FLAGSHIP BOOKS.</span>
        </h1>

        <p
          className="gsap-hero-subtitle"
          style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
            fontWeight: 500,
            color: 'var(--text-muted)',
            marginBottom: '2.25rem',
            lineHeight: 1.5
          }}
        >
          ₹2,096 Elite Mastery Bundle Value Anchored<br />
          <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Krishna Ajaysing Rajput | Krishna Patil Rajput — 100% Authentic Digital Roadmaps
          </span>
        </p>

        <div className="gsap-hero-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <button
            onClick={onExploreClick}
            className="btn-primary"
            style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem' }}
          >
            EXPLORE CATALOG <ArrowDown size={18} />
          </button>
          
          <a
            href="https://krishnapatilrajput.gumroad.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
          >
            GUMROAD STOREFRONT ↗
          </a>
        </div>

        {/* Value Trust & Buyer Attraction Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.25rem',
            marginTop: '3rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            flexWrap: 'wrap'
          }}
        >
          <span className="gsap-hero-trust" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={18} color="var(--accent-emerald)" /> 100% Verified Digital Assets
          </span>
          <span className="gsap-hero-trust" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={18} color="var(--primary)" /> Instant 1-Click Access
          </span>
          <span className="gsap-hero-trust" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={18} color="var(--accent-warm)" /> Direct Author Support
          </span>
        </div>
      </div>
    </section>
  );
};
