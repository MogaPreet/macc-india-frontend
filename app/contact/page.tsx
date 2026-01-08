'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2, Building2, ArrowRight, AlertCircle } from 'lucide-react';
import { submitContactRequest } from '@/lib/firebase-services';

const contactInfo = {
    address: 'Use lift No 19,20,21, solaris business hub, office 201, Sola Rd, opp. Parshwanath jain mandir brts bus stop, Bhuyangdev Society, Ahmedabad, Gujarat 380013',
    phone: '+91 91434 30202',
    email: 'support@maccindia.com',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1905636.8226086148!2d71.5387157!3d21.1146823!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e853136b2c6bd%3A0x693f4d66ec8d9e48!2sMACC%20INDIA%20-%20Refurbished%20Laptop%20%26%20Desktop%20Dealer!5e0!3m2!1sen!2sin!4v1767124718640!5m2!1sen!2sin',
};

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const result = await submitContactRequest({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
            subject: formData.subject,
            message: formData.message,
        });

        setIsSubmitting(false);

        if (result.success) {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        } else {
            setError(result.error || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Map */}
            <div className="relative h-[45vh] min-h-[350px] overflow-hidden">
                {/* Google Map as Background */}
                <iframe
                    src={contactInfo.mapSrc}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80" />

                {/* Floating Orbs */}
                <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6"
                        >
                            <Building2 size={16} />
                            Visit our showroom
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                        >
                            Get in <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Touch</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg text-white/70 max-w-xl mx-auto"
                        >
                            Have questions? We&apos;d love to hear from you. Visit our showroom or send us a message.
                        </motion.p>
                    </div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Address Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                                <MapPin className="text-white" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Our Location</h3>
                            <p className="text-gray-600 leading-relaxed">{contactInfo.address}</p>
                            <a
                                href="https://maps.app.goo.gl/qnmYVxTSW9cfmGV88"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-600 font-medium mt-4 hover:gap-2 transition-all"
                            >
                                Get Directions <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Phone Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                                <Phone className="text-white" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
                            <p className="text-gray-600">{contactInfo.phone}</p>
                            <a
                                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                                className="inline-flex items-center gap-1 text-emerald-600 font-medium mt-4 hover:gap-2 transition-all"
                            >
                                Call Now <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                                <Mail className="text-white" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                            <p className="text-gray-600">{contactInfo.email}</p>
                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="inline-flex items-center gap-1 text-purple-600 font-medium mt-4 hover:gap-2 transition-all"
                            >
                                Send Email <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Hours Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-4">
                                <Clock className="text-white" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Working Hours</h3>
                            <p className="text-gray-600">{contactInfo.hours}</p>
                            <p className="text-gray-400 text-sm mt-2">Sunday: Closed</p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-500 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-6"
                                >
                                    <CheckCircle className="text-emerald-600" size={24} />
                                    <div>
                                        <p className="font-semibold text-emerald-800">Message Sent Successfully!</p>
                                        <p className="text-emerald-600 text-sm">We&apos;ll get back to you soon.</p>
                                    </div>
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6"
                                >
                                    <AlertCircle className="text-red-600" size={24} />
                                    <div>
                                        <p className="font-semibold text-red-800">Failed to send message</p>
                                        <p className="text-red-600 text-sm">{error}</p>
                                    </div>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="product">Product Question</option>
                                            <option value="support">Technical Support</option>
                                            <option value="warranty">Warranty Claim</option>
                                            <option value="bulk">Bulk Order</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Full Width Map Section */}
            <div className="bg-white border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Find Us on the Map</h2>
                        <p className="text-gray-500 mt-2">Our showroom is conveniently located in Ahmedabad, Gujarat</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                        <iframe
                            src={contactInfo.mapSrc}
                            className="w-full h-96"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
