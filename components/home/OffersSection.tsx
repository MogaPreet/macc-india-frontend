'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/firebase-services';

interface DisplayDeal {
    id: string;
    title: string;
    discount: string;
    originalPrice: string;
    salePrice: string;
    image: string;
    gradient: string;
    slug: string;
}

const gradients = [
    'from-violet-600 to-purple-700',
    'from-cyan-600 to-blue-700',
    'from-amber-500 to-orange-600',
];

export default function OffersSection() {
    const [deals, setDeals] = useState<DisplayDeal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const products = await getProducts();

                const productsWithDiscounts = products
                    .filter((p) => p.originalPrice && p.originalPrice > p.price)
                    .map((p) => {
                        const discountValue = p.originalPrice! - p.price;
                        const discountPercentage = Math.round(
                            (discountValue / p.originalPrice!) * 100
                        );
                        return { ...p, discountPercentage };
                    })
                    .sort((a, b) => b.discountPercentage - a.discountPercentage)
                    .slice(0, 3);

                const formattedDeals: DisplayDeal[] = productsWithDiscounts.map((p, index) => ({
                    id: p.id,
                    title: p.name,
                    discount: `${p.discountPercentage}% OFF`,
                    originalPrice: `₹${p.originalPrice?.toLocaleString()}`,
                    salePrice: `₹${p.price.toLocaleString()}`,
                    image:
                        p.images[0] ||
                        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80',
                    gradient: gradients[index % gradients.length],
                    slug: p.slug,
                }));

                setDeals(formattedDeals);
            } catch (error) {
                console.error('Error fetching best deals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center bg-black">
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
                <p className="text-white/40 text-sm">Finding the best deals for you...</p>
            </div>
        );
    }

    if (deals.length === 0) return null;

    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-black">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 neon-grid opacity-[0.06]" />
                <div className="absolute top-24 left-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-16 right-8 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
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
                        Best Deals
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
                        Unbeatable{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Prices
                        </span>
                    </h2>
                    <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto">
                        Premium refurbished laptops at prices you won&apos;t find anywhere else.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                    {deals.map((deal, index) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <Link href={`/product/${deal.slug}`} className="block h-full group">
                                <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/25 transition-all duration-400">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={deal.image}
                                            alt={deal.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        <div
                                            className={`absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full bg-gradient-to-r ${deal.gradient} text-white font-bold text-xs shadow-lg`}
                                        >
                                            {deal.discount}
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-5">
                                        <h3 className="text-base sm:text-lg font-bold text-white mb-3 line-clamp-1">
                                            {deal.title}
                                        </h3>

                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span
                                                className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${deal.gradient} bg-clip-text text-transparent`}
                                            >
                                                {deal.salePrice}
                                            </span>
                                            <span className="text-white/35 line-through text-sm">
                                                {deal.originalPrice}
                                            </span>
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 group-hover:text-white transition-colors min-h-[44px]">
                                            Shop Now
                                            <ArrowRight
                                                size={14}
                                                className="group-hover:translate-x-0.5 transition-transform"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 min-h-[48px] text-white border border-white/20 hover:border-cyan-400/50 hover:text-cyan-300 px-7 py-3 rounded-full font-medium transition-all"
                    >
                        View All Deals
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
