'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { getActivePromoOffer, getProductsByIds } from '@/lib/firebase-services';
import { PromoOffer, Product } from '@/lib/types';

export default function PromoBanner() {
    const [offer, setOffer] = useState<PromoOffer | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const activeOffer = await getActivePromoOffer();
                if (activeOffer) {
                    setOffer(activeOffer);
                    const offerProducts = await getProductsByIds(activeOffer.productIds);
                    setProducts(offerProducts);
                }
            } catch (error) {
                console.error('Error fetching promo offer:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffer();
    }, []);

    // Shimmer skeleton while loading
    if (loading) return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-[#0d0d14] to-gray-900" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-[1] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-900 z-[1] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header shimmer */}
                <div className="text-center mb-12">
                    <div className="inline-block h-8 w-40 bg-white/10 rounded-full animate-pulse mb-4" />
                    <div className="h-10 w-72 bg-white/10 rounded-lg animate-pulse mx-auto mb-3" />
                    <div className="h-5 w-56 bg-white/5 rounded-lg animate-pulse mx-auto" />
                </div>
                {/* Product cards shimmer */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
                            <div className="aspect-[4/3] bg-white/10 animate-pulse" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                                <div className="flex gap-2">
                                    <div className="h-5 w-20 bg-amber-500/20 rounded animate-pulse" />
                                    <div className="h-5 w-16 bg-white/5 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Mobile shimmer - horizontal scroll */}
                <div className="flex md:hidden gap-4 overflow-hidden pl-4">
                    {[1, 2].map(i => (
                        <div key={i} className="flex-shrink-0 w-72 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
                            <div className="aspect-[4/3] bg-white/10 animate-pulse" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                                <div className="flex gap-2">
                                    <div className="h-5 w-20 bg-amber-500/20 rounded animate-pulse" />
                                    <div className="h-5 w-16 bg-white/5 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
    if (!offer || products.length === 0) return null;

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Blended Background — seamlessly continues from HeroSection */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-[#0d0d14] to-gray-900">
                {/* Ambient glow orbs for visual continuity with Hero */}
                <div className="absolute top-10 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
            {/* Top fade — blends from Hero above */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-[1] pointer-events-none" />
            {/* Bottom fade — blends into CategoriesSection below */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-900 z-[1] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-amber-500/30 backdrop-blur-sm">
                        <Sparkles size={16} className="animate-pulse" />
                        Limited Time Offer
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {offer.title}
                    </h2>
                    {offer.subtitle && (
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            {offer.subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Products Grid - Horizontal scroll on mobile, grid on desktop */}
                <div className="relative">
                    {/* Mobile: Horizontal Scroll */}
                    <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide pl-4 -mr-4 pr-4">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                className="flex-shrink-0 w-72 snap-start"
                            />
                        ))}
                    </div>

                    {/* Desktop: Grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/#products"
                        className="inline-flex items-center gap-2 text-white border border-white/30 hover:border-amber-400 hover:text-amber-400 px-6 py-3 rounded-full font-medium transition-all backdrop-blur-sm"
                    >
                        View All Products
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={className}
        >
            <Link href={`/product/${product.slug}`}>
                <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-amber-400/50 transition-all duration-300 h-full">
                    {/* Discount Badge */}
                    {discount > 0 && (
                        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-lg">
                            {discount}% OFF
                        </div>
                    )}

                    {/* Product Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={product.images[0] || 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80'}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
                            {product.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-amber-400">
                                ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                                <span className="text-gray-400 text-xs line-through">
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
