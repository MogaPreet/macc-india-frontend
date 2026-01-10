'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Cpu, HardDrive, Monitor, MemoryStick } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getBrands } from '@/lib/firebase-services';
import { Product, Brand } from '@/lib/types';


const ITEMS_PER_PAGE = 6;

// Helper to extract processor family from full processor name
const getProcessorFamily = (processor: string): string => {
    const lower = processor.toLowerCase();
    if (lower.includes('i9')) return 'Intel i9';
    if (lower.includes('i7')) return 'Intel i7';
    if (lower.includes('i5')) return 'Intel i5';
    if (lower.includes('i3')) return 'Intel i3';
    if (lower.includes('ryzen 9') || lower.includes('r9')) return 'Ryzen 9';
    if (lower.includes('ryzen 7') || lower.includes('r7')) return 'Ryzen 7';
    if (lower.includes('ryzen 5') || lower.includes('r5')) return 'Ryzen 5';
    if (lower.includes('ryzen 3') || lower.includes('r3')) return 'Ryzen 3';
    if (lower.includes('m1') || lower.includes('m2') || lower.includes('m3') || lower.includes('m4')) return 'Apple Silicon';
    if (lower.includes('celeron')) return 'Intel Celeron';
    if (lower.includes('pentium')) return 'Intel Pentium';
    return 'Other';
};

// Helper to check if a processor matches a family
const processorMatchesFamily = (processor: string, family: string): boolean => {
    const lower = processor.toLowerCase();
    const familyLower = family.toLowerCase();

    if (familyLower.includes('i9')) return lower.includes('i9');
    if (familyLower.includes('i7')) return lower.includes('i7');
    if (familyLower.includes('i5')) return lower.includes('i5');
    if (familyLower.includes('i3')) return lower.includes('i3');
    if (familyLower.includes('ryzen 9')) return lower.includes('ryzen 9') || lower.includes('r9');
    if (familyLower.includes('ryzen 7')) return lower.includes('ryzen 7') || lower.includes('r7');
    if (familyLower.includes('ryzen 5')) return lower.includes('ryzen 5') || lower.includes('r5');
    if (familyLower.includes('ryzen 3')) return lower.includes('ryzen 3') || lower.includes('r3');
    if (familyLower.includes('apple')) return lower.includes('m1') || lower.includes('m2') || lower.includes('m3') || lower.includes('m4');
    if (familyLower.includes('celeron')) return lower.includes('celeron');
    if (familyLower.includes('pentium')) return lower.includes('pentium');
    return false;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRAM, setSelectedRAM] = useState<string[]>([]);
    const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Get max price from products
    const maxPrice = useMemo(() => {
        if (products.length === 0) return 200000;
        return Math.max(...products.map(p => p.price)) + 10000;
    }, [products]);

    // Extract unique RAM and Processor options from products
    const ramOptions = useMemo(() => {
        const rams = products.map(p => p.specs?.ram).filter(Boolean) as string[];
        // Extract only the first word (e.g., "08GB" from "08GB DDR4 RAM")
        const ramShort = rams.map(r => r.split(' ')[0]);
        return [...new Set(ramShort)].sort();
    }, [products]);

    const processorOptions = useMemo(() => {
        const processors = products.map(p => p.specs?.processor).filter(Boolean) as string[];
        const processorFamilies = processors.map(p => getProcessorFamily(p));
        return [...new Set(processorFamilies)].filter(p => p !== 'Other').sort();
    }, [products]);

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

            // Match RAM by checking if the full RAM starts with the selected short version
            const matchesRAM = selectedRAM.length === 0 ||
                (product.specs?.ram && selectedRAM.some(sr => product.specs?.ram?.startsWith(sr)));

            // Match processor by checking if the processor belongs to the selected family
            const matchesProcessor = selectedProcessors.length === 0 ||
                (product.specs?.processor && selectedProcessors.some(family => processorMatchesFamily(product.specs!.processor!, family)));

            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesBrand && matchesRAM && matchesProcessor && matchesPrice;
        });
    }, [products, searchQuery, selectedBrands, selectedRAM, selectedProcessors, priceRange]);

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

    const toggleRAM = (ram: string) => {
        setSelectedRAM(prev =>
            prev.includes(ram) ? prev.filter(r => r !== ram) : [...prev, ram]
        );
        handleFilterChange();
    };

    const toggleProcessor = (processor: string) => {
        setSelectedProcessors(prev =>
            prev.includes(processor) ? prev.filter(p => p !== processor) : [...prev, processor]
        );
        handleFilterChange();
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedBrands([]);
        setSelectedRAM([]);
        setSelectedProcessors([]);
        setPriceRange([0, maxPrice]);
        setCurrentPage(1);
    };

    const hasActiveFilters = searchQuery || selectedBrands.length > 0 || selectedRAM.length > 0 || selectedProcessors.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

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

            {/* RAM Filter */}
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">RAM</h3>
                <div className="space-y-2">
                    {ramOptions.map(ram => (
                        <label key={ram} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedRAM.includes(ram)}
                                onChange={() => toggleRAM(ram)}
                                className="w-4 h-4 rounded border-gray-300 bg-white text-cyan-600 focus:ring-cyan-500 focus:ring-offset-0"
                            />
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{ram}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Processor Filter */}
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Processor</h3>
                <div className="space-y-2">
                    {processorOptions.map(processor => (
                        <label key={processor} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedProcessors.includes(processor)}
                                onChange={() => toggleProcessor(processor)}
                                className="w-4 h-4 rounded border-gray-300 bg-white text-cyan-600 focus:ring-cyan-500 focus:ring-offset-0"
                            />
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{processor}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Slider */}
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Price Range</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                        <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                    <div className="relative pt-1">
                        {/* Min slider */}
                        <input
                            type="range"
                            min={0}
                            max={maxPrice}
                            step={5000}
                            value={priceRange[0]}
                            onChange={(e) => {
                                const newMin = Math.min(Number(e.target.value), priceRange[1] - 5000);
                                setPriceRange([newMin, priceRange[1]]);
                                handleFilterChange();
                            }}
                            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto cursor-pointer z-20"
                            style={{
                                WebkitAppearance: 'none',
                                background: 'transparent'
                            }}
                        />
                        {/* Max slider */}
                        <input
                            type="range"
                            min={0}
                            max={maxPrice}
                            step={5000}
                            value={priceRange[1]}
                            onChange={(e) => {
                                const newMax = Math.max(Number(e.target.value), priceRange[0] + 5000);
                                setPriceRange([priceRange[0], newMax]);
                                handleFilterChange();
                            }}
                            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto cursor-pointer z-20"
                            style={{
                                WebkitAppearance: 'none',
                                background: 'transparent'
                            }}
                        />
                        {/* Track background */}
                        <div className="relative h-2 bg-gray-200 rounded-full">
                            <div
                                className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                                style={{
                                    left: `${(priceRange[0] / maxPrice) * 100}%`,
                                    right: `${100 - (priceRange[1] / maxPrice) * 100}%`
                                }}
                            />
                        </div>
                    </div>
                    {/* Quick preset buttons */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        <button
                            onClick={() => { setPriceRange([0, 50000]); handleFilterChange(); }}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${priceRange[0] === 0 && priceRange[1] === 50000
                                    ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Under ₹50K
                        </button>
                        <button
                            onClick={() => { setPriceRange([50000, 80000]); handleFilterChange(); }}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${priceRange[0] === 50000 && priceRange[1] === 80000
                                    ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            ₹50K-80K
                        </button>
                        <button
                            onClick={() => { setPriceRange([0, maxPrice]); handleFilterChange(); }}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${priceRange[0] === 0 && priceRange[1] === maxPrice
                                    ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                    </div>
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
        <div className="min-h-screen bg-gray-50 pt-20 overflow-x-hidden">
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
                    <div className="flex-1 min-w-0">
                        {paginatedProducts.length > 0 ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
                                >
                                    {paginatedProducts.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.4 }}
                                            className="min-w-0 w-full"
                                        >
                                            <Link href={`/product/${product.slug}`} className="block w-full">
                                                <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-500 w-full">
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
                                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
                                                                    <Cpu size={12} className="flex-shrink-0" />
                                                                    <div className="text-scroll-container">
                                                                        <span className="text-scroll-content" data-text={product.specs.processor}>{product.specs.processor}</span>
                                                                    </div>
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
                                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
                                                                    <Monitor size={12} className="flex-shrink-0" />
                                                                    <div className="text-scroll-container">
                                                                        <span className="text-scroll-content" data-text={product.specs.screen}>{product.specs.screen}</span>
                                                                    </div>
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
