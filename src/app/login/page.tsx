"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Zap, 
  UserCheck, Star
} from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/account');
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email address or password. Please check your credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please wait a few minutes before trying again.');
      } else {
        setError(err.message || 'An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (db.app?.options?.apiKey !== "mock-key") {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName || 'Google User',
            email: user.email || '',
            photoURL: user.photoURL || '/assets/boy.png',
            bio: '',
            username: user.email ? user.email.split('@')[0] : '',
            role: 'user',
            accountStatus: 'active',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastLoginAt: serverTimestamp()
          });
        }
      }

      router.push('/account');
    } catch (err: any) {
      console.error("Google Sign-In error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Google Sign-In window was closed before completing.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // User closed window
      } else {
        setError(err.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Background Soft Glow Spotlight */}
      <div className="auth-glow-spotlight" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto relative z-10 px-4"
      >
        {/* Main Floating Auth Card */}
        <div className="auth-card-box">
          
          {/* Header & Logo */}
          <div className="auth-header">
            <img
              src="/important/KrishnaStores logo.png"
              alt="KRISHNA STORES"
              className="krishna-logo mx-auto mb-3"
            />
            <h1 className="auth-header-title">Sign in to KrishnaStores</h1>
            <p className="auth-header-sub">Access your digital ebooks, web code & Roblox games</p>
          </div>

          {/* Segmented Auth Navigation Bar */}
          <div className="auth-tab-bar">
            <button type="button" className="auth-tab-btn active">
              <UserCheck size={14} /> Sign In
              <motion.div
                layoutId="activeAuthTabHighlight"
                className="absolute inset-0 rounded-xl bg-blue-600 -z-10 shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </button>
            <Link href="/register" className="auth-tab-btn">
              Create Account
            </Link>
          </div>

          {/* Error Feedback Box */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 p-3.5 rounded-2xl text-xs font-semibold leading-relaxed flex items-start gap-2.5 border bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
              >
                <span className="text-base shrink-0">⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1-Click Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="auth-google-btn"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-blue-600 rounded-full animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <span className="auth-divider-text">OR WITH EMAIL & PASSWORD</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <div className="flex items-center justify-between mb-1">
                <label className="auth-label mb-0">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="auth-input"
                  style={{ paddingRight: '2.75rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-eye-btn"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="auth-submit-btn"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="auth-footer">
            Don't have an account?{' '}
            <Link href="/register" className="auth-footer-link">
              Create free account
            </Link>
          </div>
        </div>

        {/* Trust Highlights */}
        <div className="auth-trust-strip">
          <span className="flex items-center gap-1.5"><Zap size={14} className="text-blue-600" /> Instant Downloads</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> 256-Bit SSL Secured</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-500" fill="currentColor" /> 4.9/5 Rating</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
