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
            <section id="products" className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                        <div>
                            <div className="h-5 w-24 bg-white/10 rounded animate-pulse mb-2"></div>
                            <div className="h-10 w-48 bg-white/10 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                <div className="aspect-[4/3] bg-white/10 animate-pulse"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 w-16 bg-white/10 rounded animate-pulse"></div>
                                    <div className="h-6 w-full bg-white/10 rounded animate-pulse"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-white/10 rounded animate-pulse"></div>
                                        <div className="h-6 w-16 bg-white/10 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
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
            <section id="products" className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-500">No featured products available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="products" className="relative py-20 md:py-28 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
            {/* Ambient glow orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 -right-32 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                >
                    <div>
                        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                            Fresh Drops
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold text-white">
                            Latest Arrivals
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="text-cyan-400 hover:text-white transition-colors font-medium mt-4 md:mt-0"
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
                                <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer h-full hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                                        {product.images && product.images.length > 0 ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                        {/* Condition Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                {product.condition}
                                            </span>
                                        </div>
                                        {/* Discount Badge */}
                                        {product.originalPrice && (
                                            <div className="absolute top-3 right-3">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                                </span>
                                            </div>
                                        )}
                                        {/* Dark gradient overlay at bottom */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                                            {product.name}
                                        </h3>

                                        {/* Specs */}
                                        <div className="space-y-2 mb-4">
                                            {product.specs?.processor && (
                                                <div>
                                                    <span className="inline-block px-2 py-1 rounded-md text-xs bg-white/10 text-gray-300">
                                                        {product.specs.processor}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex gap-2">
                                                {product.specs?.ram && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-white/10 text-gray-300">
                                                        {product.specs.ram}
                                                    </span>
                                                )}
                                                {product.specs?.storage && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-white/10 text-gray-300">
                                                        {product.specs.storage}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-cyan-400">
                                                ₹{product.price.toLocaleString('en-IN')}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through">
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
