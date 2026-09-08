import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";
import { PRODUCTS } from "@/data/products";
import { getRateLimit } from "@/lib/ratelimit/memory-store";

export async function POST(req: Request) {
  try {
    // Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const ratelimit = getRateLimit(`order_${ip}`, 10, 60 * 1000); // 10 order attempts per minute

    if (!ratelimit.success) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { productId, currency = "INR", userId, userName, email } = await req.json();

    // 1. Validate Product
    const product = PRODUCTS.find((p) => p.id === productId || p.slug === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User authentication required" }, { status: 401 });
    }

    // 2. Determine Server-Side Price
    const amountInPaise = Math.round(product.priceINR * 100);

    if (amountInPaise < 100) {
      return NextResponse.json({ error: "Minimum amount is ₹1" }, { status: 400 });
    }

    const options = {
      amount: amountInPaise,
      currency,
      receipt: `ks_${product.id}_${Date.now()}`,
      notes: {
        productId: product.id,
        userId: userId,
        userName: userName || 'Elite Customer',
        email: email || 'customer@example.com'
      }
    };

    // 3. Handle Mock Mode for Development
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === "rzp_test_mock") {
      return NextResponse.json({
        id: `order_mock_${Math.random().toString(36).substring(7)}`,
        amount: amountInPaise,
        currency: currency,
        status: "created",
        key: keyId || "rzp_test_mock"
      });
    }

    // 4. Create Real Razorpay Order
    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      ...order,
      key: keyId
    });
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
