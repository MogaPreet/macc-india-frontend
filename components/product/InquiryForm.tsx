'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, User, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { submitProductRequest } from '@/lib/firebase-services';
import { ProductSpecs } from '@/lib/types';

interface InquiryFormProps {
    productId: string;
    productName: string;
    productSlug: string;
    productSpecs?: ProductSpecs;
}

export default function InquiryForm({ productId, productName, productSlug, productSpecs }: InquiryFormProps) {
    // Build specs string for WhatsApp message
    const specsText = productSpecs ? [
        productSpecs.processor && `Processor: ${productSpecs.processor}`,
        productSpecs.ram && `RAM: ${productSpecs.ram}`,
        productSpecs.storage && `Storage: ${productSpecs.storage}`,
    ].filter(Boolean).join(', ') : '';
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

                {/* OR Divider */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-text-muted font-medium">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* WhatsApp Button */}
                <a
                    href={`https://wa.me/919143430202?text=${encodeURIComponent(`Hi, I'm interested in ${productName}${specsText ? ` (${specsText})` : ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#22c55e] transition-colors"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                </a>
            </form>

            {/* Note */}
            <p className="text-xs text-text-muted text-center mt-4">
                No payment gateway. We verify stock and call you to complete the purchase.
            </p>
        </motion.div>
    );
}
