"use client";

import React, { useEffect, useRef } from "react";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/data/products";

interface FeaturedBooksProps {
  products: Product[];
}

const FeaturedBooks = ({ products }: FeaturedBooksProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    // Entrance animation for heading
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 90%",
      },
    });

    // Staggered reveal for book cards
    gsap.from(section.querySelectorAll(".book-card-wrap"), {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section.querySelector(".books-grid"),
        start: "top 85%",
      },
    });
  }, []);

  // Filter only books for this section
  const bookProducts = products.filter((p) => p.category === "book").slice(0, 4);

  return (
    <section ref={sectionRef} id="bookstore" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#05ffa3]/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#05ffa3]/10 border border-[#05ffa3]/20 flex items-center justify-center text-[#05ffa3] shadow-[0_0_20px_rgba(5,255,163,0.1)]">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#05ffa3] text-glow-emerald">Elite Protocol: 002</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase leading-[0.85]">
              ELITE<br />
              <span className="text-[#05ffa3]">ARCHIVE.</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
              Master the craft. Access curated digital intelligence designed for the professional vanguard.
            </p>
          </div>

          <Link
            href="/books"
            className="group flex items-center gap-3 px-10 py-5 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#05ffa3] hover:text-black transition-all duration-500 border border-white/10 shadow-2xl active:scale-95"
          >
            DECRYPT ARCHIVE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="books-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bookProducts.map((product) => (
            <div key={product.id} className="book-card-wrap perspective-1000">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default FeaturedBooks;
