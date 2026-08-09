"use client";

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Settings,
  BookOpen,
  X,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookViewerProps {
  title: string;
  fileUrl: string;
  onClose: () => void;
}

const BookViewer = ({ title, fileUrl, onClose }: BookViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col"
    >
      {/* Viewer Header */}
      <header className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-black tracking-tight">{title}</h2>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Premium HD Reader</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 rounded-xl hover:bg-white/5 transition-all text-white/60 hover:text-white">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 transition-all text-white/60 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-3 rounded-xl hover:bg-white/5 transition-all text-white/60 hover:text-white"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content / PDF Frame */}
      <main className="flex-grow relative overflow-hidden flex items-center justify-center p-4 md:p-10">
        <div className="w-full h-full max-w-5xl bg-white rounded-lg shadow-2xl shadow-primary/20 overflow-hidden relative">
          {/* In a real app, use react-pdf or a specialized PDF worker */}
          <iframe
            src={`${fileUrl}#toolbar=0`}
            className="w-full h-full border-none"
            title={title}
          />
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/60 backdrop-blur-3xl px-8 py-4 rounded-2xl border border-white/10 shadow-2xl">
          <button className="hover:text-primary transition-colors disabled:opacity-20">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black">Page</span>
            <input
              type="text"
              value={currentPage}
              className="w-12 bg-white/10 border border-white/10 rounded-lg py-1 text-center text-sm font-bold focus:outline-none focus:border-primary"
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            />
            <span className="text-sm font-bold text-white/40">of 150</span>
          </div>
          <button className="hover:text-primary transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </main>

      {/* Sidebar (Optional - for Contents) */}
      <div className="hidden lg:flex absolute top-32 left-8 flex-col gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-lg shadow-primary/20">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
      </div>
    </motion.div>
  );
};

export default BookViewer;
