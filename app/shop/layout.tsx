import type { Metadata } from "next";
import { Bebas_Neue, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import ShopSidebar from "@/components/shop/ShopSidebar";
import ShopTopBar from "@/components/shop/ShopTopBar";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shop OS",
  robots: { index: false, follow: false },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`shop-container ${display.variable} ${body.variable} ${mono.variable} flex`}
    >
      <ShopSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <ShopTopBar />
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 md:py-8 shop-fade-up">
          {children}
        </main>
      </div>
    </div>
  );
}
