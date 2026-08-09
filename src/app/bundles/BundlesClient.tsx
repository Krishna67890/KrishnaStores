"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

interface Bundle {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  discountPrice: number;
  coverImage: string;
  booksIncluded: string[];
  category: string;
}

interface BundlesClientProps {
  bundles: Bundle[];
}

const BundlesClient = ({ bundles }: BundlesClientProps) => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-mesh">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-[0.2em] mb-8"
          >
            <Sparkles className="w-4 h-4" /> Exclusive Collections
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black font-display mb-8 tracking-tighter">
            Elite <br/><span className="premium-gradient-text">Book Bundles</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-medium">
            Master your craft with our curated "Blueprints for Success."
            Get multiple high-fidelity guides at an <span className="text-white">unbeatable value</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {bundles.map((bundle, i) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group border-white/5 bg-white/5 hover:border-primary/30 transition-all flex flex-col md:flex-row"
            >
              <div className="w-full md:w-2/5 aspect-[3/4] overflow-hidden border-r border-white/5">
                <img src={bundle.coverImage} alt={bundle.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black mb-2">{bundle.title}</h3>
                    <p className="text-primary text-xs font-black uppercase tracking-widest">{bundle.subtitle}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <p className="text-white/40 mb-8 text-sm leading-relaxed">{bundle.description}</p>

                <div className="space-y-3 mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Includes:</p>
                  {bundle.booksIncluded.map((bookTitle, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-bold text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {bookTitle}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 line-through">
                      {formatPrice(bundle.price)}
                    </p>
                    <p className="text-2xl font-black premium-gradient-text">
                      {formatPrice(bundle.discountPrice)}
                    </p>
                  </div>
                  <a
                    href="https://krishnapatilrajput.gumroad.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium py-3 px-6 text-xs flex items-center gap-2 group"
                  >
                    Buy Bundle <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 text-center">
            <h3 className="text-2xl font-black mb-4 italic">Custom Mastery Paths?</h3>
            <p className="text-white/40 mb-8 max-w-xl mx-auto">Looking for a specific combination of books? Contact our support team for custom bundle pricing.</p>
            <Link href="/contact" className="text-primary font-black uppercase tracking-widest text-xs hover:underline flex items-center justify-center gap-2">
                Talk to us <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default BundlesClient;
