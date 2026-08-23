import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "KrishnaStores — Learn. Play. Build.",
  description: "KrishnaStores — books, games and developer-built digital products by Krishna Patil Rajput.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
