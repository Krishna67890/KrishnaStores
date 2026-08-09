export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  discountPrice?: number;
  coverImage: string;
  buyLink: string;
  demoLink?: string;
  category: string;
  tags: string[];
  images?: string[];
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
  contents: Chapter[];
  aiVoice?: string;
  whyWritten?: string;
}

export interface Game extends Product {
  developer: string;
  platform: string;
  features: string[];
  whatsIncluded: string[];
  requirements: string[];
  demoLink?: string;
  itchLink?: string;
  genre: string;
}

export interface Chapter {
  title: string;
  duration?: string;
  subChapters?: string[];
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  gender?: 'boy' | 'girl';
  role: 'user' | 'admin';
}
