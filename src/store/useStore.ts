"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/store';

interface StoreState {
  wishlist: string[]; // array of product IDs
  recentlyViewed: string[]; // array of product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addToRecentlyViewed: (productId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set: any, get: any) => ({
      wishlist: [],
      recentlyViewed: [],

      addToWishlist: (productId: string) =>
        set((state: StoreState) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist
            : [...state.wishlist, productId]
        })),

      removeFromWishlist: (productId: string) =>
        set((state: StoreState) => ({
          wishlist: state.wishlist.filter((id: string) => id !== productId)
        })),

      toggleWishlist: (productId: string) => {
        const { wishlist } = get();
        if (wishlist.includes(productId)) {
          get().removeFromWishlist(productId);
        } else {
          get().addToWishlist(productId);
        }
      },

      isInWishlist: (productId: string) => get().wishlist.includes(productId),

      addToRecentlyViewed: (productId: string) =>
        set((state: StoreState) => {
          const filtered = state.recentlyViewed.filter((id: string) => id !== productId);
          return {
            recentlyViewed: [productId, ...filtered].slice(0, 10) // Keep last 10
          };
        }),
    }),
    {
      name: 'krishna-stores-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
