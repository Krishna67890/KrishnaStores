"use client";

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

const CartClient = () => {
  const { items, removeItem, totalPrice, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-white/20" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-white/60 mb-8 text-center max-w-md">
          Looks like you haven't added any premium books to your cart yet. Explore our collection and start learning today!
        </p>
        <Link href="/books" className="btn-premium">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <Link href="/books" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors mb-10">
          <ChevronLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold font-display mb-12">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-24 aspect-[3/4] bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden border border-white/10">
                   <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-white/40 mb-4">{item.author}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                     <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                     <span className="px-2 py-1 rounded bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-wider">Digital Download</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <span className="text-xl font-bold">{formatPrice((item.discountPrice || item.price) ?? 0)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-white/20 hover:text-danger transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="glass-card p-8 sticky top-32">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal ({totalItems()} items)</span>
                  <span>{formatPrice(totalPrice())}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax (Included)</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="premium-gradient-text">{formatPrice(totalPrice())}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full btn-premium flex items-center justify-center gap-2 mb-6">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-4 py-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase font-bold">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  Secure Payment
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="text-[10px] text-white/40 uppercase font-bold">
                  Instant Access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
