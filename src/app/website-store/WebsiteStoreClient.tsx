"use client";

import React, { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Search, Code2, Globe, Layout, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { Book } from '@/types';
import styles from '../books/books.module.css'; // Reuse existing styles

interface WebsiteStoreClientProps {
  products: Book[];
}

const WebsiteStoreClient = ({ products }: WebsiteStoreClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const features = [
    {
      icon: Code2,
      title: "Clean Source Code",
      desc: "Production-ready, well-documented code following industry best practices."
    },
    {
      icon: Globe,
      title: "Modern Tech Stack",
      desc: "Built with React, Next.js, Tailwind CSS, and other modern technologies."
    },
    {
      icon: Layout,
      title: "Premium UI/UX",
      desc: "Beautifully designed interfaces that are responsive and conversion-optimized."
    },
    {
      icon: Cpu,
      title: "Easy Integration",
      desc: "Modular architecture makes it simple to integrate into your existing projects."
    }
  ];

  return (
    <div className={`${styles.container} relative overflow-hidden`}>
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

      <div className={styles.header}>
        <div>
          <div className="flex items-center gap-2 mb-4">
             <div className="w-8 h-1 bg-emerald-500" />
             <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500">Source Code Repository</span>
          </div>
          <h1 className={`${styles.title} text-6xl md:text-8xl italic uppercase tracking-tighter`}>
            Website <span className="text-gradient">Store</span>
          </h1>
          <p className={`${styles.subtitle} max-w-xl text-xl font-medium mt-6 text-white/40`}>
            Premium production-ready source code for high-fidelity websites.
            Built for developers who value performance and pixel-perfect design.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search source code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="glass-card p-6 border-white/5 hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-8">
         <p className="text-sm text-white/40">
           Showing {filteredProducts.length} source codes
         </p>
      </div>

      {/* Products Grid */}
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className={styles.emptyState}>
            <Search className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No source code found</h3>
            <p className={styles.emptyText}>Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteStoreClient;
