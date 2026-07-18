'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/firebase-services';
import { Category } from '@/lib/types';
import {
    getCategoryAccent,
    getCategoryHeroMedia,
} from '@/lib/category-theme';

export default function CategoriesSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                const activeCategories = data
                    .filter((c) => c.isActive)
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
            <section className="relative bg-black py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 space-y-3">
                        <div className="h-10 w-64 bg-white/10 rounded-lg animate-pulse mx-auto" />
                        <div className="h-4 w-48 bg-white/5 rounded animate-pulse mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        <div className="md:col-span-2 md:row-span-2 min-h-[220px] md:min-h-[400px] rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
                        <div className="min-h-[160px] rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
                        <div className="min-h-[160px] rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
                    </div>
                </div>
            </section>
        );
    }

    if (categories.length === 0) return null;

    const gamerCategory = categories.find(
        (c) => c.slug.includes('gamer') || c.slug.includes('gaming')
    );
    const heroCategory = gamerCategory || categories[0];
    const otherCategories = categories.filter((c) => c.id !== heroCategory.id);
    const heroAccent = getCategoryAccent(heroCategory.slug, heroCategory.color);

    return (
        <section className="relative bg-black pb-16 md:pb-24 overflow-hidden">
            <div className="absolute top-20 -left-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-12"
                >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-3">
                        Collections
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-3">
                        Shop By{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                            Category
                        </span>
                    </h2>
                    <p className="text-white/45 max-w-xl mx-auto text-sm md:text-base">
                        Curated collections matched to how you work, create, and play.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:auto-rows-[180px]">
                    <Link
                        href={`/category/${heroCategory.slug}`}
                        className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden border border-white/10 min-h-[240px] md:min-h-0"
                    >
                        <div className="absolute inset-0 bg-gray-900">
                            <Image
                                src={getCategoryHeroMedia(heroCategory)}
                                alt={heroCategory.name}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                                unoptimized={Boolean(heroCategory.gifUrl)}
                                sizes="(max-width: 768px) 100vw, 66vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                            <div
                                className={`absolute inset-0 bg-gradient-to-br opacity-20 ${heroAccent.gradient}`}
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                            <div className="flex justify-between items-end gap-4">
                                <div className="min-w-0">
                                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 uppercase italic tracking-tight leading-none">
                                        {heroCategory.name}
                                    </h3>
                                    <p className="text-white/55 text-sm max-w-sm line-clamp-2 hidden sm:block">
                                        High-performance refurbished laptops for this lifestyle.
                                    </p>
                                    <div
                                        className={`mt-3 h-1 w-16 group-hover:w-32 bg-gradient-to-r ${heroAccent.gradient} transition-all duration-500 rounded-full`}
                                    />
                                </div>
                                <span className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg">
                                    <ArrowUpRight size={20} />
                                </span>
                            </div>
                        </div>
                    </Link>

                    {otherCategories.map((category, idx) => {
                        const isLast = idx === otherCategories.length - 1;
                        const spanClass =
                            isLast && otherCategories.length % 3 === 2 ? 'md:col-span-2' : '';
                        const accent = getCategoryAccent(category.slug, category.color);

                        return (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className={`relative group rounded-3xl overflow-hidden border border-white/10 min-h-[160px] sm:min-h-[180px] ${spanClass}`}
                            >
                                <div className="absolute inset-0 bg-gray-900">
                                    <Image
                                        src={getCategoryHeroMedia(category)}
                                        alt={category.name}
                                        fill
                                        className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                                        unoptimized={Boolean(category.gifUrl)}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity ${accent.gradient}`}
                                    />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                                    <div className="min-w-0">
                                        <h3 className="text-base sm:text-xl font-bold text-white uppercase truncate">
                                            {category.name}
                                        </h3>
                                        <div
                                            className={`mt-2 h-0.5 w-10 group-hover:w-full bg-gradient-to-r ${accent.gradient} transition-all duration-500 rounded-full`}
                                        />
                                    </div>
                                    <span className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black">
                                        <ArrowUpRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
