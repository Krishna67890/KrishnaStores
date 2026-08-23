"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Book, Gamepad2, Code, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const StoreSelector = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const cards = containerRef.current?.querySelectorAll(".store-card");
    if (!cards) return;

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      rotateX: 45,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const stores = [
    {
      title: "Knowledge Vault",
      label: "Mastery",
      desc: "Elite digital intelligence for professional architects and creators.",
      icon: <Book className="w-8 h-8" />,
      href: "/books",
      color: "blue",
    },
    {
      title: "Game Protocol",
      label: "Simulation",
      desc: "AAA-tier gaming concepts and high-performance mechanics.",
      icon: <Gamepad2 className="w-8 h-8" />,
      href: "/games",
      color: "purple",
    },
    {
      title: "Forge Web",
      label: "Engineering",
      desc: "Enterprise-grade web architecture and elite UI frameworks.",
      icon: <Code className="w-8 h-8" />,
      href: "/web",
      color: "emerald",
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-[#050505] relative border-y border-white/5 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[400px] bg-[#05ffa3]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#05ffa3] mb-6 text-glow-emerald">Elite Access Protocols</span>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            CHOOSE YOUR<br />
            <span className="text-slate-700">DESTINY.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
          {stores.map((store) => (
            <Link
              key={store.title}
              href={store.href}
              className="store-card group relative h-[500px] rounded-[3.5rem] overflow-hidden bg-white/5 border border-white/10 transition-all duration-700 hover:-translate-y-6 hover:bg-white/[0.08] hover:border-[#05ffa3]/30"
            >
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700",
                store.color === 'blue' && "bg-blue-600",
                store.color === 'purple' && "bg-purple-600",
                store.color === 'emerald' && "bg-[#05ffa3]"
              )} />

              <div className="relative h-full p-12 flex flex-col justify-end z-10">
                <div className={cn(
                  "w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12",
                  store.color === 'blue' && "bg-blue-600 text-white shadow-[0_0_40px_rgba(59,130,246,0.3)]",
                  store.color === 'purple' && "bg-purple-600 text-white shadow-[0_0_40px_rgba(139,92,246,0.3)]",
                  store.color === 'emerald' && "bg-[#05ffa3] text-black shadow-[0_0_40px_rgba(5,255,163,0.3)]"
                )}>
                  {store.icon}
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">{store.label}</span>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter">{store.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    {store.desc}
                  </p>
                  <div className="flex items-center gap-3 text-white font-black text-[11px] uppercase tracking-[0.3em] pt-6">
                    Initialize <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform duration-500" />
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className={cn(
                "absolute -bottom-20 -right-20 w-64 h-64 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700",
                store.color === 'blue' && "bg-blue-500",
                store.color === 'purple' && "bg-purple-500",
                store.color === 'emerald' && "bg-[#05ffa3]"
              )} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreSelector;
