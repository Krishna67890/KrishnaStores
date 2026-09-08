"use client";

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore';
import { Suggestion } from '@/types/community';
import { Lightbulb, ThumbsUp, Plus } from 'lucide-react';

export const SuggestionBox: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db.app?.options?.apiKey || db.app.options.apiKey === "mock-key") {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'suggestions'),
      orderBy('votes', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Suggestion[];
      setSuggestions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleVote = async (id: string) => {
    try {
      const suggestionRef = doc(db, 'suggestions', id);
      await updateDoc(suggestionRef, {
        votes: increment(1)
      });
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await addDoc(collection(db, 'suggestions'), {
        userId: auth.currentUser?.uid || 'anonymous',
        userName: auth.currentUser?.displayName || 'Anonymous',
        title: newTitle,
        description: newDesc,
        category: 'product',
        status: 'pending',
        votes: 0,
        createdAt: serverTimestamp(),
      });
      setNewTitle("");
      setNewDesc("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding suggestion:", err);
    }
  };

  return (
    <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Lightbulb className="text-emerald-500" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Feature Requests</h3>
            <p className="text-xs text-zinc-500">Vote on what we should build next</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all"
        >
          <Plus size={18} /> New Idea
        </button>
      </div>

      <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="text-zinc-500 text-center py-8">Loading roadmap...</div>
        ) : suggestions.length === 0 ? (
          <div className="text-zinc-500 text-center py-8">No ideas yet. Start the movement!</div>
        ) : (
          suggestions.map((item) => (
            <div key={item.id} className="group bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-xl flex items-start gap-4 hover:border-emerald-500/30 transition-all">
              <button
                onClick={() => handleVote(item.id)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg bg-zinc-800/50 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors shrink-0"
              >
                <ThumbsUp size={16} />
                <span className="text-xs font-bold">{item.votes}</span>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white truncate">{item.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                    item.status === 'implemented' ? 'bg-emerald-500/20 text-emerald-500' :
                    item.status === 'approved' ? 'bg-purple-500/20 text-purple-500' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Suggest an Idea</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Title</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. Add Roblox Studio Tutorials"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[100px]"
                  placeholder="Explain your idea in detail..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors"
                >
                  Post Idea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
