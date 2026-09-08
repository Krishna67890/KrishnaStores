import { useState } from 'react';
import { Product } from '../types/store';
import { useAuthStore } from '../store/useAuthStore';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const initiateCheckout = async (product: Product) => {
    if (!user) {
      alert('Please log in to continue with the purchase.');
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);
    try {
      // 1. Create order on the server
      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          userId: user.uid,
          userName: user.displayName,
          email: user.email,
          amount: product.priceINR,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Failed to create order');
      }

      const order = await response.json();

      // 2. Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // 3. Initialize Razorpay options
      const options = {
        key: order.key || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'KrishnaStores',
        description: `Purchase: ${product.title}`,
        image: '/assets/logo.png',
        order_id: order.id,
        handler: async function (response: any) {
          // 4. Verify payment on the server
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productId: product.id,
              userId: user.uid,
              userName: user.displayName,
              email: user.email
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // 5. Redirect to success page with full details for immediate display
            // For security, the receipt page will also verify this against Firestore
            const params = new URLSearchParams({
              payment_id: response.razorpay_payment_id,
              product_id: product.id,
              amount: product.priceINR.toString(),
              product_name: product.title
            });
            window.location.href = `/receipt/${order.id}?${params.toString()}`;
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.displayName,
          email: user.email,
        },
        theme: {
          color: '#2563EB',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong during checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return { initiateCheckout, isLoading };
};
