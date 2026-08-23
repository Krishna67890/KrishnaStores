export type ProductCategory = 'book' | 'game' | 'web';

export interface ProductDetails {
  type: string;
  category: string;
  edition?: string;
  platform?: string;
  format?: string;
  purchasePlatform: string;
  delivery: string;
}

export interface Product {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle?: string;
  category: ProductCategory;
  categoryLabel: string; // 'BOOK', 'GAME', 'WEB', 'SOURCE CODE'
  priceINR: number;
  priceDisplay: string; // '₹299', '$1 / ₹100'
  image: string;
  gallery: string[];
  shortDescription: string;
  valueProp: string; // 1-line value proposition for the card
  description: string;
  benefits: { number: string; title: string; desc: string }[];
  youMightWantThisIf: string[];
  audience: { title: string; desc: string }[];
  whatYouGet: string[];
  whatMakesItUseful: string[];
  beforeYouBuy: string[];
  isRightForYou: {
    goodFit: string[];
    mayNotBe: string[];
  };
  details: ProductDetails;
  gumroadUrl: string;
  itchUrl?: string;
  tags: string[];
  featured?: boolean;
  hoursSaved?: string;
  estimatedValue?: string;
  whyBuyNow?: string;
}

export type CategoryFilter = 'all' | 'book' | 'game' | 'web' | 'about';
