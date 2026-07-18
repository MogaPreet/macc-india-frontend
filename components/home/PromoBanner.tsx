'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
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

    if (loading) {
        return (
            <section className="py-16 md:py-24 relative overflow-hidden bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 space-y-3">
                        <div className="inline-block h-8 w-40 bg-white/10 rounded-full animate-pulse" />
                        <div className="h-9 w-64 bg-white/10 rounded-lg animate-pulse mx-auto" />
                        <div className="h-4 w-48 bg-white/5 rounded animate-pulse mx-auto" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
                            >
                                <div className="aspect-[4/3] bg-white/10 animate-pulse" />
                                <div className="p-3 sm:p-4 space-y-2">
                                    <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                                    <div className="h-5 w-20 bg-amber-500/20 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!offer || products.length === 0) return null;

    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-black">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10 md:mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/25">
                        <Sparkles size={14} />
                        Limited Time Offer
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
                        {offer.title}
                    </h2>
                    {offer.subtitle && (
                        <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
                            {offer.subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Mobile: snap carousel without page overflow */}
                <div className="md:hidden -mx-4 px-4">
                    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                className="flex-shrink-0 w-[72vw] max-w-[280px] snap-start"
                            />
                        ))}
                    </div>
                </div>

                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {products.slice(0, 4).map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 min-h-[48px] text-white border border-white/20 hover:border-amber-400/60 hover:text-amber-300 px-7 py-3 rounded-full font-medium transition-all"
                    >
                        View All Products
                        <ArrowRight size={16} />
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className={className}
        >
            <Link href={`/product/${product.slug}`} className="block h-full">
                <div className="group relative h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-amber-400/40 hover:bg-white/[0.06] transition-all duration-400">
                    {discount > 0 && (
                        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[10px] sm:text-xs shadow-lg">
                            {discount}% OFF
                        </div>
                    )}

                    <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                        <Image
                            src={
                                product.images[0] ||
                                'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80'
                            }
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 72vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>

                    <div className="p-3.5 sm:p-4">
                        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-1 group-hover:text-amber-300 transition-colors">
                            {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-base sm:text-lg font-bold text-amber-400">
                                ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                                <span className="text-white/35 text-xs line-through">
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
