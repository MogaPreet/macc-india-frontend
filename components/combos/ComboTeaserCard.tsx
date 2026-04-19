'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Combo } from '@/lib/types';

export default function ComboTeaserCard({ combo, index = 0 }: { combo: Combo; index?: number }) {
    const img = combo.images[0];
    const savingsPct =
        combo.originalPrice != null && combo.originalPrice > combo.price
            ? Math.round((1 - combo.price / combo.originalPrice) * 100)
            : null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
            className="group h-full"
        >
            <Link
                href={`/combos/${combo.slug}`}
                className="flex flex-col h-full rounded-2xl border border-gray-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-300/60 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            >
                <div className="relative aspect-[16/10] bg-gray-100">
                    {img ? (
                        <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                            Bundle
                        </div>
                    )}
                    {combo.isFeatured && (
                        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
                            Featured
                        </span>
                    )}
                    {savingsPct != null && (
                        <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-md">
                            −{savingsPct}%
                        </span>
                    )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-cyan-700 transition-colors line-clamp-2">
                        {combo.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {combo.components.length} items ·{' '}
                        {combo.stock > 0 ? (
                            <span className="text-emerald-700 font-medium">In stock</span>
                        ) : (
                            <span className="text-gray-600">Out of stock</span>
                        )}
                    </p>
                    <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                        <div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                ₹{combo.price.toLocaleString('en-IN')}
                            </div>
                            {combo.originalPrice != null && combo.originalPrice > combo.price && (
                                <div className="text-sm text-gray-400 line-through">
                                    ₹{combo.originalPrice.toLocaleString('en-IN')}
                                </div>
                            )}
                        </div>
                        <span
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 group-hover:bg-cyan-500 group-hover:text-white transition-colors"
                            aria-hidden
                        >
                            <ArrowUpRight size={20} />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
