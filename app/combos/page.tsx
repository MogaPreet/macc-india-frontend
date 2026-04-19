import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { getActiveCombosCached } from '@/lib/combo-queries';
import ComboTeaserCard from '@/components/combos/ComboTeaserCard';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Bundles & combos',
    description:
        'Curated refurbished device bundles — laptops, monitors, and more in one warranty-backed package at Macc-India.',
    alternates: { canonical: 'https://www.maccindia.in/combos' },
    openGraph: {
        title: 'Bundles & combos | Macc-India',
        description: 'Save with curated refurbished bundles. Premium quality, transparent pricing.',
        url: 'https://www.maccindia.in/combos',
        type: 'website',
    },
};

export default async function CombosPage() {
    const combos = await getActiveCombosCached();
    const featured = combos.filter(c => c.isFeatured);
    const rest = combos.filter(c => !c.isFeatured);

    return (
        <main className="min-h-screen bg-[var(--background)] pt-24 pb-20">
            <header className="relative overflow-hidden border-b border-gray-200/80 bg-gradient-to-b from-white to-gray-50/80">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 mb-4">
                        <Sparkles size={16} aria-hidden />
                        Limited bundles
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight max-w-3xl">
                        Combos built for real workflows
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                        Hand-picked pairings from our catalogue — each item is certified refurbished with clear specs and
                        warranty context, presented as one story.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block mt-8 text-sm font-semibold text-cyan-700 hover:text-cyan-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
                    >
                        Shop individual laptops →
                    </Link>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {combos.length === 0 ? (
                    <div
                        className="rounded-2xl border border-dashed border-gray-300 bg-white/50 px-6 py-16 text-center"
                        role="status"
                    >
                        <h2 className="text-xl font-bold text-gray-900">Bundles on the way</h2>
                        <p className="mt-2 text-gray-600 max-w-md mx-auto">
                            We don&apos;t have active combo offers right now. Check back soon or browse our laptop
                            catalogue.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex mt-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-white font-semibold hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                        >
                            View laptops
                        </Link>
                    </div>
                ) : (
                    <>
                        {featured.length > 0 && (
                            <section className="mb-16" aria-labelledby="featured-combos">
                                <h2 id="featured-combos" className="text-2xl font-bold text-gray-900 mb-6">
                                    Featured
                                </h2>
                                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
                                    {featured.map((combo, i) => (
                                        <li key={combo.id}>
                                            <ComboTeaserCard combo={combo} index={i} />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {rest.length > 0 && (
                            <section aria-labelledby="all-combos">
                                <h2 id="all-combos" className="text-2xl font-bold text-gray-900 mb-6">
                                    {featured.length > 0 ? 'All bundles' : 'Bundles'}
                                </h2>
                                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
                                    {rest.map((combo, i) => (
                                        <li key={combo.id}>
                                            <ComboTeaserCard combo={combo} index={i + featured.length} />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
