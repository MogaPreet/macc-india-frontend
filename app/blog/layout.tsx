import { Suspense } from 'react';
import ListingPageFallback from '@/components/ListingPageFallback';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Suspense fallback={<ListingPageFallback />}>{children}</Suspense>;
}
