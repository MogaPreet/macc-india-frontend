'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Calendar, CheckCircle, XCircle, Package, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const returnSteps = [
    { step: 1, title: 'Initiate Return', description: 'Log in to your account and select the item you wish to return' },
    { step: 2, title: 'Pack the Item', description: 'Securely pack the laptop in its original packaging with all accessories' },
    { step: 3, title: 'Schedule Pickup', description: 'Choose a convenient pickup slot or drop off at our partner location' },
    { step: 4, title: 'Inspection', description: 'Our team inspects the returned item within 48 hours' },
    { step: 5, title: 'Refund', description: 'Refund is processed to your original payment method within 5-7 days' },
];

export default function ReturnsPage() {
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
                            <RefreshCw size={16} />
                            Hassle-Free Returns
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Return & Refund <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Policy</span>
                        </h1>
                        <p className="text-gray-400 flex items-center justify-center gap-2">
                            <Calendar size={16} />
                            Last updated: December 30, 2024
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Quick Info Cards */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid sm:grid-cols-3 gap-6"
                >
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                            <Clock className="text-white" size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">7 Days</h3>
                        <p className="text-gray-500 text-sm">Return Window</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                            <Package className="text-white" size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Free Pickup</h3>
                        <p className="text-gray-500 text-sm">We collect from your doorstep</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                            <RefreshCw className="text-white" size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">5-7 Days</h3>
                        <p className="text-gray-500 text-sm">Refund Processing</p>
                    </div>
                </motion.div>
            </div>

            {/* Return Process */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How Returns Work</h2>
                    <p className="text-gray-500">Simple 5-step process to return your purchase</p>
                </motion.div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 hidden md:block" />

                    <div className="space-y-6">
                        {returnSteps.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0 relative z-10">
                                    {item.step}
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1">
                                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-gray-500">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Policy Details */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Return Policy Details</h2>

                    {/* Eligible */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="text-emerald-500" size={24} />
                            <h3 className="text-lg font-bold text-gray-900">Eligible for Return</h3>
                        </div>
                        <ul className="space-y-2 text-gray-600 ml-9">
                            <li>• Product received is damaged or defective</li>
                            <li>• Product does not match the description on the website</li>
                            <li>• Wrong product delivered</li>
                            <li>• Product has functional issues out of the box</li>
                            <li>• Change of mind within 7 days (product must be unused)</li>
                        </ul>
                    </div>

                    {/* Not Eligible */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="text-red-500" size={24} />
                            <h3 className="text-lg font-bold text-gray-900">Not Eligible for Return</h3>
                        </div>
                        <ul className="space-y-2 text-gray-600 ml-9">
                            <li>• Product damaged due to misuse after delivery</li>
                            <li>• Missing original packaging or accessories</li>
                            <li>• Product with altered serial numbers or labels</li>
                            <li>• Software-related issues (OS, drivers, etc.)</li>
                            <li>• Return request after 7 days from delivery</li>
                        </ul>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={24} />
                            <div>
                                <h3 className="font-bold text-amber-800 mb-2">Important Notes</h3>
                                <ul className="space-y-1 text-amber-700 text-sm">
                                    <li>• Please retain the original packaging until you&apos;re satisfied with the product</li>
                                    <li>• Take photos/videos while unboxing for any damage claims</li>
                                    <li>• Data on returned devices will be erased — please backup before returning</li>
                                    <li>• Refunds will be processed to the original payment method only</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-500 mb-4">Need help with a return?</p>
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
