import React, { useEffect } from 'react';
import { Product, CategoryFilter } from '../../types/store';
import { AboutHero } from './AboutHero';
import { AboutStory } from './AboutStory';
import { AboutThreeWorlds } from './AboutThreeWorlds';
import { AboutWhyStore } from './AboutWhyStore';
import { AboutHowItWorks } from './AboutHowItWorks';
import { AboutCreator } from './AboutCreator';
import { AboutShowcase } from './AboutShowcase';
import { AboutFAQ } from './AboutFAQ';
import { AboutFinalCTA } from './AboutFinalCTA';

interface AboutPageProps {
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onSelectProduct, onSelectCategory }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'About KrishnaStores — Digital Books, Games & Web Products';
  }, []);

  const handleMeetCreator = () => {
    const el = document.getElementById('creator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      {/* 1. Hero with GSAP Entrance & Mouse Parallax */}
      <AboutHero
        onExploreProducts={() => onSelectCategory('all')}
        onMeetCreator={handleMeetCreator}
      />

      {/* 2. Story: The Idea Behind KrishnaStores */}
      <AboutStory />

      {/* 3. Three Worlds: Learn (Books), Play (Games), Build (Web) */}
      <AboutThreeWorlds onSelectCategory={onSelectCategory} />

      {/* 4. Why KrishnaStores? & Customer-First Philosophy */}
      <AboutWhyStore />

      {/* 5. How KrishnaStores Works & Transparent Purchase Flow */}
      <AboutHowItWorks />

      {/* 6. Meet The Creator (Krishna Patil Rajput) & Verified Links */}
      <AboutCreator />

      {/* 7. What Can You Find Here? (Dynamic Counts, Showcase & Motto Hover) */}
      <AboutShowcase onSelectProduct={onSelectProduct} onSelectCategory={onSelectCategory} />

      {/* 8. Frequently Asked Questions Accordion */}
      <AboutFAQ />

      {/* 9. Final Call To Action & Product Collage */}
      <AboutFinalCTA onSelectCategory={onSelectCategory} />
    </div>
  );
};
