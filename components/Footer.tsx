import Link from 'next/link';
import { Heart, MapPin, Mail, Phone } from 'lucide-react';

const footerLinks = {
    shop: [
        { name: 'All Laptops', href: '/#products' },
        { name: 'Systems', href: '/systems' },
        { name: 'Monitors', href: '/monitors' },
        { name: 'Components', href: '/components' },
    ],
    support: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Warranty Info', href: '/warranty' },
        { name: 'Shipping', href: '/shipping' },
        { name: 'FAQs', href: '/faq' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Return Policy', href: '/returns' },
        { name: 'Disclaimer', href: '/disclaimer' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold text-white">
                                Macc-<span className="text-cyan-400">India</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Premium refurbished laptops at sustainable prices. Quality guaranteed.
                        </p>
                        <div className="flex items-center gap-4 text-gray-400">
                            <a href="mailto:hello@macc-india.com" className="hover:text-cyan-400 transition-colors">
                                <Mail size={20} />
                            </a>
                            <a href="tel:+919876543210" className="hover:text-cyan-400 transition-colors">
                                <Phone size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Shop</h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Macc-India. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span>Made with</span>
                            <Heart size={16} className="text-red-500 fill-red-500" />
                            <span>in</span>
                            <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                Ahemdabad
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
