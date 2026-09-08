import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from "firebase/firestore";
import { PRODUCTS as products } from "@/data/products";
import { getRateLimit } from "@/lib/ratelimit/memory-store";

export async function POST(req: Request) {
  try {
    // Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const ratelimit = getRateLimit(`verify_${ip}`, 20, 60 * 1000); // 20 verify attempts per minute

    if (!ratelimit.success) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
      userId,
      userName,
      email
    } = await req.json();

    if (!userId) {
       return NextResponse.json({ success: false, message: "User ID required" }, { status: 401 });
    }

    // Check for existing order to ensure idempotency
    if (db.app?.options?.apiKey !== "mock-key") {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where("orderId", "==", razorpay_order_id), limit(1));
      const existingOrders = await getDocs(q);

      if (!existingOrders.empty) {
        return NextResponse.json({
          success: true,
          message: "Payment already verified",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        });
      }
    }

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const product = products.find(p => p.id === productId);

    // For mock development orders
    if (razorpay_order_id?.startsWith('order_mock_')) {
      if (db.app?.options?.apiKey !== "mock-key") {
        await addDoc(collection(db, 'orders'), {
          orderId: razorpay_order_id,
          paymentId: `pay_mock_${Math.random().toString(36).substring(7)}`,
          productId,
          userId,
          productName: product?.title || 'Unknown Product',
          amount: product?.priceINR || 0,
          userName: userName || 'Elite Customer',
          email: email || 'customer@example.com',
          status: 'PAID',
          isMock: true,
          createdAt: serverTimestamp(),
        });
      }

      return NextResponse.json({
        success: true,
        message: "Mock payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: `pay_mock_${Math.random().toString(36).substring(7)}`
      });
    }

    if (!razorpay_signature || !razorpay_payment_id) {
       return NextResponse.json({ success: false, message: "Missing payment details" }, { status: 400 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      if (db.app?.options?.apiKey !== "mock-key") {
        await addDoc(collection(db, 'orders'), {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          productId,
          userId,
          productName: product?.title || 'Unknown Product',
          amount: product?.priceINR || 0,
          userName: userName || 'Elite Customer',
          email: email || 'customer@example.com',
          status: 'PAID',
          createdAt: serverTimestamp(),
        });
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
    } else {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
