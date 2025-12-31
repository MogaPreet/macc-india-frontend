'use client';

import { motion } from 'framer-motion';
import { Cpu, HardDrive, Monitor, MemoryStick, Battery, Laptop, Usb, Scale, Box, Check, X, Shield } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductDetailsProps {
    product: Product;
}

// Map spec keys to icons
const specIcons: { [key: string]: any } = {
    processor: Cpu,
    ram: MemoryStick,
    storage: HardDrive,
    screen: Monitor,
    graphics: Laptop,
    battery: Battery,
    os: Laptop,
    ports: Usb,
    weight: Scale,
};

// Map spec keys to labels
const specLabels: { [key: string]: string } = {
    processor: 'Processor',
    ram: 'Memory',
    storage: 'Storage',
    screen: 'Display',
    graphics: 'Graphics',
    battery: 'Battery',
    os: 'Operating System',
    ports: 'Ports',
    weight: 'Weight',
};

export default function ProductDetails({ product }: ProductDetailsProps) {
    // Get only the specs that have values
    const displaySpecs = Object.entries(product.specs || {}).filter(([_, value]) => value);

    return (
        <div className="space-y-8">
            {/* Brand */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
            >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-text-secondary uppercase tracking-wide">
                    {product.brandName}
                </span>
            </motion.div>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
            >
                {product.name}
            </motion.h1>

            {/* Description */}
            {product.description && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="text-text-secondary"
                >
                    {product.description}
                </motion.p>
            )}

            {/* Price Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex flex-wrap items-baseline gap-4"
            >
                <span className="text-4xl md:text-5xl font-bold text-accent-cyan">
                    ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                    <>
                        <span className="text-xl text-text-muted line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-accent-orange text-white">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                    </>
                )}
            </motion.div>

            {/* Condition Badge */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
            >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-accent-green/10 text-accent-green">
                    <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                    Condition: {product.condition}
                </span>
            </motion.div>

            {/* Specs Grid */}
            {displaySpecs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="grid grid-cols-2 gap-4"
                >
                    {displaySpecs.map(([key, value], index) => {
                        const Icon = specIcons[key] || Laptop;
                        const label = specLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);

                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                                className="glass rounded-xl p-4 border border-gray-200/50"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg gradient-cyan-blue flex items-center justify-center">
                                        <Icon size={16} className="text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-text-muted">{label}</span>
                                </div>
                                <p className="text-foreground font-semibold">{value}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* What's Included - Dynamic from Firebase */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="space-y-4"
            >
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Box size={20} className="text-accent-cyan" />
                    What&apos;s in the Box
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.includedItems && product.includedItems.length > 0 ? (
                        product.includedItems.map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 p-3 rounded-lg ${item.included
                                        ? 'bg-accent-green/5 border border-accent-green/20'
                                        : 'bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                {item.included ? (
                                    <Check size={18} className="text-accent-green flex-shrink-0" />
                                ) : (
                                    <X size={18} className="text-gray-400 flex-shrink-0" />
                                )}
                                <span className={item.included ? 'text-foreground' : 'text-text-muted line-through'}>
                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                    {item.name}
                                </span>
                            </div>
                        ))
                    ) : (
                        // Default items if none specified
                        ['6-Month Macc-India Warranty', 'Original Charger Included', 'Professionally Cleaned & Tested', 'Free Express Delivery'].map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-lg bg-accent-green/5 border border-accent-green/20"
                            >
                                <Check size={18} className="text-accent-green flex-shrink-0" />
                                <span className="text-foreground">{feature}</span>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* Warranty Section */}
            {product.warranty && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="glass rounded-xl p-5 border border-accent-cyan/20 bg-accent-cyan/5"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl gradient-cyan-blue flex items-center justify-center flex-shrink-0">
                            <Shield size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                                {product.warranty.type || 'Warranty'}
                            </h3>
                            <p className="text-accent-cyan font-medium mb-1">
                                {product.warranty.duration}
                            </p>
                            {product.warranty.description && (
                                <p className="text-sm text-text-muted">
                                    {product.warranty.description}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
