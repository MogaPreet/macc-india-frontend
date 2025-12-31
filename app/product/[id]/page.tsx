'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/firebase-services';
import { Product } from '@/lib/types';
import ProductImage from '@/components/product/ProductImage';
import ProductDetails from '@/components/product/ProductDetails';
import InquiryForm from '@/components/product/InquiryForm';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

// Loading skeleton component
function ProductSkeleton() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image skeleton */}
                    <div className="lg:sticky lg:top-24 h-fit space-y-4">
                        <div className="neo-card overflow-hidden bg-gray-100 p-8">
                            <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                        <div className="flex gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-20 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                    {/* Details skeleton */}
                    <div className="space-y-6">
                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-14 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-40 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductPage({ params }: ProductPageProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [slug, setSlug] = useState<string | null>(null);

    // Resolve params first
    useEffect(() => {
        params.then((p) => setSlug(p.id));
    }, [params]);

    // Fetch product when slug is available
    useEffect(() => {
        if (!slug) return;

        async function fetchProduct() {
            try {
                const data = await getProductBySlug(slug!);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    if (loading) {
        return <ProductSkeleton />;
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Sticky Image Gallery */}
                    <ProductImage images={product.images || []} alt={product.name} />

                    {/* Right Column - Scrollable Details */}
                    <div className="space-y-8">
                        <ProductDetails product={product} />
                        <InquiryForm
                            productId={product.id}
                            productName={product.name}
                            productSlug={product.slug}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
