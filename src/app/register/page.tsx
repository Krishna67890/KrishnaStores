"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock, User, ArrowRight, ShieldCheck, Smile, Star } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'boy' | 'girl' | ''>('');
  const [error, setError] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender) {
      setError('Please select your gender preference for your avatar.');
      return;
    }
    setIsLoading(true);
    setError('');

    // Advanced Local Authentication Logic
    try {
      // Get existing users
      const usersJson = localStorage.getItem('kb_users');
      const users = usersJson ? JSON.parse(usersJson) : [];

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        setError('Email already registered. Please login.');
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        uid: Math.random().toString(36).substring(7),
        email,
        password, // In a real app, this would be hashed
        displayName: name,
        gender: gender,
        photoURL: gender === 'boy' ? '/assets/boy.png' : '/assets/girl.png',
        createdAt: new Date().toISOString()
      };

      // Save to "database"
      users.push(newUser);
      localStorage.setItem('kb_users', JSON.stringify(users));

      // Auto-login
      const { password: _, ...userProfile } = newUser;
      login(userProfile as any);

      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-12 h-12 bg-premium-gradient rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <BookOpen className="text-white w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-display mb-2">Create Account</h1>
          <p className="text-white/60">Join Krishna Stores and start your journey</p>
        </div>

        <div className="glass-card p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Krishna Patil"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-3">Select Avatar Preference</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setGender('boy')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    gender === 'boy'
                    ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10">
                    <img src="/assets/boy.png" alt="Boy" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-white">Boy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('girl')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    gender === 'girl'
                    ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10">
                    <img src="/assets/girl.png" alt="Girl" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-white">Girl</span>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label htmlFor="terms" className="text-xs text-white/40 leading-normal cursor-pointer">
                I agree to the <Link href="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-premium py-4 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-white/60 text-sm">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
