'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/firebase-services';
import { Product } from '@/lib/types';

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

                // Calculate discounts and sort
                const productsWithDiscounts = products
                    .filter(p => p.originalPrice && p.originalPrice > p.price)
                    .map(p => {
                        const discountValue = p.originalPrice! - p.price;
                        const discountPercentage = Math.round((discountValue / p.originalPrice!) * 100);
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
                    image: p.images[0] || 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80',
                    gradient: gradients[index % gradients.length],
                    slug: p.slug
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
            <div className="py-24 flex flex-col items-center justify-center bg-gray-900">
                <Loader2 className="w-12 h-12 text-accent-cyan animate-spin mb-4" />
                <p className="text-gray-400">Finding the best deals for you...</p>
            </div>
        );
    }

    if (deals.length === 0) return null;

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="absolute inset-0 neon-grid opacity-20"></div>
                {/* Floating Orbs */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-amber-500/30">
                        <Sparkles size={16} className="animate-pulse" />
                        Best Deals
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Unbeatable <span className="gradient-text">Prices</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Premium refurbished laptops at prices you won&apos;t find anywhere else.
                    </p>
                </motion.div>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {deals.map((deal, index) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className="group"
                        >
                            <Link href={`/product/${deal.slug}`}>
                                <div className="relative bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-500 h-full">
                                    {/* Discount Badge */}
                                    <div className={`absolute top-4 left-4 z-20 px-4 py-2 rounded-full bg-gradient-to-r ${deal.gradient} text-white font-bold text-sm shadow-lg`}>
                                        {deal.discount}
                                    </div>

                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={deal.image}
                                            alt={deal.title}
                                            fill
                                            className="object-cover transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 -mt-16 relative z-10">
                                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">
                                            {deal.title}
                                        </h3>

                                        {/* Pricing */}
                                        <div className="flex items-baseline gap-3 mb-4">
                                            <span className={`text-2xl font-bold bg-gradient-to-r ${deal.gradient} bg-clip-text text-transparent`}>
                                                {deal.salePrice}
                                            </span>
                                            <span className="text-gray-500 line-through text-sm">
                                                {deal.originalPrice}
                                            </span>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors text-sm font-medium">
                                            Shop Now
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/#products"
                        className="inline-flex items-center gap-2 text-white border border-gray-600 hover:border-accent-cyan hover:text-accent-cyan px-8 py-3 rounded-full font-medium transition-colors"
                    >
                        View All Deals
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
