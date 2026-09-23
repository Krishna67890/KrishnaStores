import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ReviewStats {
  averageRating: number;
  reviewCount: number;
  loading: boolean;
}

export const useProductReviewStats = (
  productId: string
): ReviewStats => {
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    reviewCount: 0,
    loading: true
  });

  useEffect(() => {
    if (db.app.options.apiKey === 'mock-key') {
      setStats({
        averageRating: 0,
        reviewCount: 0,
        loading: false
      });

      return;
    }

    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('productId', '==', productId)
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const approvedReviews = snapshot.docs
          .map((reviewDocument) => reviewDocument.data())
          .filter(
            (review) =>
              review.status === 'approved' || !review.status
          );

        const reviewCount = approvedReviews.length;

        const ratingTotal = approvedReviews.reduce(
          (total, review) => total + Number(review.rating || 0),
          0
        );

        const averageRating =
          reviewCount > 0
            ? Number((ratingTotal / reviewCount).toFixed(1))
            : 0;

        setStats({
          averageRating,
          reviewCount,
          loading: false
        });
      },
      (error) => {
        console.error('Unable to load review statistics:', error);

        setStats({
          averageRating: 0,
          reviewCount: 0,
          loading: false
        });
      }
    );

    return () => unsubscribe();
  }, [productId]);

  return stats;
};