"use client";

import React from 'react';
import {
  Users,
  BookOpen,
  ShoppingBag,
  TrendingUp,
  Plus,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage your KrishnaBookStores orders, books, and customers.",
};

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '₹1,24,500', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Books Sold', value: '452', icon: ShoppingBag, color: 'text-primary' },
    { label: 'Active Users', value: '1,205', icon: Users, color: 'text-purple-500' },
    { label: 'Total Titles', value: '12', icon: BookOpen, color: 'text-amber-500' },
  ];

  const recentSales = [
    { id: '1', user: 'Rahul S.', book: 'The Web Dev Roadmap', price: '₹299', date: '2 mins ago' },
    { id: '2', user: 'Priya P.', book: 'Why Was I Only An Option?', price: '₹199', date: '15 mins ago' },
    { id: '3', user: 'Amit K.', book: 'Mastering AI', price: '₹499', date: '1 hour ago' },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 border-white/5 hover:border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">+12%</span>
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
            <h2 className="text-xl font-black">Recent Sales</h2>
            <Link href="/admin/orders" className="text-xs font-bold text-primary hover:underline">View All Orders</Link>
          </div>

          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {sale.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{sale.user}</p>
                    <p className="text-xs text-white/40">{sale.book}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm">{sale.price}</p>
                  <p className="text-[10px] text-white/20 font-bold uppercase">{sale.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-8 border-white/5">
          <h2 className="text-xl font-black mb-8">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/admin/books/add" className="w-full btn-premium py-4 rounded-2xl flex items-center justify-center gap-3">
              <Plus className="w-5 h-5" />
              Add New Book
            </Link>
            <Link href="/admin/settings" className="w-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all py-4 rounded-2xl font-bold flex items-center justify-center gap-3">
              <Settings className="w-5 h-5 text-white/40" />
              Store Settings
            </Link>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
             <h4 className="font-black text-sm mb-2 text-indigo-400">Pro Tip</h4>
             <p className="text-xs text-white/50 leading-relaxed">
               Updating your book descriptions with SEO keywords can increase organic traffic by up to 25%.
             </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
