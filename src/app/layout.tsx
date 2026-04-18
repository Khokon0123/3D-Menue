import type { Metadata } from "next";
import { playfair, inter } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Crust Bros — NY Pizza & Burgers",
  description:
    "New York-style pizza and smash burgers made with premium ingredients. Order online for pickup or delivery.",
  keywords: "pizza, burgers, New York pizza, smash burger, order online",
  openGraph: {
    title: "Crust Bros — NY Pizza & Burgers",
    description: "New York-style pizza and smash burgers made with premium ingredients.",
    type: "website",
    siteName: "Crust Bros",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--color-bg)" }}>
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main" style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </SmoothScroll>
      </body>
    </html>
  );
}
