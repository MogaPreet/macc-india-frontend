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
    const duplicatedBrands = [...brands, ...brands, ...brands];

    return (
        <section className="py-14 md:py-20 bg-black overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 md:mb-10"
                >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2">
                        Trusted Brands
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        Shop Top Laptop Brands
                    </h2>
                </motion.div>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
                    {duplicatedBrands.map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 mx-3 sm:mx-5 md:mx-8"
                        >
                            <div className="relative w-28 h-16 sm:w-32 sm:h-16 md:w-36 md:h-20 flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 opacity-60 hover:opacity-100 transition-opacity duration-300">
                                <Image
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    fill
                                    className="object-contain p-3 sm:p-4 invert brightness-0 invert"
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
