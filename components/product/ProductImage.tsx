'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, Play, X, Loader2 } from 'lucide-react';

interface ProductImageProps {
    images: string[];
    alt: string;
    youtubeUrl?: string;
}

// Shimmer loading component
function ImageShimmer() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            {/* Loading spinner */}
            <div className="flex flex-col items-center gap-3">
                <Loader2 size={40} className="text-accent-cyan animate-spin" />
                <span className="text-sm text-gray-500 font-medium">Loading image...</span>
            </div>
        </div>
    );
}

// Extract YouTube video ID from various URL formats
function getYoutubeVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

export default function ProductImage({ images, alt, youtubeUrl }: ProductImageProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isMainImageLoading, setIsMainImageLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isZoomed || isVideoOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isZoomed, isVideoOpen]);

    const videoId = youtubeUrl ? getYoutubeVideoId(youtubeUrl) : null;
    const hasVideo = !!videoId;

    // Total items = images + 1 if there's a video
    const totalItems = images.length + (hasVideo ? 1 : 0);
    const isVideoSelected = hasVideo && selectedIndex === images.length;

    // Reset loading state when selected image changes
    useEffect(() => {
        if (!isVideoSelected && !loadedImages.has(selectedIndex)) {
            setIsMainImageLoading(true);
        } else {
            setIsMainImageLoading(false);
        }
    }, [selectedIndex, isVideoSelected, loadedImages]);

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => new Set(prev).add(index));
        if (index === selectedIndex) {
            setIsMainImageLoading(false);
        }
    };

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
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
                {totalItems > 1 && (
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

                {/* Zoom Button (only for images) */}
                {!isVideoSelected && (
                    <button
                        onClick={() => setIsZoomed(true)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                        aria-label="Zoom image"
                    >
                        <ZoomIn size={20} className="text-gray-700" />
                    </button>
                )}

                {/* Main Image or Video Thumbnail */}
                <AnimatePresence mode="wait">
                    {isVideoSelected ? (
                        <motion.div
                            key="video-thumbnail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer relative"
                            onClick={() => setIsVideoOpen(true)}
                        >
                            <Image
                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                alt={`${alt} - Video`}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover rounded-lg drop-shadow-xl"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl"
                                >
                                    <Play size={36} className="text-white ml-1" fill="white" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            className="cursor-pointer relative"
                            onClick={() => setIsZoomed(true)}
                        >
                            {/* Shimmer loading placeholder */}
                            {isMainImageLoading && <ImageShimmer />}
                            <Image
                                src={images[selectedIndex]}
                                alt={`${alt} - Image ${selectedIndex + 1}`}
                                width={600}
                                height={400}
                                className={`w-full h-auto object-cover rounded-lg drop-shadow-xl transition-opacity duration-300 ${isMainImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                priority
                                onLoad={() => handleImageLoad(selectedIndex)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Image Counter */}
                {totalItems > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                        {selectedIndex + 1} / {totalItems}
                    </div>
                )}
            </div>

            {/* Thumbnail Strip */}
            {totalItems > 1 && (
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

                    {/* YouTube Video Thumbnail */}
                    {hasVideo && (
                        <motion.button
                            onClick={() => setSelectedIndex(images.length)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${isVideoSelected
                                ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-background'
                                : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                alt={`${alt} video thumbnail`}
                                width={80}
                                height={60}
                                className="w-20 h-16 object-cover"
                            />
                            {/* Play icon overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play size={20} className="text-white" fill="white" />
                            </div>
                            {isVideoSelected && (
                                <motion.div
                                    layoutId="thumbnail-indicator"
                                    className="absolute inset-0 border-2 border-red-500 rounded-xl"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    )}
                </motion.div>
            )}

            {/* Fullscreen Image Lightbox */}
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

            {/* YouTube Video Modal */}
            <AnimatePresence>
                {isVideoOpen && hasVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Close Button - positioned absolutely to the viewport */}
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="fixed top-4 right-4 md:top-6 md:right-6 z-[100] w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/40 hover:scale-110"
                            aria-label="Close video"
                        >
                            <X size={24} className="text-white" />
                        </button>

                        {/* Video Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-5xl aspect-video relative"
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-xl"
                            />
                        </motion.div>

                        {/* Click outside to close */}
                        <div
                            className="absolute inset-0 -z-10"
                            onClick={() => setIsVideoOpen(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

