import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "FAQ - Frequently Asked Questions",
    description: "Find answers to common questions about refurbished laptops, orders, shipping, payments, returns, and warranty at Macc-India. Your questions answered!",
    keywords: [
        "refurbished laptop FAQ",
        "laptop warranty questions",
        "used laptop return policy",
        "Macc-India help",
    ],
    alternates: {
        canonical: "https://maccindia.in/faq",
    },
    openGraph: {
        title: "FAQ | Macc-India Refurbished Laptops",
        description: "Get answers to your questions about our refurbished laptops, warranty, shipping, and more.",
        url: "https://maccindia.in/faq",
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
