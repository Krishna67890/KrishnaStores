"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, 
  UserPlus, Star, Check, Zap
} from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: 'bg-slate-300', score: 0 };
    if (pass.length < 6) return { label: 'Weak (Min 6 chars)', color: 'bg-red-500', score: 1 };
    if (pass.length < 8) return { label: 'Fair Password', color: 'bg-amber-500', score: 2 };
    if (!/\d/.test(pass) || !/[A-Z]/.test(pass)) return { label: 'Good Password', color: 'bg-blue-500', score: 3 };
    return { label: 'Strong & Secure Password', color: 'bg-emerald-500', score: 4 };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service to register.');
      return;
    }

    setIsLoading(true);

    try {
      const photoURL = gender === 'boy' ? '/assets/boy.png' : '/assets/girl.png';

      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update Auth Profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL
      });

      // 3. Create Firestore user document
      if (db.app?.options?.apiKey !== "mock-key") {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: name,
          email: email,
          photoURL: photoURL,
          bio: '',
          username: email.split('@')[0],
          gender: gender,
          role: 'user',
          accountStatus: 'active',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp()
        });
      }

      router.push('/account');
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError(err.message || 'An error occurred during registration. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
            displayName: user.displayName || 'Google Member',
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
      console.error("Google Sign-Up error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Google Sign-In window was closed before completing.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // User closed
      } else {
        setError(err.message || 'Failed to register with Google. Please try again.');
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
            <h1 className="auth-header-title">Create Account</h1>
            <p className="auth-header-sub">Join KrishnaStores for instant ebook & code access</p>
          </div>

          {/* Segmented Auth Navigation Bar */}
          <div className="auth-tab-bar">
            <Link href="/login" className="auth-tab-btn">
              Sign In
            </Link>
            <button type="button" className="auth-tab-btn active">
              <UserPlus size={14} /> Register
              <motion.div
                layoutId="activeAuthTabHighlight"
                className="absolute inset-0 rounded-xl bg-purple-600 -z-10 shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </button>
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

          {/* 1-Click Google Sign-Up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading || isLoading}
            className="auth-google-btn"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-purple-600 rounded-full animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                <span>Register with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <span className="auth-divider-text">OR FILL DETAILS BELOW</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="auth-form-group">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" size={16} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Krishna Patil"
                  className="auth-input"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Password */}
            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (Min 6 chars)"
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

              {password && (
                <div className="mt-1.5 space-y-1">
                  <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full rounded-full transition-all duration-300 ${
                          strength.score >= step ? strength.color : 'bg-slate-200 dark:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold flex items-center justify-between" style={{ color: 'var(--text-muted)' }}>
                    <span>Strength:</span>
                    <span style={{ color: 'var(--text-main)' }}>{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-form-group">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrapper">
                <ShieldCheck className="auth-input-icon" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="auth-input"
                  style={{ paddingRight: '4.5rem' }}
                />
                {confirmPassword && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs">
                    {password === confirmPassword ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-0.5"><Check size={14} /> Match</span>
                    ) : (
                      <span className="text-red-500 font-bold">Mismatch</span>
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Avatar Cards */}
            <div className="auth-form-group">
              <label className="auth-label">Select Profile Avatar</label>
              <div className="auth-avatar-grid">
                <button
                  type="button"
                  onClick={() => setGender('boy')}
                  className={`auth-avatar-card ${gender === 'boy' ? 'active' : ''}`}
                >
                  <img src="/assets/boy.png" alt="Boy" className="auth-avatar-img" />
                  <span className="auth-avatar-label">Boy Avatar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGender('girl')}
                  className={`auth-avatar-card ${gender === 'girl' ? 'active' : ''}`}
                >
                  <img src="/assets/girl.png" alt="Girl" className="auth-avatar-img" />
                  <span className="auth-avatar-label">Girl Avatar</span>
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1 mb-4">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="text-xs cursor-pointer select-none" style={{ color: 'var(--text-muted)' }}>
                I agree to <span className="font-bold underline">Terms of Service</span> & <span className="font-bold underline">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="auth-submit-btn"
              style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', boxShadow: '0 4px 16px rgba(139, 92, 246, 0.35)' }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Register Free Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="auth-footer">
            Already have an account?{' '}
            <Link href="/login" className="auth-footer-link" style={{ color: '#8b5cf6' }}>
              Sign in here
            </Link>
          </div>
        </div>

        {/* Trust Highlights */}
        <div className="auth-trust-strip">
          <span className="flex items-center gap-1.5"><Zap size={14} className="text-purple-600" /> Instant Access</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> 256-Bit SSL Protected</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-500" fill="currentColor" /> Verified Member</span>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
