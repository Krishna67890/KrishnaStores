"use client";

import React from 'react';
import { upcomingBooks } from '@/lib/data';
import { BookOpen, Sparkles } from 'lucide-react';
import styles from './UpcomingBooks.module.css';

const UpcomingBooks = () => {
  return (
    <section className="py-32 container mx-auto px-6 relative z-10 border-t border-white/5">
      <div className="text-center mb-24">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#05ffa3] mb-6 block text-glow-emerald">Incoming Protocols</span>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase leading-[0.85]">
          STAGED FOR<br />
          <span className="text-slate-800">DEPLOYMENT.</span>
        </h2>
        <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
          The next generation of professional resources is currently undergoing elite validation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {upcomingBooks.map((book, i) => (
          <div key={i} className={`${styles.upcomingCard} group hover:border-[#05ffa3]/30 transition-all duration-700`}>
            <div className={styles.iconWrapper}>
              <BookOpen className="w-8 h-8 text-white/10 group-hover:text-[#05ffa3] transition-colors duration-500" />
            </div>
            <div className={`${styles.badge} bg-white/5 border border-white/10 text-white/60 group-hover:bg-[#05ffa3] group-hover:text-black transition-all duration-500`}>{book.category}</div>
            <h3 className="text-2xl font-black tracking-tighter mb-4 uppercase group-hover:text-white transition-colors">{book.title}</h3>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#05ffa3]/40 group-hover:text-[#05ffa3] transition-colors">
              <Sparkles className="w-3.5 h-3.5" /> Validation Active
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingBooks;
