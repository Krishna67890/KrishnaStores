import {
  Product as StoreProduct,
  ProductCategory,
  ProductDetails,
  CategoryFilter
} from './store';

export type { ProductCategory, ProductDetails, CategoryFilter };

export interface Product extends StoreProduct {
  // Legacy fields for compatibility during transition
  price?: number;
  discountPrice?: number;
  coverImage?: string;
  buyLink?: string;
  demoLink?: string;
}

export interface Book extends Product {
  author: string;
  rating: number;
  reviewsCount: number;
  pages: number | string;
  language: string;
  format: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  publishedDate: string;
  publisher: string;
  learnings: string[];
  features: string[];
  whyBuy?: { title: string; description: string }[];
  contents: any[];
}

export interface Game extends Product {
  developer: string;
  platform: string;
  features: string[];
  whatsIncluded: string[];
  requirements: string[];
  genre: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  gender?: 'boy' | 'girl';
  role: 'user' | 'admin';
}

export interface PurchasedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  purchaseDate: string;
  progress: number;
  lastRead: string;
}
