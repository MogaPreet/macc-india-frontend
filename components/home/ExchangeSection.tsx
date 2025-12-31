'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function ExchangeSection() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Neon Grid Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="absolute inset-0 neon-grid opacity-50"></div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 via-transparent to-accent-blue/10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left max-w-xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-accent-cyan/20 text-accent-cyan px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Smartphone size={16} />
                            Exchange Program
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Exchange your old device.{' '}
                            <span className="gradient-text">Flat ₹5,000 Bonus.</span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-8">
                            Trade in your old laptop and get instant value.
                            We accept devices in any condition - working or not.
                        </p>

                        <Link
                            href="/sell"
                            className="group inline-flex items-center gap-2 gradient-cyan-blue text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
                        >
                            Check Value
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Right - Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 gap-4 md:gap-6"
                    >
                        {[
                            { value: '₹5,000', label: 'Bonus on Exchange' },
                            { value: '24hrs', label: 'Quick Pickup' },
                            { value: '10,000+', label: 'Devices Exchanged' },
                            { value: '100%', label: 'Safe & Secure' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                className="glass-dark rounded-2xl p-6 text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-accent-cyan mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
