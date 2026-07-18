'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

    if (loading) {
        return (
            <section id="products" className="py-16 md:py-24 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 space-y-2">
                        <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                        <div className="h-9 w-48 bg-white/10 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
                            >
                                <div className="aspect-[4/3] bg-white/10 animate-pulse" />
                                <div className="p-3 sm:p-4 space-y-2">
                                    <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                                    <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return (
            <section id="products" className="py-16 md:py-24 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-white/40">No featured products available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section
            id="products"
            className="relative py-16 md:py-24 bg-black overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 -left-28 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-8 -right-28 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
                >
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2">
                            Fresh Drops
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            Latest Arrivals
                        </h2>
                    </div>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium text-white hover:border-cyan-400/50 hover:text-cyan-300 transition-all self-start sm:self-auto"
                    >
                        View All Products
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06, duration: 0.4 }}
                        >
                            <Link href={`/product/${product.slug}`} className="block h-full">
                                <div className="group h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-cyan-500/35 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-400">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                                        {product.images?.[0] ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 640px) 50vw, 25vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute top-2.5 left-2.5">
                                            <span className="inline-flex px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-black/60 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                                                {product.condition}
                                            </span>
                                        </div>
                                        {product.originalPrice && (
                                            <div className="absolute top-2.5 right-2.5">
                                                <span className="inline-flex px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                                                    {Math.round(
                                                        (1 - product.price / product.originalPrice) *
                                                            100
                                                    )}
                                                    % OFF
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-3 sm:p-4">
                                        <h3 className="text-sm sm:text-base font-semibold text-white mb-2 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                                            {product.name}
                                        </h3>

                                        <div className="hidden sm:flex flex-wrap gap-1.5 mb-3">
                                            {product.specs?.ram && (
                                                <span className="px-2 py-0.5 rounded-md text-[10px] bg-white/10 text-white/50">
                                                    {product.specs.ram}
                                                </span>
                                            )}
                                            {product.specs?.storage && (
                                                <span className="px-2 py-0.5 rounded-md text-[10px] bg-white/10 text-white/50">
                                                    {product.specs.storage}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-1.5 sm:gap-2">
                                            <span className="text-base sm:text-xl font-bold text-cyan-400">
                                                ₹{product.price.toLocaleString('en-IN')}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-[10px] sm:text-xs text-white/35 line-through">
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
