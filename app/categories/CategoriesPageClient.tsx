'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, ChevronDown, Layers } from 'lucide-react';
import { getCategories } from '@/lib/firebase-services';
import { Category } from '@/lib/types';

// Fallback GIF-like animated placeholder images (Unsplash with movement themes)
const fallbackBySlug: Record<string, string> = {
    'gaming-enthusiast': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    'the-developer': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    'the-student': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    'business-professional': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    'creative-professional': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    'everyday-home-user': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800',
};

const getFallback = (slug: string) =>
    fallbackBySlug[slug] ||
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800';

// Colour accents per category (fallback)
const accentBySlug: Record<string, { from: string; to: string; glow: string }> = {
    'gaming-enthusiast': { from: 'from-purple-500', to: 'to-pink-500', glow: 'shadow-purple-500/40' },
    'the-developer': { from: 'from-cyan-500', to: 'to-blue-500', glow: 'shadow-cyan-500/40' },
    'the-student': { from: 'from-emerald-500', to: 'to-teal-500', glow: 'shadow-emerald-500/40' },
    'business-professional': { from: 'from-amber-500', to: 'to-orange-500', glow: 'shadow-amber-500/40' },
    'creative-professional': { from: 'from-rose-500', to: 'to-pink-400', glow: 'shadow-rose-500/40' },
    'everyday-home-user': { from: 'from-blue-400', to: 'to-indigo-500', glow: 'shadow-blue-500/40' },
};

const getAccent = (slug: string) =>
    accentBySlug[slug] || { from: 'from-cyan-500', to: 'to-blue-500', glow: 'shadow-cyan-500/40' };

export default function CategoriesPageClient() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroY = useTransform(scrollY, [0, 300], [0, 80]);

    useEffect(() => {
        getCategories()
            .then(data => setCategories(data.filter(c => c.isActive).sort((a, b) => (a.order || 0) - (b.order || 0))))
            .finally(() => setLoading(false));
    }, []);

    // Identify the gamer/hero category for the large spotlight card
    const heroCategory = categories.find(c => c.slug.includes('gamer') || c.slug.includes('gaming')) || categories[0];
    const gridCategories = categories.filter(c => c.id !== heroCategory?.id);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 animate-pulse" />
                    <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-cyan-500/30 animate-ping" />
                </div>
                <p className="text-gray-400 font-medium animate-pulse">Loading categories…</p>
                {/* Grid skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl w-full px-6 mt-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">

            {/* ─── Hero Banner ─────────────────────────────────────────── */}
            <div ref={heroRef} className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
                {/* Background — blur from the hero category's GIF */}
                {heroCategory && (
                    <div className="absolute inset-0">
                        <Image
                            src={heroCategory.gifUrl || getFallback(heroCategory.slug)}
                            alt={heroCategory.name}
                            fill
                            className="object-cover opacity-20 scale-110"
                            unoptimized
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                    </div>
                )}

                {/* Ambient glow orbs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    {/* Pill badge */}


                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6"
                    >
                        Shop By{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                            Category
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
                    >
                        Every laptop matched to your lifestyle. Find the perfect refurbished device built for how you work, create, and play.
                    </motion.p>

                    {/* Scroll hint */}
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mt-10 flex justify-center text-gray-600"
                    >
                        <ChevronDown size={24} />
                    </motion.div>
                </motion.div>
            </div>

            {/* ─── Categories Grid ──────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Result count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 mb-10"
                >
                    <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                        <Layers size={16} className="text-cyan-400" />
                    </div>
                    <span className="text-gray-400 text-sm">
                        {categories.length} categories available
                    </span>
                </motion.div>



                {categories.length > 0 && (
                    <>
                        {/* ── Spotlight Hero Card ── */}
                        {heroCategory && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="mb-6"
                            >
                                <Link
                                    href={`/category/${heroCategory.slug}`}
                                    className="relative group block rounded-3xl overflow-hidden border border-white/10 h-[420px] md:h-[520px]"
                                    onMouseEnter={() => setHoveredId(heroCategory.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* BG GIF */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={heroCategory.gifUrl || getFallback(heroCategory.slug)}
                                            alt={heroCategory.name}
                                            fill
                                            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80 opacity-60"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${getAccent(heroCategory.slug).from} ${getAccent(heroCategory.slug).to}`} />
                                    </div>

                                    {/* Spotlight badge */}
                                    <div className="absolute top-6 left-6 z-10">
                                        <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            <Sparkles size={10} className="text-yellow-400" />
                                            Featured
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Shop Now</p>
                                                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tight leading-none mb-3">
                                                    {heroCategory.name}
                                                </h2>
                                                <div className={`h-1 w-16 group-hover:w-40 bg-gradient-to-r ${getAccent(heroCategory.slug).from} ${getAccent(heroCategory.slug).to} transition-all duration-500 rounded-full`} />
                                            </div>
                                            <motion.div
                                                animate={{ scale: hoveredId === heroCategory.id ? 1 : 0.8, opacity: hoveredId === heroCategory.id ? 1 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className={`bg-white text-black p-4 rounded-full shadow-2xl ${getAccent(heroCategory.slug).glow}`}
                                            >
                                                <ArrowUpRight size={28} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* ── Category Grid ── */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {gridCategories.map((category, idx) => {
                                const accent = getAccent(category.slug);
                                const mediaUrl = category.gifUrl || getFallback(category.slug);

                                return (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.07, ease: 'easeOut' }}
                                    >
                                        <Link
                                            href={`/category/${category.slug}`}
                                            className="relative group block rounded-3xl overflow-hidden border border-white/10 h-64 md:h-72"
                                            onMouseEnter={() => setHoveredId(category.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                        >
                                            {/* GIF Background */}
                                            <div className="absolute inset-0 bg-gray-900">
                                                <Image
                                                    src={mediaUrl}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                                                    unoptimized
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                                {/* Hover colour wash */}
                                                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-15 transition-opacity duration-500 ${accent.from} ${accent.to}`} />
                                            </div>

                                            {/* Bottom content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                                <div className="flex items-end justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-xl font-black text-white uppercase tracking-tight truncate mb-2">
                                                            {category.name}
                                                        </h3>
                                                        {/* Animated underline */}
                                                        <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${accent.from} ${accent.to} transition-all duration-500 rounded-full`} />
                                                    </div>
                                                    <motion.div
                                                        animate={{
                                                            scale: hoveredId === category.id ? 1 : 0.7,
                                                            opacity: hoveredId === category.id ? 1 : 0,
                                                            y: hoveredId === category.id ? 0 : 8
                                                        }}
                                                        transition={{ duration: 0.25 }}
                                                        className="ml-4 bg-white text-black p-2.5 rounded-full shadow-xl flex-shrink-0"
                                                    >
                                                        <ArrowUpRight size={20} />
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Top-right "Explore" badge on hover */}
                                            <motion.div
                                                animate={{
                                                    opacity: hoveredId === category.id ? 1 : 0,
                                                    y: hoveredId === category.id ? 0 : -8
                                                }}
                                                transition={{ duration: 0.25 }}
                                                className="absolute top-4 right-4 z-10"
                                            >
                                                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-gradient-to-r ${accent.from} ${accent.to} text-white shadow-lg`}>
                                                    Explore
                                                </span>
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* ── CTA Banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 relative rounded-3xl overflow-hidden border border-white/10 p-10 md:p-16 text-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.12)_0%,_transparent_70%)]" />
                    <div className="relative z-10">
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">Can't decide?</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                            Browse Our Full Collection
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto mb-8">
                            All our laptops are certified refurbished with a warranty and free delivery.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
                        >
                            View All Laptops
                            <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
