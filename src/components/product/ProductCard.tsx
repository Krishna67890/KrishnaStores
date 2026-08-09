"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Eye, BookOpen, Gamepad2, ExternalLink, Camera, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product, Book, Game } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isBook = 'author' in product;
  const isGame = 'developer' in product;
  const isWebsite = product.category === 'Website Store';
  const href = isWebsite ? `/website-store/${product.slug}` : (isBook ? `/book/${product.slug}` : `/game/${product.slug}`);
  const router = useRouter();

  const allImages = [product.coverImage, ...(product.images || [])].filter(Boolean);

  // Clean up paths that don't exist in public/assets (based on file list)
  const existingAssets = [
    "why-option-1.png", "why-option-2.png", "why-option-3.png",
    "web-roadmap-1.png", "web-roadmap-2.png", "android-react-1.png",
    "android-react-2.png", "why-only-an-option.png", "android-native-2026.png",
    "web-dev-roadmap-2026.png", "Android Native React 1.png",
    "Android Native React 2.png", "Web devlopment roadmap 1.png",
    "Web Devlopment Roadmap 2.png", "Why Was I Only An Option.png",
    "Why Was I Only An Option 1.png", "Why Was I Only An Option 2.png",
    "Why Was I Only An Option 3.png", "Android Native 2026 Thumbnail.png",
    "Web Development Fundamentals & Advanced Concepts (2026 Edition) Thumbnail.png"
  ];

  const validImages = allImages.map(img => {
    const filename = img.split('/').pop();
    if (existingAssets.includes(filename || '')) return img;
    return "/assets/web-dev-roadmap-2026.png"; // Fallback to verified existing asset
  });

  const getBadges = () => {
    const badges = [];
    if ('isBestseller' in product && (product as Book).isBestseller) {
      badges.push({ label: 'Bestseller', color: 'bg-amber-500' });
    }
    if (product.discountPrice && product.discountPrice < product.price) {
      const savings = Math.round(((product.price - product.discountPrice) / product.price) * 100);
      badges.push({ label: `Save ${savings}%`, color: 'bg-emerald-500' });
    }
    if ('isNew' in product && (product as Book).isNew) {
      badges.push({ label: 'New Arrival', color: 'bg-indigo-600' });
    }
    if (isWebsite) {
      badges.push({ label: 'Source Code', color: 'bg-primary' });
    }
    return badges;
  };

  const handleCardClick = () => {
    router.push(href);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <motion.div
      whileHover={{
        y: -12,
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="glass-card group flex flex-col h-full overflow-hidden luxury-shine cursor-pointer bg-white/[0.02] border border-white/10"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Product Images with Mini-Gallery logic */}
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={validImages[currentImageIndex]}
              alt={product.title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/assets/web-dev-roadmap-2026.png"; // Fallback to a known existing image
              }}
            />
          </AnimatePresence>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Image Navigation Arrows (on hover) */}
          {isHovered && allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Image Count Indicator */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-white/90 uppercase tracking-tighter">
                {currentImageIndex + 1} / {allImages.length}
              </span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2 z-20">
          {getBadges().map((badge, index) => (
            <span key={index} className={`${badge.color} text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-2xl backdrop-blur-md border border-white/10`}>
              {badge.label}
            </span>
          ))}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-30">
          <div className="flex items-center gap-4">
            {product.demoLink && (
              <a
                href={product.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-2xl"
              >
                <Gamepad2 className="w-6 h-6" />
                <span className="text-[8px] font-black uppercase mt-1">Demo</span>
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(href);
              }}
              className="w-16 h-16 rounded-full bg-white text-black flex flex-col items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform scale-75 group-hover:scale-100 delay-[50ms] shadow-2xl"
            >
              <Eye className="w-6 h-6" />
              <span className="text-[8px] font-black uppercase mt-1">Details</span>
            </button>
            <a
              href={product.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-16 h-16 rounded-full bg-primary text-white flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform scale-75 group-hover:scale-100 delay-[100ms] shadow-2xl"
            >
              <ExternalLink className="w-6 h-6" />
              <span className="text-[8px] font-black uppercase mt-1">Buy</span>
            </a>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative bg-mesh-light">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor((product as Book).rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
            ))}
          </div>
          {isBook && <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{(product as Book).reviewsCount} Reviews</span>}
          {isGame && <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{(product as Game).genre}</span>}
        </div>

        <h3 className="text-xl font-black line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300 leading-tight uppercase italic tracking-tighter">
          {product.title}
        </h3>
        <p className="text-sm text-white/30 mb-6 font-medium italic">
          {isBook ? `By ${(product as Book).author}` : `By ${(product as Game).developer}`}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            {product.discountPrice && product.discountPrice < product.price && (
              <span className="text-[10px] text-white/20 line-through mb-0.5 font-bold tracking-widest">{formatPrice(product.price)}</span>
            )}
            <span className="text-2xl font-black text-white tracking-tighter color-gradient-text">
              {formatPrice(product.discountPrice || product.price)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
            View Project <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
