'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Gamepad2, Briefcase, GraduationCap, Palette, Code, Laptop } from 'lucide-react';
import Link from 'next/link';
import { getCategories } from '@/lib/firebase-services';
import { Category } from '@/lib/types';

// Fallback icons map
const iconMap: { [key: string]: any } = {
    wallet: Wallet,
    gamepad: Gamepad2,
    briefcase: Briefcase,
    graduation: GraduationCap,
    palette: Palette,
    code: Code,
    laptop: Laptop,
};

export default function CategoriesSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                // Filter only active categories and sort by order
                const activeCategories = data
                    .filter(c => c.isActive)
                    .sort((a, b) => (a.order || 0) - (b.order || 0));
                setCategories(activeCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <section id="categories" className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-gray-800/50 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (categories.length === 0) {
        return null; // Or show a default state
    }

    return (
        <section id="categories" className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>
                {/* Floating Orbs */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-semibold text-accent-cyan uppercase tracking-wider mb-3">
                        Find Your Perfect Match
                    </h2>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Shop by Category
                    </p>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Whether you&apos;re a gamer, student, or professional — we have the perfect refurbished laptop for you.
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => {
                        // Use icon from string if available, else fallback
                        const Icon = iconMap[category.icon?.toLowerCase() || ''] || Laptop;
                        const colorClass = category.color || 'from-cyan-500 to-blue-500';
                        const bgGlow = 'rgba(6, 182, 212, 0.3)';

                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link href={`/category/${category.slug}`}>
                                    <div
                                        className="group relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 cursor-pointer overflow-hidden h-full"
                                    >
                                        {/* Hover Glow Effect */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                            style={{ background: `radial-gradient(circle at center, ${bgGlow}, transparent 70%)` }}
                                        ></div>

                                        <div className="relative z-10">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon size={28} className="text-white" />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                                                {category.name}
                                            </h3>

                                            {/* Price Range */}

                                        </div>

                                        {/* Corner Accent */}
                                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${colorClass} rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`}></div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
