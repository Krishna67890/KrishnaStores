"use client";

import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice } from '@/lib/utils';
import { ShieldCheck, Lock, CreditCard, ChevronLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { usePurchaseStore } from '@/store/usePurchaseStore';

const CheckoutClient = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addPurchase } = usePurchaseStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // Set default to UPI for Indian market
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
  });

  // Razorpay integration
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      setIsProcessing(true);

      // Create order on server
      let order;
      try {
        const orderRes = await axios.post('/api/razorpay/order', {
          amount: totalPrice(),
          currency: 'INR',
        });
        order = orderRes.data;
      } catch (err) {
        console.error("Order creation failed, falling back to mock:", err);
        // Fallback for development environments without API working
        order = {
          id: `order_mock_${Math.random().toString(36).substring(7)}`,
          amount: totalPrice() * 100,
          currency: 'INR'
        };
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'KrishnaBookStores',
        description: 'Purchase Premium eBooks',
        order_id: order.id,
        handler: async (response: any) => {
          // Verify payment on server
          try {
            const verifyRes = await axios.post('/api/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.status === 200) {
              setIsSuccess(true);
              items.forEach(item => addPurchase(item));
              clearCart();
            }
          } catch (err) {
            console.error(err);
            alert('Payment verification failed.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: '#6366f1',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response: any) {
        alert('Payment failed: ' + response.error.description);
        setIsProcessing(false);
      });

    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (paymentMethod === 'upi' || paymentMethod === 'card') {
      handleRazorpayPayment();
    } else {
      // Handle other methods or simulation
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        items.forEach(item => addPurchase(item));
        clearCart();
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-success rounded-full flex items-center justify-center mb-8 shadow-lg shadow-success/20"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-white/60 mb-10 max-w-md">
          Thank you for your purchase. Your premium eBooks are now available in your dashboard for instant download.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard" className="btn-premium">
            Go to Dashboard
          </Link>
          <Link href="/" className="btn-outline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors mb-10">
          <ChevronLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <h1 className="text-4xl font-bold font-display mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 mb-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50" />
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm">2</span>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI / QR', icon: ShieldCheck },
                  { id: 'net', label: 'Net Banking', icon: Lock },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                      paymentMethod === method.id
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                    }`}
                  >
                    <method.icon className="w-6 h-6" />
                    <span className="text-sm font-bold">{method.label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <AnimatePresence mode='wait'>
                  {paymentMethod === 'card' && (
                    <motion.div
                      key="card-fields"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/60">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/60">CVC</label>
                          <input type="text" placeholder="•••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {paymentMethod !== 'card' && (
                    <motion.div
                      key="other-method"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-8 rounded-xl bg-white/5 border border-white/10 border-dashed text-center"
                    >
                      <p className="text-white/60">You will be redirected to the secure payment portal.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-premium py-4 text-lg flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                     <>
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       Processing...
                     </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" /> Pay {formatPrice(totalPrice() ?? 0)}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 sticky top-32">
              <h3 className="text-xl font-bold mb-6">Review Your Order</h3>
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-slate-800 rounded-lg shrink-0 overflow-hidden border border-white/10">
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-white/40">{item.author}</p>
                      <p className="font-bold text-primary text-sm mt-1">{formatPrice((item.discountPrice || item.price) ?? 0)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total amount</span>
                  <span className="premium-gradient-text">{formatPrice(totalPrice() ?? 0)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-success/5 border border-success/20 flex gap-4">
                <ShieldCheck className="w-6 h-6 text-success shrink-0" />
                <p className="text-xs text-white/60">Your payment is secured with industry-standard encryption. 100% money-back guarantee.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;
