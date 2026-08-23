"use client";

import React, { useEffect, useRef } from "react";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight, Code, Terminal } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/data/products";

interface WebStoreProps {
  products: Product[];
}

const WebStore = ({ products }: WebStoreProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 90%",
      },
    });

    gsap.from(section.querySelectorAll(".web-card-wrap"), {
      x: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section.querySelector(".web-grid"),
        start: "top 80%",
      },
    });
  }, []);

  const webProducts = products.filter((p) => p.category === "web");

  return (
    <section ref={sectionRef} id="webstore" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Code Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none font-mono text-[10px] text-[#05ffa3] overflow-hidden leading-tight select-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {"export const protocol = 'Elite'; function initializeVault() { return 'Success'; } ".repeat(15)}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#05ffa3]/10 border border-[#05ffa3]/20 flex items-center justify-center text-[#05ffa3] shadow-[0_0_30px_rgba(5,255,163,0.1)]">
                <Terminal className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#05ffa3] text-glow-emerald">Forge Protocol: 003</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase leading-[0.85]">
              FORGE<br />
              <span className="text-slate-700">ENGINEERING.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
              Precision-engineered web architecture for high-velocity engineering teams.
            </p>
          </div>

          <Link
            href="/web"
            className="group relative flex items-center gap-3 px-12 py-6 bg-[#05ffa3] text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(5,255,163,0.2)] active:scale-95"
          >
            INITIALIZE FORGE <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform duration-500" />
          </Link>
        </div>

        <div className="web-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {webProducts.map((product) => (
            <div key={product.id} className="web-card-wrap">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebStore;
