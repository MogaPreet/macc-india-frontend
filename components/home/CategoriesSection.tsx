'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Laptop, Code, Palette, GraduationCap, Briefcase, Gamepad2, Wallet } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/firebase-services';
import { Category } from '@/lib/types';

// GIF fallbacks removed — categories now use gifUrl from Firestore or static image
const categoryMedia: { [key: string]: string } = {};

const iconMap: { [key: string]: any } = {
    wallet: Wallet,
    gamepad: Gamepad2,
    briefcase: Briefcase,
    graduation: GraduationCap,
    palette: Palette,
    code: Code,
    laptop: Laptop,
};

export default function CategoriesSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                // Filter active and sort
                // Prioritize "The Gamer" or specific categories for the hero spot if needed
                const activeCategories = data
                    .filter(c => c.isActive)
                    .sort((a, b) => {
                        // Custom sort orders can go here, for now using `order`
                        return (a.order || 0) - (b.order || 0);
                    });
                setCategories(activeCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    if (loading) {
        return <div className="min-h-[600px] bg-black flex items-center justify-center text-white">Loading...</div>;
    }

    if (categories.length === 0) return null;

    // Separate hero category (e.g., first one) from the rest for bento layout
    // You might want to explicitly pick "The Gamer" as hero if it exists
    const gamerCategory = categories.find(c => c.slug.includes('gamer') || c.slug.includes('gaming'));
    const heroCategory = gamerCategory || categories[0];
    const otherCategories = categories.filter(c => c.id !== heroCategory.id);

    return (
        <section className="relative bg-gradient-to-b from-gray-900 via-[#0a0a0f] to-gray-900 pb-20 -mt-20 z-0">
            {/* Top fade — blends from Hero's dark into this section */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-900/80 to-transparent z-10 pointer-events-none" />

            {/* Ambient glow orbs — echoes the Hero section's visual style */}
            <div className="absolute top-32 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Bottom fade — eases into the light ProductGrid below */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                        Shop By <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Category</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Dive into our curated collections designed for your specific needs.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
                    {/* Hero Card (Large - 2x2) */}
                    <Link
                        href={`/category/${heroCategory.slug}`}
                        className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden border border-white/10 min-h-[400px]"
                    >
                        <div className="absolute inset-0 bg-gray-900">
                            {/* Background GIF/Image from backend or map */}
                            <Image
                                src={heroCategory.gifUrl || categoryMedia[heroCategory.slug] || heroCategory.image || 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80'}
                                alt={heroCategory.name}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
                                unoptimized={true}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase italic tracking-wider">
                                        {heroCategory.name}
                                    </h3>
                                    <p className="text-gray-300 max-w-sm line-clamp-2">
                                        Dominate the game with high-performance rigs.
                                    </p>
                                </div>
                                <div className="bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Secondary Cards */}
                    {otherCategories.map((category, idx) => {
                        // Logic to create an even grid:
                        // If we have an odd number of "other" categories, make the last one span 2 columns if it's in the 3rd column spot?
                        // Or simply: in a 3-col grid with one 2x2 item (taking 4 slots), we have 2 slots left in that 2-row block.
                        // Then subsequent rows have 3 slots.
                        // Ideally we want to fill the gaps.

                        // Layout Strategy:
                        // Hero takes [0,0] to [1,1] (2x2)
                        // Slot 1: [0,2] (Top right)
                        // Slot 2: [1,2] (Bottom right)
                        // Slot 3+: Start new row below

                        // We can just verify if it's the last item and we have an empty slot next to it, span 2?
                        // Simple heuristic: If it's the last item and (total items including hero) % 3 !== 0, maybe span?
                        // Actually, standard grid-flow-dense might help, but let's manual control for "last item fills gap".

                        const isLast = idx === otherCategories.length - 1;
                        const isOddRemaining = otherCategories.length % 2 !== 0; // IF we possess 2 slots on right, then rows of 3...

                        // Let's just make the LAST item span 2 columns if needed to look "full" if it lands on a line with space.
                        // A simple robust way for a small number of categories:
                        // 1. Hero (2x2)
                        // 2. Dev (1x1)
                        // 3. Creative (1x1)
                        // 4. Student (1x1) -> This starts new row if we only had 2 slots on right.

                        // Let's stick to simple 1x1 for now, but apply 'md:col-span-2' to the last item IF we want to fill a potential gap?
                        // Actually, the user asked to "fill the gap".
                        // If we have: Hero (4 slots), + 2 items (2 slots) = 6 slots (Perfect 2 rows).
                        // If we have: Hero + 3 items = 7 slots. 1 item on new row. 
                        // If we have: Hero + 4 items = 8 slots. 2 items on new row.
                        // If we have: Hero + 5 items = 9 slots (Perfect 3 rows).

                        // So if (1 + otherCategories.length) % 3 == 1 (1 item alone on row) -> Span 3? (Hero is 2x2=4? No, Hero is 1 item spanning 4 grid cells).
                        // Grid cells used: 4 + N.
                        // If (4 + N) % 3 == 1 -> Last item is alone on a row of 3? No.
                        // Let's assume standard CSS Grid auto placement.

                        const spanClass = (isLast && (otherCategories.length % 3 === 2)) ? "md:col-span-2" : "";

                        // Logic:
                        // Top-right vertical stack: 2 items.
                        // If we have > 2 items, they go below.
                        // If we have exactly 3 items: Hero (4 cells), Item 1 (1 cell), Item 2 (1 cell), Item 3 (1 cell) -> Row 3 starts with Item 3.
                        // We want Item 3 to span 3 cols? Or maybe 2?

                        return (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className={`relative group rounded-3xl overflow-hidden border border-white/10 min-h-[200px] ${spanClass}`}
                            >
                                <div className="absolute inset-0 bg-gray-800">
                                    <Image
                                        src={category.gifUrl || categoryMedia[category.slug] || category.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'}
                                        alt={category.name}
                                        fill
                                        className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                                        unoptimized={true}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                                </div>

                                <div className="absolute bottom-6 left-6 w-[85%]">
                                    <h3 className="text-xl font-bold text-white mb-1 uppercase truncate">
                                        {category.name}
                                    </h3>
                                    <div className="h-1 w-0 group-hover:w-full bg-cyan-500 transition-all duration-300" />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
