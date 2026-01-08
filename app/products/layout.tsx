import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "All Refurbished Laptops - MacBook, Dell, HP & More",
    description: "Browse our collection of certified refurbished laptops. Filter by brand, RAM, processor & price. MacBooks, Dell, HP, Lenovo with warranty. Best prices in India!",
    keywords: [
        "buy refurbished laptop",
        "certified used laptops",
        "MacBook second hand",
        "Dell laptop refurbished",
        "HP laptop used",
        "Lenovo ThinkPad refurbished",
        "cheap laptops India",
    ],
    alternates: {
        canonical: "https://www.maccindia.in/products",
    },
    openGraph: {
        title: "Shop Refurbished Laptops | Macc-India",
        description: "Browse certified pre-owned laptops from top brands. MacBooks, Dell, HP & more with warranty.",
        url: "https://www.maccindia.in/products",
    },
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
