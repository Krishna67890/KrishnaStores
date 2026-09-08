"use client";

import React, { useState, useEffect } from 'react';
import { Lightbulb, MessageSquare, TrendingUp, ShoppingBag, BookOpen, Settings, AlertCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { label: 'Total Revenue', value: '₹1,24,500', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Orders', value: '0', icon: ShoppingBag, color: 'text-primary' },
    { label: 'Community Posts', value: '0', icon: MessageSquare, color: 'text-purple-500' },
    { label: 'Suggestions', value: '0', icon: BookOpen, color: 'text-amber-500' },
  ]);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!db.app?.options?.apiKey || db.app.options.apiKey === "mock-key") return;

    // Fetch Stats
    const fetchStats = async () => {
      try {
        const ordersSnap = await getDocs(collection(db, 'orders'));
        const commentsSnap = await getDocs(collection(db, 'comments'));
        const reviewsSnap = await getDocs(collection(db, 'reviews'));
        const suggestionsSnap = await getDocs(collection(db, 'suggestions'));

        const totalRev = ordersSnap.docs.reduce((acc, doc) => acc + (doc.data().amount || 0), 0);

        setStats(prev => [
          { ...prev[0], value: `₹${totalRev.toLocaleString()}` },
          { ...prev[1], value: ordersSnap.size.toString() },
          { ...prev[2], value: (commentsSnap.size + reviewsSnap.size).toString() },
          { ...prev[3], value: suggestionsSnap.size.toString() },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();

    // Recent Orders listener
    const qOrders = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5));
    const unsubOrders = onSnapshot(qOrders, (snap) => {
      setRecentOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubOrders();
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 border-white/5 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">+Live</span>
            </div>
            <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
            <p className="text-xs font-bold text-white/20 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 glass-card p-8 border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight">Recent Elite Sales</h2>
            <Link href="/admin/orders" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">View All</Link>
          </div>

          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/5 rounded-3xl">
                <AlertCircle className="w-8 h-8 text-white/10 mx-auto mb-3" />
                <p className="text-sm text-white/20 font-bold uppercase tracking-widest">No recent sales found</p>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-black text-white">
                      {order.userName?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-tight">{order.userName || 'Anonymous'}</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{order.productName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-emerald-500">₹{order.amount}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <ShieldCheck size={10} className="text-emerald-500" />
                      <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em]">Verified</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Community Moderation */}
        <div className="glass-card p-8 border-white/5">
          <h2 className="text-xl font-black mb-8 uppercase tracking-tight">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/admin/community" className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              Moderate Community
            </Link>
            <Link href="/admin/suggestions" className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <Lightbulb className="w-5 h-5 text-emerald-500" />
              Product Roadmap
            </Link>
            <Link href="/admin/settings" className="w-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <Settings className="w-5 h-5 text-white/20" />
              System Config
            </Link>
          </div>

          <div className="mt-12 p-8 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full" />
             <h4 className="font-black text-[10px] uppercase tracking-[0.2em] mb-3 text-primary">Security Alert</h4>
             <p className="text-xs text-white/40 leading-relaxed font-medium">
               Ensure all Razorpay Webhooks are verified with signature checking before processing downloads.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
