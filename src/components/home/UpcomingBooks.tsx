"use client";

import React from 'react';
import { upcomingBooks } from '@/lib/data';
import { BookOpen, Sparkles } from 'lucide-react';
import styles from './UpcomingBooks.module.css';

const UpcomingBooks = () => {
  return (
    <section className="py-32 container mx-auto px-6 relative z-10">
      <div className="text-center mb-20">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">Future Knowledge</span>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Coming Soon</h2>
        <p className="text-white/40 text-lg font-medium max-w-2xl mx-auto">
          We are constantly working on new premium resources to help you master modern technology and emotional intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {upcomingBooks.map((book, i) => (
          <div key={i} className={styles.upcomingCard}>
            <div className={styles.iconWrapper}>
              <BookOpen className="w-8 h-8 text-white/20" />
            </div>
            <div className={styles.badge}>{book.category}</div>
            <h3 className="text-xl font-bold tracking-tight mb-2">{book.title}</h3>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
              <Sparkles className="w-3 h-3" /> In Development
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingBooks;
