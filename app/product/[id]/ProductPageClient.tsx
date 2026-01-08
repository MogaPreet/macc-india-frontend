'use client';

import { Product } from '@/lib/types';
import ProductImage from '@/components/product/ProductImage';
import ProductDetails from '@/components/product/ProductDetails';
import InquiryForm from '@/components/product/InquiryForm';
import SimilarProducts from '@/components/product/SimilarProducts';

interface ProductPageClientProps {
    product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Sticky Image Gallery */}
                    <ProductImage images={product.images || []} alt={product.name} youtubeUrl={product.youtubeUrl} />

                    {/* Right Column - Scrollable Details */}
                    <div className="space-y-8">
                        <ProductDetails product={product} />
                        <InquiryForm
                            productId={product.id}
                            productName={product.name}
                            productSlug={product.slug}
                            productSpecs={product.specs}
                        />
                    </div>
                </div>

                {/* Similar Products Section */}
                {product.categoryId && (
                    <SimilarProducts
                        categoryId={product.categoryId}
                        currentProductId={product.id}
                    />
                )}
            </div>
        </div>
    );
}
