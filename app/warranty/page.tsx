'use client';

import { motion } from 'framer-motion';
import { Shield, Calendar, CheckCircle, XCircle, Wrench, Clock, Phone } from 'lucide-react';
import Link from 'next/link';

const warrantyPlans = [
    {
        name: 'Standard',
        duration: '6 Months',
        price: 'Included',
        color: 'from-gray-500 to-gray-600',
        features: [
            'Hardware defect coverage',
            'Free repair or replacement',
            'Remote troubleshooting support',
            'Email support',
        ],
    },
    {
        name: 'Extended',
        duration: '12 Months',
        price: '₹2,999',
        color: 'from-cyan-500 to-blue-600',
        popular: true,
        features: [
            'Everything in Standard',
            'Accidental damage protection',
            'Priority phone support',
            'Free pickup & delivery',
            'Battery replacement (once)',
        ],
    },
    {
        name: 'Premium',
        duration: '24 Months',
        price: '₹4,999',
        color: 'from-purple-500 to-pink-600',
        features: [
            'Everything in Extended',
            'No-questions-asked replacement',
            'On-site support (select cities)',
            '24/7 dedicated support line',
            'Free annual maintenance',
            'Loaner laptop during repairs',
        ],
    },
];

export default function WarrantyPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-400 text-sm font-medium mb-6">
                            <Shield size={16} />
                            Peace of Mind
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Warranty <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Protection</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Every laptop comes with our comprehensive warranty. Choose the plan that fits your needs.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Warranty Plans */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {warrantyPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className={`relative bg-white rounded-2xl border ${plan.popular ? 'border-cyan-300 shadow-xl shadow-cyan-500/10' : 'border-gray-200'
                                } p-8`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                                <Shield className="text-white" size={28} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                            <p className="text-gray-500 mb-4">{plan.duration} Coverage</p>

                            <div className="mb-6">
                                <span className={`text-3xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                                    {plan.price}
                                </span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {plan.price === 'Included' ? 'Included with Purchase' : 'Add to Purchase'}
                            </button>
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
