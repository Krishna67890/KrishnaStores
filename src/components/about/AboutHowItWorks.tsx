import React, { useEffect, useRef } from 'react';
import { Search, Eye, CheckSquare, ExternalLink, ArrowRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';

export const AboutHowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-step-card', {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      desc: 'Browse digital Books, Games or Web products in one central marketplace.',
      icon: Search
    },
    {
      num: '02',
      title: 'EXPLORE',
      desc: 'Open a dedicated product page to review features, contents and specifications.',
      icon: Eye
    },
    {
      num: '03',
      title: 'DECIDE',
      desc: 'Understand fit, price, target audience, and transparent before-you-buy notes.',
      icon: CheckSquare
    },
    {
      num: '04',
      title: 'BUY',
      desc: 'Continue seamlessly to official external checkout platforms (Gumroad or itch.io).',
      icon: ExternalLink
    }
  ];

  return (
    <section ref={sectionRef} style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        {/* Step Timeline Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            TRANSPARENT PROCESS
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            HOW KRISHNASTORES WORKS
          </h2>
        </div>

        {/* 4-Step Process Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="gsap-step-card"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-card)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {step.num}
                  </span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} />
                  </div>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Section 13: WHERE DOES MY PURCHASE HAPPEN? */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-card)',
            maxWidth: '860px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-emerald)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            CUSTOMER TRUST & SAFETY
          </span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0.75rem 0' }}>
            WHERE DOES MY PURCHASE HAPPEN?
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            KrishnaStores is the discovery and product showcase experience. Purchases are completed securely through established external platforms (Gumroad or itch.io) linked directly on each product page.
          </p>

          {/* Trust Flow Steps */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              fontSize: '0.85rem',
              fontWeight: 800,
              color: 'var(--text-main)'
            }}
          >
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.75rem 1.25rem', borderRadius: '10px' }}>
              1. KRISHNASTORES DISCOVER
            </div>
            <ArrowRight size={16} color="var(--primary)" className="desktop-arrow" />
            <ArrowDown size={16} color="var(--primary)" className="mobile-arrow" style={{ display: 'none' }} />
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.75rem 1.25rem', borderRadius: '10px' }}>
              2. PRODUCT PAGE UNDERSTAND
            </div>
            <ArrowRight size={16} color="var(--primary)" className="desktop-arrow" />
            <ArrowDown size={16} color="var(--primary)" className="mobile-arrow" style={{ display: 'none' }} />
            <div style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem 1.25rem', borderRadius: '10px' }}>
              3. GUMROAD / ITCH.IO PURCHASE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
