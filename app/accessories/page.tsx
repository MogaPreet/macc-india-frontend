'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Package, Usb, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getAccessories } from '@/lib/firebase-services';
import { Accessory, AccessoryType } from '@/lib/types';
import {
    getBrandOptions,
    getAccessoryTypeOptions,
    formatAccessoryTypeLabel,
    getUniqueSpecValues,
} from '@/lib/filter-utils';
import DualRangeSlider from '@/components/DualRangeSlider';


const ITEMS_PER_PAGE = 6;

export default function AccessoriesPage() {
    const [products, setProducts] = useState<Accessory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedAccessoryTypes, setSelectedAccessoryTypes] = useState<AccessoryType[]>([]);
    const [selectedConnectivity, setSelectedConnectivity] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Get max price from products
    const maxPrice = useMemo(() => {
        if (products.length === 0) return 200000;
        return Math.max(...products.map(p => p.price)) + 10000;
    }, [products]);

    // Update price range when maxPrice changes (after products load)
    useEffect(() => {
        if (products.length > 0) {
            setPriceRange(prev => [prev[0], maxPrice]);
        }
    }, [maxPrice, products.length]);

    const brandOptions = useMemo(() => getBrandOptions(products), [products]);
    const accessoryTypeOptions = useMemo(() => getAccessoryTypeOptions(products), [products]);
    const connectivityOptions = useMemo(() => getUniqueSpecValues(products, 'connectivity'), [products]);

    useEffect(() => {
        async function fetchData() {
            try {
                const productsData = await getAccessories();

                const shuffledProducts = [...productsData];
                for (let i = shuffledProducts.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
                }

                setProducts(shuffledProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return products.filter(product => {
            const typeLabel = formatAccessoryTypeLabel(product.accessoryType);
            const matchesSearch = searchQuery === '' ||
                product.name.toLowerCase().includes(q) ||
                product.brandName.toLowerCase().includes(q) ||
                typeLabel.toLowerCase().includes(q) ||
                product.accessoryType.toLowerCase().includes(q) ||
                (product.specs?.category?.toLowerCase().includes(q) ?? false) ||
                (product.specs?.keyFeature?.toLowerCase().includes(q) ?? false) ||
                (product.specs?.compatibility?.toLowerCase().includes(q) ?? false) ||
                (product.specs?.connectivity?.toLowerCase().includes(q) ?? false);

            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brandName);

            const matchesType = selectedAccessoryTypes.length === 0 ||
                selectedAccessoryTypes.includes(product.accessoryType);

            const matchesConnectivity = selectedConnectivity.length === 0 ||
                (product.specs?.connectivity && selectedConnectivity.includes(product.specs.connectivity));

            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesBrand && matchesType && matchesConnectivity && matchesPrice;
        });
    }, [products, searchQuery, selectedBrands, selectedAccessoryTypes, selectedConnectivity, priceRange]);

    // Infinite Scroll setup
    const hasMore = visibleCount < filteredProducts.length;
    const displayedProducts = filteredProducts.slice(0, visibleCount);

    const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || isLoadingMore) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setIsLoadingMore(true);
                // Simulate a slight network delay to show the nice loading state
                setTimeout(() => {
                    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
                    setIsLoadingMore(false);
                }, 800);
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loading, isLoadingMore, hasMore]);

    const handleFilterChange = () => {
        setVisibleCount(ITEMS_PER_PAGE);
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
        handleFilterChange();
    };

    const toggleAccessoryType = (t: AccessoryType) => {
        setSelectedAccessoryTypes(prev =>
            prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
        );
        handleFilterChange();
    };

    const toggleConnectivity = (c: string) => {
        setSelectedConnectivity(prev =>
            prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
        );
        handleFilterChange();
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedBrands([]);
        setSelectedAccessoryTypes([]);
        setSelectedConnectivity([]);
        setPriceRange([0, maxPrice]);
        setVisibleCount(ITEMS_PER_PAGE);
    };

    const hasActiveFilters = searchQuery || selectedBrands.length > 0 || selectedAccessoryTypes.length > 0 || selectedConnectivity.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

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

            {brandOptions.length > 0 && (
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Brand</h3>
                <div className="flex flex-wrap gap-2">
                    {brandOptions.map(brand => {
                        const isSelected = selectedBrands.includes(brand);
                        return (
                            <button
                                key={brand}
                                onClick={() => toggleBrand(brand)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all border ${
                                    isSelected
                                        ? 'bg-cyan-50 border-cyan-500 text-cyan-700 shadow-sm'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-cyan-300 hover:bg-cyan-50/50'
                                }`}
                            >
                                {brand}
                            </button>
                        );
                    })}
                </div>
            </div>
            )}

            {accessoryTypeOptions.length > 0 && (
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                    {accessoryTypeOptions.map(t => {
                        const isSelected = selectedAccessoryTypes.includes(t);
                        return (
                            <button
                                key={t}
                                onClick={() => toggleAccessoryType(t)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all border ${
                                    isSelected
                                        ? 'bg-cyan-50 border-cyan-500 text-cyan-700 shadow-sm'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-cyan-300 hover:bg-cyan-50/50'
                                }`}
                            >
                                {formatAccessoryTypeLabel(t)}
                            </button>
                        );
                    })}
                </div>
            </div>
            )}

            {connectivityOptions.length > 0 && (
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Connectivity</h3>
                <div className="flex flex-wrap gap-2">
                    {connectivityOptions.map(c => {
                        const isSelected = selectedConnectivity.includes(c);
                        return (
                            <button
                                key={c}
                                onClick={() => toggleConnectivity(c)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all border ${
                                    isSelected
                                        ? 'bg-cyan-50 border-cyan-500 text-cyan-700 shadow-sm'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-cyan-300 hover:bg-cyan-50/50'
                                }`}
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>
            </div>
            )}

            {/* Price Range Slider */}
            <div>
                <h3 className="text-gray-900 font-semibold mb-3">Price Range</h3>
                <DualRangeSlider
                    min={0}
                    max={maxPrice}
                    step={5000}
                    value={priceRange}
                    onChange={(newRange) => {
                        setPriceRange(newRange);
                        handleFilterChange();
                    }}
                    minGap={5000}
                />
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
                            All <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Accessories</span>
                        </h1>
                        <p className="text-gray-500">
                            {filteredProducts.length} accessories available
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
                                placeholder="Search by name, brand, category, or features..."
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
                        className="hidden lg:block w-64 flex-shrink-0 self-start sticky top-24"
                    >
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-h-[calc(100vh-7rem)] overflow-y-auto">
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
                                    className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-gray-200 z-50 p-6 flex flex-col"
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
                                    <div className="flex-1 overflow-y-auto">
                                        <FilterSidebar />
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={() => setShowMobileFilters(false)}
                                            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all text-center"
                                        >
                                            Show {filteredProducts.length} Results
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Products Grid */}
                    <div className="flex-1 min-w-0 pb-20">
                        {displayedProducts.length > 0 ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
                                >
                                    {displayedProducts.map((product, index) => (
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

                                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
                                                                <Tag size={12} className="flex-shrink-0" />
                                                                <span>{formatAccessoryTypeLabel(product.accessoryType)}</span>
                                                            </div>
                                                            {product.specs?.keyFeature && (
                                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
                                                                    <Package size={12} className="flex-shrink-0" />
                                                                    <span className="line-clamp-2">{product.specs.keyFeature}</span>
                                                                </div>
                                                            )}
                                                            {product.specs?.connectivity && (
                                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
                                                                    <Usb size={12} className="flex-shrink-0" />
                                                                    <span className="line-clamp-2">{product.specs.connectivity}</span>
                                                                </div>
                                                            )}
                                                            {product.specs?.compatibility && (
                                                                <div className="col-span-2 flex items-start gap-1.5 text-xs text-gray-500 min-w-0">
                                                                    <span className="font-medium text-gray-400 shrink-0">For:</span>
                                                                    <span className="line-clamp-2">{product.specs.compatibility}</span>
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

                                {/* Infinite Scroll Loader Target */}
                                {hasMore && (
                                    <div 
                                        ref={loadMoreRef} 
                                        className="mt-12 flex flex-col items-center justify-center p-6 space-y-4"
                                    >
                                        <AnimatePresence>
                                            {isLoadingMore && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="flex flex-col items-center"
                                                >
                                                    <div className="w-8 h-8 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin mb-3"></div>
                                                    <span className="text-sm font-medium text-gray-500 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                                                        Discovering premium accessories...
                                                    </span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
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
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No accessories found</h3>
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
