"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const CartSidebar = () => {
  const { items, removeItem, totalPrice, totalItems, isSidebarOpen, setSidebarOpen } = useCartStore();

  // Close sidebar on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    const handleOpenCart = () => setSidebarOpen(true);

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('open-cart', handleOpenCart);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('open-cart', handleOpenCart);
    };
  }, [setSidebarOpen]);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] pointer-events-auto"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[101] shadow-2xl flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-black tracking-tighter uppercase">Your Cart</h2>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40">
                  {totalItems()}
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-6 h-6 text-white/40" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag className="w-16 h-16 mb-4" />
                  <p className="font-bold uppercase tracking-widest text-sm">Your cart is empty</p>
                  <p className="text-xs mt-2">Add some premium knowledge to get started.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 aspect-[3/4] bg-white/5 rounded-lg overflow-hidden border border-white/10 shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">{item.category}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-black text-white">{formatPrice(item.priceINR)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-white/[0.02] border-t border-white/10 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-bold uppercase tracking-widest">Subtotal</span>
                    <span className="font-bold">{formatPrice(totalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black italic">
                    <span className="uppercase tracking-tighter">Total Amount</span>
                    <span className="premium-gradient-text">{formatPrice(totalPrice())}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://krishnapatilrajput.gumroad.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-premium py-4 flex items-center justify-center gap-2 group"
                  >
                    Checkout Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    href="/cart"
                    onClick={() => setSidebarOpen(false)}
                    className="w-full text-center py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
                  >
                    View Full Shopping Cart
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/5 opacity-40">
                   <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest">
                      <ShieldCheck className="w-3 h-3 text-success" /> Secure
                   </div>
                   <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest">
                      <Download className="w-3 h-3 text-primary" /> Instant
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
