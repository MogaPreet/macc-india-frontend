import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us - Refurbished Laptop Store in Ahmedabad",
    description: "Get in touch with Macc-India for premium refurbished laptops. Visit our showroom in Ahmedabad, Gujarat or call +91 91434 30202. We're here to help!",
    keywords: [
        "contact Macc-India",
        "refurbished laptop store Ahmedabad",
        "laptop showroom Gujarat",
        "buy used laptop near me",
    ],
    alternates: {
        canonical: "https://www.maccindia.in/contact",
    },
    openGraph: {
        title: "Contact Macc-India | Refurbished Laptops Ahmedabad",
        description: "Visit our showroom or get in touch for premium refurbished laptops with warranty.",
        url: "https://www.maccindia.in/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
