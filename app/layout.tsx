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
  metadataBase: new URL("https://www.maccindia.in"),
  title: {
    default: "Macc-India | Premium Refurbished Laptops in India",
    template: "%s | Macc-India",
  },
  description: "Buy premium refurbished laptops at sustainable prices. Get certified pre-owned MacBooks, Dell, HP, Lenovo with warranty. Quality guaranteed with every purchase. Shop now!",
  keywords: [
    "refurbished laptops India",
    "used laptops Ahmedabad",
    "MacBook refurbished",
    "Dell refurbished laptop",
    "HP refurbished",
    "Lenovo used laptop",
    "premium laptops India",
    "certified pre-owned laptops",
    "second hand laptop with warranty",
    "sustainable tech India",
  ],
  authors: [{ name: "Macc-India", url: "https://www.maccindia.in" }],
  creator: "Macc-India",
  publisher: "Macc-India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.maccindia.in",
  },
  openGraph: {
    title: "Macc-India | Premium Refurbished Laptops in India",
    description: "Buy certified refurbished laptops at sustainable prices. MacBooks, Dell, HP & more with warranty. Shop premium pre-owned laptops now!",
    url: "https://www.maccindia.in",
    siteName: "Macc-India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Macc-India - Premium Refurbished Laptops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Macc-India | Premium Refurbished Laptops",
    description: "Buy certified refurbished laptops at sustainable prices. Quality guaranteed!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Organization structured data for rich results
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Macc-India",
  url: "https://www.maccindia.in",
  logo: "https://www.maccindia.in/favicon1.png",
  description: "Premium refurbished laptops dealer in India. Certified pre-owned MacBooks, Dell, HP, Lenovo with warranty.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Use lift No 19,20,21, solaris business hub, office 201, Sola Rd",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380013",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-91434-30202",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  },
  sameAs: [
    "https://www.instagram.com/macc_india/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${notoSans.variable} font-sans antialiased overflow-x-hidden`}>
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
