"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheck, Download, Printer, CheckCircle2, ArrowRight, ExternalLink, FileText, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const ReceiptPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const receiptRef = React.useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuthStore();

  const [orderData, setOrderData] = useState<{
    paymentId: string;
    productId: string;
    amount: string;
    productName: string;
    status: string;
    isMock?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadToken, setDownloadToken] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (authLoading) return;

      if (!user) {
        setError("You must be logged in to view this receipt.");
        setLoading(false);
        return;
      }

      try {
        if (!db.app?.options?.apiKey || db.app?.options?.apiKey === "mock-key") {
          setOrderData({
            paymentId: searchParams.get('payment_id') || 'pay_mock_12345',
            productId: searchParams.get('product_id') || 'unknown',
            amount: searchParams.get('amount') || '0',
            productName: searchParams.get('product_name') || 'Product Name',
            status: 'PAID',
            isMock: true
          });
          setLoading(false);
          return;
        }

        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where("orderId", "==", orderId),
          where("userId", "==", user.uid),
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0].data();
          setOrderData({
            paymentId: doc.paymentId,
            productId: doc.productId,
            amount: doc.amount.toString(),
            productName: doc.productName,
            status: doc.status,
            isMock: doc.isMock
          });
        } else {
          const urlPaymentId = searchParams.get('payment_id');
          if (urlPaymentId) {
            setOrderData({
              paymentId: urlPaymentId,
              productId: searchParams.get('product_id') || '',
              amount: searchParams.get('amount') || '0',
              productName: searchParams.get('product_name') || 'Product',
              status: 'PAID'
            });
          } else {
            setError("Order not found or you don't have permission to view it.");
          }
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user, authLoading, searchParams]);

  useEffect(() => {
    const token = btoa(`${orderId}-${Date.now()}`);
    setDownloadToken(token);
  }, [orderId]);

  const handlePrintReceipt = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Verifying Secure Transaction...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Access Denied</h1>
          <p className="text-slate-400 text-sm font-medium">{error || "Something went wrong"}</p>
          <div className="pt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-purple-500 hover:text-white transition-all duration-500"
            >
              Back to Login <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          ref={receiptRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border border-white/10 rounded-[3rem] p-12 relative overflow-hidden"
        >
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Payment Successful</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
              {orderData.isMock ? "Mock Order Verified" : "Order Confirmed"} • KrishnaStores Elite Vault
            </p>
          </div>

          {/* Receipt Details */}
          <div className="space-y-6 mb-12">
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Order ID</span>
              <span className="text-xs font-black text-white uppercase">{orderId}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Payment ID</span>
              <span className="text-xs font-black text-white uppercase">{orderData.paymentId}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product</span>
              <span className="text-xs font-black text-purple-500 uppercase">{orderData.productName}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount Paid</span>
              <span className="text-xs font-black text-white uppercase">₹{orderData.amount}.00 INR</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">{orderData.status}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`/account`}
              className="flex items-center justify-center gap-3 py-6 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-purple-500 hover:text-white transition-all duration-500 shadow-2xl shadow-purple-500/10"
            >
              <Download className="w-4 h-4" /> Go to Downloads
            </a>
            <button
              onClick={handlePrintReceipt}
              className="flex items-center justify-center gap-3 py-6 bg-white/5 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              <Printer className="w-4 h-4" /> Print Receipt
            </button>
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">
              Continue Shopping <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Security Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600" />
        </motion.div>

        <div className="mt-12 flex items-center justify-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
          <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Encrypted Vault</span>
          <span className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> Verified Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
