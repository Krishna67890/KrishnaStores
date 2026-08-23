"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Book3D from '@/components/books/Book3D';
import styles from './about.module.css';
import {
  BookOpen,
  Target,
  Users,
  Award,
  ShieldCheck,
  Sparkles,
  Heart,
  Rocket,
  Zap,
  Globe,
  Mic,
  MicOff,
  Search,
  ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutClient = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState("");
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
      setVoiceResult("Listening...");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceResult(transcript);

      // Add delay before redirecting for visual feedback
      setTimeout(() => {
        if (transcript.includes('home')) router.push('/');
        else if (transcript.includes('book')) router.push('/books');
        else if (transcript.includes('game')) router.push('/games');
        else if (transcript.includes('website')) router.push('/website-store');
        else if (transcript.includes('about')) router.push('/about');
        else if (transcript.includes('contact')) router.push('/contact');
      }, 1000);
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        console.warn('Speech recognition permission denied.');
        setVoiceResult("Permission denied. Please allow microphone access.");
      } else {
        console.error('Speech recognition error:', event.error);
        setVoiceResult("Error occurred...");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(".reveal", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      });

      // Parallax Orbs
      gsap.to(".parallax-orb", {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Elite Assets', value: '50+', icon: BookOpen, color: '#05ffa3' },
    { label: 'Active Nodes', value: '10k+', icon: Users, color: '#6366f1' },
    { label: 'Master Architects', value: '15+', icon: Award, color: '#a855f7' },
    { label: 'Vault Access', value: '5k+', icon: Heart, color: '#ec4899' },
  ];

  const values = [
    {
      title: "Professional Mastery",
      description: "We don't just teach basics; we provide the industry-standard workflows used by elite software engineers and creators.",
      icon: Award,
      gradient: "linear-gradient(135deg, #3b82f6, #4f46e5)"
    },
    {
      title: "Freelancing Edge",
      description: "Every guide includes insights on how to monetize your skills, find high-paying clients, and build a sustainable solo business.",
      icon: Rocket,
      gradient: "linear-gradient(135deg, #a855f7, #db2777)"
    },
    {
      title: "Career Blueprint",
      description: "Our roadmaps are designed to take you from 'tutorial hell' to landing your dream job or launching your own startup.",
      icon: Target,
      gradient: "linear-gradient(135deg, #fbbf24, #ea580c)"
    },
    {
      title: "Real-World Impact",
      description: "Focused on practical application, our resources emphasize building production-ready projects that stand out.",
      icon: Zap,
      gradient: "linear-gradient(135deg, #34d399, #0d9488)"
    }
  ];

  return (
    <div ref={containerRef} className={styles.aboutContainer}>
      <div className={styles.meshBackground} />
      <div className={styles.gridOverlay} />

      {/* Dynamic Floating Orbs */}
      <div className={`${styles.floatingOrb} parallax-orb`} style={{ top: '10%', left: '-5%', width: '600px', height: '600px', background: 'rgba(5, 255, 163, 0.05)' }} />
      <div className={`${styles.floatingOrb} parallax-orb`} style={{ bottom: '15%', right: '-5%', width: '500px', height: '500px', background: 'rgba(99, 102, 241, 0.05)' }} />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-20 mb-40">
          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="reveal inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#05ffa3] mb-8 backdrop-blur-xl"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Elite Asset Protocol
            </motion.div>

            <h1 className={`${styles.heroTitle} reveal`}>
              Master Your Craft. <br />
              <span className={styles.gradientText}>Own Your Future.</span>
            </h1>

            <p className="reveal text-xl md:text-2xl text-white/50 leading-relaxed mb-10 max-w-2xl font-medium">
              We specialize in bridging the gap between being a "learner" and a <span className="text-white italic">high-paid professional</span>. Our resources focus on advanced technical skills, freelancing strategies, and career-defining mastery.
            </p>

            <div className="reveal flex flex-wrap gap-6 mb-12">
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#05ffa3]/50 transition-colors group">
                <Users className="w-5 h-5 text-[#05ffa3]" />
                <span className="text-sm font-bold uppercase tracking-widest">Elite Access</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors group">
                <Zap className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-bold uppercase tracking-widest">Dev Protocol</span>
              </div>
            </div>

            {/* Voice Command Section */}
            <div className="reveal flex flex-col gap-4 max-w-md">
              <div className="flex items-center gap-4">
                <button
                  onClick={startListening}
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl",
                    isListening ? "bg-red-500 animate-pulse scale-110" : "bg-primary hover:bg-primary/80"
                  )}
                >
                  {isListening ? <Mic className="w-8 h-8 text-white" /> : <MicOff className="w-8 h-8 text-white" />}
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Voice Navigation</span>
                  <p className="text-lg font-bold">Try saying "Go to Books"</p>
                </div>
              </div>
              <AnimatePresence>
                {voiceResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      <span className="text-sm font-medium text-white/80 italic">"{voiceResult}"</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:w-2/5 relative reveal">
            <div className="relative group">
              <Book3D
                title="KrishnaBook Stores"
                author="Mastery Collection"
                className="hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute -top-10 -right-10 p-8 shadow-2xl rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/10 z-30 hidden md:block">
                <p className="text-4xl font-black tracking-tighter text-indigo-400">Est. 2026</p>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-2 leading-tight">Founded by <br/>Krishna Ajaysing Rajput | <br/>Krishna Patil Rajput</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {stats.map((stat, i) => (
            <div key={i} className={`${styles.glassCard} reveal text-center flex flex-col items-center justify-center group`}>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all" style={{ color: stat.color }}>
                <stat.icon className="w-8 h-8" />
              </div>
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Founders Grid */}
        <section className="mb-40">
          <div className="text-center mb-20 reveal">
             <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">Meet the <span className="premium-gradient-text">Architects</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`${styles.glassCard} reveal p-12 group overflow-hidden relative`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />
              <h3 className="text-3xl font-black mb-4">Krishna Ajaysing Rajput</h3>
              <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs mb-8">Creative Director</p>
              <p className="text-white/60 leading-relaxed font-medium">
                Passionate about visual storytelling and premium digital experiences. Krishna Ajaysing Rajput ensures that every product in our store meets the highest aesthetic and functional standards.
              </p>
            </div>
            <div className={`${styles.glassCard} reveal p-12 group overflow-hidden relative`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <h3 className="text-3xl font-black mb-4">Krishna Patil Rajput</h3>
              <p className="text-purple-400 font-black uppercase tracking-[0.2em] text-xs mb-8">Technical Founder & Author</p>
              <p className="text-white/60 leading-relaxed font-medium">
                The technical mind behind our development roadmaps and games. Krishna Patil Rajput focuses on bridging the gap between learning and professional mastery through structured technical blueprints.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Signature Section */}
        <section className={`${styles.signatureSection} reveal`}>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className={styles.founderInitials}>
              <span>K</span>
            </div>

            <div className="flex-grow">
              <Sparkles className="w-10 h-10 text-indigo-400 mb-8" />
              <h3 className="text-3xl md:text-6xl font-black mb-8 tracking-tighter leading-tight">Mastery is Not an Accident</h3>
              <p className="text-xl md:text-3xl text-white/70 italic leading-relaxed mb-10 font-medium">
                "Our goal is to give you the exact technical blueprints and freelancing strategies I used to build my career. We believe that structured, elite knowledge is the ultimate shortcut to professional independence."
              </p>
              <div>
                <p className="text-2xl font-black tracking-tight text-white mb-1">Krishna Ajaysing Rajput | Krishna Patil Rajput</p>
                <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em]">Creative Director & Founder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="pb-20">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6 block">Elite Protocol DNA</span>
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">Core Directives</h2>
            <div className="w-24 h-1.5 bg-[#05ffa3] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className={`${styles.glassCard} reveal group`}>
                <div className="w-14 h-14 rounded-2xl p-0.5 mb-8 shadow-xl group-hover:scale-110 transition-all" style={{ background: value.gradient }}>
                  <div className="w-full h-full bg-[#050505] rounded-[calc(1rem-1px)] flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h4 className="text-2xl font-black mb-4 tracking-tight">{value.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutClient;
