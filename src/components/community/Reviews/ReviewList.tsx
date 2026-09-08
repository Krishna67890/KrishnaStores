"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Review } from '@/types/community';
import { Star, CheckCircle } from 'lucide-react';

interface ReviewListProps {
  productId: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db.app?.options?.apiKey || db.app.options.apiKey === "mock-key") {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reviewData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
        setReviews(reviewData);
        setLoading(false);
      },
      (err) => {
        console.warn("Reviews snapshot fallback:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [productId]);

  if (loading) return <div className="text-gray-400">Loading reviews...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{review.userName}</span>
                    {review.verifiedPurchase && (
                      <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle size={10} /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-700"}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-zinc-500">
                  {review.createdAt?.toDate().toLocaleDateString()}
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
