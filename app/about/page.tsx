'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle,
    Leaf,
    MapPin,
    Shield,
    Users,
} from 'lucide-react';

const team = [
    {
        name: 'Himanshu',
        role: 'Founder & Owner',
        photo: '/himanshu.jpeg',
    },
    {
        name: 'Harshal',
        role: 'Branch Manager',
        photo: '/harshal.jpeg',
        imageClassName: 'object-cover object-[50%_10%] scale-[1.65] origin-[50%_15%]',
    },
    {
        name: 'Ankit',
        role: 'Corporate',
        photo: '/ankit.jpeg',
    },
];

const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '12 Mo', label: 'Warranty Available' },
    { value: '40+', label: 'Point Quality Check' },
    { value: '2019', label: 'Serving Since' },
];

const values = [
    {
        title: 'Transparency',
        description: 'Honest grading, clear specs, and no hidden surprises on every device we sell.',
    },
    {
        title: 'Quality',
        description: 'Rigorous multi-point inspection covering performance, battery, display, and build.',
    },
    {
        title: 'Support',
        description: 'Guidance before purchase and reliable help after — from inquiry to warranty.',
    },
    {
        title: 'Sustainability',
        description: 'Refurbished tech that extends device life and keeps e-waste out of landfills.',
    },
];

const processSteps = [
    {
        title: 'Sourced responsibly',
        description: 'Devices from corporate refresh cycles, verified trade-ins, and trusted partners.',
    },
    {
        title: '40+ point inspection',
        description: 'CPU, RAM, storage, battery, display, keyboard, ports, and more — all tested.',
    },
    {
        title: 'Certified and graded',
        description: 'Each device is graded and listed with full transparency on condition and specs.',
    },
    {
        title: 'Delivered with care',
        description: 'Secure packaging, warranty options, and ongoing support after your purchase.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-400 text-sm font-medium mb-6">
                            <Users size={16} />
                            About Macc-India
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                            Premium Refurbished Tech,{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Built on Trust
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            Based in Ahmedabad, we help students, professionals, and businesses across India
                            access quality refurbished laptops, desktops, and IT equipment — at fair prices,
                            with warranty and honest service.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-b border-gray-200 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-20">
                {/* Our story */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <div className="space-y-5 text-gray-600 leading-relaxed">
                        <p>
                            Macc-India started with a straightforward idea: great technology should not be out of
                            reach for most people. From our showroom at Solaris Business Hub in Ahmedabad, we
                            built a refurbishment process focused on reliability, clarity, and value.
                        </p>
                        <p>
                            Today we offer certified pre-owned MacBooks, Dell, HP, Lenovo, and more — along with
                            desktops, monitors, tablets, accessories, and IT rentals. Every device goes through
                            detailed testing before it reaches a customer.
                        </p>
                    </div>
                </motion.section>

                {/* Team */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Meet Our Team</h2>
                    <p className="text-gray-600 mb-10 leading-relaxed">
                        The people behind Macc-India — building trust in refurbished technology every day.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="text-center">
                                <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                                    <Image
                                        src={member.photo}
                                        alt={member.name}
                                        fill
                                        className={member.imageClassName ?? 'object-cover'}
                                        sizes="144px"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-cyan-700 font-medium mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Mission & vision */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Make premium refurbished technology affordable, reliable, and environmentally
                            responsible for every Indian customer.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Become India&apos;s most trusted name in sustainable tech — where quality, honesty,
                            and long-term value come first.
                        </p>
                    </div>
                </motion.section>

                {/* Values */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">What We Stand For</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        These principles guide how we source, inspect, sell, and support every product.
                    </p>
                    <div className="space-y-4">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="bg-white rounded-xl border border-gray-200 p-5 md:p-6"
                            >
                                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Process */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">How We Work</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        A simple, consistent process from sourcing to delivery.
                    </p>
                    <ol className="space-y-6">
                        {processSteps.map((step, index) => (
                            <li key={step.title} className="flex gap-4 md:gap-5">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-50 text-cyan-700 text-sm font-semibold flex items-center justify-center border border-cyan-100">
                                    {index + 1}
                                </span>
                                <div className="pt-0.5">
                                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </motion.section>

                {/* Highlights */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 md:p-8"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
                    <ul className="space-y-4">
                        {[
                            'Certified pre-owned devices with transparent condition grading',
                            '40+ point quality inspection on every unit',
                            'Warranty options up to 12 months',
                            'Showroom in Ahmedabad — visit, inspect, and buy in person',
                            'Brands including Apple, Dell, HP, Lenovo, Asus, and more',
                            'IT rental services for events, training, and short-term needs',
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3 text-gray-600">
                                <CheckCircle size={18} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.section>

                {/* Sustainability */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="border-t border-gray-200 pt-16 md:pt-20"
                >
                    <div className="flex items-start gap-4 mb-5">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <Leaf size={20} className="text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                Sustainability
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Choosing refurbished reduces the need for new manufacturing — cutting carbon,
                                water use, and e-waste. Every purchase from Macc-India is a step toward more
                                responsible technology consumption, without compromising on performance.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Location */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-900 rounded-xl p-6 md:p-8 text-white"
                >
                    <div className="flex items-start gap-4">
                        <MapPin size={22} className="text-cyan-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold mb-2">Visit Our Showroom</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Solaris Business Hub, Office 201, Sola Rd, Ahmedabad, Gujarat 380013
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
                            >
                                Get directions & contact details
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-center pt-4 pb-8"
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-50 mb-5">
                        <Shield size={24} className="text-cyan-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Ready to find your next device?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                        Browse our collection online or visit us in Ahmedabad. We&apos;re here to help you choose
                        the right laptop or system for your needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Browse Products
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 hover:border-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
