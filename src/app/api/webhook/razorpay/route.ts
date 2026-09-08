import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { PRODUCTS as products } from "@/data/products";
import { getRateLimit } from "@/lib/ratelimit/memory-store";

export async function POST(req: Request) {
  try {
    // Rate Limiting for Webhook
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const ratelimit = getRateLimit(`webhook_${ip}`, 60, 60 * 1000); // 60 requests per minute

    if (!ratelimit.success) {
        return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    }

    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    if (secret) {
        const expectedSignature = crypto
          .createHmac("sha256", secret)
          .update(body)
          .digest("hex");

        if (expectedSignature !== signature) {
          return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      // Idempotency: check if order already exists
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where("orderId", "==", orderId), limit(1));
      const existingOrders = await getDocs(q);

      if (existingOrders.empty) {
        // If verify route didn't catch it yet, create it here
        // Note: Webhook data might be slightly different or missing user context if not passed in notes
        const productId = payment.notes?.productId;
        const product = products.find(p => p.id === productId);

        await addDoc(collection(db, 'orders'), {
          orderId: orderId,
          paymentId: payment.id,
          productId: productId || 'unknown',
          productName: product?.title || 'Unknown Product',
          amount: (payment.amount / 100),
          userName: payment.notes?.userName || 'Elite Customer',
          email: payment.email || payment.notes?.email || 'customer@example.com',
          status: 'PAID',
          source: 'webhook',
          createdAt: serverTimestamp(),
        });
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
