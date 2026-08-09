"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Download, Clock, Star,
  Settings, LogOut, ChevronRight, PlayCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { books } from '@/lib/data';
import { useAuthStore } from '@/store/useAuthStore';
import { usePurchaseStore } from '@/store/usePurchaseStore';

const UserDashboard = () => {
  const { user, logout, updateProfile } = useAuthStore();
  const { purchasedBooks } = usePurchaseStore();
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ photoURL: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-white/60">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-mesh">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-80 shrink-0">
            <div className="glass-card p-8 sticky top-32 border-white/10">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="relative group mb-6">
                  <div className="w-24 h-24 rounded-[2rem] bg-premium-gradient flex items-center justify-center font-black text-3xl shadow-2xl overflow-hidden relative border-4 border-white/10">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      user.displayName?.[0] || user.email?.[0]?.toUpperCase()
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight mb-1">{user.displayName || 'Learner'}</h3>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { name: 'My Library', icon: BookOpen, active: true },
                  { name: 'Order History', icon: Clock, active: false },
                  { name: 'Certificates', icon: Star, active: false },
                  { name: 'Settings', icon: Settings, active: false },
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      item.active
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-8"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            <header className="mb-10">
              <h1 className="text-3xl font-bold mb-2">My Library</h1>
              <p className="text-white/60">Continue where you left off</p>
            </header>

            {/* Resume Reading Section */}
            {purchasedBooks.length > 0 ? (
              <div className="glass-card p-8 mb-12 bg-gradient-to-br from-primary/10 to-transparent">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="w-32 aspect-[3/4] bg-slate-800 rounded-lg shrink-0 shadow-xl overflow-hidden relative">
                    {purchasedBooks[0].coverImage ? (
                      <img src={purchasedBooks[0].coverImage} alt={purchasedBooks[0].title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-white/10" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">In Progress • {purchasedBooks[0].progress}%</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{purchasedBooks[0].title}</h2>
                    <p className="text-white/60 text-sm mb-6">Last read: {purchasedBooks[0].lastRead}</p>

                    <div className="w-full bg-white/10 h-2 rounded-full mb-8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${purchasedBooks[0].progress}%` }}
                        className="h-full bg-primary"
                      />
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      <button className="btn-premium flex items-center gap-2">
                        <PlayCircle className="w-5 h-5" /> Resume Reading
                      </button>
                      <button className="btn-outline flex items-center gap-2">
                        <Download className="w-5 h-5" /> Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-12 mb-12 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-white/20" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your library is empty</h2>
                <p className="text-white/40 mb-8">Start your learning journey by exploring our premium eBooks.</p>
                <Link href="/books" className="btn-premium">
                  Browse Books
                </Link>
              </div>
            )}

            {/* All Books Grid */}
            <h3 className="text-xl font-bold mb-6">All Purchased Books</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedBooks.map((book) => (
                <div key={book.id} className="glass-card overflow-hidden group">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center relative">
                    {book.coverImage ? (
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="w-12 h-12 text-white/5" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                          <PlayCircle className="w-6 h-6" />
                       </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold mb-1 line-clamp-1">{book.title}</h4>
                    <p className="text-xs text-white/40 mb-4">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Digital Edition</div>
                      <button className="p-2 text-white/40 hover:text-primary transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coming Soon/Empty slots */}
              <div className="glass-card border-dashed p-6 flex flex-col items-center justify-center text-center opacity-30">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold">New Books Coming Soon</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
