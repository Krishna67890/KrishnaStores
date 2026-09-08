"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User, Package, MessageSquare, Star, Lightbulb, Download, Settings,
  LogOut, Camera, Shield, Calendar, Mail, Edit3, CheckCircle2,
  Lock, RefreshCw, Upload, Trash2, Check, AlertCircle, ShoppingBag, Sparkles
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { auth, db, storage } from '@/lib/firebase';
import { signOut, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';

type TabType = 'profile' | 'orders' | 'downloads' | 'reviews' | 'comments' | 'suggestions' | 'settings' | 'edit';

export default function AccountPage() {
  const { user, isAuthenticated, loading: authLoading, updateProfileState, logout: storeLogout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [orders, setOrders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Edit profile state
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
      setPhotoURL(user.photoURL || '');
      fetchUserData();
    }
  }, [user?.uid]);

  const fetchUserData = async () => {
    if (!user || !user.uid) return;
    setLoadingData(true);
    try {
      if (db.app?.options?.apiKey !== "mock-key") {
        // Fetch Orders
        try {
          const ordersQ = query(
            collection(db, 'orders'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc'),
            limit(20)
          );
          const ordersSnap = await getDocs(ordersQ);
          setOrders(ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (e) {
          console.warn("Orders query fallback:", e);
        }

        // Fetch Reviews
        try {
          const reviewsQ = query(
            collection(db, 'reviews'),
            where('userId', '==', user.uid)
          );
          const reviewsSnap = await getDocs(reviewsQ);
          setReviews(reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (e) {
          console.warn("Reviews query fallback:", e);
        }

        // Fetch Comments
        try {
          const commentsQ = query(
            collection(db, 'comments'),
            where('userId', '==', user.uid)
          );
          const commentsSnap = await getDocs(commentsQ);
          setComments(commentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (e) {
          console.warn("Comments query fallback:", e);
        }

        // Fetch Suggestions
        try {
          const suggestionsQ = query(
            collection(db, 'suggestions'),
            where('userId', '==', user.uid)
          );
          const suggestionsSnap = await getDocs(suggestionsQ);
          setSuggestions(suggestionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (e) {
          console.warn("Suggestions query fallback:", e);
        }
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      storeLogout();
      router.push('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate MIME type & file size (max 5MB)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setSaveError("Invalid image type. Please select a JPEG, PNG, WEBP, or GIF image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSaveError("File size exceeds 5MB limit. Please choose a smaller image.");
      return;
    }

    setUploadingImage(true);
    setSaveError(null);

    try {
      if (storage.app?.options?.apiKey !== "mock-key") {
        const storageRef = ref(storage, `profile-images/${user.uid}/avatar_${Date.now()}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setPhotoURL(url);
        setSaveSuccess("Avatar uploaded! Save changes to apply.");
      } else {
        // Fallback preview
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotoURL(event.target.result as string);
            setSaveSuccess("Avatar preview updated. Save changes to apply.");
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setSaveError("Failed to upload avatar image: " + (err.message || "Upload error"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaveSuccess(null);
    setSaveError(null);

    try {
      // Update Firebase Auth profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL
        });
      }

      // Update Firestore user document
      if (db.app?.options?.apiKey !== "mock-key") {
        await updateDoc(doc(db, 'users', user.uid), {
          displayName: displayName,
          bio: bio,
          photoURL: photoURL,
          updatedAt: serverTimestamp()
        });
      }

      updateProfileState({
        displayName: displayName,
        bio: bio,
        photoURL: photoURL
      });

      setSaveSuccess("Profile updated successfully!");
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err: any) {
      console.error("Save profile error:", err);
      setSaveError("Failed to save profile updates: " + err.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    } catch (err: any) {
      setSaveError("Failed to send password reset: " + err.message);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-white/70">Loading account dashboard...</p>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'profile', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Profile Banner / Header */}
      <div className="glass-card p-8 rounded-3xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="relative w-28 h-28 shrink-0 group">
            <img
              src={user.photoURL || (user.gender === 'girl' ? '/assets/girl.png' : '/assets/boy.png')}
              alt={user.displayName}
              className="w-full h-full rounded-3xl object-cover border-4 border-primary/30 shadow-xl"
            />
            <button
              onClick={() => setActiveTab('edit')}
              className="absolute -bottom-2 -right-2 w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              title="Edit Profile Photo"
            >
              <Camera size={18} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
              <h1 className="text-3xl font-extrabold font-display text-white">{user.displayName}</h1>
              {user.role === 'admin' ? (
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black rounded-full uppercase tracking-wider">
                  Admin Privileges
                </span>
              ) : (
                <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full uppercase tracking-wider">
                  Verified Member
                </span>
              )}
            </div>

            <p className="text-white/60 text-sm mb-3">{user.email} • Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2026'}</p>
            
            {user.bio ? (
              <p className="text-white/80 text-sm italic max-w-2xl bg-white/5 p-3 rounded-xl border border-white/10">{user.bio}</p>
            ) : (
              <button
                onClick={() => setActiveTab('edit')}
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1 mx-auto md:mx-0"
              >
                <Edit3 size={14} /> Add bio
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('edit')}
              className="btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 rounded-xl shadow-lg"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Real Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
            <div className="text-2xl font-black text-primary">{orders.length}</div>
            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mt-0.5">Purchases</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
            <div className="text-2xl font-black text-amber-400">{reviews.length}</div>
            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mt-0.5">Reviews</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
            <div className="text-2xl font-black text-blue-400">{comments.length}</div>
            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mt-0.5">Comments</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
            <div className="text-2xl font-black text-emerald-400">{suggestions.length}</div>
            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mt-0.5">Suggestions</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Active Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="space-y-4">
          <nav className="glass-card rounded-2xl p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </div>
                {tab.id === 'orders' && orders.length > 0 && (
                  <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded-full">{orders.length}</span>
                )}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Tab Content Panel */}
        <main className="glass-card rounded-3xl p-8 min-h-[500px]">
          {saveSuccess && (
            <div className="mb-6 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm flex items-center gap-3">
              <CheckCircle2 size={18} /> {saveSuccess}
            </div>
          )}
          {saveError && (
            <div className="mb-6 p-4 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-400 text-sm flex items-center gap-3">
              <AlertCircle size={18} /> {saveError}
            </div>
          )}

          {/* OVERVIEW / PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <User size={20} className="text-primary" /> Account Overview
                </h2>
                <button
                  onClick={() => setActiveTab('edit')}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                >
                  <Edit3 size={14} /> Edit Information
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Email Address</p>
                      <p className="font-semibold text-white">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mt-2">
                    <CheckCircle2 size={14} /> Firebase Authenticated Account
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Member Since</p>
                      <p className="font-semibold text-white">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2026'}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs font-medium">Unique UID: <code className="text-white/60">{user.uid}</code></p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <Shield size={18} className="text-primary" /> Security & Password
                </h3>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="font-bold text-white">Password Reset</p>
                      <p className="text-xs text-white/50">Send a password reset link to <span className="text-white font-medium">{user.email}</span></p>
                    </div>
                    <button
                      onClick={handlePasswordReset}
                      className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all"
                    >
                      {resetSent ? "Reset Email Sent! Check Inbox" : "Send Reset Email"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MY ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Package size={20} className="text-primary" /> My Orders ({orders.length})
                </h2>
                <button
                  onClick={fetchUserData}
                  className="text-xs text-white/60 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw size={14} className={loadingData ? "animate-spin" : ""} /> Refresh
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <ShoppingBag size={48} className="mx-auto mb-3 text-white/30" />
                  <h3 className="text-base font-bold text-white">No Orders Found Yet</h3>
                  <p className="text-xs text-white/50 max-w-sm mx-auto mt-1 mb-6">
                    Purchases you make across Bookstore, GameStore, WebStore, or PersonalStore will appear here.
                  </p>
                  <Link href="/#catalog" className="btn-primary px-6 py-2.5 text-xs font-bold inline-flex items-center gap-2 rounded-xl">
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                            {order.status || 'PAID'}
                          </span>
                          <span className="text-xs text-white/40">Order #{order.orderId || order.id?.substring(0, 8)}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mt-1">{order.productName || order.title || 'KrishnaStores Product'}</h4>
                        <p className="text-xs text-white/50 mt-0.5">
                          Date: {order.createdAt?.toDate?.() ? order.createdAt.toDate().toLocaleDateString() : (order.createdAt || 'Recent')}
                          {order.razorpayPaymentId && ` • Payment ID: ${order.razorpayPaymentId}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-xl font-extrabold text-white">₹{order.amount}</span>
                        </div>
                        {order.downloadUrl || order.digitalAsset ? (
                          <a
                            href={order.downloadUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary px-4 py-2 text-xs font-bold flex items-center gap-2 rounded-xl"
                          >
                            <Download size={14} /> Download
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DOWNLOADS TAB */}
          {activeTab === 'downloads' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Download size={20} className="text-primary" /> Digital Downloads
                </h2>
              </div>

              {orders.filter(o => o.downloadUrl || o.digitalAsset).length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <Download size={48} className="mx-auto mb-3 text-white/30" />
                  <p className="text-sm font-semibold text-white/70">No active digital downloads found.</p>
                  <p className="text-xs text-white/40 mt-1 max-w-md mx-auto">
                    Purchased digital files, code assets, or flag animations will be accessible here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.filter(o => o.downloadUrl || o.digitalAsset).map(order => (
                    <div key={order.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white">{order.productName}</h4>
                        <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      </div>
                      <a
                        href={order.downloadUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 rounded-xl"
                      >
                        <Download size={14} /> Download Digital File
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Star size={20} className="text-amber-400" /> My Reviews ({reviews.length})
                </h2>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <Star size={48} className="mx-auto mb-3 text-white/30" />
                  <p className="text-sm text-white/70">You haven't submitted any product reviews yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? "#F59E0B" : "none"} />
                          ))}
                          <span className="text-xs font-bold ml-2 text-white">{review.rating}.0</span>
                        </div>
                        {review.verifiedPurchase && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Verified Purchase</span>
                        )}
                      </div>
                      <h4 className="font-bold text-white">{review.title}</h4>
                      <p className="text-xs text-white/70 mt-1">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* COMMENTS TAB */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare size={20} className="text-blue-400" /> My Comments ({comments.length})
                </h2>
              </div>
              {comments.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <MessageSquare size={48} className="mx-auto mb-3 text-white/30" />
                  <p className="text-sm text-white/70">No product comments yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {comments.map(c => (
                    <div key={c.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-xs text-white/80">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SUGGESTIONS TAB */}
          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lightbulb size={20} className="text-emerald-400" /> Product Suggestions ({suggestions.length})
                </h2>
              </div>
              {suggestions.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <Lightbulb size={48} className="mx-auto mb-3 text-white/30" />
                  <p className="text-sm text-white/70">No suggestions submitted yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {suggestions.map(s => (
                    <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-xs text-white/80">{s.suggestion}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EDIT PROFILE TAB */}
          {(activeTab === 'edit' || activeTab === 'settings') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Edit3 size={20} className="text-primary" /> Edit User Profile
                </h2>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="text-xs text-white/60 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6 max-w-xl">
                {/* Avatar Preview & Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase text-white/60 mb-2">Profile Avatar</label>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary shrink-0 bg-white/10">
                      <img
                        src={photoURL || '/assets/boy.png'}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="btn-secondary px-4 py-2 text-xs font-bold inline-flex items-center gap-2 cursor-pointer rounded-xl">
                        <Upload size={14} /> {uploadingImage ? "Uploading..." : "Upload New Photo"}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      <p className="text-[11px] text-white/40">JPEG, PNG, WEBP max 5MB.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/60 mb-2">Display Name</label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/60 mb-2">Bio / About You</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a little bit about yourself..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/60 mb-2">Avatar URL (Optional Manual Link)</label>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 rounded-xl shadow-lg"
                >
                  <Check size={16} /> Save Profile Changes
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
