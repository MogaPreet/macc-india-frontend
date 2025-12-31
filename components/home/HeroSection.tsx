'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Recycle, Award, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
    { icon: Shield, value: '12 Month', label: 'Warranty' },
    { icon: Recycle, value: '100%', label: 'Eco-Friendly' },
    { icon: Award, value: '10K+', label: 'Happy Customers' },
];

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>

                {/* Animated gradient orbs */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 -right-32 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl"
                />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Premium Quality Guaranteed
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                        >
                            <span className="text-white">Refurbished.</span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Reimagineered.
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                        >
                            Experience premium tech without the premium price. Every laptop goes through
                            <span className="text-white font-medium"> rigorous quality checks </span>
                            before reaching you.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
                        >
                            <Link
                                href="/#products"
                                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                            >
                                Explore Collection
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/#categories"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
                            >
                                Browse Categories
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-wrap gap-6 justify-center lg:justify-start"
                        >
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                            <Icon size={20} className="text-cyan-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">{stat.value}</p>
                                            <p className="text-gray-500 text-sm">{stat.label}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Right Content - Floating MacBook */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative"
                    >
                        {/* Glow behind laptop */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl scale-90"></div>

                        {/* Main laptop image */}
                        <motion.div
                            animate={{
                                y: [-10, 10, -10],
                                rotateY: [-2, 2, -2],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
                                <Image
                                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=90"
                                    alt="Premium MacBook"
                                    fill
                                    priority
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>

                            {/* Floating badges around laptop */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-500/30"
                            >
                                Save 40%
                            </motion.div>

                            <motion.div
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-10 -left-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 shadow-lg"
                            >
                                ✓ Like New Condition
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-gray-500"
                >
                    <span className="text-xs uppercase tracking-wider">Scroll</span>
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
}
