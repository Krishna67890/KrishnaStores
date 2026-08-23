import React, { useEffect, useRef } from 'react';
import { Compass, FileText, UserCheck, ShieldCheck, HelpCircle } from 'lucide-react';
import gsap from 'gsap';

export const AboutWhyStore: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-why-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });

      gsap.from('.gsap-q-pill', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.4)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const questions = [
    'WHAT IS IT?',
    'WHO IS IT FOR?',
    'WHY MIGHT I LIKE IT?',
    'WHAT DO I GET?',
    'HOW MUCH DOES IT COST?',
    'WHERE DO I BUY IT?'
  ];

  return (
    <section ref={sectionRef} style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        {/* Section 10: WHY KRISHNASTORES? */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            STORE PRINCIPLES
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            WHY KRISHNASTORES?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Customer-focused values built around clarity, convenience, and direct independence.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4.5rem'
          }}
        >
          {/* Card 1 */}
          <div className="gsap-why-card" style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Compass size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              SIMPLE DISCOVERY
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Find books, games and web products in one place without jumping across disconnected websites.
            </p>
          </div>

          {/* Card 2 */}
          <div className="gsap-why-card" style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileText size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              CLEAR INFORMATION
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Every product has its own page with information designed to help you understand exactly what you're getting.
            </p>
          </div>

          {/* Card 3 */}
          <div className="gsap-why-card" style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <UserCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              CREATOR-DRIVEN
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Products are brought together under one independent storefront built by a real developer.
            </p>
          </div>

          {/* Card 4 */}
          <div className="gsap-why-card" style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#E0E7FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              NO UNNECESSARY COMPLEXITY
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Browse and save products freely without being forced through mandatory account registration.
            </p>
          </div>
        </div>

        {/* Section 11: CUSTOMER-FIRST PHILOSOPHY */}
        <div
          style={{
            backgroundColor: 'var(--bg-blue-tint)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            CUSTOMER-FIRST PHILOSOPHY
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.25,
              margin: '0.5rem 0 1.5rem 0'
            }}
          >
            "BUILT AROUND THE CUSTOMER — A product page should answer your questions before you decide to buy."
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.85rem',
              maxWidth: '840px',
              margin: '0 auto'
            }}
          >
            {questions.map((q, idx) => (
              <span
                key={idx}
                className="gsap-q-pill"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  padding: '0.6rem 1.25rem',
                  borderRadius: '9999px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <HelpCircle size={14} color="var(--primary)" /> {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
