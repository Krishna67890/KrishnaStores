"use client";

import React from 'react';
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/product/ProductCard";
import UpcomingBooks from "@/components/home/UpcomingBooks";
import { ArrowRight, Gamepad2, BookOpen, Rocket, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import styles from './home.module.css';
import { motion } from 'framer-motion';

import FeaturedBooks from "@/components/home/FeaturedBooks";

export default function HomeClient({ books, games }: { books: any[], games: any[] }) {
  const websiteProducts = books.filter(book => book.category === 'Website Store');
  const bestsellerBooks = books.filter(book => book.category !== 'Website Store').slice(0, 3);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.meshBackground} />

      <Hero />

      {/* Featured Books Section */}
      <FeaturedBooks products={bestsellerBooks} title="Bestselling eBooks" subtitle="Knowledge Hub" description="Master new skills with our premium roadmaps." viewAllLink="/books" viewAllText="View All Books" />

      {/* Website Store Section */}
      <section className="py-32 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4 justify-center md:justify-start"
            >
              <Rocket className="w-5 h-5 text-emerald-400" />
              <span className={styles.subTitle} style={{ color: '#34d399' }}>Digital Products</span>
            </motion.div>
            <h2 className={styles.sectionTitle}>Website Store</h2>
            <p className="text-white/40 text-lg font-medium mt-4">Premium source code for high-quality websites.</p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <Link href="/website-store" className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-sm font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
              View Store <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {websiteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-32 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4 justify-center md:justify-start"
            >
              <Gamepad2 className="w-5 h-5 text-indigo-400" />
              <span className={styles.subTitle} style={{ color: '#818cf8' }}>Play & Create</span>
            </motion.div>
            <h2 className={styles.sectionTitle}>Premium Game Store</h2>
            <p className="text-white/40 text-lg font-medium mt-4">High-fidelity HTML5 games with full source code.</p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <Link href="/games" className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-sm font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
              Explore Games <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {games.map((game) => (
            <ProductCard key={game.id} product={game} />
          ))}
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <span className={styles.subTitle}>Our Standards</span>
            <h2 className={styles.sectionTitle}>Built for Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Rocket, title: "Instant Delivery", desc: "Get your digital assets immediately after purchase via secure download links." },
              { icon: Sparkles, title: "Curated Quality", desc: "Every book and game is handcrafted to ensure professional standards and clarity." },
              { icon: Trophy, title: "Lifetime Updates", desc: "Receive all future enhancements and new editions at no additional cost." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">{feature.title}</h3>
                <p className="text-white/40 font-medium leading-relaxed max-w-sm mx-auto">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <UpcomingBooks />

      {/* Newsletter */}
      <section className="container mx-auto px-6 relative z-10 pb-32 pt-20">
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-6 block">Stay Ahead</span>
            <h2 className={styles.newsletterTitle}>Join the Community</h2>
            <p className="text-white/80 mb-14 text-xl font-medium leading-relaxed">Subscribe to get notified about new releases, game dev tips, and exclusive discounts.</p>

            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your professional email"
                className={styles.inputField}
              />
              <button className={styles.submitBtn}>
                Subscribe
              </button>
            </div>
            <p className="mt-8 text-xs font-bold text-white/40 uppercase tracking-[0.2em]">© 2026 Krishna Patil Rajput • All Rights Reserved</p>
          </div>
        </div>
      </section>
    </div>
  );
}
