import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const AboutFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is KrishnaStores?',
      a: 'KrishnaStores is a digital storefront where visitors can discover books, games, web projects and other digital products in one organized marketplace.'
    },
    {
      q: 'Who creates the products?',
      a: 'KrishnaStores is created and maintained independently by developer and author Krishna Patil Rajput.'
    },
    {
      q: 'What can I buy?',
      a: 'The current store includes digital ebooks (development & growth guides), web games, and developer web applications / source-code templates.'
    },
    {
      q: 'How do purchases work?',
      a: 'KrishnaStores acts as the discovery showcase. Purchase links take you directly to established external platforms, such as Gumroad or itch.io, for secure checkout and fulfillment.'
    },
    {
      q: 'Do I need an account?',
      a: 'No. You can browse KrishnaStores, explore detailed product information, and save items freely without being forced to create an account.'
    },
    {
      q: 'Can I save products?',
      a: 'Yes. You can save products to your personal wishlist directly within your browser without requiring an account or login.'
    }
  ];

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            EVERYTHING YOU NEED TO KNOW
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    backgroundColor: 'transparent'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} color="var(--primary)" />
                    {faq.q}
                  </span>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: 'var(--primary)',
                      flexShrink: 0
                    }}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.25rem 3.1rem',
                      fontSize: '0.95rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      animation: 'fadeIn 0.25s ease forwards'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
