'use client';

import { motion } from 'framer-motion';
import {
    Laptop,
    Monitor,
    Server,
    Package,
    Calendar,
    Headphones,
    Shield,
    BadgePercent,
    Building2,
    Users,
    Presentation,
    Briefcase,
    CheckCircle,
    Phone,
} from 'lucide-react';

// Rental product categories
const rentalCategories = [
    {
        icon: Laptop,
        title: 'Laptops',
        description: 'High-performance laptops for presentations, training sessions, and corporate events.',
        features: ['Latest models available', 'Pre-configured software', 'Bulk orders welcome'],
        gradient: 'from-cyan-500 to-blue-600',
    },
    {
        icon: Monitor,
        title: 'Workstations',
        description: 'Powerful workstations for design, engineering, video editing, and compute-intensive tasks.',
        features: ['High-end graphics cards', 'Multi-monitor support', 'Technical support included'],
        gradient: 'from-purple-500 to-pink-600',
    },
    {
        icon: Server,
        title: 'Desktops',
        description: 'Reliable desktop systems for offices, computer labs, and temporary workspaces.',
        features: ['Cost-effective bulk rental', 'Easy setup & teardown', 'Network-ready'],
        gradient: 'from-orange-500 to-amber-600',
    },
    {
        icon: Package,
        title: 'Complete Systems',
        description: 'Full setup packages with monitors, keyboards, mice, and all necessary accessories.',
        features: ['All-inclusive packages', 'Professional installation', 'End-to-end support'],
        gradient: 'from-emerald-500 to-teal-600',
    },
];

// Why choose us features
const features = [
    {
        icon: Calendar,
        title: 'Flexible Terms',
        description: 'Daily, weekly, or monthly rentals to suit your needs',
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Round-the-clock technical assistance for peace of mind',
    },
    {
        icon: Shield,
        title: 'Quality Equipment',
        description: 'Well-maintained, certified devices ready to perform',
    },
    {
        icon: BadgePercent,
        title: 'Best Rates',
        description: 'Competitive pricing with special bulk discounts',
    },
];

// Use cases
const useCases = [
    {
        icon: Building2,
        title: 'Corporate Events',
        description: 'Conferences, seminars, and annual meetings with professional IT setup.',
    },
    {
        icon: Presentation,
        title: 'Exhibitions',
        description: 'Trade shows and product demos with stunning display solutions.',
    },
    {
        icon: Users,
        title: 'Training Programs',
        description: 'Workshops and skill development sessions with pre-configured systems.',
    },
    {
        icon: Briefcase,
        title: 'Short-term Projects',
        description: 'Temporary offices and project-based requirements.',
    },
];

export default function RentalsPage() {
    const whatsappMessage = encodeURIComponent(
        `Hi! I'm interested in renting IT equipment for my event/organization. Please share more details about your rental services.`
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 neon-grid opacity-30" />

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6"
                        >
                            <Package size={16} />
                            IT Equipment Rental Solutions
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                        >
                            Rent Premium IT Equipment{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                For Your Events
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10"
                        >
                            From corporate conferences to trade shows—get high-quality laptops, workstations,
                            and complete systems on flexible rental terms with 24/7 support.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <a
                                href={`https://wa.me/919143430202?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp Us for Rentals
                            </a>
                            <a
                                href="tel:+919143430202"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all"
                            >
                                <Phone size={20} />
                                Call: +91 91434 30202
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
            </div>

            {/* Rental Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What We <span className="gradient-text">Offer</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose from our wide range of IT equipment available for rent
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rentalCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <category.icon className="text-white" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                            <ul className="space-y-2">
                                {category.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                        <CheckCircle size={14} className="text-emerald-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Choose <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Macc-India</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Your trusted partner for IT equipment rentals in Gujarat
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="text-white" size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Use Cases Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Perfect For <span className="gradient-text">Every Occasion</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our rental solutions cater to a wide range of business needs
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={useCase.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all duration-300 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mx-auto mb-4">
                                <useCase.icon className="text-cyan-600" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                            <p className="text-gray-600 text-sm">{useCase.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* WhatsApp CTA Section */}
            <div id="inquiry" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                            <Phone size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Get Started?</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                            Contact us on WhatsApp to discuss your rental requirements. Our team will help you find the perfect IT equipment for your event.
                        </p>
                        <a
                            href={`https://wa.me/919143430202?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105"
                        >
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp Us Now
                        </a>
                        <p className="text-gray-500 text-sm mt-6">
                            Or call us directly at <a href="tel:+919143430202" className="text-cyan-400 hover:underline">+91 91434 30202</a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
