"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code, Sparkles, Heart, Rocket,
  Brain, ArrowRight, Briefcase
} from 'lucide-react';

interface Category {
  title: string;
  icon: any;
  description: string;
  count: string | number;
  color: string;
  href: string;
}

const categories: Category[] = [
  {
    title: "Programming",
    icon: Code,
    description: "Comprehensive blueprints for Web & Mobile Development. Master the foundations to escape tutorial hell.",
    count: 2,
    color: "from-blue-600/20 to-indigo-600/20",
    href: "/categories/Programming"
  },
  {
    title: "Self-Help",
    icon: Heart,
    description: "Structured guides for emotional healing, self-worth, and personal transformation.",
    count: 1,
    color: "from-rose-600/20 to-orange-600/20",
    href: "/categories/Self-Help"
  },
  {
    title: "AI & Innovation",
    icon: Sparkles,
    description: "Upcoming roadmaps for AI Agents, Prompt Engineering, and future-tech mastery.",
    count: "Coming Soon",
    color: "from-amber-600/20 to-yellow-600/20",
    href: "/categories/AI"
  },
  {
    title: "Career Mastery",
    icon: Briefcase,
    description: "Professional strategies for freelancing, job placement, and high-fidelity portfolios.",
    count: "Coming Soon",
    color: "from-emerald-600/20 to-teal-600/20",
    href: "/categories/Career"
  }
];

export default function CategoriesClient({ recommendedBooks }: { recommendedBooks: any[] }) {
  const [roadmapStatus, setRoadmapStatus] = React.useState<'idle' | 'generating' | 'completed'>('idle');

  const generateRoadmap = () => {
    setRoadmapStatus('generating');
    setTimeout(() => {
      setRoadmapStatus('completed');
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 bg-mesh min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black font-display mb-6">
            Browse by <span className="color-gradient-text">Category</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Explore our curated collections of premium eBooks across various domains of knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {categories.map((category, index) => (
            <Link key={index} href={category.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-8 h-full group hover:border-primary/50 transition-all bg-gradient-to-br ${category.color} border-white/10`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <category.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-black uppercase tracking-widest text-white/40">{category.count} Books</span>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Learning Roadmap CTA */}
        <section className="mt-24 glass-card p-12 md:p-20 relative overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 border-primary/20 rounded-[3rem]">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-3xl -skew-x-12 transform translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-6">
                <Brain className="w-4 h-4" /> AI POWERED
              </div>
              <h2 className="text-4xl font-bold mb-6">Generate Your Personal <br /><span className="premium-gradient-text">Learning Roadmap</span></h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Not sure where to start? Our AI will analyze your goals and recommend the perfect sequence of books and resources to master any skill.
              </p>

              {roadmapStatus === 'idle' && (
                <button onClick={generateRoadmap} className="btn-premium flex items-center gap-2">
                  Start AI Roadmap <Rocket className="w-4 h-4" />
                </button>
              )}

              {roadmapStatus === 'generating' && (
                <div className="flex items-center gap-4 text-primary font-bold italic animate-pulse">
                   <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                   AI is analyzing your profile...
                </div>
              )}

              {roadmapStatus === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-bold text-success uppercase tracking-widest">Recommended Path for You:</p>
                  <div className="flex flex-col gap-3">
                    {recommendedBooks.map((book, i) => (
                      <Link
                        key={book.id}
                        href={`/book/${book.slug}`}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all flex items-center justify-between group"
                      >
                         <span className="font-bold">{i + 1}. {book.title}</span>
                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                <div className="glass-card p-8 relative border-white/10">
                   <div className="space-y-6">
                      {[
                        { title: "Skill Assessment", desc: "Analyzing current knowledge" },
                        { title: "Goal Setting", desc: "Defining career path 2026" },
                        { title: "Resource Mapping", desc: "Curating premium eBooks" }
                      ].map((step, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">{i+1}</div>
                           <div className="flex-grow">
                              <div className="font-bold text-white mb-1">{step.title}</div>
                              <div className="text-xs text-white/40">{step.desc}</div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
