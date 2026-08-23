"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './BookCard.module.css';
import { Star, Eye, BookOpen, ExternalLink } from 'lucide-react';
import { Book } from '@/types';
import { formatPrice } from '@/lib/utils';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const price = book.price ?? 0;
  const discountPrice = book.discountPrice;
  const hasDiscount = discountPrice !== undefined && price > 0 && discountPrice < price;

  return (
    <Link href={`/book/${book.slug}`}>
      <motion.div
        whileHover={{
          y: -12,
          transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
        }}
        className="glass-card group flex flex-col h-full overflow-hidden luxury-shine cursor-pointer"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Book Cover Image */}
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-white/10 group-hover:scale-110 transition-transform duration-700 ease-out">
            {book.coverImage ? (
               <img
                 src={book.coverImage}
                 alt={book.title}
                 className="w-full h-full object-cover"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Book+Cover';
                 }}
               />
            ) : (
               <BookOpen className="w-20 h-20 opacity-20" />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Badges */}
          <div className="absolute top-5 left-5 flex flex-col gap-2 z-20">
            {book.isBestseller && (
              <span className="bg-amber-500 text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-2xl backdrop-blur-md">
                Bestseller
              </span>
            )}
            {hasDiscount && (
              <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-2xl backdrop-blur-md">
                Save {Math.round(((price - discountPrice) / price) * 100)}%
              </span>
            )}
            {book.isNew && (
              <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-2xl backdrop-blur-md">
                New Arrival
              </span>
            )}
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-30">
            <div
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-2xl"
            >
              <Eye className="w-6 h-6" />
            </div>
            <a
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform scale-75 group-hover:scale-100 delay-75 shadow-2xl"
            >
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-grow relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
              ))}
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{book.reviewsCount} Reviews</span>
          </div>

          <h3 className="text-xl font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
            {book.title}
          </h3>
          <p className="text-sm text-white/30 mb-6 font-medium">By {book.author}</p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-xs text-white/20 line-through mb-0.5">{formatPrice(price)}</span>
              )}
              <span className="text-2xl font-black text-white tracking-tighter">
                {formatPrice(discountPrice || price)}
              </span>
            </div>
            <a
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/link flex items-center gap-1 text-xs font-black text-white/40 uppercase tracking-[0.2em] hover:text-primary transition-colors"
            >
              Buy Now <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCard;
