"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { MessageSquare, Star, Trash2, CheckCircle2, XCircle, User, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommunityModeration = () => {
  const [activeTab, setActiveTab] = useState<'comments' | 'reviews'>('comments');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db.app?.options?.apiKey || db.app.options.apiKey === "mock-key") {
        setLoading(false);
        return;
    }

    const q = query(collection(db, activeTab), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsub();
  }, [activeTab]);

  const deleteItem = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Community Moderation</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Manage Reviews and Comments</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => { setActiveTab('comments'); setLoading(true); }}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'comments' ? 'bg-purple-500 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              Comments
            </button>
            <button
              onClick={() => { setActiveTab('reviews'); setLoading(true); }}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'reviews' ? 'bg-purple-500 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              Reviews
            </button>
          </div>
        </header>

        <div className="grid gap-6">
          {loading ? (
             <div className="text-center py-20">
               <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
             </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 glass-card border-dashed">
              <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-slate-500 font-black uppercase tracking-[0.2em]">No {activeTab} found</p>
            </div>
          ) : (
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card p-8 border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                         {activeTab === 'reviews' && (
                           <div className="flex items-center gap-1 text-yellow-500">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} size={10} className={i < (item.rating || 0) ? 'fill-current' : 'opacity-20'} />
                             ))}
                           </div>
                         )}
                         <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-1">
                           <Calendar size={12} /> {item.createdAt?.toDate?.().toLocaleDateString() || 'Recently'}
                         </span>
                         {item.isVerified && (
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-[0.2em] border border-emerald-500/20 rounded-full">
                              Verified Buyer
                            </span>
                         )}
                      </div>

                      <p className="text-slate-200 text-sm leading-relaxed">{item.text || item.content || item.comment}</p>

                      <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                          <User size={14} className="text-purple-500" /> {item.userName || item.author || 'Anonymous'}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                          <Tag size={14} className="text-blue-500" /> Product ID: {item.productId}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-3 bg-white/5 text-white/20 border border-white/10 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityModeration;
