'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, Package, CreditCard, Truck, RefreshCw, Shield, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'orders', name: 'Orders & Shipping', icon: Truck },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'returns', name: 'Returns & Refunds', icon: RefreshCw },
    { id: 'warranty', name: 'Warranty', icon: Shield },
];

const faqs = [
    {
        category: 'general',
        question: 'What is MACC India?',
        answer: 'MACC India is a premium marketplace for certified refurbished laptops. We source, test, and certify pre-owned laptops from top brands like Apple, Dell, HP, Lenovo, and more, offering them at significant savings compared to new devices.',
    },
    {
        category: 'general',
        question: 'Are refurbished laptops reliable?',
        answer: 'Absolutely! All our laptops undergo a rigorous 50+ point inspection and testing process. We replace any worn components, thoroughly clean each device, and ensure they perform like new. Plus, every laptop comes with our warranty for added peace of mind.',
    },
    {
        category: 'general',
        question: 'What condition grades do you offer?',
        answer: 'We offer four condition grades: Like New (near-perfect with minimal signs of use), Excellent (minor cosmetic marks, fully functional), Good (visible wear but fully operational), and Fair (moderate wear, great value option). All grades are fully tested and certified.',
    },
    {
        category: 'orders',
        question: 'How long does shipping take?',
        answer: 'We ship across India within 3-5 business days for metro cities and 5-7 business days for other locations. Express shipping (1-2 days) is available for select pin codes at an additional charge.',
    },
    {
        category: 'orders',
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free standard shipping on all orders above ₹30,000. For orders below this amount, a flat shipping fee of ₹499 applies.',
    },
    {
        category: 'orders',
        question: 'Can I track my order?',
        answer: 'Yes, once your order is shipped, you will receive a tracking number via email and SMS. You can track your package in real-time through our website or the courier partner\'s tracking page.',
    },
    {
        category: 'payment',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets like Paytm and PhonePe. We also offer EMI options through select banks and Buy Now Pay Later services.',
    },
    {
        category: 'payment',
        question: 'Is it safe to pay online?',
        answer: 'Yes, all payments are processed through secure, PCI-DSS compliant payment gateways. Your financial information is encrypted and never stored on our servers.',
    },
    {
        category: 'payment',
        question: 'Do you offer EMI options?',
        answer: 'Yes, we offer No-Cost EMI on select products for 3, 6, and 12-month tenures through partnered banks. Standard EMI options are available on all orders above ₹10,000.',
    },
    {
        category: 'products',
        question: 'Do laptops come with original software?',
        answer: 'All laptops come with a legitimate operating system. Windows laptops include a genuine Windows license, and MacBooks come with the latest compatible macOS pre-installed.',
    },
    {
        category: 'products',
        question: 'What accessories are included?',
        answer: 'Each laptop comes with a compatible charger/power adapter. Original accessories may vary based on the product. Any included accessories are mentioned in the product description.',
    },
    {
        category: 'products',
        question: 'Can I upgrade the RAM or storage?',
        answer: 'Upgradeability depends on the laptop model. Many of our laptops support RAM and storage upgrades. Check the product specifications or contact us for upgrade options for specific models.',
    },
    {
        category: 'returns',
        question: 'What is your return policy?',
        answer: 'We offer a 7-day hassle-free return policy. If you\'re not satisfied with your purchase, you can return it within 7 days of delivery in its original condition for a full refund.',
    },
    {
        category: 'returns',
        question: 'How do I initiate a return?',
        answer: 'To initiate a return, log into your account, go to your orders, and select "Return" on the item. You can also contact our customer support team for assistance.',
    },
    {
        category: 'returns',
        question: 'How long does the refund take?',
        answer: 'Once we receive and inspect the returned item, refunds are processed within 5-7 business days. The amount will be credited to your original payment method.',
    },
    {
        category: 'warranty',
        question: 'What warranty do you provide?',
        answer: 'All our laptops come with a minimum 6-month warranty covering hardware defects. Extended warranty options of 12 and 24 months are available for additional protection.',
    },
    {
        category: 'warranty',
        question: 'What does the warranty cover?',
        answer: 'Our warranty covers hardware defects including motherboard, display, keyboard, trackpad, ports, and battery issues. It does not cover physical damage, water damage, or software issues.',
    },
    {
        category: 'warranty',
        question: 'How do I claim warranty?',
        answer: 'Contact our support team with your order details and a description of the issue. We\'ll guide you through the diagnosis process and arrange for repair or replacement as needed.',
    },
];

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-400 text-sm font-medium mb-6">
                            <MessageCircle size={16} />
                            Support Center
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Questions</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                            Find answers to common questions about our products, orders, and policies. Can&apos;t find what you&apos;re looking for? Contact our support team.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Category Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="lg:w-64 flex-shrink-0"
                    >
                        <div className="bg-white rounded-2xl border border-gray-200 p-4 sticky top-24">
                            <h3 className="font-semibold text-gray-900 mb-4 px-2">Categories</h3>
                            <nav className="space-y-1">
                                {faqCategories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${selectedCategory === category.id
                                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            <span className="font-medium">{category.name}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </motion.aside>

                    {/* FAQ List */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="space-y-4"
                        >
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                                            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                            <ChevronDown
                                                size={20}
                                                className={`text-gray-400 transition-transform flex-shrink-0 ${openQuestion === index ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {openQuestion === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <HelpCircle size={48} className="text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                                    <p className="text-gray-500">Try a different search term or category</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Still have questions?
                    </h2>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">
                        Our support team is always here to help. Reach out to us and we&apos;ll get back to you as soon as possible.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    >
                        <MessageCircle size={18} />
                        Contact Support
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
