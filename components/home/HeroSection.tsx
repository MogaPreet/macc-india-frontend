'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Recycle, Award, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FestivalOverlay from '@/components/FestivalOverlay';

const stats = [
    { icon: Shield, value: '12 Month', label: 'Warranty' },
    { icon: Recycle, value: '100%', label: 'Eco-Friendly' },
    { icon: Award, value: '10K+', label: 'Happy Customers' },
];

export default function HeroSection() {
    return (
        <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-black">
            <FestivalOverlay />

            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/80 via-gray-950 to-black" />
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-16 -left-24 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-cyan-500/25 to-blue-500/20 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                    animate={{ x: [0, -28, 0], y: [0, 36, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-24 -right-28 w-80 h-80 md:w-[420px] md:h-[420px] bg-gradient-to-r from-purple-500/20 to-pink-500/15 rounded-full blur-3xl pointer-events-none"
                />
            </div>

            <div className="relative z-10 flex-1 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 md:py-28">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="text-center lg:text-left order-2 lg:order-1">
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45 }}
                                className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-400 mb-4"
                            >
                                Macc-India
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12, duration: 0.55 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-5"
                            >
                                <span className="text-white">Refurbished.</span>
                                <br />
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Reimagineered.
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.5 }}
                                className="text-white/55 text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
                            >
                                Premium certified laptops — tested, warrantied, and priced to last.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.5 }}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                            >
                                <Link
                                    href="/rentals"
                                    className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-7 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-cyan-500/25"
                                >
                                    Rent Now
                                    <ArrowRight size={18} />
                                </Link>
                                <Link
                                    href="/categories"
                                    className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/5 border border-white/15 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all"
                                >
                                    Browse Categories
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="relative order-1 lg:order-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/15 to-pink-500/10 rounded-full blur-3xl scale-90 pointer-events-none" />
                            <motion.div
                                animate={{ y: [-8, 8, -8] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative aspect-[4/3] w-full max-w-md mx-auto"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=90"
                                    alt="Premium refurbished MacBook"
                                    fill
                                    priority
                                    className="object-contain drop-shadow-2xl"
                                    sizes="(max-width: 1024px) 90vw, 480px"
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Trust strip — below primary hero composition on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.5 }}
                        className="mt-12 md:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto lg:mx-0 lg:max-w-xl"
                    >
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-3 sm:px-4 sm:py-3"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Icon size={16} className="text-cyan-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-bold text-xs sm:text-sm truncate">
                                            {stat.value}
                                        </p>
                                        <p className="text-white/40 text-[10px] sm:text-xs truncate">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="flex flex-col items-center gap-1 text-white/30"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                    <ChevronDown size={18} />
                </motion.div>
            </motion.div>
        </section>
    );
}
