"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, KeyRound, ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSent(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError('Failed to send reset email. Please verify your email and try again.');
      }
    } finally {
      setIsLoading(false);
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
        <div className="auth-card-box">
          
          <div className="auth-header">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-sm"
              style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                borderColor: 'var(--border-color)'
              }}
            >
              <KeyRound size={26} />
            </div>
            <h1 className="auth-header-title">Reset Password</h1>
            <p className="auth-header-sub">Enter your email address to receive recovery link</p>
          </div>

          {isSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 text-emerald-500">
                <CheckCircle2 size={30} />
              </div>
              <h3 className="text-lg font-extrabold mb-2" style={{ color: 'var(--text-main)' }}>Check your inbox</h3>
              <p className="text-xs mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                We've sent password reset instructions to <br />
                <span className="font-extrabold text-sm" style={{ color: 'var(--text-main)' }}>{email}</span>
              </p>
              <Link
                href="/login"
                className="auth-submit-btn block text-center"
              >
                Back to Sign In
              </Link>
            </motion.div>
          ) : (
            <>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 rounded-2xl text-xs font-semibold leading-relaxed flex items-start gap-2.5 border bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                  >
                    <span className="text-base shrink-0">⚠️</span>
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="auth-submit-btn"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Recovery Email <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <div className="auth-footer flex items-center justify-between">
            <Link href="/login" className="inline-flex items-center gap-1.5 font-bold hover:underline" style={{ color: 'var(--text-main)' }}>
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
            <span className="flex items-center gap-1"><LockKeyhole size={12} style={{ color: 'var(--primary)' }} /> SSL Protected</span>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
