"use client";

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingBag, Star, ShieldCheck, Zap, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PersonalStore = () => {
  const personalProducts = useMemo(() =>
    products.filter(p => p.category === 'personal'),
  []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40 border border-white/10 p-12 md:p-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <Sparkles className="w-3 h-3" /> Digital Creations by Krishna
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6"
            >
              ELITE <span className="text-purple-500">PERSONAL</span> COLLECTION
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 font-medium mb-10 leading-relaxed"
            >
              Exclusive animated assets, custom HTML experiences, and premium digital tools handcrafted for creators who demand excellence. Secure, fast, and production-ready.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="#collection" className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-500 flex items-center gap-2">
                Browse Vault <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Highlight */}
      <section className="container mx-auto px-6 mb-32" id="collection">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em]">The Collection</span>
            <h2 className="text-4xl font-black tracking-tighter uppercase text-white mt-2">Personal Vault Assets</h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs font-medium uppercase tracking-wider text-right">
            Handcrafted digital goods with verified secure delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={false}
              onToggleWishlist={() => {}}
              onSelectProduct={() => {}}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-6 py-20 border-y border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { icon: ShieldCheck, title: "SECURE PAY", desc: "Razorpay Encrypted" },
            { icon: Zap, title: "INSTANT", desc: "Digital Delivery" },
            { icon: Star, title: "PREMIUM", desc: "Elite Quality" },
            { icon: ShoppingBag, title: "VERIFIED", desc: "Safe Checkout" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-purple-500 border border-white/10">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">{item.title}</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PersonalStore;
