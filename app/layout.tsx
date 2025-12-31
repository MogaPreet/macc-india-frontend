import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Macc-India | Premium Refurbished Laptops",
  description: "Get premium refurbished laptops at sustainable prices. MacBooks, Dell, HP, and more. Quality guaranteed with every purchase.",
  keywords: ["refurbished laptops", "MacBook", "Dell", "HP", "premium laptops", "India", "sustainable tech"],
  authors: [{ name: "Macc-India" }],
  openGraph: {
    title: "Macc-India | Premium Refurbished Laptops",
    description: "Premium tech at sustainable prices. Shop refurbished laptops with confidence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${notoSans.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
