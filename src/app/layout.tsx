import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins"
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://krishnabookstores.com'),
  title: {
    default: "KrishnaBookStores | Premium eBooks for Developers & Professionals",
    template: "%s | KrishnaBookStores"
  },
  description: "Premium educational eBook marketplace for developers, students and professionals by Krishna Ajaysing Rajput | Krishna Patil Rajput. Master Web, Mobile and AI with our curated blueprints.",
  keywords: ["eBooks", "Programming", "Development", "AI", "Self-Help", "KrishnaBookStores", "Web Development Roadmap", "React Native Guide"],
  authors: [{ name: "Krishna Ajaysing Rajput" }, { name: "Krishna Patil Rajput" }],
  creator: "Krishna Patil Rajput",
  publisher: "KrishnaBookStores",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "KrishnaBookStores",
    description: "Premium eBooks for Developers, Students & Professionals",
    url: "https://krishnabookstores.com",
    siteName: "KrishnaBookStores",
    images: [
      {
        url: "/assets/web-dev-roadmap-2026.png", // Using one of the best covers as default
        width: 1200,
        height: 630,
        alt: "KrishnaBookStores Premium eBooks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KrishnaBookStores",
    description: "Premium eBooks for Developers, Students & Professionals",
    images: ["/assets/web-dev-roadmap-2026.png"],
    creator: "@krishnapatil",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        inter.variable,
        poppins.variable,
        jetbrainsMono.variable,
        "bg-background text-foreground selection:bg-primary/30"
      )}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
