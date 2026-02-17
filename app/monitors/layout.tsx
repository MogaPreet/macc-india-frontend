import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Refurbished Monitors & LED Displays - Dell, HP, LG & More | Macc-India",
    description: "Browse our collection of certified refurbished monitors and LED displays. Filter by brand, resolution, panel type & price. Dell, HP, LG with warranty. Best prices in India!",
    keywords: [
        "buy refurbished monitor",
        "certified used monitor",
        "Dell monitor refurbished",
        "HP monitor used",
        "LG monitor refurbished",
        "LED display India",
        "cheap monitors India",
    ],
    alternates: {
        canonical: "https://www.maccindia.in/monitors",
    },
    openGraph: {
        title: "Shop Refurbished Monitors & LED Displays | Macc-India",
        description: "Browse certified pre-owned monitors from top brands. Dell, HP, LG & more with warranty.",
        url: "https://www.maccindia.in/monitors",
    },
};

export default function MonitorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
