"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Menu, X, ArrowRight, Heart, ShoppingBag, Sparkles } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { wishlist } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Elite Mastery (03)", href: "/books", color: "text-blue-400" },
    { name: "About The Creators", href: "/about", color: "text-slate-400" },
  ];

  return (
    <>
      {/* Premium Top Bar */}
      <div className="bg-[#05ffa3] text-black py-1.5 px-4 text-center text-[9px] font-black uppercase tracking-[0.4em] z-[110] relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
        <span className="relative flex items-center justify-center gap-2 text-glow-emerald">
           <Sparkles className="w-3 h-3" />
           Elite Mastery Bundle: ₹2,096 Total Value Anchor — Krishna Ajaysing Rajput | Krishna Patil Rajput
           <Sparkles className="w-3 h-3" />
        </span>
      </div>

      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-[100] transition-all duration-500",
          isScrolled
            ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "py-6 bg-transparent border-b border-transparent"
        )}
      >
        <nav
          ref={navRef}
          className="container mx-auto px-6 max-w-7xl flex items-center justify-between gap-8"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl font-black tracking-tighter uppercase text-white">
              KRISHNA<span className="text-[#05ffa3] text-glow-emerald">ELITE</span>
            </span>
          </Link>

          {/* Search Bar - Premium Dark */}
          <div ref={searchRef} className="hidden md:flex flex-grow max-w-lg relative group">
            <div className={cn(
              "absolute inset-0 bg-[#05ffa3]/10 blur-xl opacity-0 transition-opacity duration-500",
              isSearchFocused && "opacity-100"
            )} />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-[#05ffa3] transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  setIsSearchFocused(false);
                  setSearchQuery("");
                }
              }}
              placeholder="Decrypt vault assets..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#05ffa3]/20 focus:border-[#05ffa3]/50 transition-all placeholder:text-slate-600 backdrop-blur-md"
            />

            {/* Suggestions Overlay */}
            {isSearchFocused && (searchQuery.length > 0 || searchResults.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-[110] backdrop-blur-2xl">
                {searchResults.length > 0 ? (
                  <div className="p-3">
                    <div className="px-4 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 mb-2">Suggestions</div>
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        href={`/products/${result.slug}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 rounded-2xl transition-all duration-300 group/item"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden relative shrink-0 border border-white/5">
                          <Image src={result.image} alt={result.title} fill className="object-cover opacity-80 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-white line-clamp-1 uppercase tracking-tight">{result.title}</span>
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest",
                            result.category === 'game' ? 'text-purple-400' :
                            result.category === 'web' ? 'text-emerald-400' : 'text-blue-400'
                          )}>
                            {result.category} • ₹{result.priceINR}
                          </span>
                        </div>
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                      className="w-full mt-2 py-3 text-[10px] font-black text-white bg-white/5 uppercase tracking-[0.2em] hover:bg-blue-600 transition-all rounded-xl"
                    >
                      View All Results
                    </button>
                  </div>
                ) : searchQuery.length > 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-sm text-slate-500 font-medium italic">No matches found in the mainframe.</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-110",
                    link.color
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-white/10"></div>

            <div className="flex items-center gap-5">
              <Link href="/wishlist" className="relative group p-2">
                <Heart className={cn(
                  "w-5 h-5 transition-all duration-300",
                  wishlist.length > 0 ? "text-red-500 fill-current drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-white/40 group-hover:text-white"
                )} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[8px] font-black flex items-center justify-center rounded-full animate-bounce">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                href="/books"
                className="group relative flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#05ffa3] transition-all duration-500 shadow-xl active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#05ffa3] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5" /> VAULT
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-4">
            <Link href="/wishlist" className="text-white/60">
               <Heart className="w-5 h-5" />
            </Link>
            <button
              className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Dark Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[120] bg-black transition-all duration-700 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-8 relative">
          {/* Animated Background Element */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />

          <div className="flex justify-between items-center mb-16 relative z-10">
            <span className="text-2xl font-black tracking-tighter uppercase text-white">
              KRISHNA<span className="text-blue-500">ELITE</span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-8 relative z-10">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center justify-between"
              >
                 <span className={cn("text-4xl font-black uppercase tracking-tighter transition-all duration-500 group-hover:pl-4", link.color)}>
                   {link.name}
                 </span>
                 <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-white/10 relative z-10">
             <Link
                href="/books"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between w-full p-8 bg-blue-600 text-white rounded-[2rem] group shadow-2xl"
              >
                <span className="text-xl font-black uppercase tracking-[0.2em]">Start Shopping</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
