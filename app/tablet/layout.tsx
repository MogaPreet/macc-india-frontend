import type { Metadata } from 'next';
import { Suspense } from 'react';
import ListingPageFallback from '@/components/ListingPageFallback';

export const metadata: Metadata = {
    title: 'Tablets & iPads - Macc-India',
    description: 'Browse certified refurbished tablets and iPads. Filter by brand, storage, screen size, chip and price.',
};

export default function TabletLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Suspense fallback={<ListingPageFallback />}>{children}</Suspense>;
}
