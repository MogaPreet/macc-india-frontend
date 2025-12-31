'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/firebase-services';
import { Product } from '@/lib/types';

interface SimilarProductsProps {
    categoryId: string;
    currentProductId: string;
}

export default function SimilarProducts({ categoryId, currentProductId }: SimilarProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSimilarProducts() {
            try {
                const categoryProducts = await getProductsByCategory(categoryId);
                // Filter out current product and limit to 4
                const similar = categoryProducts
                    .filter(p => p.id !== currentProductId)
                    .slice(0, 4);
                setProducts(similar);
            } catch (error) {
                console.error('Error fetching similar products:', error);
            } finally {
                setLoading(false);
            }
        }

        if (categoryId) {
            fetchSimilarProducts();
        } else {
            setLoading(false);
        }
    }, [categoryId, currentProductId]);

    if (loading) {
        return (
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-foreground mb-6">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="neo-card overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                            <div className="p-4 space-y-2">
                                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="mt-16">
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-foreground mb-6"
            >
                You May Also Like
            </motion.h2>

            {/* Mobile: Horizontal Scroll */}
            <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} className="flex-shrink-0 w-64 snap-start" />
                ))}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
        </section>
    );
}

interface ProductCardProps {
    product: Product;
    index: number;
    className?: string;
}

function ProductCard({ product, index, className = '' }: ProductCardProps) {
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={className}
        >
            <Link href={`/product/${product.slug}`}>
                <div className="neo-card overflow-hidden group cursor-pointer h-full">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                        {product.images && product.images.length > 0 ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                        {/* Discount Badge */}
                        {discount > 0 && (
                            <div className="absolute top-2 right-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-accent-orange text-white">
                                    {discount}% OFF
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent-cyan transition-colors">
                            {product.name}
                        </h3>

                        {/* Specs - Processor on first row, RAM & Storage on second */}
                        {product.specs && (
                            <div className="space-y-1 mb-2">
                                {product.specs.processor && (
                                    <div>
                                        <span className="inline-block text-xs px-2 py-0.5 rounded bg-gray-100 text-text-muted truncate max-w-full">
                                            {product.specs.processor}
                                        </span>
                                    </div>
                                )}
                                <div className="flex gap-1">
                                    {product.specs.ram && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-text-muted">
                                            {product.specs.ram}
                                        </span>
                                    )}
                                    {product.specs.storage && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-text-muted">
                                            {product.specs.storage}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-accent-cyan">
                                ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xs text-text-muted line-through">
                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
