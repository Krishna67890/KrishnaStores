"use client";

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Comment } from '@/types/community';
import { MessageSquare, Send } from 'lucide-react';

interface CommentSectionProps {
  productId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db.app?.options?.apiKey || db.app.options.apiKey === "mock-key") {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'comments'),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const commentData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Comment[];
        setComments(commentData);
        setLoading(false);
      },
      (err) => {
        console.warn("Comments snapshot fallback:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addDoc(collection(db, 'comments'), {
        productId,
        userId: auth.currentUser?.uid || 'anonymous',
        userName: auth.currentUser?.displayName || 'Anonymous Explorer',
        text: newComment,
        createdAt: serverTimestamp(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  if (loading) return <div className="text-gray-400">Loading discussion...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-purple-500" />
        <h3 className="text-2xl font-bold text-white">Community Discussion</h3>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ask a question or share your thoughts..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px] transition-all"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
        >
          <Send size={20} />
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-emerald-600 flex items-center justify-center text-white font-bold shrink-0">
              {comment.userName[0].toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">{comment.userName}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {comment.createdAt?.toDate().toLocaleDateString()}
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
