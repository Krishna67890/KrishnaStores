"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ExternalLink, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  slug: string;
  category: string;
  alt: string;
}

interface GalleryClientProps {
  items: GalleryItem[];
}

const GalleryClient = ({ items: uniqueItems }: GalleryClientProps) => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-mesh">
      <div className="container mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6"
        >
          <Camera className="w-4 h-4" /> Visual Showcase
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black font-display mb-6">
          Inside Our <span className="color-gradient-text">Premium Books</span>
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto text-lg">
          Take a look at the high-quality content, structured roadmaps, and professional layouts
          waiting for you inside our digital editions.
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {uniqueItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative group rounded-3xl overflow-hidden border border-white/10 bg-white/5 break-inside-avoid mb-6"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold mb-4 line-clamp-2">{item.title}</h3>
                <Link
                  href={item.category === 'Games' ? `/game/${item.slug}` : `/book/${item.slug}`}
                  className="flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> View Details <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {uniqueItems.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-white/10 border-dashed">
            <Camera className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 font-bold uppercase tracking-widest">More previews coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryClient;
