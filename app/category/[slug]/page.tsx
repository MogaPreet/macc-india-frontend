'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Cpu, HardDrive, Monitor, MemoryStick, Sparkles, Laptop } from 'lucide-react';
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/firebase-services';
import { Category, Product } from '@/lib/types';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [otherCategories, setOtherCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        async function fetchData() {
            try {
                const [categoryData, allCats] = await Promise.all([
                    getCategoryBySlug(slug),
                    getCategories()
                ]);

                if (categoryData) {
                    setCategory(categoryData);
                    const productsData = await getProductsByCategory(categoryData.id);
                    setProducts(productsData);
                }

                setOtherCategories(allCats.filter(c => c.slug !== slug && c.isActive));
            } catch (error) {
                console.error('Error fetching category data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="h-[40vh] bg-gray-200 rounded-2xl animate-pulse mb-8"></div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
                    <Link href="/" className="text-cyan-600 hover:text-cyan-700">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const colorClass = category.color || 'from-cyan-500 to-blue-500';
    const bgGlow = 'rgba(6, 182, 212, 0.3)';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Immersive Hero Header */}
            <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
                {/* Background Image */}
                {category.image ? (
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-900" />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900" />

                {/* Color Accent Overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-20`}
                />

                {/* Floating Orbs */}
                <div
                    className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-30 animate-pulse"
                    style={{ background: bgGlow }}
                />
                <div
                    className="absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-20 animate-pulse"
                    style={{ background: bgGlow, animationDelay: '1s' }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        {/* Back Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                href="/#categories"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
                            >
                                <ArrowLeft size={18} />
                                <span>All Categories</span>
                            </Link>
                        </motion.div>

                        {/* Category Badge */}


                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                        >
                            {category.name}
                        </motion.h1>

                        {/* Description */}


                        {/* Product Count */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-white/60 mt-6"
                        >
                            {products.length} laptops available
                        </motion.p>
                    </div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
            </div>

            {/* Products Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {products.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                            >
                                <Link href={`/product/${product.slug}`}>
                                    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500">
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                            {product.images && product.images.length > 0 ? (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                            {/* Condition Badge */}
                                            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 border border-gray-200">
                                                {product.condition}
                                            </div>
                                            {/* Discount Badge */}
                                            {product.originalPrice && (
                                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r ${colorClass} text-xs font-bold text-white`}>
                                                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className={`text-xs font-medium mb-1 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                                                {product.brandName}
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>

                                            {/* Specs */}
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                {product.specs?.processor && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Cpu size={12} />
                                                        <span className="truncate">{product.specs.processor.split(' ').slice(0, 2).join(' ')}</span>
                                                    </div>
                                                )}
                                                {product.specs?.ram && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <MemoryStick size={12} />
                                                        <span>{product.specs.ram}</span>
                                                    </div>
                                                )}
                                                {product.specs?.storage && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <HardDrive size={12} />
                                                        <span>{product.specs.storage}</span>
                                                    </div>
                                                )}
                                                {product.specs?.screen && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Monitor size={12} />
                                                        <span className="truncate">{product.specs.screen.split(' ')[0]}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl font-bold text-gray-900">
                                                    ₹{product.price.toLocaleString('en-IN')}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        ₹{product.originalPrice.toLocaleString('en-IN')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${colorClass} opacity-20 flex items-center justify-center mb-6`}>
                            <Laptop size={32} className="text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No laptops in this category</h3>
                        <p className="text-gray-500 mb-6">Check back soon for new arrivals!</p>
                        <Link
                            href="/products"
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
                        >
                            View All Products
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Browse More Categories */}
            {otherCategories.length > 0 && (
                <div className="bg-white border-t border-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Browse Other Categories</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                            {otherCategories.map((cat) => (
                                <Link key={cat.id} href={`/category/${cat.slug}`}>
                                    <div className={`flex-shrink-0 px-5 py-3 rounded-full bg-gradient-to-r ${cat.color || 'from-gray-500 to-gray-600'} text-white font-medium hover:opacity-90 transition-opacity whitespace-nowrap`}>
                                        {cat.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
