'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, User, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { submitProductRequest } from '@/lib/firebase-services';

interface InquiryFormProps {
    productId: string;
    productName: string;
    productSlug: string;
}

export default function InquiryForm({ productId, productName, productSlug }: InquiryFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const result = await submitProductRequest({
            productId,
            productName,
            productSlug,
            customerName: formData.name,
            customerPhone: formData.phone,
        });

        setIsLoading(false);

        if (result.success) {
            setIsSubmitted(true);
        } else {
            setError(result.error || 'Something went wrong. Please try again.');
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-6 md:p-8 border border-gray-200/50 text-center"
            >
                <div className="w-16 h-16 rounded-full gradient-cyan-blue flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                    Request Submitted!
                </h3>
                <p className="text-text-secondary">
                    Our team will call you within 2 hours to verify stock and discuss the purchase.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="glass rounded-2xl p-6 md:p-8 border border-gray-200/50"
        >
            <h3 className="text-xl font-bold text-foreground mb-2">
                Interested in this unit?
            </h3>
            <p className="text-text-secondary text-sm mb-6">
                Fill in your details and we&apos;ll call you to confirm availability.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-text-muted" />
                    </div>
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-foreground placeholder:text-text-muted focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                    />
                </div>

                {/* Phone Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone size={18} className="text-text-muted" />
                    </div>
                    <div className="absolute inset-y-0 left-12 flex items-center pointer-events-none">
                        <span className="text-text-secondary text-sm">+91</span>
                    </div>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className="w-full pl-20 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-foreground placeholder:text-text-muted focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        <AlertCircle size={18} className="flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full flex items-center justify-center gap-2 gradient-cyan-blue text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-70"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            Request Callback
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            {/* Note */}
            <p className="text-xs text-text-muted text-center mt-4">
                No payment gateway. We verify stock and call you to complete the purchase.
            </p>
        </motion.div>
    );
}
