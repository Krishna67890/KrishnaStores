"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { BookOpen } from 'lucide-react';

interface Book3DProps {
  coverImage?: string;
  title: string;
  author: string;
  className?: string;
}

const Book3D = ({ coverImage, title, author, className = "" }: Book3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const book = bookRef.current;
    const container = containerRef.current;
    if (!book || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(book, {
        rotateY: x * 40,
        rotateX: -y * 40,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(book, {
        rotateY: -25,
        rotateX: 10,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Initial state
    gsap.set(book, {
      rotateY: -25,
      rotateX: 10,
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`perspective-2000 w-full aspect-[3/4.5] flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
    >
      <div
        ref={bookRef}
        className="relative w-4/5 h-4/5 preserve-3d transition-transform duration-100 ease-out shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Cover */}
        <div
          className="absolute inset-0 bg-slate-900 rounded-r-lg overflow-hidden border border-white/10 z-20"
          style={{ transform: 'translateZ(25px)' }}
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex flex-col items-center justify-center p-8 text-center">
              <BookOpen className="w-16 h-16 text-white/10 mb-6" />
              <h3 className="text-xl font-black tracking-tighter leading-tight mb-2">{title}</h3>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{author}</p>
            </div>
          )}
          {/* Subtle Shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Back Cover */}
        <div
          className="absolute inset-0 bg-slate-950 rounded-l-lg border border-white/5"
          style={{ transform: 'translateZ(-25px) rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-gradient-to-bl from-slate-900 to-black flex items-center justify-center p-8 opacity-50">
             <div className="w-full h-full border border-white/5 rounded flex items-center justify-center">
                <div className="w-12 h-1 bg-white/10 rounded-full" />
             </div>
          </div>
        </div>

        {/* Spine */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-slate-800 border-x border-white/10 flex items-center justify-center overflow-hidden"
          style={{
            width: '50px',
            transform: 'translateX(-25px) rotateY(-90deg)',
            transformOrigin: 'center'
          }}
        >
          <div className="rotate-90 whitespace-nowrap text-[8px] font-black uppercase tracking-[0.3em] text-white/40 min-w-[300px] text-center">
            {title} — {author}
          </div>
        </div>

        {/* Top Edge (Pages) */}
        <div
          className="absolute top-0 left-0 right-0 bg-[#e5e5e5] h-[50px]"
          style={{
            transform: 'translateY(-25px) rotateX(90deg)',
            backgroundImage: 'linear-gradient(to right, #d1d1d1 1px, transparent 1px)',
            backgroundSize: '3px 100%'
          }}
        />

        {/* Bottom Edge (Pages) */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-[#e5e5e5] h-[50px]"
          style={{
            transform: 'translateY(25px) rotateX(-90deg)',
            backgroundImage: 'linear-gradient(to right, #d1d1d1 1px, transparent 1px)',
            backgroundSize: '3px 100%'
          }}
        />

        {/* Right Edge (Pages) */}
        <div
          className="absolute right-0 top-0 bottom-0 bg-[#f0f0f0] w-[50px]"
          style={{
            transform: 'translateX(25px) rotateY(90deg)',
            backgroundImage: 'linear-gradient(to bottom, #d1d1d1 1px, transparent 1px)',
            backgroundSize: '100% 3px'
          }}
        />

        {/* Inner Shadows for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-r from-black/40 via-transparent to-transparent"
          style={{ transform: 'translateZ(25.1px)' }}
        />
      </div>
    </div>
  );
};

export default Book3D;
