'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Sparkles } from 'lucide-react';

const navLinks = [
    { name: 'Laptops', href: '/products' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Rentals', href: '/rentals' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        handleScroll(); // Check initial scroll position
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initial background class depends on whether we are on the homepage or not
    const getNavbarBg = () => {
        if (scrolled) {
            return 'bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20';
        }
        if (isHomePage) {
            return 'bg-transparent';
        }
        // Non-home pages get a lighter shade of the scrolled background initially
        return 'bg-gray-900/95 backdrop-blur-md border-b border-white/5';
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarBg()}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                                <img
                                    src="/favicon1.png"
                                    alt="Macc-India Logo"
                                    className="object-cover w-full h-full scale-125"
                                />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg md:text-xl font-bold text-white leading-tight">
                                    Macc-<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">India</span>
                                </span>
                                <motion.svg
                                    className="w-5 h-3.5 rounded-sm shadow-sm origin-left"
                                    viewBox="0 0 900 600"
                                    animate={{
                                        skewY: [0, 3, 0, -3, 0],
                                        scaleY: [1, 1.02, 1, 1.02, 1],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <rect width="900" height="200" fill="#FF9933" />
                                    <rect y="200" width="900" height="200" fill="#FFFFFF" />
                                    <rect y="400" width="900" height="200" fill="#128807" />
                                    <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="10" />
                                    <circle cx="450" cy="300" r="15" fill="#000080" />
                                    <g id="spokes">
                                        {[...Array(24)].map((_, i) => (
                                            <line
                                                key={i}
                                                x1="450" y1="300"
                                                x2={450 + 80 * Math.cos((i * 15 * Math.PI) / 180)}
                                                y2={300 + 80 * Math.sin((i * 15 * Math.PI) / 180)}
                                                stroke="#000080"
                                                strokeWidth="2"
                                            />
                                        ))}
                                    </g>
                                </motion.svg>
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Premium Refurbished</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 font-medium group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Special Offer Badge */}


                        {/* Contact Button */}
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                        >
                            <Phone size={16} />
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-gray-900/98 backdrop-blur-xl border-t border-white/10"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Offer Badge */}
                            <div className="flex items-center gap-2 px-4 py-2 text-amber-400 text-sm">
                                <Sparkles size={14} />
                                <span className="font-medium">Up to 40% Off on Selected Items</span>
                            </div>

                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3.5 rounded-xl font-medium mt-4"
                            >
                                <Phone size={16} />
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    );
}
