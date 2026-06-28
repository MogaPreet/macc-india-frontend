'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, XCircle, Wrench, Clock, Phone, Sparkles } from 'lucide-react';
import Link from 'next/link';

const warrantyPlans = [
    {
        name: 'Standard',
        duration: '1 Month',
        price: 'Included',
        tagline: 'Essential protection with every purchase',
        gradient: 'from-slate-600 via-slate-700 to-slate-900',
        glow: 'shadow-slate-900/40',
        accent: 'bg-white/15 text-white',
        button: 'bg-white/15 text-white hover:bg-white/25 border border-white/20',
        features: [
            'Hardware defect coverage',
            'Free repair or replacement',
            'Remote troubleshooting support',
            'Email support',
        ],
    },
    {
        name: 'Extended',
        duration: '6 Months',
        price: '₹2,499',
        tagline: 'Best value for long-term peace of mind',
        gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
        glow: 'shadow-cyan-500/30',
        accent: 'bg-white/20 text-white',
        button: 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-black/20',
        popular: true,
        features: [
            'Hardware defect coverage',
            'Free repair or replacement',
            'Remote troubleshooting support',
            'Email support',
        ],
    },
    {
        name: 'Premium',
        duration: '12 Months',
        price: '₹3,999',
        tagline: 'Maximum coverage for power users',
        gradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
        glow: 'shadow-purple-500/30',
        accent: 'bg-white/15 text-white',
        button: 'bg-white/15 text-white hover:bg-white/25 border border-white/20',
        features: [
            'Hardware defect coverage',
            'Free repair or replacement',
            'Remote troubleshooting support',
            'Email support',
        ],
    },
];

export default function WarrantyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero — pt matches navbar height so no light gap on mobile */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 md:pt-20 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                       
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-10">
                            Warranty <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Protection</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Every laptop comes with our comprehensive warranty. Choose the plan that fits your needs.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Warranty Plans */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 -mt-6 md:-mt-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-3 gap-6 md:gap-8"
                >
                    {warrantyPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className={`relative rounded-3xl overflow-hidden shadow-2xl ${plan.glow} ${
                                plan.popular ? 'md:-translate-y-2 md:scale-[1.03]' : ''
                            }`}
                        >
                            <div className={`relative bg-gradient-to-br ${plan.gradient} p-6 sm:p-8 min-h-full flex flex-col`}>
                                {/* Decorative orbs */}
                                <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                                <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-black/10 rounded-full blur-2xl pointer-events-none" />

                                {plan.popular && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/30">
                                        <Sparkles size={12} />
                                        Most Popular
                                    </div>
                                )}

                                <div className="relative z-10 flex flex-col flex-1">
                                    <div className={`w-14 h-14 rounded-2xl ${plan.accent} backdrop-blur-sm flex items-center justify-center mb-5 border border-white/20`}>
                                        <Shield className="text-white" size={28} />
                                    </div>

                                    <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
                                        {plan.duration} Coverage
                                    </p>
                                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                                    <p className="text-white/70 text-sm mb-6">{plan.tagline}</p>

                                    <div className="mb-6 pb-6 border-b border-white/15">
                                        <span className="text-4xl font-black text-white tracking-tight">
                                            {plan.price}
                                        </span>
                                        {plan.price !== 'Included' && (
                                            <span className="text-white/60 text-sm ml-1">/ plan</span>
                                        )}
                                    </div>

                                    <ul className="space-y-3 mb-8 flex-1">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="text-white/90 flex-shrink-0 mt-0.5" size={18} />
                                                <span className="text-white/85 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`w-full py-3.5 rounded-xl font-semibold transition-all ${plan.button}`}
                                    >
                                        {plan.price === 'Included' ? 'Included with Purchase' : 'Add to Purchase'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Coverage Details */}
            <div className="bg-white border-y border-gray-200 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
                            What&apos;s Covered
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Covered */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <CheckCircle className="text-emerald-500" size={24} />
                                    <h3 className="text-lg font-bold text-gray-900">Covered Under Warranty</h3>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        'Motherboard and chipset failures',
                                        'Display and screen issues',
                                        'Keyboard and trackpad defects',
                                        'Battery degradation beyond 20%',
                                        'Port and connectivity issues',
                                        'Storage drive failures',
                                        'Memory (RAM) defects',
                                        'Cooling system malfunctions',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Not Covered */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <XCircle className="text-red-500" size={24} />
                                    <h3 className="text-lg font-bold text-gray-900">Not Covered</h3>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        'Physical damage (drops, cracks)',
                                        'Liquid damage (spills, submersion)',
                                        'Software issues and viruses',
                                        'Cosmetic wear (scratches, dents)',
                                        'Unauthorized modifications',
                                        'Damage from power surges',
                                        'Loss or theft',
                                        'Consumables (cables, bags)',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Claim Process */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
                        How to Claim Warranty
                    </h2>

                    <div className="grid sm:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                                <Phone className="text-white" size={28} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">1. Contact Support</h3>
                            <p className="text-gray-500 text-sm">Call us or raise a ticket with your order details and issue description</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                                <Wrench className="text-white" size={28} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">2. Diagnosis</h3>
                            <p className="text-gray-500 text-sm">Our technicians will remotely diagnose or arrange pickup for inspection</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                                <Clock className="text-white" size={28} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">3. Resolution</h3>
                            <p className="text-gray-500 text-sm">Repair or replacement completed within 7-10 business days</p>
                        </div>
                    </div>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-500 mb-4">Have a warranty question?</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all"
                    >
                        Contact Support
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
