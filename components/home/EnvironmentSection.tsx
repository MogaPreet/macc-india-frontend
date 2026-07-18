'use client';

import { motion } from 'framer-motion';
import {
    Leaf,
    Recycle,
    Droplets,
    Factory,
    TreeDeciduous,
    Zap,
    Heart,
    Globe,
} from 'lucide-react';
import Link from 'next/link';

const impactStats = [
    {
        icon: Factory,
        value: '70%',
        label: 'Less Carbon Emissions',
        description: 'Compared to manufacturing new laptops',
    },
    {
        icon: Droplets,
        value: '190K',
        label: 'Liters of Water Saved',
        description: 'Per refurbished laptop lifecycle',
    },
    {
        icon: TreeDeciduous,
        value: '50 kg',
        label: 'E-Waste Prevented',
        description: 'Average per refurbished device',
    },
    {
        icon: Zap,
        value: '85%',
        label: 'Energy Reduction',
        description: 'In production process',
    },
];

const benefits = [
    {
        icon: Recycle,
        title: 'Circular Economy',
        description:
            'Every refurbished laptop extends the product lifecycle, reducing demand for raw materials.',
    },
    {
        icon: Globe,
        title: 'Reduced E-Waste',
        description:
            'Electronic waste is growing fast. Choosing refurbished keeps devices out of landfills.',
    },
    {
        icon: Heart,
        title: 'Conscious Consumption',
        description:
            'Premium performance with environmental responsibility — no compromise on quality.',
    },
];

export default function EnvironmentSection() {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-black via-emerald-950/40 to-black">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-24 left-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-14"
                >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-5">
                        <Leaf className="text-white" size={28} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
                        Sustainable Technology
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                        Every Purchase Makes a{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Difference
                        </span>
                    </h2>
                    <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto">
                        Choosing refurbished is smart for your wallet and a step toward a greener
                        planet.
                    </p>
                </motion.div>

                {/* Stats — single column on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 md:mb-16">
                    {impactStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06, duration: 0.4 }}
                                className="rounded-2xl border border-emerald-500/20 bg-white/[0.03] p-5 text-center sm:text-left"
                            >
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto sm:mx-0 mb-3">
                                    <Icon className="text-white" size={20} />
                                </div>
                                <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-white font-semibold text-sm mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-white/40 text-xs leading-relaxed">
                                    {stat.description}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Story + benefits in one hierarchy */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/50 to-teal-950/30 p-6 sm:p-8 md:p-10 mb-10 md:mb-12"
                >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                        The Refurbished Revolution
                    </h3>
                    <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-5 max-w-3xl">
                        Manufacturing a single new laptop generates approximately{' '}
                        <span className="text-emerald-400 font-semibold">300 kg of CO₂</span> and
                        uses over{' '}
                        <span className="text-teal-400 font-semibold">190,000 liters of water</span>
                        . Refurbished cuts that footprint while delivering premium performance.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 px-3 py-1.5 rounded-full text-emerald-300 text-xs font-medium">
                            <Leaf size={12} />
                            Carbon Neutral Goal
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-teal-500/15 px-3 py-1.5 rounded-full text-teal-300 text-xs font-medium">
                            <Recycle size={12} />
                            Zero Waste Initiative
                        </span>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6 sm:gap-5 pt-6 border-t border-emerald-500/15">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={benefit.title} className="text-left">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-3">
                                        <Icon className="text-emerald-400" size={18} />
                                    </div>
                                    <h4 className="text-base font-bold text-white mb-1.5">
                                        {benefit.title}
                                    </h4>
                                    <p className="text-white/45 text-sm leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-white/40 text-sm mb-5">
                        Join thousands of conscious consumers making the switch
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/25"
                    >
                        <Leaf size={18} />
                        Shop Sustainable
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
