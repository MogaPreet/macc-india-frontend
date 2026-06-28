import type { Metadata } from 'next';
import { Suspense } from 'react';
import ListingPageFallback from '@/components/ListingPageFallback';

export const metadata: Metadata = {
    title: 'Laptop Accessories - Macc-India',
    description: 'Browse certified accessories for laptops and desktops. Filter by brand, type, connectivity and price.',
};

export default function AccessoriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Suspense fallback={<ListingPageFallback />}>{children}</Suspense>;
}
