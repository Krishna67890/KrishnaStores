import { Timestamp } from "firebase/firestore";

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
  verifiedPurchase: boolean;
}

export interface Comment {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: Timestamp;
  parentId?: string; // For replies
  replies?: Comment[];
}

export interface Suggestion {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: 'product' | 'feature' | 'other';
  status: 'pending' | 'approved' | 'implemented' | 'rejected';
  votes: number;
  createdAt: Timestamp;
}
