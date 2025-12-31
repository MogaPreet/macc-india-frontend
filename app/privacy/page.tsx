'use client';

import { motion } from 'framer-motion';
import { Shield, Calendar } from 'lucide-react';

export default function PrivacyPage() {
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
                            Your Privacy Matters
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Privacy <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Policy</span>
                        </h1>
                        <p className="text-gray-400 flex items-center justify-center gap-2">
                            <Calendar size={16} />
                            Last updated: December 30, 2024
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm prose prose-gray max-w-none"
                >
                    <h2>Introduction</h2>
                    <p>
                        At MACC India, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. Please read this policy carefully.
                    </p>

                    <h2>Information We Collect</h2>
                    <h3>Personal Information</h3>
                    <p>We may collect personal information that you voluntarily provide, including:</p>
                    <ul>
                        <li>Name and contact details (email, phone number, address)</li>
                        <li>Billing and shipping information</li>
                        <li>Payment information (processed securely by payment providers)</li>
                        <li>Account credentials</li>
                        <li>Communication preferences</li>
                    </ul>

                    <h3>Automatically Collected Information</h3>
                    <p>When you visit our website, we may automatically collect:</p>
                    <ul>
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent</li>
                        <li>Referring website</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>We use the collected information for:</p>
                    <ul>
                        <li>Processing and fulfilling your orders</li>
                        <li>Communicating about orders, products, and services</li>
                        <li>Providing customer support</li>
                        <li>Improving our website and services</li>
                        <li>Sending promotional communications (with your consent)</li>
                        <li>Preventing fraud and ensuring security</li>
                        <li>Complying with legal obligations</li>
                    </ul>

                    <h2>Information Sharing</h2>
                    <p>We may share your information with:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> Shipping companies, payment processors, and IT service providers who assist in our operations</li>
                        <li><strong>Business Partners:</strong> Warranty service providers and authorized repair centers</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    </ul>
                    <p>We do not sell your personal information to third parties.</p>

                    <h2>Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational security measures to protect your personal information. This includes encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure.
                    </p>

                    <h2>Cookies and Tracking</h2>
                    <p>
                        We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings, but disabling them may affect website functionality.
                    </p>

                    <h2>Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Request deletion of your information</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Withdraw consent where applicable</li>
                    </ul>

                    <h2>Data Retention</h2>
                    <p>
                        We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order and transaction data is retained for a minimum of 7 years for tax and legal purposes.
                    </p>

                    <h2>Children&apos;s Privacy</h2>
                    <p>
                        Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us immediately.
                    </p>

                    <h2>Third-Party Links</h2>
                    <p>
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any information.
                    </p>

                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <ul>
                        <li>Email: privacy@maccindia.com</li>
                        <li>Phone: +91 98765 43210</li>
                        <li>Address: MACC India Tech Hub, Cyber City, Gurugram, Haryana 122002</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
