
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";
import React from "react";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Admin Panel - Erbil Wedding",
  description: "Admin panel for managing wedding venues and bookings.",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
