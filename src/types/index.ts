export * from './store';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  gender?: 'boy' | 'girl';
  role: 'user' | 'admin';
}

// Legacy support if needed, but primarily redirecting to store.ts
export interface PurchasedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  purchaseDate: string;
  progress: number;
  lastRead: string;
}
