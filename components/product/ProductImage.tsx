'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductImageProps {
    images: string[];
    alt: string;
}

export default function ProductImage({ images, alt }: ProductImageProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit space-y-4"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Main Image Container */}
            <div className="neo-card overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 relative group">
                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} className="text-gray-700" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} className="text-gray-700" />
                        </button>
                    </>
                )}

                {/* Zoom Button */}
                <button
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                    aria-label="Zoom image"
                >
                    <ZoomIn size={20} className="text-gray-700" />
                </button>

                {/* Main Image */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => setIsZoomed(true)}
                    >
                        <Image
                            src={images[selectedIndex]}
                            alt={`${alt} - Image ${selectedIndex + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg drop-shadow-xl"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                        {selectedIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                >
                    {images.map((image, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${selectedIndex === index
                                    ? 'ring-2 ring-accent-cyan ring-offset-2 ring-offset-background'
                                    : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${alt} thumbnail ${index + 1}`}
                                width={80}
                                height={60}
                                className="w-20 h-16 object-cover"
                            />
                            {selectedIndex === index && (
                                <motion.div
                                    layoutId="thumbnail-indicator"
                                    className="absolute inset-0 border-2 border-accent-cyan rounded-xl"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {/* Fullscreen Lightbox */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomed(false)}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        {/* Close hint */}
                        <div className="absolute top-6 right-6 text-white/60 text-sm">
                            Click anywhere to close
                        </div>

                        {/* Navigation in Lightbox */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrevious();
                                    }}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={28} className="text-white" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={28} className="text-white" />
                                </button>
                            </>
                        )}

                        <motion.div
                            key={selectedIndex}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-6xl max-h-[90vh] cursor-default"
                        >
                            <Image
                                src={images[selectedIndex]}
                                alt={`${alt} - Image ${selectedIndex + 1}`}
                                width={1200}
                                height={800}
                                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg"
                            />
                        </motion.div>

                        {/* Lightbox Counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                                {selectedIndex + 1} / {images.length}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
