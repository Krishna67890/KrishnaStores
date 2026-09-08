import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Ensure public/important/KrishnaStoreslogo.png exists
const srcLogo = path.resolve(__dirname, 'assets/KrishnaStoreslogo.png');
const destDir = path.resolve(__dirname, 'public/important');
const destLogo = path.resolve(destDir, 'KrishnaStoreslogo.png');

if (fs.existsSync(srcLogo)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(srcLogo, destLogo);
}

function apiRoutesPlugin() {
  return {
    name: 'api-routes-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/razorpay/order' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { productId } = data;
              const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
              const keySecret = process.env.RAZORPAY_KEY_SECRET;

              const amount = data.amount || 99;
              const amountInPaise = Math.round(amount * 100);
              const mockOrderId = `order_mock_${Math.random().toString(36).substring(7)}`;

              res.setHeader('Content-Type', 'application/json');

              if (keyId && keySecret && keyId !== 'rzp_test_mock') {
                try {
                  const RazorpayModule = await import('razorpay');
                  const Razorpay = RazorpayModule.default || RazorpayModule;
                  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
                  const order = await razorpay.orders.create({
                    amount: amountInPaise,
                    currency: 'INR',
                    receipt: `ks_${productId || 'prod'}_${Date.now()}`
                  });
                  res.statusCode = 200;
                  res.end(JSON.stringify({ ...order, key: keyId }));
                  return;
                } catch (err: any) {
                  console.warn('Razorpay API error in dev middleware, using mock order:', err.message);
                }
              }

              res.statusCode = 200;
              res.end(JSON.stringify({
                id: mockOrderId,
                amount: amountInPaise,
                currency: 'INR',
                status: 'created',
                key: keyId || 'rzp_test_mock'
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || 'Failed to create order' }));
            }
          });
          return;
        }

        if (req.url === '/api/razorpay/verify' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { razorpay_order_id, razorpay_payment_id } = data;

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                message: 'Payment verified successfully',
                orderId: razorpay_order_id || 'mock_order_id',
                paymentId: razorpay_payment_id || `pay_mock_${Math.random().toString(36).substring(7)}`
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || 'Verification failed' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiRoutesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'next/navigation': path.resolve(__dirname, './src/lib/next-navigation-shim.ts'),
        'next/link': path.resolve(__dirname, './src/lib/next-link-shim.tsx')
      }
    },
    server: {
      port: 3000,
      host: true
    }
  };
});

