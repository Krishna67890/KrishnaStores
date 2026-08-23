import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#090D16', color: '#FFFFFF', padding: '3.5rem 0 2.5rem 0', borderTop: '1px solid #1E293B' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid #1E293B'
          }}
        >
          {/* Brand Col */}
          <div>
            <a href="#" aria-label="KrishnaElite home" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <img
                src="/important/KrishnaStores%20logo.png"
                alt="KrishnaElite"
                style={{ height: '42px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </a>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6, maxWidth: '320px' }}>
              The flagship digital bookstore for elite mastery roadmaps. Signature collection by Krishna Ajaysing Rajput | Krishna Patil Rajput.
            </p>
          </div>

          {/* Direct External Storefront Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              OFFICIAL MARKETPLACE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#CBD5E1' }}>
              <a
                href="https://krishnapatilrajput.gumroad.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Gumroad Storefront ↗
              </a>
            </div>
          </div>

          {/* Department Breakdown */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              DEPARTMENTS (03 FLAGSHIP BOOKS)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#94A3B8' }}>
              <span>• WEB DEVELOPMENT — 2026 Edition</span>
              <span>• ANDROID DEVELOPMENT — 2026 Edition</span>
              <span>• SELF-HELP & HEALING — Personal Growth</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#64748B'
          }}
        >
          <span>© 2026 Krishna Ajaysing Rajput | Krishna Patil Rajput. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built for Elite Performance
          </span>
        </div>
      </div>
    </footer>
  );
};
