'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
    {
        name: 'Apple',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        color: '#555555',
    },
    {
        name: 'Dell',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
        color: '#007DB8',
    },
    {
        name: 'HP',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
        color: '#0096D6',
    },
    {
        name: 'Lenovo',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
        color: '#E2231A',
    },
    {
        name: 'Asus',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
        color: '#00539B',
    },
    {
        name: 'Acer',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg',
        color: '#83B81A',
    },
];

export default function BrandCarousel() {
    return (
        <section className="py-16 md:py-20 bg-white">
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
                        Trusted Brands
                    </h2>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                        Shop Top Laptop Brands
                    </p>
                </motion.div>

                {/* Brand Logos Grid */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-28 h-16 md:w-36 md:h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    fill
                                    className="object-contain p-2"
                                    unoptimized
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
