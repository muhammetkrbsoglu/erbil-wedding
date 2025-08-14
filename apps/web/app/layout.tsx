import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";
import { Header } from "@repo/ui/layout/header";
import { Footer } from "@repo/ui/layout/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
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
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: [
    { rel: "icon", url: "/icons/favicon.ico" },
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("CLERK KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          playfair.variable
        )}
      >
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
            <Toaster />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
