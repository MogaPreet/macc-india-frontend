'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft,
    ArrowUpRight,
    ChevronDown,
    Cpu,
    HardDrive,
    Laptop,
    MemoryStick,
    Monitor,
} from 'lucide-react';
import { Category, Product } from '@/lib/types';
import {
    getCategoryAccent,
    getCategoryHeroMedia,
    getCategorySupportLine,
} from '@/lib/category-theme';

type SortKey = 'featured' | 'price-asc' | 'price-desc';

interface CategoryPageClientProps {
    category: Category;
    products: Product[];
    otherCategories: Category[];
}

export default function CategoryPageClient({
    category,
    products,
    otherCategories,
}: CategoryPageClientProps) {
    const accent = getCategoryAccent(category.slug, category.color);
    const heroMedia = getCategoryHeroMedia(category);
    const [sort, setSort] = useState<SortKey>('featured');
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 320], [1, 0.35]);
    const heroY = useTransform(scrollY, [0, 320], [0, 60]);
    const mediaScale = useTransform(scrollY, [0, 400], [1, 1.08]);

    const sortedProducts = useMemo(() => {
        const list = [...products];
        if (sort === 'price-asc') {
            return list.sort((a, b) => a.price - b.price);
        }
        if (sort === 'price-desc') {
            return list.sort((a, b) => b.price - a.price);
        }
        return list.sort((a, b) => {
            if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
            return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }, [products, sort]);

    return (
        <div className="min-h-screen bg-black">
            {/* ─── Cinematic Hero ───────────────────────────────────────── */}
            <div
                ref={heroRef}
                className="relative h-[70vh] min-h-[420px] max-h-[720px] overflow-hidden"
            >
                <motion.div style={{ scale: mediaScale }} className="absolute inset-0">
                    <Image
                        src={heroMedia}
                        alt={category.name}
                        fill
                        className="object-cover"
                        priority
                        unoptimized={Boolean(category.gifUrl)}
                        sizes="100vw"
                    />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black" />
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-25 mix-blend-overlay`}
                />

                <div
                    className="absolute top-16 right-[10%] w-72 h-72 rounded-full blur-3xl pointer-events-none animate-pulse"
                    style={{ background: accent.glowRgba }}
                />
                <div
                    className="absolute bottom-24 left-[8%] w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-70"
                    style={{ background: accent.glowRgba, animationDelay: '1s' }}
                />

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute inset-0 flex items-end pb-16 md:pb-20"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45 }}
                        >
                            <Link
                                href="/categories"
                                className="inline-flex items-center gap-2 text-white/55 hover:text-white transition-colors mb-8 text-sm"
                            >
                                <ArrowLeft size={16} />
                                <span>All categories</span>
                            </Link>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.45 }}
                            className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent`}
                        >
                            Shop the collection
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.55 }}
                            className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase italic tracking-tight leading-[0.95] max-w-4xl"
                        >
                            {category.name}
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            className={`mt-5 h-1 w-24 origin-left rounded-full bg-gradient-to-r ${accent.gradient}`}
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.45 }}
                            className="mt-5 text-white/65 text-base md:text-lg max-w-xl leading-relaxed"
                        >
                            {getCategorySupportLine(category.name, products.length)}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            className="mt-4 text-white/40 text-sm"
                        >
                            {products.length} {products.length === 1 ? 'laptop' : 'laptops'} available
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30"
                >
                    <ChevronDown size={22} />
                </motion.div>
            </div>

            {/* ─── Products ─────────────────────────────────────────────── */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div
                    className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[min(90vw,640px)] h-64 rounded-full blur-3xl opacity-30"
                    style={{ background: accent.glowRgba }}
                />

                {products.length > 0 ? (
                    <>
                        <div className="sticky top-16 md:top-20 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-4 py-3 md:px-5">
                                <p className="text-sm text-white/50">
                                    <span className="text-white font-semibold">
                                        {sortedProducts.length}
                                    </span>{' '}
                                    {sortedProducts.length === 1 ? 'laptop' : 'laptops'}
                                </p>
                                <label className="flex items-center gap-3 text-sm text-white/50">
                                    <span className="whitespace-nowrap">Sort</span>
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value as SortKey)}
                                        className="bg-white/5 border border-white/10 text-white rounded-full px-4 py-2 text-sm outline-none focus:border-white/25 cursor-pointer appearance-none min-w-[160px]"
                                    >
                                        <option value="featured" className="bg-gray-900">
                                            Featured
                                        </option>
                                        <option value="price-asc" className="bg-gray-900">
                                            Price: Low to High
                                        </option>
                                        <option value="price-desc" className="bg-gray-900">
                                            Price: High to Low
                                        </option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.45 }}
                            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
                        >
                            {sortedProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: Math.min(index * 0.04, 0.4),
                                        duration: 0.4,
                                    }}
                                >
                                    <Link href={`/product/${product.slug}`} className="block h-full">
                                        <div
                                            className={`group h-full rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-500 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-xl ${accent.glow}`}
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                                                {product.images?.[0] ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                                                        No Image
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                                                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-medium text-white/90 border border-white/10">
                                                    {product.condition}
                                                </div>
                                                {product.originalPrice ? (
                                                    <div
                                                        className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${accent.gradient} text-[10px] sm:text-xs font-bold text-white shadow-lg`}
                                                    >
                                                        {Math.round(
                                                            (1 - product.price / product.originalPrice) *
                                                                100
                                                        )}
                                                        % OFF
                                                    </div>
                                                ) : null}
                                            </div>

                                            <div className="p-3.5 sm:p-5">
                                                <div
                                                    className={`text-[10px] sm:text-xs font-semibold mb-1 bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent`}
                                                >
                                                    {product.brandName}
                                                </div>
                                                <h3 className="text-sm sm:text-lg font-bold text-white mb-2.5 sm:mb-3 line-clamp-1 group-hover:text-white/90 transition-colors">
                                                    {product.name}
                                                </h3>

                                                <div className="hidden sm:grid grid-cols-2 gap-2 mb-4">
                                                    {product.specs?.processor && (
                                                        <div className="flex items-center gap-1.5 text-xs text-white/45 min-w-0">
                                                            <Cpu size={12} className="flex-shrink-0" />
                                                            <div className="text-scroll-container">
                                                                <span
                                                                    className="text-scroll-content"
                                                                    data-text={product.specs.processor}
                                                                >
                                                                    {product.specs.processor}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {product.specs?.ram && (
                                                        <div className="flex items-center gap-1.5 text-xs text-white/45">
                                                            <MemoryStick size={12} />
                                                            <span>{product.specs.ram}</span>
                                                        </div>
                                                    )}
                                                    {product.specs?.storage && (
                                                        <div className="flex items-center gap-1.5 text-xs text-white/45">
                                                            <HardDrive size={12} />
                                                            <span>{product.specs.storage}</span>
                                                        </div>
                                                    )}
                                                    {product.specs?.screen && (
                                                        <div className="flex items-center gap-1.5 text-xs text-white/45 min-w-0">
                                                            <Monitor
                                                                size={12}
                                                                className="flex-shrink-0"
                                                            />
                                                            <div className="text-scroll-container">
                                                                <span
                                                                    className="text-scroll-content"
                                                                    data-text={product.specs.screen}
                                                                >
                                                                    {product.specs.screen}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-base sm:text-xl font-bold text-white">
                                                        ₹{product.price.toLocaleString('en-IN')}
                                                    </span>
                                                    {product.originalPrice ? (
                                                        <span className="text-xs sm:text-sm text-white/35 line-through">
                                                            ₹
                                                            {product.originalPrice.toLocaleString(
                                                                'en-IN'
                                                            )}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div
                            className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${accent.gradient} opacity-30 flex items-center justify-center mb-6`}
                        >
                            <Laptop size={32} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            No laptops in this category
                        </h3>
                        <p className="text-white/45 mb-8 max-w-sm">
                            Check back soon for new arrivals, or browse the full collection.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
                        >
                            View all products
                            <ArrowUpRight size={16} />
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* ─── Related categories ───────────────────────────────────── */}
            {otherCategories.length > 0 && (
                <section className="border-t border-white/10 py-14 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between gap-4 mb-8">
                            <div>
                                <p
                                    className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent`}
                                >
                                    Keep exploring
                                </p>
                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                    Browse other categories
                                </h2>
                            </div>
                            <Link
                                href="/categories"
                                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                            >
                                View all
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {otherCategories.map((cat, idx) => {
                                const catAccent = getCategoryAccent(cat.slug, cat.color);
                                const media = getCategoryHeroMedia(cat);
                                return (
                                    <motion.div
                                        key={cat.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                                    >
                                        <Link
                                            href={`/category/${cat.slug}`}
                                            className="group relative block h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/10"
                                        >
                                            <Image
                                                src={media}
                                                alt={cat.name}
                                                fill
                                                className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                                                unoptimized={Boolean(cat.gifUrl)}
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${catAccent.gradient}`}
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
                                                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
                                                    {cat.name}
                                                </h3>
                                                <div
                                                    className={`mt-2 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${catAccent.gradient} transition-all duration-500 rounded-full`}
                                                />
                                            </div>
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                                                    <ArrowUpRight size={14} />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
