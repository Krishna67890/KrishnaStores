"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Search, BookOpen, User, LogOut, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/useAuthStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Games', href: '/games' },
    { name: 'Website Store', href: '/website-store' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <nav
        ref={navRef}
        className={cn(
          "pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-between px-6 py-3 md:px-10 md:py-4 rounded-full border",
          isScrolled
            ? "w-full max-w-5xl bg-black/60 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "w-full max-w-7xl bg-white/[0.03] backdrop-blur-md border-white/5"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-premium-gradient rounded-xl md:rounded-2xl flex items-center justify-center group-hover:rotate-[-10deg] transition-all duration-500 shadow-lg shadow-primary/20">
            <BookOpen className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-xl md:text-2xl font-black font-display tracking-tighter">
            Krishna<span className="color-gradient-text">Stores</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all duration-300 relative group/link"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover/link:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <VoiceSearch />
          <button className="p-2.5 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all group">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-2" />

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          )}

          <Link href={isAuthenticated ? "/dashboard" : "/login"} className="flex items-center gap-3 group">
             <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/10">
                {isAuthenticated && (user?.photoURL || user?.gender) ? (
                   <img
                    src={user.photoURL || (user.gender === 'boy' ? '/assets/boy.png' : '/assets/girl.png')}
                    alt="User"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/boy.png';
                    }}
                   />
                ) : (
                   <User className="w-5 h-5 text-white/60 group-hover:text-white" />
                )}
             </div>
             {isAuthenticated ? (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">Dashboard</span>
                  <span className="text-xs font-bold truncate max-w-[80px]">{user?.displayName || 'User'}</span>
                </div>
             ) : (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">Account</span>
                  <span className="text-xs font-bold truncate max-w-[80px]">Sign In</span>
                </div>
             )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all pointer-events-auto relative z-[60]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[45] lg:hidden pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-x-4 top-24 z-[50] lg:hidden pointer-events-auto"
            >
            <div className="glass-card p-8 flex flex-col gap-6 items-center text-center shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-white/20">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-black tracking-tighter text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="w-full border-white/10" />
              <div className="flex gap-8 items-center">
                <button className="p-3 rounded-full bg-white/5 text-white/40">
                  <Search className="w-6 h-6" />
                </button>
                <Link href={isAuthenticated ? "/dashboard" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-full bg-white/5 text-white/40 border border-white/10">
                   {isAuthenticated && (user?.photoURL || user?.gender) ? (
                      <img
                        src={user.photoURL || (user.gender === 'boy' ? '/assets/boy.png' : '/assets/girl.png')}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/boy.png';
                        }}
                      />
                   ) : (
                      <div className="p-2"><User className="w-6 h-6" /></div>
                   )}
                </Link>
              </div>
              {!isAuthenticated ? (
                <Link
                  href="/login"
                  className="btn-premium w-full py-5 text-base uppercase tracking-[0.2em]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <Link
                    href="/dashboard"
                    className="btn-premium w-full py-5 text-base uppercase tracking-[0.2em]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-outline w-full py-5 text-base uppercase tracking-[0.2em] text-red-400 border-red-400/20 hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

const VoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Voice Recognition Result:', transcript);

      if (transcript.includes('home')) router.push('/');
      else if (transcript.includes('book')) router.push('/books');
      else if (transcript.includes('game')) router.push('/games');
      else if (transcript.includes('website')) router.push('/website-store');
      else if (transcript.includes('about')) router.push('/about');
      else if (transcript.includes('contact')) router.push('/contact');
      else if (transcript.includes('cart')) (window as any).dispatchEvent(new CustomEvent('open-cart'));
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <button
      onClick={startListening}
      className={cn(
        "p-2.5 rounded-full transition-all group relative",
        isListening ? "bg-primary text-white scale-110" : "hover:bg-white/5 text-white/40 hover:text-white"
      )}
      title="Voice Navigation"
    >
      <Mic className={cn("w-5 h-5 group-hover:scale-110 transition-transform", isListening && "animate-pulse")} />
      {isListening && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
      )}
    </button>
  );
};
