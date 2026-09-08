"use client";

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Clock,
  AlertCircle,
  ArrowLeft,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { motion } from 'framer-motion';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!db.app?.options?.apiKey || db.app.options.apiKey === "mock-key") {
        setLoading(false);
        return;
      }

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'ALL') return matchesSearch;
    return matchesSearch && order.status === filter;
  });

  const totalRevenue = orders.reduce((acc, order) => acc + (Number(order.amount) || 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/admin" className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight">Order Management</h1>
          </div>
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">Manage and track all elite transactions</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-card px-6 py-4 border-white/5">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Total Gross Revenue</p>
            <p className="text-xl font-black text-emerald-500">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Search by Customer, Order ID, or Product..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold uppercase tracking-widest focus:border-primary/50 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <select
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold uppercase tracking-widest focus:border-primary/50 outline-none appearance-none transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All Orders</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Product</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Date</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Accessing Secure Records...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No orders found matching your criteria</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-black text-xs">
                          {order.userName?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">{order.userName}</p>
                          <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black uppercase tracking-tight text-primary">{order.productName}</p>
                      <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">ID: {order.orderId}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-white/40">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-white">₹{order.amount}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                        order.status === 'PAID'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {order.status === 'PAID' && <ShieldCheck className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
