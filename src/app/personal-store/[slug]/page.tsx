"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { Product } from '@/types/store';
import { ReviewList } from '@/components/community/Reviews/ReviewList';
import { CommentSection } from '@/components/community/Comments/CommentSection';
import { SuggestionBox } from '@/components/community/Suggestions/SuggestionBox';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, Play, CheckCircle2, Star, MessageSquare, Lightbulb, Zap, CreditCard, Download, ShieldCheck, Clock } from 'lucide-react';

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'comments' | 'suggestions'>('details');

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.slug === slug);
    if (found) {
      setProduct(found);
    } else {
      router.push('/personal-store');
    }
  }, [slug, router]);

  const handlePurchase = async () => {
    if (!product) return;
    if (!user) {
      alert("Please login to purchase this product.");
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          currency: 'INR',
          userName: user.displayName || 'Elite Customer',
          email: user.email
        }),
      });

      const order = await response.json();

      if (order.id) {
        // Initialize Razorpay
        const options = {
          key: order.key || (typeof import.meta !== 'undefined' ? import.meta.env.VITE_RAZORPAY_KEY_ID : "") || "rzp_test_mock",
          amount: order.amount,
          currency: order.currency,
          name: "KrishnaStores Elite",
          description: `Purchase: ${product.title}`,
          order_id: order.id,
          handler: async function (response: any) {
            // Verify payment
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productId: product.id,
                userName: user.displayName || 'Elite Customer',
                email: user.email
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              router.push(`/receipt/${order.id}?payment_id=${response.razorpay_payment_id}&product_id=${product.id}&amount=${product.priceINR}&product_name=${encodeURIComponent(product.title)}`);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: user.displayName || 'Elite Customer',
            email: user.email,
          },
          theme: {
            color: "#A855F7",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!product) return null;

  const isPaid = product.priceINR > 0;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/personal-store" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Vault</span>
          </Link>
          <button className="text-slate-500 hover:text-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Product Media & Info */}
          <div className="lg:col-span-7 space-y-12">
            {/* Main Preview Card */}
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 group">
              <Image
                src={product.image || product.coverImage || ''}
                alt={product.title}
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {product.demoLink && (
                <Link
                  href={`${window.location.pathname}/preview`}
                  className="absolute bottom-8 left-8 flex items-center gap-3 px-6 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-purple-500 hover:text-white transition-all duration-500"
                >
                  <Play className="w-4 h-4 fill-current" /> Live Preview
                </Link>
              )}
            </div>

            {/* Content Tabs */}
            <div className="space-y-8">
              <div className="flex items-center gap-8 border-b border-white/5 overflow-x-auto pb-4 no-scrollbar">
                {[
                  { id: 'details', label: 'Product Details', icon: CheckCircle2 },
                  { id: 'reviews', label: `Reviews (${product.reviewsCount || 0})`, icon: Star },
                  { id: 'comments', label: 'Comments', icon: MessageSquare },
                  { id: 'suggestions', label: 'Suggestions', icon: Lightbulb }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                      activeTab === tab.id ? 'text-purple-500' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[400px]"
                >
                  {activeTab === 'details' && (
                    <div className="space-y-12">
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-4">Description</h3>
                        <p className="text-slate-400 leading-relaxed font-medium">{product.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-sm font-black uppercase tracking-widest text-purple-500 mb-6">Key Features</h3>
                          <ul className="space-y-4">
                            {product.features?.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-black uppercase tracking-widest text-purple-500 mb-6">What You Get</h3>
                          <ul className="space-y-4">
                            {product.whatYouGet?.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                <Zap className="w-5 h-5 text-purple-500 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <ReviewList productId={product.id} />
                  )}

                  {activeTab === 'comments' && (
                    <CommentSection productId={product.id} />
                  )}

                  {activeTab === 'suggestions' && (
                    <SuggestionBox />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Pricing & Buy Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-6">
                  <ShieldCheck className="w-4 h-4" /> Verified Asset
                </div>

                <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">{product.title}</h1>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{product.rating} / 5.0</span>
                </div>

                <div className="flex items-baseline gap-3 mb-10">
                  <span className="text-5xl font-black text-white tracking-tighter">₹{product.priceINR}</span>
                  {product.estimatedValue && (
                    <span className="text-lg font-bold text-slate-600 line-through tracking-tighter">{product.estimatedValue}</span>
                  )}
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="w-full py-6 bg-white text-black rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] hover:bg-purple-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : isPaid ? (
                      <><CreditCard className="w-5 h-5" /> Buy for ₹{product.priceINR}</>
                    ) : (
                      <><Download className="w-5 h-5" /> Get Free</>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">
                    Safe Payment via Razorpay • 256-bit Encryption
                  </p>
                </div>

                <div className="mt-12 pt-10 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Instant Delivery</h4>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Ready to download immediately</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Lifetime Updates</h4>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">One-time purchase, forever ours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Card */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-500 font-black text-xl border border-purple-500/20">
                  KP
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Created By</h4>
                  <p className="text-lg font-black uppercase tracking-tight text-white mt-1">Krishna Patil Rajput</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
