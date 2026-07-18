'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

export default function Testimonials() {
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-16 md:py-24 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10 md:mb-12"
                >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2">
                        Customer Love
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                        What People Are Saying
                    </h2>
                </motion.div>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden motion-reduce:overflow-x-auto">
                    <motion.div
                        className="flex gap-4 sm:gap-6 w-max motion-reduce:animate-none"
                        animate={{ x: [0, -50 * testimonials.length * 7] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: 'loop',
                                duration: 35,
                                ease: 'linear',
                            },
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="flex-shrink-0 w-[280px] sm:w-80 md:w-96"
                            >
                                <div className="h-full rounded-2xl p-5 sm:p-6 border border-white/10 bg-white/[0.03]">
                                    <Quote size={20} className="text-cyan-400/30 mb-3" />

                                    <div className="flex gap-1 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className="text-amber-400 fill-amber-400"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-white/65 text-sm sm:text-base mb-5 leading-relaxed line-clamp-5">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white text-sm">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-xs text-white/35">
                                                {testimonial.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
