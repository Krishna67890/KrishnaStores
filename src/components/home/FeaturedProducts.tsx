"use client";

import React, { useEffect, useRef } from "react";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    gsap.from(section.querySelector(".section-header"), {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section.querySelector(".section-header"),
        start: "top 90%",
      },
    });

    gsap.from(section.querySelectorAll(".product-card-wrap"), {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      stagger: 0.15,
      ease: "expo.out",
      scrollTrigger: {
        trigger: section.querySelector(".products-grid"),
        start: "top 80%",
      },
    });
  }, []);

  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <section ref={sectionRef} className="py-32 bg-[#050505] relative border-b border-white/5 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="section-header flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <Star className="w-7 h-7 fill-purple-500/50" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-500 text-glow-purple">Elite Protocol: 001</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase leading-[0.85]">
              CORE<br />
              <span className="text-[#05ffa3]">ASSETS.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
              High-frequency digital assets engineered for peak performance and career mastery.
            </p>
          </div>

          <Link
            href="/books"
            className="group flex items-center gap-3 px-12 py-6 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-black transition-all duration-500 border border-white/10 shadow-2xl active:scale-95"
          >
            ENTER THE HUB <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform duration-500" />
          </Link>
        </div>

        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <div key={product.id} className="product-card-wrap">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
