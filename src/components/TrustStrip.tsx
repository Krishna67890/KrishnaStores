import React from 'react';
import {
  ShieldCheck,
  Download,
  BadgeCheck,
  Headphones
} from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'Protected purchase process'
    },
    {
      icon: Download,
      title: 'Instant Delivery',
      description: 'Quick digital access'
    },
    {
      icon: BadgeCheck,
      title: 'Verified Products',
      description: 'Quality digital resources'
    },
    {
      icon: Headphones,
      title: 'Creator Support',
      description: 'Get help when required'
    }
  ];

  return (
    <section className="trust-strip">
      <div className="container trust-strip-grid">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div className="trust-strip-item" key={benefit.title}>
              <div className="trust-strip-icon">
                <Icon size={23} />
              </div>

              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};