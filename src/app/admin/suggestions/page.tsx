"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { CheckCircle2, XCircle, Trash2, Clock, Lightbulb, MessageSquare, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuggestionsModeration = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db.app?.options?.apiKey || db.app.options.apiKey === "mock-key") {
        setLoading(false);
        return;
    }

    const q = query(collection(db, 'suggestions'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setSuggestions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const updateStatus = async (id: string, status: 'approved' | 'rejected' | 'implemented') => {
    try {
      await updateDoc(doc(db, 'suggestions', id), { status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteSuggestion = async (id: string) => {
    if (!confirm("Are you sure you want to delete this suggestion?")) return;
    try {
      await deleteDoc(doc(db, 'suggestions', id));
    } catch (error) {
      console.error("Error deleting suggestion:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Product Roadmap</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Manage User Suggestions & Feedback</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Ideas:</span>
              <span className="ml-2 font-black text-purple-500">{suggestions.length}</span>
            </div>
          </div>
        </header>

        <div className="grid gap-6">
          {loading ? (
             <div className="text-center py-20">
               <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
             </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-20 glass-card border-dashed">
              <Lightbulb className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-slate-500 font-black uppercase tracking-[0.2em]">No suggestions yet</p>
            </div>
          ) : (
            <AnimatePresence>
              {suggestions.map((item) => (
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
                         <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${
                           item.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                           item.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                           item.status === 'implemented' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                           'bg-amber-500/10 text-amber-500 border-amber-500/20'
                         }`}>
                           {item.status || 'pending'}
                         </span>
                         <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-1">
                           <Calendar size={12} /> {item.createdAt?.toDate?.().toLocaleDateString() || 'Recently'}
                         </span>
                      </div>

                      <h3 className="text-xl font-black uppercase tracking-tight text-white">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>

                      <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                          <User size={14} className="text-purple-500" /> {item.userName || 'Anonymous'}
                        </div>
                        {item.category && (
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                            <Lightbulb size={14} className="text-emerald-500" /> {item.category}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateStatus(item.id, 'approved')}
                        className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                        title="Approve"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'rejected')}
                        className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                      <button
                        onClick={() => deleteSuggestion(item.id)}
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

export default SuggestionsModeration;
