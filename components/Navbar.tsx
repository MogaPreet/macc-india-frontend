'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';

const navLinks = [
    { name: 'Laptops', href: '/products' },
    {
        name: 'Systems',
        href: '/systems',
        dropdown: [
            { name: 'LED Monitors', href: '/monitors' },
            { name: 'CPUs & Desktops', href: '/systems' }
        ]
    },
    { name: 'Tablet', href: '/tablet', tag: 'New' },
    { name: 'Accessories', href: '/accessories', tag: 'New' }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [canHover, setCanHover] = useState(false);

    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

        const updateHoverCapability = () => {
            setCanHover(mediaQuery.matches);
            if (!mediaQuery.matches) {
                setActiveDropdown(null);
            }
        };

        updateHoverCapability();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', updateHoverCapability);
            return () => mediaQuery.removeEventListener('change', updateHoverCapability);
        } else {
            mediaQuery.addListener(updateHoverCapability);
            return () => mediaQuery.removeListener(updateHoverCapability);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                activeDropdown &&
                !(event.target as Element).closest('.nav-item-dropdown')
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

    const getNavbarBg = () => {
        if (scrolled) {
            return 'bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20';
        }
        if (isHomePage) {
            return 'bg-transparent';
        }
        return 'bg-gray-900/95 backdrop-blur-md border-b border-white/5';
    };

    const handleDropdownToggle = (linkName: string) => {
        setActiveDropdown(prev => (prev === linkName ? null : linkName));
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
                    <Link
                        href="/"
                        onClick={(e) => {
                            if (isHomePage) {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center gap-2 group"
                    >
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
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                Premium Refurbished
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isDropdownOpen = activeDropdown === link.name;

                            return (
                                <div
                                    key={link.name}
                                    className="relative nav-item-dropdown"
                                    onMouseEnter={() => {
                                        if (canHover && link.dropdown) setActiveDropdown(link.name);
                                    }}
                                    onMouseLeave={() => {
                                        if (canHover && link.dropdown) setActiveDropdown(null);
                                    }}
                                >
                                    {link.dropdown ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (!canHover) {
                                                    handleDropdownToggle(link.name);
                                                } else {
                                                    window.location.href = link.href;
                                                }
                                            }}
                                            className="relative flex items-center gap-1.5 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 font-medium group min-h-[44px]"
                                            aria-expanded={isDropdownOpen}
                                            aria-haspopup="menu"
                                        >
                                            {link.name}
                                            <ChevronDown
                                                size={14}
                                                className={`opacity-50 group-hover:opacity-100 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 opacity-100' : ''
                                                    }`}
                                            />
                                            <span
                                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full ${isDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'
                                                    }`}
                                            ></span>
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="relative flex items-center gap-1.5 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 font-medium group min-h-[44px]"
                                        >
                                            {link.name}
                                            {link.tag && (
                                                <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/30">
                                                    {link.tag}
                                                </span>
                                            )}
                                        </Link>
                                    )}

                                    {link.dropdown && (
                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 w-52 pt-2 z-50"
                                                >
                                                    <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-black/40 overflow-hidden flex flex-col p-2">
                                                        {/* <Link
                                                            href={link.href}
                                                            onClick={() => setActiveDropdown(null)}
                                                            className="px-4 py-2.5 text-sm text-cyan-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                        >
                                                            All Systems
                                                        </Link> */}

                                                        {link.dropdown.map((drop) => (
                                                            <Link
                                                                key={drop.name}
                                                                href={drop.href}
                                                                onClick={() => setActiveDropdown(null)}
                                                                className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                            >
                                                                {drop.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/rentals"
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 min-h-[44px]"
                        >
                            Rentals
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors min-h-[44px] min-w-[44px]"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

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
                                        className="flex items-center gap-2 py-3 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium"
                                    >
                                        {link.name}
                                        {link.tag && (
                                            <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/30">
                                                {link.tag}
                                            </span>
                                        )}
                                    </Link>

                                    {link.dropdown && (
                                        <div className="pl-8 flex flex-col gap-1 mt-1">
                                            {link.dropdown.map((drop) => (
                                                <Link
                                                    key={drop.name}
                                                    href={drop.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="py-2 px-4 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                >
                                                    {drop.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            <div className="flex items-center gap-2 px-4 py-2 text-amber-400 text-sm">
                                <Sparkles size={14} />
                                <span className="font-medium">Up to 40% Off on Selected Items</span>
                            </div>

                            <Link
                                href="/rentals"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3.5 rounded-xl font-medium mt-4"
                            >
                                Rentals
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}