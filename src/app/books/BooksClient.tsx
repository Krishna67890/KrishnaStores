"use client";

import React, { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Search, SlidersHorizontal, ChevronDown, CheckCircle2, ShieldCheck, Zap, Download, RefreshCcw } from 'lucide-react';
import styles from './books.module.css';
import { Book } from '@/types';

interface BooksClientProps {
  books: Book[];
}

const BooksClient = ({ books }: BooksClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const benefits = [
    {
      icon: Zap,
      title: "Instant Delivery",
      desc: "Get immediate access to your eBooks right after checkout. No waiting, no delays."
    },
    {
      icon: ShieldCheck,
      title: "Secure Purchase",
      desc: "Your transactions are protected with industry-standard encryption and secure payment gateways."
    },
    {
      icon: RefreshCcw,
      title: "Lifetime Updates",
      desc: "Technology evolves, and so do our books. Get all future editions and updates for free."
    },
    {
      icon: CheckCircle2,
      title: "Verified Quality",
      desc: "Every book is peer-reviewed and tested by industry experts to ensure accuracy and value."
    }
  ];

  const categories = ['All', 'Self-Help', 'Programming', 'Development', 'AI', 'Career', 'Design'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>All Premium Books</h1>
          <p className={styles.subtitle}>Invest in yourself with our curated collection of knowledge.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className="btn-outline flex items-center justify-center gap-2 py-3">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Value Proposition Section */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, i) => (
          <div key={i} className="glass-card p-6 border-white/5 hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <benefit.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{benefit.desc}</p>
          </div>
        ))}
      </section>

      {/* Buying Guide Section */}
      <section className="mb-20 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black mb-6">Why & Where to Purchase?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Directly from the Author</h4>
                  <p className="text-sm text-white/50">Purchase directly from <strong>Krishna Ajaysing Rajput</strong>'s official platform to ensure you get the authentic, latest version with full support.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Elite Learning Experience</h4>
                  <p className="text-sm text-white/50">These aren't just books; they are blueprints. You get structured roadmaps, source code, and professional templates that you won't find anywhere else.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Global Accessibility</h4>
                  <p className="text-sm text-white/50">Available worldwide. Pay in your local currency and download immediately to start your mastery journey.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card p-8 border-primary/20 bg-primary/5">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" /> What's Included?
            </h3>
            <ul className="space-y-4">
              {[
                "High-Fidelity PDF & ePub Formats",
                "Full Source Code & Exercise Files",
                "Interactive Learning Roadmap PDF",
                "Exclusive Discord Community Access",
                "Priority Support for Readers",
                "Bonus Cheat Sheets & Templates"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <div className={styles.categoryBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.categoryBtnActive : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-8">
         <p className="text-sm text-white/40">
           Showing {filteredBooks.length} books
         </p>
         <div className="flex items-center gap-2 text-sm font-medium">
           <span className="text-white/40">Sort by:</span>
           <button className="flex items-center gap-1 text-white hover:text-primary">
             Newest <ChevronDown className="w-4 h-4" />
           </button>
         </div>
      </div>

      {/* Books Grid */}
      <div className={styles.grid}>
        {filteredBooks.map((book) => (
          <ProductCard key={book.id} product={book} />
        ))}

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className={styles.emptyState}>
            <Search className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No books found</h3>
            <p className={styles.emptyText}>Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className={styles.clearBtn}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksClient;
