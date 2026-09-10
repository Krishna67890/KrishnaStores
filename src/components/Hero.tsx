import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
  Star
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="marketplace-hero">
      <div className="container marketplace-hero-grid">
        {/* Left content */}
        <div className="marketplace-hero-content">
          <div className="marketplace-offer-badge">
            <Zap size={15} />
            Instant access to digital products
          </div>

          <h1 className="marketplace-hero-title">
            Learn, play and build with
            <span> KrishnaStores</span>
          </h1>

          <p className="marketplace-hero-description">
            Explore books, games, creative projects and developer resources
            created to help you learn and build faster.
          </p>

          <div className="marketplace-hero-actions">
            <button
              type="button"
              onClick={onExploreClick}
              className="marketplace-shop-button"
            >
              Shop now
              <ArrowRight size={18} />
            </button>

            <a
              href="https://krishnapatilrajput.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="marketplace-secondary-button"
            >
              Visit Gumroad
            </a>
          </div>

          <div className="marketplace-trust-row">
            <span>
              <ShieldCheck size={17} />
              Secure purchase
            </span>

            <span>
              <Zap size={17} />
              Instant delivery
            </span>

            <span>
              <Headphones size={17} />
              Creator support
            </span>
          </div>
        </div>

        {/* Right product display */}
        <div className="marketplace-hero-visual">
          <div className="marketplace-product-card">
            <div className="marketplace-bestseller">
              <Star size={14} fill="currentColor" />
              Bestseller
            </div>

            <img
              src="/assets/Android Native 2026 Thumbnail.png"
              alt="Android App Development with React Native"
            />

            <div className="marketplace-product-info">
              <p>Featured developer guide</p>

              <h2>
                Android App Development with React Native
              </h2>

              <div className="marketplace-product-price">
                <strong>₹299</strong>
                <del>₹2,096</del>
                <span>86% off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};