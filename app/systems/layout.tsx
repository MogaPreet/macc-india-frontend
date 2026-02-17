import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Refurbished Desktop Systems - Dell, HP, Lenovo & More | Macc-India",
    description: "Browse our collection of certified refurbished desktop systems. Filter by brand, RAM, processor & price. Dell, HP, Lenovo with warranty. Best prices in India!",
    keywords: [
        "buy refurbished desktop",
        "certified used systems",
        "Dell desktop refurbished",
        "HP desktop used",
        "Lenovo desktop refurbished",
        "cheap desktop systems India",
    ],
    alternates: {
        canonical: "https://www.maccindia.in/systems",
    },
    openGraph: {
        title: "Shop Refurbished Desktop Systems | Macc-India",
        description: "Browse certified pre-owned desktop systems from top brands. Dell, HP, Lenovo & more with warranty.",
        url: "https://www.maccindia.in/systems",
    },
};

export default function SystemsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
