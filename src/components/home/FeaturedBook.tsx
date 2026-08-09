"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight, CheckCircle2, User, BookOpen } from 'lucide-react';
import { Book } from '@/types';
import { formatPrice } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Book3D from '@/components/books/Book3D';
import styles from './FeaturedBook.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturedBookProps {
  book: Book;
}

const FeaturedBook = ({ book }: FeaturedBookProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".featured-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.to(imageRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.featuredSection}>
      <div className={styles.meshBackground} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${styles.badge} featured-reveal`}
          >
            Signature Release
          </motion.span>
          <h2 className={`${styles.title} featured-reveal`}>
            Featured Book
          </h2>
        </div>

        <div className={`${styles.glassCard} featured-reveal`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Book 3D Preview */}
            <div className="relative order-2 lg:order-1" style={{ perspective: '2000px' }}>
              <div ref={imageRef} className="relative max-w-sm mx-auto">
                <Book3D
                  title={book.title}
                  author={book.author}
                  coverImage={book.coverImage}
                />
              </div>

              {/* Price Tag Floating */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={styles.priceBadge}
              >
                <span style={{ fontSize: '10px', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>
                  Instant Access
                </span>
                <span style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '-0.05em' }}>
                  {formatPrice(book.price)}
                </span>
              </motion.div>
            </div>

            {/* Book Details */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-8">
                 <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                 </div>
                 <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                   Global Best-Seller
                 </span>
              </div>

              <h3 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.05em', lineHeight: 1 }}>
                {book.title}
              </h3>

              <div className="flex flex-wrap gap-8 mb-12 py-8 border-y border-white/5">
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <User className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="flex flex-col">
                    <span style={{ fontSize: '9px', fontWeight: 900, opacity: 0.2, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Author</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, opacity: 0.8 }}>{book.author}</span>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <BookOpen className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex flex-col">
                    <span style={{ fontSize: '9px', fontWeight: 900, opacity: 0.2, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Format</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, opacity: 0.8 }}>Digital / HD PDF</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '1.25rem', opacity: 0.5, marginBottom: '3rem', lineHeight: 1.6, fontWeight: 500 }}>
                {book.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
                {book.learnings.slice(0, 4).map((item, i) => (
                  <div key={i} className={styles.learningCard}>
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, opacity: 0.6, lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <a
                  href={book.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPurchase}
                >
                  Purchase Now <ArrowRight className="w-5 h-5" />
                </a>
                <Link href={`/book/${book.slug}`} className={styles.btnOutline}>
                  Read Details
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBook;
