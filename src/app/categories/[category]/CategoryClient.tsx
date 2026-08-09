"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Filter } from 'lucide-react';
import Link from 'next/link';
import BookCard from '@/components/books/BookCard';

interface Book {
  id: string;
  title: string;
  category: string;
  // Add other properties as needed based on your BookCard or data structure
  [key: string]: any;
}

interface CategoryClientProps {
  category: string;
  books: Book[];
}

export default function CategoryClient({ category, books: filteredBooks }: CategoryClientProps) {
  const decodedCategory = decodeURIComponent(category);

  return (
    <div className="pt-32 pb-20 bg-mesh min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors font-black uppercase tracking-widest text-xs mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Categories
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4"
              >
                <Filter className="w-3 h-3" /> Category
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black font-display tracking-tighter capitalize">
                {decodedCategory} <span className="premium-gradient-text">Collection</span>
              </h1>
            </div>
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">
              {filteredBooks.length} Books Found
            </p>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center glass-card border-dashed border-white/10">
            <BookOpen className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">No books found in this category</h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">
              We are currently expanding our {decodedCategory} collection. Check back soon for premium new releases.
            </p>
            <Link href="/books" className="btn-premium">
              Browse All Books
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
