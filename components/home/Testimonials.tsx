'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

export default function Testimonials() {
    // Duplicate testimonials for seamless infinite scroll
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-sm font-semibold text-accent-cyan uppercase tracking-wider mb-2">
                        Customer Love
                    </h2>
                    <p className="text-3xl md:text-4xl font-bold text-foreground">
                        What People Are Saying
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative">
                {/* Gradient Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling Content */}
                <motion.div
                    className="flex gap-6"
                    animate={{ x: [0, -50 * testimonials.length * 7] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 30,
                            ease: 'linear',
                        },
                    }}
                >
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="flex-shrink-0 w-80 md:w-96"
                        >
                            <div className="glass rounded-2xl p-6 h-full border border-gray-200/50">
                                {/* Quote Icon */}
                                <div className="mb-4">
                                    <Quote size={24} className="text-accent-cyan/30" />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-text-secondary mb-6 leading-relaxed">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full gradient-cyan-blue flex items-center justify-center text-white font-semibold text-sm">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground text-sm">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-xs text-text-muted">
                                            {testimonial.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
