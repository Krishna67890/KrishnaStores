"use client";

import React, { useEffect, useRef } from "react";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight, Gamepad2, Zap } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/data/products";

interface GameStoreProps {
  products: Product[];
}

const GameStore = ({ products }: GameStoreProps) => {
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

    gsap.from(section.querySelectorAll(".game-card-wrap"), {
      y: 100,
      opacity: 0,
      rotateX: -20,
      duration: 1.2,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: section.querySelector(".games-grid"),
        start: "top 80%",
      },
    });
  }, []);

  const gameProducts = products.filter((p) => p.category === "game");

  return (
    <section ref={sectionRef} id="gamestore" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.05),_transparent_70%)]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400 text-glow-purple">Arena Protocol: 004</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase leading-[0.85]">
              SIMULATION<br />
              <span className="text-slate-700">MASTERY.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
              Immersive AAA-tier mechanics and high-performance gaming simulations.
            </p>
          </div>

          <Link
            href="/games"
            className="group relative flex items-center gap-3 px-12 py-6 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-purple-500 transition-all duration-500 shadow-[0_0_40px_rgba(139,92,246,0.2)] active:scale-95"
          >
            DECRYPT ARENA <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform duration-500" />
          </Link>
        </div>

        <div className="games-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {gameProducts.map((product) => (
            <div key={product.id} className="game-card-wrap">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
    </section>
  );
};

export default GameStore;
