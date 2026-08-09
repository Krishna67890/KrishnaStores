import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PurchasedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  purchaseDate: string;
  progress: number;
  lastRead: string;
}

interface PurchaseState {
  purchasedBooks: PurchasedBook[];
  addPurchase: (book: any) => void;
  hasPurchased: (bookId: string) => boolean;
}

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set, get) => ({
      purchasedBooks: [],
      addPurchase: (book) => {
        const alreadyPurchased = get().purchasedBooks.some(b => b.id === book.id);
        if (alreadyPurchased) return;

        const newPurchase: PurchasedBook = {
          id: book.id,
          title: book.title,
          author: book.author,
          coverImage: book.coverImage,
          purchaseDate: new Date().toISOString(),
          progress: 0,
          lastRead: 'Just purchased'
        };

        set({ purchasedBooks: [...get().purchasedBooks, newPurchase] });
      },
      hasPurchased: (bookId) => {
        return get().purchasedBooks.some(book => book.id === bookId);
      },
    }),
    {
      name: 'purchase-storage',
    }
  )
);
