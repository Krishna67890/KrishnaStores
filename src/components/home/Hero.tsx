"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Terminal, Gamepad2, Sparkles } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (headingRef.current) {
      tl.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        skewY: 7,
      });
    }

    if (textRef.current) {
      tl.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
      }, "-=0.8");
    }

    if (ctaRef.current) {
      tl.from(ctaRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
      }, "-=0.8");
    }

    const cards = visualRef.current?.querySelectorAll(".hero-card");
    if (cards && cards.length > 0) {
      tl.from(cards, {
        x: 100,
        opacity: 0,
        rotate: 15,
        duration: 1.5,
        stagger: 0.2,
      }, "-=1.2");
    }

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      const parallaxElements = document.querySelectorAll(".hero-parallax");
      if (parallaxElements.length > 0) {
        gsap.to(parallaxElements, {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#050505]">
      {/* Animated RGB Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="hero-parallax absolute top-[5%] right-[5%] w-[50vw] h-[50vw] bg-blue-600/30 rounded-full blur-[160px] animate-pulse" />
        <div className="hero-parallax absolute bottom-[5%] left-[5%] w-[45vw] h-[45vw] bg-purple-600/30 rounded-full blur-[160px] animation-delay-2000" />
        <div className="hero-parallax absolute top-[30%] left-[35%] w-[35vw] h-[35vw] bg-[#05ffa3]/20 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10 backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#05ffa3]" />
              Elite Asset Protocol: Active
            </div>

            <h1 ref={headingRef} className="text-[clamp(3.5rem,9vw,7.5rem)] font-black text-white leading-[0.85] tracking-tighter mb-10 uppercase">
              REDEFINE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-[#05ffa3] animate-gradient-x">
                DIGITAL EDGE.
              </span>
            </h1>

            <div ref={textRef} className="max-w-xl mb-14">
              <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed">
                Premium eBooks for architects, AAA-tier source code, and high-performance web engineering.
                <span className="text-white"> Engineered for the elite.</span>
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-6">
              <Link
                href="/books"
                className="group relative flex items-center gap-3 px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#05ffa3] hover:text-black transition-all duration-500 shadow-[0_0_40px_rgba(5,255,163,0.2)] active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" /> Initialize Vault
              </Link>

              <div className="flex items-center gap-4 text-slate-500">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] bg-slate-800 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Join 2k+ Creators</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase - Floating RGB Cards */}
          <div ref={visualRef} className="relative h-[600px] hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[500px] h-full perspective-1000">
              {/* Main Card */}
              <div className="hero-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] aspect-[3/4] rounded-[2.5rem] bg-dark-card p-3 rgb-border shadow-2xl z-20">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                   <Image src="/assets/Android Native 2026 Thumbnail.png" alt="Featured" fill className="object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                   <div className="absolute bottom-6 left-6 right-6">
                      <div className="px-3 py-1 bg-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest inline-block mb-2">Bestseller</div>
                      <h4 className="text-white font-black uppercase tracking-tighter text-xl">React Native 2026</h4>
                   </div>
                </div>
              </div>

              {/* Floating Element: Web */}
              <div className="hero-card absolute top-[10%] right-[-5%] w-[200px] aspect-square rounded-[2rem] bg-dark-card p-2 border-emerald-500/30 border shadow-2xl z-30 backdrop-blur-xl">
                 <div className="w-full h-full rounded-[1.5rem] bg-emerald-500/10 flex flex-col items-center justify-center gap-3">
                    <Terminal className="w-8 h-8 text-emerald-400" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Web Projects</span>
                 </div>
              </div>

              {/* Floating Element: Game */}
              <div className="hero-card absolute bottom-[10%] left-[-5%] w-[180px] aspect-square rounded-[2rem] bg-dark-card p-2 border-purple-500/30 border shadow-2xl z-10 backdrop-blur-xl">
                 <div className="w-full h-full rounded-[1.5rem] bg-purple-500/10 flex flex-col items-center justify-center gap-3">
                    <Gamepad2 className="w-8 h-8 text-purple-400" />
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Game Source</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
