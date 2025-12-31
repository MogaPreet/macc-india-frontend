'use client';

import { motion } from 'framer-motion';
import { FileText, Calendar } from 'lucide-react';

export default function TermsPage() {
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
                            <FileText size={16} />
                            Legal
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Terms of <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Service</span>
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
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using the MACC India website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>

                    <h2>2. Eligibility</h2>
                    <p>
                        You must be at least 18 years old to use our services. By using our website, you represent and warrant that you meet this age requirement and have the legal capacity to enter into binding agreements.
                    </p>

                    <h2>3. Account Registration</h2>
                    <p>
                        To make purchases, you may need to create an account. You are responsible for:
                    </p>
                    <ul>
                        <li>Maintaining the confidentiality of your account credentials</li>
                        <li>All activities that occur under your account</li>
                        <li>Notifying us immediately of any unauthorized use</li>
                        <li>Providing accurate and complete information</li>
                    </ul>

                    <h2>4. Products and Pricing</h2>
                    <p>
                        All products sold on MACC India are certified refurbished laptops. We strive to provide accurate product descriptions and pricing, but errors may occur. We reserve the right to:
                    </p>
                    <ul>
                        <li>Correct any errors in pricing or product information</li>
                        <li>Cancel orders affected by pricing errors</li>
                        <li>Update prices without prior notice</li>
                        <li>Limit quantities available for purchase</li>
                    </ul>

                    <h2>5. Orders and Payment</h2>
                    <p>
                        When you place an order, you agree to provide current, complete, and accurate purchase and account information. All payments are processed securely through our payment partners. We reserve the right to refuse or cancel orders for any reason, including suspected fraud.
                    </p>

                    <h2>6. Shipping and Delivery</h2>
                    <p>
                        Shipping times are estimates and not guaranteed. MACC India is not responsible for delays caused by shipping carriers, customs, or other factors beyond our control. Risk of loss transfers to you upon delivery to the carrier.
                    </p>

                    <h2>7. Returns and Refunds</h2>
                    <p>
                        Our return and refund policies are outlined in our separate <a href="/returns" className="text-cyan-600 hover:text-cyan-700">Return Policy</a> page. By making a purchase, you agree to abide by these policies.
                    </p>

                    <h2>8. Warranty</h2>
                    <p>
                        Warranty terms are detailed in our <a href="/warranty" className="text-cyan-600 hover:text-cyan-700">Warranty Policy</a>. All warranties are subject to the terms and conditions stated therein.
                    </p>

                    <h2>9. Intellectual Property</h2>
                    <p>
                        All content on the MACC India website, including text, graphics, logos, images, and software, is the property of MACC India or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                    </p>

                    <h2>10. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by law, MACC India shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services. Our total liability shall not exceed the amount you paid for the product in question.
                    </p>

                    <h2>11. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold harmless MACC India, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your violation of these terms or your use of our services.
                    </p>

                    <h2>12. Governing Law</h2>
                    <p>
                        These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana.
                    </p>

                    <h2>13. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the modified terms.
                    </p>

                    <h2>14. Contact Information</h2>
                    <p>
                        For questions about these Terms of Service, please contact us at:
                    </p>
                    <ul>
                        <li>Email: legal@maccindia.com</li>
                        <li>Phone: +91 98765 43210</li>
                        <li>Address: MACC India Tech Hub, Cyber City, Gurugram</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
