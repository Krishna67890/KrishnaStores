"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Books: [
      { name: 'All Books', href: '/books' },
      { name: 'Games', href: '/games' },
      { name: 'Bundles', href: '/bundles' },
    ],
    Explore: [
      { name: 'Gallery', href: '/gallery' },
      { name: 'Home', href: '/' },
    ],
    Support: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-32 pb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-premium-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black font-display tracking-tighter text-white">
                Krishna<span className="color-gradient-text">Stores</span>
              </span>
            </Link>
            <p className="text-white/40 mb-10 max-w-sm leading-relaxed font-medium">
              Premium educational eBook marketplace empowering the next generation of developers, students and digital creators with world-class curated knowledge.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/Krishna67890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 hover:-translate-y-2 group shadow-xl"
              >
                <Github className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/krishna-patil-rajput-b66b03340"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 hover:-translate-y-2 group shadow-xl"
              >
                <Linkedin className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-8">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/50 hover:text-white transition-all text-sm font-bold tracking-tight">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col items-center gap-10">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Created by Krishna Ajaysing Rajput | Krishna Patil Rajput
            </h2>
            <p className="text-white/40 text-sm md:text-base font-medium">
              All Rights Reserved © 2026
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-white/60 tracking-tight">krishna.coders12@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-white/60 tracking-tight">Maharashtra, India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
