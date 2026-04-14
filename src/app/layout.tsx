import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Haritwal – Precision Moving, Perfect Delivery",
  description:
    "India's trusted logistics partner. Global logistics meets local care. We handle the heavy lifting while you focus on the milestone.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
     <body>{children}</body>
    </html>
  );
}
