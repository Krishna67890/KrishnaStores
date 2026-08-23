"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Search, Filter, Rocket, Sparkles, Trophy } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { games } from '@/lib/data';

const GamesClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", ...Array.from(new Set(games.map((g) => g.genre)))];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = selectedGenre === "All" || game.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">Game Store</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic"
            >
              LEVEL UP YOUR <br />
              <span className="text-gradient">PLAYGROUND</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/50 font-medium leading-relaxed"
            >
              Explore our collection of premium HTML5 games. From retro-inspired builders to addictive puzzles, get instant access to the source code and source assets.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 w-full md:w-80"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium"
              />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                selectedGenre === genre
                ? 'bg-primary text-white shadow-xl shadow-primary/20'
                : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={game} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No games found</h3>
            <p className="text-white/40">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Rocket />, title: "Instant Access", desc: "Download the source code immediately after purchase." },
            { icon: <Sparkles />, title: "Premium Code", desc: "Clean, well-documented HTML5 and JavaScript code." },
            { icon: <Trophy />, title: "Lifetime Updates", desc: "Get all future improvements and fixes for free." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                {React.cloneElement(feature.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
              <h4 className="text-xl font-bold mb-3 uppercase tracking-tighter italic">{feature.title}</h4>
              <p className="text-white/40 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesClient;
