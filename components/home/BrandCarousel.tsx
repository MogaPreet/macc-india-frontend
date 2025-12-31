'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
    {
        name: 'Apple',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    },
    {
        name: 'Dell',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
    },
    {
        name: 'HP',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
    },
    {
        name: 'Lenovo',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
    },
    {
        name: 'Asus',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
    },
    {
        name: 'Acer',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg',
    },
];

export default function BrandCarousel() {
    // Triple the brands for seamless infinite loop
    const duplicatedBrands = [...brands, ...brands, ...brands];

    return (
        <section className="py-10 md:py-14 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6 md:mb-8"
                >
                    <h2 className="text-sm font-semibold text-accent-cyan uppercase tracking-wider mb-1">
                        Trusted Brands
                    </h2>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                        Shop Top Laptop Brands
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative">
                {/* Gradient Fade Left */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

                {/* Gradient Fade Right */}
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling Marquee - Infinite */}
                <div className="flex animate-marquee hover:[animation-play-state:paused]">
                    {duplicatedBrands.map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 mx-4 md:mx-8 lg:mx-10"
                        >
                            <div className="relative w-20 h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer">
                                <Image
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    fill
                                    className="object-contain p-1 md:p-2"
                                    unoptimized
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
