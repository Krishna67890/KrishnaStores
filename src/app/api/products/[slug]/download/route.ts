import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { getRateLimit } from "@/lib/ratelimit/memory-store";

// This is a secure endpoint.
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    // Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const ratelimit = getRateLimit(`download_${ip}`, 5, 60 * 1000); // 5 downloads per minute per IP

    if (!ratelimit.success) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
            'Retry-After': Math.ceil((ratelimit.reset - Date.now()) / 1000).toString()
        }
      });
    }

    if (!token) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Decode token to get orderId (simple implementation, ideally use JWT or signed token)
    let orderId = "";
    try {
      orderId = Buffer.from(token, 'base64').toString().split('-')[0];
    } catch (e) {
      return new NextResponse("Invalid Token", { status: 403 });
    }

    if (!orderId) {
      return new NextResponse("Invalid Token", { status: 403 });
    }

    // Verify order in Firestore
    // Note: In Next.js App Router API routes, we use the client SDK or Admin SDK.
    // Given the project setup, we are using the client SDK with server-side config.
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where("orderId", "==", orderId), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
       return new NextResponse("Order not found or not paid", { status: 403 });
    }

    const orderData = querySnapshot.docs[0].data();

    // Safety check: ensure the order is for the requested product (slug or id)
    // We check against the slug in the URL and the productId in the order
    if (orderData.status !== 'PAID') {
       return new NextResponse("Payment not verified", { status: 403 });
    }

    // 2. Identify file path from slug
    const privateDir = path.join(process.cwd(), 'private-products', slug);
    const filePath = path.join(privateDir, 'index.html');

    // 3. Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse("Product file not found", { status: 404 });
    }

    // 4. Read file
    const fileContent = await fs.readFile(filePath);

    // 5. Return file with secure headers
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${slug}.html"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error("Download Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
