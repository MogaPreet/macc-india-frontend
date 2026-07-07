import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Premium Refurbished Laptops in Ahmedabad',
    description:
        'Learn about Macc-India — Ahmedabad\'s trusted dealer for certified refurbished laptops, desktops, and IT equipment. Quality guaranteed, sustainable tech, and 12-month warranty.',
    keywords: [
        'about Macc-India',
        'refurbished laptop dealer Ahmedabad',
        'certified pre-owned laptops Gujarat',
        'sustainable tech India',
        'MACC India story',
    ],
    alternates: {
        canonical: 'https://www.maccindia.in/about',
    },
    openGraph: {
        title: 'About Macc-India | Premium Refurbished Laptops',
        description:
            'Discover our mission to make premium technology accessible, sustainable, and reliable for every Indian.',
        url: 'https://www.maccindia.in/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
