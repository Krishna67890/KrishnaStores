"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

interface BlogClientProps {
  posts: Post[];
}

const BlogClient = ({ posts }: BlogClientProps) => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold font-display mb-6">Our <span className="premium-gradient-text">Insights</span></h1>
            <p className="text-xl text-white/60">
              Tutorials, career guides, and professional advice from industry experts.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <div className="mb-20">
            <Link href={`/blog/${posts[0].id}`} className="group">
              <div className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 border-white/5 hover:border-primary/30 transition-all">
                <div className="aspect-video bg-slate-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white/5">
                     <Tag className="w-20 h-20" />
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-widest mb-6">
                    <span>{posts[0].category}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-white/40">Featured Post</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                    {posts[0].title}
                  </h2>
                  <p className="text-white/60 text-lg mb-8 line-clamp-2">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10" />
                      <div className="text-sm">
                        <p className="font-bold">{posts[0].author}</p>
                        <p className="text-white/40">{posts[0].date}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={post.id}
            >
              <Link href={`/blog/${post.id}`} className="group">
                <div className="glass-card overflow-hidden h-full flex flex-col border-white/5 hover:border-primary/30 transition-all">
                  <div className="aspect-video bg-slate-800 relative">
                     <div className="absolute inset-0 flex items-center justify-center text-white/5">
                        <Tag className="w-12 h-12" />
                     </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
                      {post.category}
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-6 border-t border-white/10">
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                      <div className="text-[11px]">
                        <p className="font-bold">{post.author}</p>
                        <p className="text-white/40">{post.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogClient;
