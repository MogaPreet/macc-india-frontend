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
                    {/* Left Column - Sticky Image Gallery & Description */}
                    <div className="lg:sticky lg:top-24 h-fit space-y-8">
                        <ProductImage images={product.images || []} alt={product.name} youtubeUrl={product.youtubeUrl} />
                        
                        {/* Description - Hidden on mobile, visible on desktop/tablet */}
                        {product.description && (
                            <div className="hidden md:block p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">About this Product</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}
                    </div>

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
                {product.categoryIds && product.categoryIds.length > 0 && (
                    <SimilarProducts
                        categoryIds={product.categoryIds}
                        currentProductId={product.id}
                    />
                )}
            </div>
        </div>
    );
}
