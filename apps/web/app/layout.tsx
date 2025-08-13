import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";
import { Header } from "@repo/ui/layout/header";
import { Footer } from "@repo/ui/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Erbil Wedding",
  description: "Hayallerinizdeki düğün için en özel mekanlar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          playfair.variable
        )}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
