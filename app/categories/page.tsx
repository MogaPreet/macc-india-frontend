import type { Metadata } from 'next';
import CategoriesPageClient from './CategoriesPageClient';

export const metadata: Metadata = {
    title: 'Shop By Category – Macc-India | Refurbished Laptops',
    description: 'Browse our curated refurbished laptop collections by user type — Gaming, Developer, Student, Business, Creative, and more. Premium quality, unbeatable prices.',
    keywords: [
        'refurbished laptops India',
        'gaming laptop refurbished',
        'student laptop deal',
        'business laptop refurbished',
        'developer laptop India',
        'buy used laptop India',
    ],
    alternates: {
        canonical: 'https://www.maccindia.in/categories',
    },
    openGraph: {
        title: 'Shop By Category – Macc-India',
        description: 'Find your perfect refurbished laptop by category. Gaming, Student, Business, Creative and more.',
        url: 'https://www.maccindia.in/categories',
        type: 'website',
    },
};

export default function CategoriesPage() {
    return <CategoriesPageClient />;
}
