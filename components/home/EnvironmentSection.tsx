'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Recycle, Droplets, Factory, TreeDeciduous, Zap, Heart, Globe } from 'lucide-react';

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
        description: 'Every refurbished laptop extends the product lifecycle, reducing the demand for raw materials and minimizing environmental impact.',
    },
    {
        icon: Globe,
        title: 'Reduced E-Waste',
        description: 'Electronic waste is one of the fastest-growing waste streams. By choosing refurbished, you help keep devices out of landfills.',
    },
    {
        icon: Heart,
        title: 'Conscious Consumption',
        description: 'Make a positive impact without compromising on quality. Premium performance meets environmental responsibility.',
    },
];

export default function EnvironmentSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-emerald-950 to-gray-900">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <motion.div
                    style={{ y }}
                    className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                    className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [50, -100]) }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
                />

                {/* Floating Leaves Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-emerald-500/20"
                            initial={{
                                x: Math.random() * 100 + '%',
                                y: -20,
                                rotate: 0,
                                opacity: 0.3
                            }}
                            animate={{
                                y: '120vh',
                                rotate: 360,
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 15 + Math.random() * 10,
                                repeat: Infinity,
                                delay: i * 2,
                                ease: 'linear'
                            }}
                        >
                            <Leaf size={20 + Math.random() * 20} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-6"
                    >
                        <Leaf className="text-white" size={40} />
                    </motion.div>

                    <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                        Sustainable Technology
                    </h2>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Every Purchase Makes a{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Difference
                        </span>
                    </p>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Choosing refurbished isn&apos;t just smart for your wallet — it&apos;s a powerful step towards a greener planet. Here&apos;s how your choice creates real environmental impact.
                    </p>
                </motion.div>

                {/* Impact Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {impactStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:border-emerald-500/30 transition-all duration-500"
                            >
                                {/* Glow Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/5 transition-all duration-500" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="text-white" size={28} />
                                    </div>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-white font-semibold mb-1">{stat.label}</div>
                                    <div className="text-gray-500 text-sm">{stat.description}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Visual Impact Section */}
                <div className="relative mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/20 p-8 md:p-12"
                    >
                        {/* Animated Earth Background */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                                className="w-full h-full rounded-full border-2 border-emerald-500/30"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-8 rounded-full border border-teal-500/30"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-16 rounded-full border border-cyan-500/30"
                            />
                            <div className="absolute inset-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                The Refurbished Revolution
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                Manufacturing a single new laptop generates approximately <span className="text-emerald-400 font-semibold">300 kg of CO₂</span> and uses over <span className="text-teal-400 font-semibold">190,000 liters of water</span>. By choosing refurbished, you&apos;re directly reducing this environmental footprint while getting a premium device at a fraction of the cost.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full text-emerald-300">
                                    <Leaf size={16} />
                                    <span className="text-sm font-medium">Carbon Neutral Goal</span>
                                </div>
                                <div className="flex items-center gap-2 bg-teal-500/20 px-4 py-2 rounded-full text-teal-300">
                                    <Recycle size={16} />
                                    <span className="text-sm font-medium">Zero Waste Initiative</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Benefits Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                                    <Icon className="text-emerald-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-400 mb-6">Join thousands of conscious consumers making the switch</p>
                    <motion.a
                        href="/products"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/25"
                    >
                        <Leaf size={20} />
                        Shop Sustainable
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
