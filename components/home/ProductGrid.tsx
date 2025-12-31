'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/firebase-services';
import { Product } from '@/lib/types';

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const featuredProducts = await getFeaturedProducts(4);
                setProducts(featuredProducts);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Loading skeleton
    if (loading) {
        return (
            <section id="products" className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                        <div>
                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="neo-card overflow-hidden">
                                <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // No products state
    if (products.length === 0) {
        return (
            <section id="products" className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-text-muted">No featured products available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="products" className="py-16 md:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                >
                    <div>
                        <h2 className="text-sm font-semibold text-accent-cyan uppercase tracking-wider mb-2">
                            Fresh Drops
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold text-foreground">
                            Latest Arrivals
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="text-accent-blue hover:text-accent-cyan transition-colors font-medium mt-4 md:mt-0"
                    >
                        View All Products →
                    </Link>
                </motion.div>

                {/* Products Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link href={`/product/${product.slug}`}>
                                <div className="neo-card overflow-hidden group cursor-pointer h-full">
                                    {/* Image Container */}
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
                                        {/* Condition Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-green/10 text-accent-green">
                                                {product.condition}
                                            </span>
                                        </div>
                                        {/* Discount Badge */}
                                        {product.originalPrice && (
                                            <div className="absolute top-3 right-3">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-accent-orange text-white">
                                                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-accent-cyan transition-colors">
                                            {product.name}
                                        </h3>

                                        {/* Specs - Processor on first row, RAM & Storage on second */}
                                        <div className="space-y-2 mb-4">
                                            {product.specs?.processor && (
                                                <div>
                                                    <span className="inline-block px-2 py-1 rounded-md text-xs bg-gray-100 text-text-secondary truncate max-w-full">
                                                        {product.specs.processor}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex gap-2">
                                                {product.specs?.ram && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-text-secondary">
                                                        {product.specs.ram}
                                                    </span>
                                                )}
                                                {product.specs?.storage && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-text-secondary">
                                                        {product.specs.storage}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-accent-cyan">
                                                ₹{product.price.toLocaleString('en-IN')}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-sm text-text-muted line-through">
                                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
