"use client";

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Star, ShieldCheck, Sparkles, Book as BookIcon, ArrowRight, Play, Zap, Download, UserCheck, Gamepad2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Hero.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [textIndex, setTextIndex] = useState(0);
  const words = ["Master.", "Build.", "Play.", "Transform."];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".reveal-item", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
      });

      // Floating icons animation
      if (floatingElementsRef.current) {
        gsap.to(floatingElementsRef.current.children, {
          y: "random(-30, 30)",
          x: "random(-15, 15)",
          rotation: "random(-10, 10)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2
        });
      }

      // Scroll Parallax
      gsap.to(".parallax-content", {
        y: 150,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!lightRef.current || !containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    gsap.to(lightRef.current, {
      x,
      y,
      duration: 1.5,
      ease: "power3.out"
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={styles.heroSection}
    >
      <div className={styles.meshBackground} />
      <div className={styles.gridOverlay} />

      {/* Interactive Spotlight */}
      <div
        ref={lightRef}
        className={styles.spotlight}
        style={{ left: 0, top: 0 }} // Managed by GSAP
      />

      {/* Floating Decorative Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        <div className="absolute top-1/4 left-[8%] opacity-20"><BookIcon className="w-14 h-14 text-indigo-500 rotate-12" /></div>
        <div className="absolute top-1/3 right-[12%] opacity-10"><Gamepad2 className="w-24 h-24 text-purple-500 -rotate-12" /></div>
        <div className="absolute bottom-1/4 left-1/4 opacity-15"><BookIcon className="w-20 h-20 text-white rotate-45" /></div>
        <div className="absolute top-24 left-1/2 opacity-10"><Gamepad2 className="w-12 h-12 text-indigo-500 -rotate-45" /></div>
        <div className="absolute bottom-20 right-1/3 opacity-10"><Sparkles className="w-16 h-16 text-purple-500" /></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="parallax-content flex flex-col items-center text-center max-w-5xl mx-auto">

          <div className={`${styles.badge} reveal-item group`}>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className={styles.gradientText} style={{ fontSize: '0.75rem', fontWeight: 900 }}>Krishna Stores: Premium Marketplace</span>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:translate-x-1 transition-transform" />
          </div>

          <h1
            ref={titleRef}
            className={`${styles.heroTitle} reveal-item`}
          >
            <div className="relative inline-block min-w-[280px] md:min-w-[500px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  initial={{ y: 80, opacity: 0, skewY: 10 }}
                  animate={{ y: 0, opacity: 1, skewY: 0 }}
                  exit={{ y: -80, opacity: 0, skewY: -10 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`${styles.gradientText} block py-2`}
                >
                  {words[textIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          <p className="reveal-item text-lg md:text-2xl text-white/40 mb-14 max-w-3xl leading-relaxed font-medium px-4">
            Handcrafted premium eBooks and high-fidelity HTML5 games. Master professional skills or source the perfect components for your next project.
          </p>

          <div className="reveal-item flex flex-col sm:flex-row gap-5 w-full max-w-lg mb-24 px-4">
            <Link href="/books" className={styles.btnPremium + " flex-1"}>
              eBook Store
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Link>
            <Link href="/games" className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-sm font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-white">
              Game Store
              <Gamepad2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>

          <div className="reveal-item grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 border-t border-white/5 pt-16 w-full max-w-6xl">
            {[
              { label: 'Marketplace', value: 'Live', icon: Sparkles, color: 'text-indigo-500' },
              { label: 'Instant Download', value: 'Now', icon: Download, color: 'text-emerald-500' },
              { label: 'Source Code', value: 'Full', icon: Zap, color: 'text-purple-500' },
              { label: 'Beginner Friendly', value: 'Yes', icon: UserCheck, color: 'text-amber-500' },
              { label: 'Categories', value: 'Multi', icon: BookOpen, color: 'text-blue-500' },
              { label: 'Checkout', value: 'Secure', icon: ShieldCheck, color: 'text-orange-500' },
            ].map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statIcon}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-2xl font-black text-white mb-1 tracking-tighter">{stat.value}</span>
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
