"use client";

import React, { useState } from 'react';
import { Game } from '@/types';
import Link from 'next/link';
import {
  Star, CheckCircle2, Globe, Clock,
  Download, ShieldCheck, ChevronRight, ArrowRight,
  Heart, Gamepad2, User, Play,
  Zap, Gift, HelpCircle, BadgeCheck, Sparkles,
  MousePointerClick, Terminal, Cpu, Share2, Layers, ExternalLink, Camera, Eye, X
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface GameDetailClientProps {
  game: Game;
}

export default function GameDetailClient({ game }: GameDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#030303] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/games" className="hover:text-primary transition-colors">Games</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/60">{game.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Game Media & Purchase */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] relative group luxury-shine mb-10"
              >
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {game.demoLink && (
                  <a
                    href={game.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 btn-premium flex items-center gap-3 px-8"
                  >
                    <Play className="w-5 h-5 fill-current" /> Play Demo
                  </a>
                )}
              </motion.div>

              <div className="flex gap-4 mb-10">
                <a
                  href={game.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow btn-premium py-6 rounded-2xl flex items-center justify-center gap-3 group"
                >
                  <ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-black uppercase tracking-tighter">
                    Buy Now • {formatPrice((game.discountPrice || game.price) ?? 0)}
                  </span>
                </a>
                <button className="w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Heart className="w-7 h-7 text-white/40" />
                </button>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Terminal, label: "Language", value: "JavaScript" },
                  { icon: Globe, label: "Platform", value: game.platform },
                  { icon: Cpu, label: "Engine", value: "HTML5/CSS" },
                  { icon: Share2, label: "Source", value: "Full Code" }
                ].map((spec, i: number) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <spec.icon className="w-5 h-5 text-primary mb-3" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{spec.label}</p>
                    <p className="font-bold text-white">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Why Source Code?
                </h4>
                <ul className="space-y-4">
                  {[
                    "100% Ownership of files",
                    "Perfect for Learning & Portfolio",
                    "Easy to customize & reskin",
                    "No monthly subscription fees"
                  ].map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Game Info */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2 mb-8">
                {(game.tags || []).map((tag: string) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter italic uppercase leading-[0.8] relative">
                {game.title.split(' ').map((word: string, i: number) => (
                  <span key={i} className={i % 2 !== 0 ? 'text-gradient' : ''}>
                    {word}<br className="hidden md:block" />
                  </span>
                ))}
              </h1>
              <div className="flex items-center gap-6 mb-12">
                <div className="h-px flex-grow bg-white/10" />
                <p className="text-2xl text-primary font-black italic tracking-widest uppercase">
                  {game.subtitle}
                </p>
                <div className="h-px w-20 bg-primary" />
              </div>

              <div className="prose prose-invert max-w-none mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="md:col-span-2 text-xl text-white/60 leading-relaxed italic">
                    {game.description}
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Core Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                       {(game.tags || []).slice(0, 4).map((tag: string) => (
                         <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-white/40">{tag}</span>
                       ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Features */}
              <div className="mb-16">
                <h2 className="text-3xl font-black mb-10 italic uppercase flex items-center gap-4">
                  <div className="w-12 h-1 bg-primary" /> Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {game.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-white/80 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Game Screenshots Gallery */}
              {game.images && game.images.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-black mb-10 italic uppercase flex items-center gap-4 text-white/40">
                    <Camera className="w-6 h-6" /> Gameplay Screenshots
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {game.images?.map((img: string, i: number) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedImage(img)}
                        className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 aspect-video group relative cursor-zoom-in"
                      >
                        <img
                          src={img}
                          alt={`Screenshot ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white" />
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
                      alt="Full Gameplay Screenshot"
                      className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* What's Included */}
              <div className="mb-16 p-10 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10">
                <h2 className="text-2xl font-black mb-8 italic uppercase flex items-center gap-4 text-indigo-400">
                  <Layers className="w-6 h-6" /> What's Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {game.whatsIncluded.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-white/60 font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Requirements */}
              <div className="mb-16">
                <h2 className="text-2xl font-black mb-8 italic uppercase flex items-center gap-4 text-white/30">
                   System Requirements
                </h2>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                   <ul className="space-y-4">
                     {game.requirements.map((req: string, i: number) => (
                       <li key={i} className="flex items-center gap-4 text-white/50">
                         <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                         {req}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>

              {/* Creator Info */}
              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Developed By</h4>
                  <p className="text-3xl font-black italic mb-4">{game.developer}</p>
                  <p className="text-white/40 font-medium">
                    Specialized in creating high-performance HTML5 games and interactive web experiences.
                    Get professional-grade source code for your next project.
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-24 p-12 rounded-[3.5rem] bg-gradient-to-r from-primary to-indigo-600 text-center relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                 <div className="relative z-10">
                   <h2 className="text-4xl md:text-5xl font-black mb-6 italic text-white uppercase tracking-tighter">
                     Ready to start <br /> your game dev journey?
                   </h2>
                   <p className="text-white/80 mb-10 max-w-xl mx-auto font-bold">
                     Download the full source code today and start building, learning, and creating your own unique versions.
                   </p>
                   <a
                    href={game.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl inline-block"
                   >
                     Buy Now
                   </a>
                 </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
