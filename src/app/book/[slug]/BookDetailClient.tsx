"use client";

import React, { useState } from 'react';
import { Book } from '@/types';
import Link from 'next/link';
import {
  Star, CheckCircle2, FileText, Globe, Clock,
  Download, ShieldCheck, ChevronRight, ArrowRight,
  Heart, Layers, User, Volume2, Play,
  Zap, Gift, HelpCircle, BadgeCheck, MessageSquare, Sparkles,
  Map, Users, PlayCircle, RefreshCw, XCircle, TrendingUp,
  Award, MousePointerClick, BookOpen, ExternalLink, Code2, Rocket, Eye, X,
  Layout, Code, ShoppingCart
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Book3D from '@/components/books/Book3D';
import styles from './book-detail.module.css';

interface BookDetailClientProps {
  book: Book;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isWebsiteStore = book.category === 'Website Store';
  const bookTags = book.tags || [book.category, isWebsiteStore ? 'Source Code' : 'eBook'];
  const bookFormat = book.format || ['PDF'];
  const bookLearnings = book.learnings || [];
  const bookFeatures = book.features || [];
  const bookContents = book.contents || [];

  return (
    <div className="pt-32 pb-20 bg-mesh min-h-screen">
      <div className={styles.container}>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={isWebsiteStore ? "/website-store" : "/books"} className={styles.breadcrumbLink}>
            {isWebsiteStore ? "Website Store" : "Books"}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className={styles.breadcrumbActive}>{book.category}</span>
        </div>

        <div className={styles.layout}>
          {/* Left: Book Cover & Quick Actions */}
          <div className={styles.leftCol}>
            <div className={styles.stickySide}>
              {/* Limited Time Offer */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Limited Time Offer</p>
                  <p className="text-sm font-bold text-white">{isWebsiteStore ? 'Get Full License + Deployment Guide' : 'Save 20% + Get 3 Free Bonuses'}</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="mb-10"
              >
                <Book3D
                  title={book.title}
                  author={book.author}
                  coverImage={book.coverImage}
                />
              </motion.div>

              <div className={styles.actions}>
                <a
                  href={book.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-premium ${styles.addToCartBtn} group flex items-center justify-center`}
                >
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="ml-2">Buy Now • {formatPrice(book.discountPrice || book.price)}</span>
                </a>
                <button className={styles.wishlistBtn}>
                  <Heart className="w-7 h-7 text-white/40" />
                </button>
              </div>

              {/* Value Propositions */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Download, text: 'Instant Access' },
                  { icon: BadgeCheck, text: 'Lifetime Updates' },
                  { icon: MessageSquare, text: 'Premium Support' },
                  { icon: ShieldCheck, text: '100% Secure' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-tight text-white/60">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 mb-8">
                <a
                  href={book.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black text-white/40 hover:text-primary transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  Also available on Gumroad <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {book.aiVoice && (
                <div className="mb-8 p-6 rounded-2xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                      <Volume2 className="w-4 h-4" /> AI Voice Overview
                    </h4>
                    <button
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(book.aiVoice);
                        window.speechSynthesis.cancel(); // Stop any current speech
                        window.speechSynthesis.speak(utterance);
                      }}
                      className="text-[10px] font-bold bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" /> Listen
                    </button>
                  </div>
                  <p className="text-sm text-white/70 italic leading-relaxed">
                    "{book.aiVoice}"
                  </p>
                </div>
              )}

              <div className={styles.securityCard}>
                <h4 className={styles.securityTitle}>
                  <ShieldCheck className="w-4 h-4" /> {isWebsiteStore ? 'Source Code Security' : 'Secure Checkout'}
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: Download, text: isWebsiteStore ? 'Instant Code Delivery' : 'Instant Digital Delivery', sub: isWebsiteStore ? 'ZIP Archive' : 'PDF Format' },
                    { icon: Globe, text: isWebsiteStore ? 'Commercial License' : 'Global Access', sub: isWebsiteStore ? 'Ready for production' : 'Read on any device' },
                    { icon: Clock, text: 'Lifetime Access', sub: 'One-time purchase' }
                  ].map((item, i) => (
                    <div key={i} className={styles.securityItem}>
                      <div className={styles.securityIcon}>
                        <item.icon className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <p className={styles.securityItemText}>{item.text}</p>
                        <p className={styles.securityItemSub}>{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Book Content */}
          <div className={styles.rightCol}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
              <div className={styles.tags}>
                {bookTags.map((tag: string) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className={`${styles.title} text-6xl md:text-8xl mb-8`}>
                {book.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 0 ? '' : 'premium-gradient-text'}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className={`${styles.subtitle} text-2xl md:text-3xl border-l-4 border-primary pl-6 py-2 bg-white/5 rounded-r-xl inline-block mb-12`}>
                {book.subtitle}
              </p>

              <div className={styles.metaGrid}>
                {[
                  { icon: isWebsiteStore ? Globe : FileText, label: isWebsiteStore ? 'Tech Stack' : 'Format', value: isWebsiteStore ? 'React / Next.js' : bookFormat.join(' / ') },
                  { icon: Globe, label: 'Language', value: book.language },
                  { icon: isWebsiteStore ? Code2 : Layers, label: isWebsiteStore ? 'Type' : 'Pages', value: book.pages },
                  { icon: Star, label: 'Rating', value: `${book.rating} / 5` },
                ].map((item, i) => (
                  <div key={i} className={styles.metaItem}>
                    <item.icon className="w-5 h-5 text-primary/50 mb-1" />
                    <p className={styles.metaLabel}>{item.label}</p>
                    <p className={styles.metaValue}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Why This Book Was Written */}
              {book.whyWritten && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>
                    <div className={styles.sectionAccent} style={{ background: '#f59e0b' }} />
                    The Inspiration Behind the Book
                  </h2>
                  <div className="text-lg text-white/70 leading-relaxed italic border-l-4 border-amber-500/30 pl-6 py-4 bg-white/5 rounded-r-2xl">
                    "{book.whyWritten}"
                  </div>
                </div>
              )}

              {/* Description */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <div className={styles.sectionAccent} />
                  {isWebsiteStore ? 'Technical Specifications' : 'About This Book'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                   <div className="space-y-4 text-lg text-white/70 leading-relaxed whitespace-pre-wrap">
                      {book.description}
                   </div>
                   <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8">
                      <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Product Details</h4>
                      <div className="space-y-4">
                        {[
                          { label: "Author", value: book.author },
                          { label: "Publisher", value: book.publisher },
                          { label: "Published", value: book.publishedDate },
                          { label: "Format", value: bookFormat.join(', ') },
                          { label: "Language", value: book.language }
                        ].map((detail, i) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-white/40 text-xs uppercase font-bold">{detail.label}</span>
                            <span className="text-white text-sm font-bold">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              {/* Why Should You Purchase This Book? */}
              {book.whyBuy && book.whyBuy.length > 0 && (
                <div className={styles.section}>
                  <h2 className="text-3xl font-black mb-12 text-center">
                    Why Should You <span className="premium-gradient-text">{isWebsiteStore ? 'Get This Source Code?' : 'Purchase This Book?'}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {book.whyBuy.map((item, i) => (
                      <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                        <p className="text-white/60 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mastery Kit / Bonuses */}
              <div className={styles.section}>
                <div className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <Gift className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-6">{isWebsiteStore ? 'The Developer' : 'The Elite'} <span className="premium-gradient-text">{isWebsiteStore ? 'Toolkit' : 'Success Bundle'}</span></h3>
                    <p className="text-white/60 mb-10 max-w-lg leading-relaxed">
                      {isWebsiteStore
                        ? "When you acquire this source code, you're getting a fully optimized, production-ready foundation with all necessary configurations."
                        : "When you invest in this book today, you're not just buying pages. You're getting a complete success ecosystem designed to accelerate your growth."
                      }
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: isWebsiteStore ? "Clean Codebase" : "Step-by-Step Roadmap", desc: isWebsiteStore ? "Industry-standard React patterns." : "A customized path based on your 2026 goals.", icon: isWebsiteStore ? Code2 : Map },
                        { title: isWebsiteStore ? "Deployment Guide" : "Private Community", desc: isWebsiteStore ? "Step-by-step Vercel/Netlify setup." : "Join 5,000+ achievers for elite networking.", icon: isWebsiteStore ? Zap : Users },
                        { title: isWebsiteStore ? "SEO Optimized" : "AI Audio Summaries", desc: isWebsiteStore ? "Pre-configured meta tags and performance." : "Listen and learn on the go with high-fidelity audio.", icon: isWebsiteStore ? Sparkles : PlayCircle },
                        { title: "Lifetime Updates", desc: isWebsiteStore ? "Get latest bug fixes and feature updates." : "Receive every future edition for free, forever.", icon: RefreshCw }
                      ].map((bonus, i) => (
                        <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                            <bonus.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm mb-1">{bonus.title}</h4>
                            <p className="text-xs text-white/40 leading-relaxed">{bonus.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Section */}
              <div className={styles.section}>
                <h2 className="text-2xl font-bold mb-10 text-center">{isWebsiteStore ? 'Why Our Source Code?' : 'Why This Edition is Different'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/10">
                    <h4 className="text-xs font-black uppercase tracking-widest text-red-400 mb-6">{isWebsiteStore ? 'Free Tutorials' : 'Standard Tutorials'}</h4>
                    <ul className="space-y-4">
                      {(isWebsiteStore
                        ? ['Messy Codebase', 'No Support', 'Outdated Tech', 'Hard to Scale']
                        : ['Scattered Information', 'Outdated Concepts', 'Ad-heavy & Distracting', 'No Structured Path']
                      ).map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/30 text-sm">
                          <XCircle className="w-4 h-4 text-red-500/50" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                       <BadgeCheck className="w-6 h-6 text-emerald-500 opacity-20" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">{isWebsiteStore ? 'Premium Source Code' : 'KrishnaBook Premium'}</h4>
                    <ul className="space-y-4">
                      {(isWebsiteStore
                        ? ['Production-Ready', 'Clean Architecture', 'Modern Tech Stack', 'Full Documentation']
                        : ['Structured Mastery Path', '2026 Ready Content', 'Ad-Free High Fidelity', 'Direct Creator Support']
                      ).map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white text-sm font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Value Anchoring Section */}
              <div className={styles.section}>
                <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-primary" /> Unbeatable Value Breakdown
                  </h3>
                  <div className="space-y-4 mb-8">
                    {[
                      { label: "Premium Digital Edition", value: "₹999" },
                      { label: "Elite Success Roadmap", value: "₹499" },
                      { label: "Private Community Access", value: "₹299" },
                      { label: "Lifetime Free Updates", value: "₹299" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-white/60">{item.label}</span>
                        <span className="font-mono text-white/40 line-through">{item.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-6 text-xl font-bold">
                      <span className="text-white">Total Value</span>
                      <span className="text-white/40 line-through">₹2,096</span>
                    </div>
                    <div className="flex justify-between items-center p-6 rounded-2xl bg-primary/10 border border-primary/20 text-2xl font-black">
                      <span className="text-primary uppercase tracking-tighter">Your Price Today</span>
                      <span className="color-gradient-text">{formatPrice(book.discountPrice || book.price)}</span>
                    </div>
                  </div>
                  <p className="text-center text-xs font-bold text-white/30 uppercase tracking-[0.2em]">
                    You save over 75% by ordering now
                  </p>
                </div>
              </div>

              {/* Fast-Track Section */}
              <div className={styles.section}>
                <h2 className="text-2xl font-bold mb-12 text-center">{isWebsiteStore ? '3 Steps to Launch' : '3 Steps to Mastery'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                   <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px border-t border-dashed border-white/10 -z-10" />
                   {[
                     { step: "01", title: "Download", desc: isWebsiteStore ? "Get the ZIP file instantly." : "Instant download after secure payment.", icon: Download },
                     { step: "02", title: isWebsiteStore ? "Configure" : "Follow Path", desc: isWebsiteStore ? "Add your own branding/env." : "Use the structured roadmap provided.", icon: isWebsiteStore ? Code2 : Map },
                     { step: "03", title: "Launch", desc: isWebsiteStore ? "Deploy to your domain." : "Master the skills and transform your life.", icon: Rocket },
                   ].map((item, i) => (
                     <div key={i} className="text-center group">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
                           <item.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                        </div>
                        <h4 className="font-bold mb-2 flex items-center justify-center gap-2">
                          <span className="text-primary font-mono text-xs">{item.step}</span> {item.title}
                        </h4>
                        <p className="text-sm text-white/40 leading-relaxed px-4">{item.desc}</p>
                     </div>
                   ))}
                </div>
              </div>

              {/* Gallery Images / Screenshots */}
              {book.images && book.images.length > 0 && (
                <div className={styles.section}>
                  <h2 className="text-3xl font-black mb-10 italic uppercase flex items-center gap-4">
                    <div className="w-12 h-1 bg-primary" />
                    {isWebsiteStore ? 'Project Screenshots' : 'Inside the Preview'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {book.images.map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -5, scale: 1.02 }}
                        onClick={() => setSelectedImage(img)}
                        className="rounded-[2rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all bg-white/5 aspect-video relative group cursor-zoom-in"
                      >
                        <img
                          src={img}
                          alt={`Preview ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">View Full</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lightbox Modal */}
              <AnimatePresence>
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
                  >
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-colors z-[110]"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                    <motion.img
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={selectedImage}
                      alt="Full Preview"
                      className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Learnings */}
              <div className={styles.section}>
                <h2 className="text-2xl font-bold mb-8">What You'll Discover</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookLearnings.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perfect For / Features */}
              <div className={styles.section}>
                <h2 className="text-2xl font-bold mb-8">Perfect For</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookFeatures.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-white/60 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table of Contents */}
              <div className={styles.section}>
                <h2 className="text-2xl font-bold mb-8">Table of Contents</h2>
                <div className="glass-card overflow-hidden">
                  {bookContents.map((chapter: any, i: number) => (
                    <div
                      key={i}
                      className={`p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer ${i !== bookContents.length - 1 ? 'border-b border-white/10' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-white/20 font-mono text-sm">0{i+1}</span>
                        <span className="font-semibold">{chapter.title}</span>
                      </div>
                      <span className="text-xs text-white/40 font-medium">{chapter.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author & Publisher */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    {book.author === "Krishna Patil Rajput" ? (
                      <img src="/important/KrishnaStores%20logo.png" alt="KrishnaStores" className="w-20 h-20 rounded-full object-contain" />
                    ) : (
                      <User className="w-20 h-20" />
                    )}
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Developer
                  </h4>
                  <p className="text-xl font-bold mb-2">{book.author}</p>
                  <p className="text-sm text-white/50 leading-relaxed relative z-10">
                    A visionary creator dedicated to crafting resources that bridge the gap between complex theory and professional practice.
                  </p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-purple-500/5 border border-purple-500/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-20 h-20" />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4" /> Publisher
                  </h4>
                  <p className="text-xl font-bold mb-2">{book.publisher}</p>
                  <p className="text-sm text-white/50 leading-relaxed relative z-10">
                    Committed to delivering high-fidelity digital knowledge under the dual-mastery branding of Krishna Rajput & Krishna Patil.
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div className={styles.section}>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {(isWebsiteStore
                    ? [
                      { q: "What tech stack is used?", a: "This project is built with React, Next.js, and Tailwind CSS for maximum performance." },
                      { q: "Is the source code commented?", a: "Yes, the code follows best practices and includes comments to help you understand the architecture." },
                      { q: "Can I use this for my clients?", a: "Yes, once purchased, you have a commercial license to use this source code for your own or client projects." }
                    ]
                    : [
                      { q: "Is this book for absolute beginners?", a: "Yes, this edition is structured to take you from foundational concepts to advanced mastery, regardless of your starting point." },
                      { q: "How will I receive the files?", a: "Immediately after purchase, you will receive a secure download link via email and in your personal dashboard." },
                      { q: "Can I read this on my phone or Kindle?", a: "Absolutely! The PDF and EPUB formats are fully responsive and optimized for mobile devices, tablets, and e-readers." }
                    ]
                  ).map((faq, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <h4 className="font-bold mb-2 text-white/90">{faq.q}</h4>
                      <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Social Proof */}
              <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
                <h3 className="text-3xl font-black mb-4">Join 5,000+ Readers</h3>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                  Invest in your future today. Get instant access to world-class knowledge curated by the Krishna Rajput team.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                   <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-slate-800" />
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-black">+5k</div>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <span className="text-sm font-bold text-white/90">4.9/5 Average Rating</span>
                   </div>
                </div>
              </div>

              {/* Creators Branding Signature */}
              <div className="mt-24 pt-16 border-t border-white/10 text-center">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-8">Created with Passion By</p>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                  Krishna Ajaysing Rajput | Krishna Patil Rajput
                </h2>
                <p className="text-white/40 font-medium">© 2026 KrishnaBookStores • All Rights Reserved</p>
                <div className="mt-8 flex justify-center items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary">
                  <span>Elite Mastery Roadmaps</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span>2026 Digital Editions</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Verified Original</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
