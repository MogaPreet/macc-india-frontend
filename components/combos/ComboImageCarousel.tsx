'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ComboImageCarouselProps = {
    images: string[];
    alt: string;
    className?: string;
    aspectClassName?: string;
};

export default function ComboImageCarousel({
    images,
    alt,
    className = '',
    aspectClassName = 'aspect-[4/3] sm:aspect-[16/10]',
}: ComboImageCarouselProps) {
    const [index, setIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const safeImages = images.filter(Boolean);
    const count = safeImages.length;
    const showNav = count > 1;

    const go = useCallback(
        (dir: -1 | 1) => {
            if (count <= 1) return;
            setIndex(i => (i + dir + count) % count);
        },
        [count]
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'ArrowRight') go(1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [go]);

    if (count === 0) {
        return (
            <div
                className={`rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 ${aspectClassName} ${className}`}
                role="img"
                aria-label={`No image for ${alt}`}
            >
                Bundle image coming soon
            </div>
        );
    }

    return (
        <div
            className={`relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-xl ${className}`}
            role="region"
            aria-roledescription="carousel"
            aria-label={`${alt} image gallery`}
        >
            <div className={`relative w-full ${aspectClassName}`}>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0.85, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0.85, x: -12 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={safeImages[index]}
                            alt={`${alt} — image ${index + 1} of ${count}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 960px"
                            priority={index === 0}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {showNav && (
                <>
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-lg border border-gray-200/80 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-lg border border-gray-200/80 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                        aria-label="Next image"
                    >
                        <ChevronRight size={22} />
                    </button>
                    <div
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm"
                        aria-hidden
                    >
                        {safeImages.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setIndex(i)}
                                className={`h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                                    i === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
                                }`}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}

            <div
                className="absolute inset-0 sm:hidden"
                onTouchStart={e => setTouchStart(e.targetTouches[0].clientX)}
                onTouchEnd={e => {
                    if (touchStart == null) return;
                    const delta = e.changedTouches[0].clientX - touchStart;
                    setTouchStart(null);
                    if (Math.abs(delta) < 50) return;
                    if (delta > 0) go(-1);
                    else go(1);
                }}
                aria-hidden
            />
        </div>
    );
}
