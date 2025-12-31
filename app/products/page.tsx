'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Cpu, HardDrive, Monitor, MemoryStick } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getBrands } from '@/lib/firebase-services';
import { Product, Brand } from '@/lib/types';

const conditions = ['Like New', 'Excellent', 'Good', 'Fair'];
const priceRanges = [
    { label: 'Under ₹50K', min: 0, max: 50000 },
    { label: '₹50K - ₹80K', min: 50000, max: 80000 },
    { label: '₹80K - ₹1L', min: 80000, max: 100000 },
    { label: 'Above ₹1L', min: 100000, max: Infinity },
];

const ITEMS_PER_PAGE = 6;

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Fetch products and brands from Firebase
    useEffect(() => {
        async function fetchData() {
            try {
                const [productsData, brandsData] = await Promise.all([
                    getProducts(),
                    getBrands()
                ]);
                setProducts(productsData);
                setBrands(brandsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = searchQuery === '' ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.specs?.processor?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brandName);
            const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(product.condition);
            const matchesPrice = !selectedPriceRange ||
                (product.price >= selectedPriceRange.min && product.price < selectedPriceRange.max);

            return matchesSearch && matchesBrand && matchesCondition && matchesPrice;
        });
    }, [products, searchQuery, selectedBrands, selectedConditions, selectedPriceRange]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
        handleFilterChange();
    };

    const toggleCondition = (condition: string) => {
        setSelectedConditions(prev =>
            prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
        );
        handleFilterChange();
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedBrands([]);
        setSelectedConditions([]);
        setSelectedPriceRange(null);
        setCurrentPage(1);
    };

    const hasActiveFilters = searchQuery || selectedBrands.length > 0 || selectedConditions.length > 0 || selectedPriceRange;

    const FilterSidebar = () => (
        <div className="space-y-6">
            {/* Clear All */}
            {hasActiveFilters && (
                <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                    <X size={16} />
                    Clear all filters
                </button>
            )}

            {/* Brand Filter */}
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Brand</h3>
                <div className="space-y-2">
                    {brands.map(brand => (
                        <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand.name)}
                                onChange={() => toggleBrand(brand.name)}
                                className="w-4 h-4 rounded border-gray-300 bg-white text-cyan-600 focus:ring-cyan-500 focus:ring-offset-0"
                            />
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{brand.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Condition Filter */}
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Condition</h3>
                <div className="space-y-2">
                    {conditions.map(condition => (
                        <label key={condition} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedConditions.includes(condition)}
                                onChange={() => toggleCondition(condition)}
                                className="w-4 h-4 rounded border-gray-300 bg-white text-cyan-600 focus:ring-cyan-500 focus:ring-offset-0"
                            />
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{condition}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedPriceRange(
                                    selectedPriceRange?.min === range.min ? null : range
                                );
                                handleFilterChange();
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPriceRange?.min === range.min
                                ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="bg-white border-b border-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            All <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Laptops</span>
                        </h1>
                        <p className="text-gray-500">
                            {filteredProducts.length} laptops available
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mt-6"
                    >
                        <div className="relative max-w-2xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, brand, or processor..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleFilterChange();
                                }}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        handleFilterChange();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar - Desktop */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="hidden lg:block w-64 flex-shrink-0"
                    >
                        <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <SlidersHorizontal size={18} className="text-cyan-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                            </div>
                            <FilterSidebar />
                        </div>
                    </motion.aside>

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-cyan-500/25"
                    >
                        <SlidersHorizontal size={18} />
                        Filters
                        {hasActiveFilters && (
                            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                        )}
                    </button>

                    {/* Mobile Filter Drawer */}
                    <AnimatePresence>
                        {showMobileFilters && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                                    onClick={() => setShowMobileFilters(false)}
                                />
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-gray-200 z-50 p-6 overflow-y-auto"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                                        <button
                                            onClick={() => setShowMobileFilters(false)}
                                            className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                    <FilterSidebar />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {paginatedProducts.length > 0 ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                                >
                                    {paginatedProducts.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.4 }}
                                        >
                                            <Link href={`/product/${product.slug}`}>
                                                <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-500">
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
                                                            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-xs font-bold text-white">
                                                                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-5">
                                                        <div className="text-xs text-cyan-600 font-medium mb-1">{product.brandName}</div>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
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

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="flex items-center justify-center gap-2 mt-12"
                                    >
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === page
                                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            /* Empty State */
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                                    <Search size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No laptops found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
