import React, { useEffect, useRef } from 'react';
import { BookOpen, Gamepad2, Code2, ArrowRight, Joystick } from 'lucide-react';
import { CategoryFilter } from '../types/store';
import gsap from 'gsap';

interface ShopByPurposeProps {
  onSelectCategory: (category: CategoryFilter) => void;
}

export const ShopByPurpose: React.FC<ShopByPurposeProps> = ({ onSelectCategory }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-purpose-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '3.5rem 0 3rem 0', backgroundColor: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            SHOP BY PURPOSE
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            WHAT ARE YOU LOOKING FOR?
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            maxWidth: '1200px',
            margin: '0 auto',
            gap: '1.25rem',
            padding: '0 1rem'
          }}
        >
          {/* Bookstore */}
          <div
            className="gsap-purpose-card"
            onClick={() => onSelectCategory('book')}
            style={{
              padding: '1.75rem',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '210px',
              textAlign: 'center',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  marginInline: 'auto'
                }}
              >
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)' }}>
                BOOKSTORE (04)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                4 Digital Books & Developer Guides
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
              Explore Bookstore <ArrowRight size={16} />
            </div>
          </div>

          {/* Gamestore */}
          <div
            className="gsap-purpose-card"
            onClick={() => onSelectCategory('game')}
            style={{
              padding: '1.75rem',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '210px',
              textAlign: 'center',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  marginInline: 'auto'
                }}
              >
                <Gamepad2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)' }}>
                GAMESTORE (02)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                HTML5 & 3D Voxel Game Source Code
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
              Explore Gamestore <ArrowRight size={16} />
            </div>
          </div>

          {/* Roblox Games */}
          <div
            className="gsap-purpose-card"
            onClick={() => onSelectCategory('roblox')}
            style={{
              padding: '1.75rem',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '210px',
              textAlign: 'center',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  marginInline: 'auto'
                }}
              >
                <Joystick size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)' }}>
                ONLINE GAMES (03)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Roblox Adventure & Parkour Experiences
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
              Explore Roblox <ArrowRight size={16} />
            </div>
          </div>

          {/* Webstore */}
          <div
            className="gsap-purpose-card"
            onClick={() => onSelectCategory('web')}
            style={{
              padding: '1.75rem',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '210px',
              textAlign: 'center',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  marginInline: 'auto'
                }}
              >
                <Code2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)' }}>
                WEBSTORE (02)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Full-Stack Web App Source Code
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
              Explore Webstore <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
