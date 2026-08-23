"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Github, Globe, ExternalLink, Mail, Twitter, Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const footer = footerRef.current;
    if (!footer) return;

    gsap.from(footer.querySelectorAll(".footer-reveal"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
      },
    });
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#050505] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="footer-reveal mb-6">
              <span className="text-2xl font-black tracking-tighter uppercase text-white">
                Krishna<span className="text-blue-500">Elite</span>
              </span>
            </div>
            <p className="footer-reveal text-lg text-slate-400 max-w-sm font-medium leading-relaxed mb-8">
              Premium Flagship Roadmaps & Strategic Mastery Guides
              crafted by Krishna Ajaysing Rajput | Krishna Patil Rajput.
            </p>

            <div className="footer-reveal flex items-center gap-4">
              <Link
                href="https://krishna-patil-rajput.vercel.app/"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-xl"
              >
                <Globe className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/Krishna67890"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:border-white transition-all shadow-xl"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all shadow-xl"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="footer-reveal">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-8">Catalog</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="/books" className="text-sm text-slate-400 hover:text-blue-500 transition-colors font-medium uppercase tracking-tight">Elite Mastery (03)</Link></li>
              </ul>
            </div>
            <div className="footer-reveal">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-8">Creators</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors font-medium uppercase tracking-tight">About The Creators</Link></li>
                <li><Link href="/about#faq" className="text-sm text-slate-400 hover:text-white transition-colors font-medium uppercase tracking-tight">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-reveal">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-8">Hubs</h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="https://krishnapatilrajput.gumroad.com/" target="_blank" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-medium uppercase tracking-tight">
                    Gumroad <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-reveal pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
              © 2026 Krishna Ajaysing Rajput | Krishna Patil Rajput.
            </p>
            <p className="text-[9px] font-black text-blue-500/50 uppercase tracking-[0.2em]">
              Elite Mastery Roadmap Protocol
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
