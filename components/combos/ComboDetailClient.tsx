'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, Package, Shield } from 'lucide-react';
import type { Combo, ComboComponent, Product } from '@/lib/types';
import { ProductDescription } from '@/components/ProductDescription';
import ComboImageCarousel from '@/components/combos/ComboImageCarousel';
import ComboYoutubeBlock from '@/components/combos/ComboYoutubeBlock';
import ComboProductSpecs from '@/components/combos/ComboProductSpecs';
import { getComboAvailability } from '@/lib/combo-availability';
import ComboInquiryForm from '@/components/combos/ComboInquiryForm';

type ComboDetailClientProps = {
    combo: Combo;
    /** Serializable lookup from server (Map is not passed across RSC boundary). */
    productsById: Record<string, Product | null>;
};

function toMap(record: Record<string, Product | null>): Map<string, Product | null> {
    return new Map(Object.entries(record));
}

function productTypeLabel(type: Product['productType']): string {
    switch (type) {
        case 'monitor':
            return 'Monitor';
        case 'system':
            return 'Desktop';
        case 'ipad':
            return 'Tablet';
        case 'phone':
            return 'Phone';
        default:
            return 'Laptop';
    }
}

export default function ComboDetailClient({ combo, productsById }: ComboDetailClientProps) {
    const productMap = toMap(productsById);
    const sortedComponents = [...combo.components].sort((a, b) => a.sortOrder - b.sortOrder);
    const availability = getComboAvailability(combo, sortedComponents, productMap);

    const savingsPct =
        combo.originalPrice != null && combo.originalPrice > combo.price
            ? Math.round((1 - combo.price / combo.originalPrice) * 100)
            : null;

    const showAvailabilityWarning =
        !availability.comboInStock ||
        availability.hasInsufficientComponentStock ||
        availability.missingProductIds.length > 0;

    return (
        <article className="min-h-screen bg-[var(--background)] pt-24 pb-20">
            <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {showAvailabilityWarning && (
                    <div
                        className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 flex flex-col sm:flex-row sm:items-center gap-2"
                        role="status"
                    >
                        <AlertTriangle className="shrink-0 text-amber-600" size={22} aria-hidden />
                        <div className="text-sm">
                            {!availability.comboInStock && (
                                <p className="font-semibold">This bundle is currently out of stock.</p>
                            )}
                            {availability.comboInStock && availability.hasInsufficientComponentStock && (
                                <p className="font-semibold">
                                    Some items in this bundle may be low on stock — confirm availability with our team.
                                </p>
                            )}
                            {availability.missingProductIds.length > 0 && availability.comboInStock && (
                                <p>
                                    One or more catalogue entries are no longer listed; we&apos;ve kept the bundle page
                                    up with snapshots where possible.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <ComboImageCarousel images={combo.images} alt={combo.name} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className="space-y-6"
                    >
                        {combo.isFeatured && (
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-600/15 border border-cyan-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700">
                                Featured bundle
                            </span>
                        )}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            {combo.name}
                        </h1>

                        <div className="flex flex-wrap items-baseline gap-4">
                            <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                ₹{combo.price.toLocaleString('en-IN')}
                            </span>
                            {combo.originalPrice != null && combo.originalPrice > combo.price && (
                                <>
                                    <span className="text-xl text-gray-400 line-through">
                                        ₹{combo.originalPrice.toLocaleString('en-IN')}
                                    </span>
                                    {savingsPct != null && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800">
                                            Save {savingsPct}%
                                        </span>
                                    )}
                                </>
                            )}
                        </div>

                        <p className="text-gray-600">
                            {availability.comboInStock ? (
                                <>
                                    <span className="font-semibold text-emerald-700">{combo.stock} bundle(s)</span>{' '}
                                    allocated for this offer.
                                </>
                            ) : (
                                <span className="font-semibold text-gray-700">Unavailable — stock exhausted.</span>
                            )}
                        </p>

                        <ComboInquiryForm
                            comboId={combo.id}
                            comboName={combo.name}
                            comboSlug={combo.slug}
                            comboPrice={combo.price}
                        />

                        <p className="text-center">
                            <Link
                                href="/combos"
                                className="text-sm font-semibold text-cyan-700 hover:text-cyan-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
                            >
                                ← All bundles
                            </Link>
                        </p>
                    </motion.div>
                </div>

                {combo.description?.trim() && (
                    <section className="mt-14 max-w-3xl" aria-labelledby="combo-story-heading">
                        <h2 id="combo-story-heading" className="text-xl font-bold text-gray-900 mb-4">
                            The story
                        </h2>
                        <ProductDescription description={combo.description} />
                    </section>
                )}

                {combo.youtubeUrl && (
                    <section className="mt-12" aria-label="Bundle video">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Video</h2>
                        <ComboYoutubeBlock url={combo.youtubeUrl} title={combo.name} />
                    </section>
                )}
            </header>

            <section
                className="mt-20 border-t border-gray-200/80"
                aria-labelledby="included-heading"
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
                    <h2 id="included-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
                        What&apos;s included
                    </h2>
                    <p className="mt-2 text-gray-600 max-w-2xl">
                        Every item in this bundle, shown with the same depth as our product pages — specs, warranty, and
                        what ships in the box.
                    </p>
                </div>

                {sortedComponents.map((comp, idx) => (
                    <IncludedLineItem
                        key={`${comp.productId}-${idx}`}
                        comp={comp}
                        product={productMap.get(comp.productId) ?? null}
                        index={idx}
                    />
                ))}
            </section>
        </article>
    );
}

function IncludedLineItem({
    comp,
    product,
    index,
}: {
    comp: ComboComponent;
    product: Product | null;
    index: number;
}) {
    const altBg = index % 2 === 1;
    const title = product?.name ?? comp.productNameSnapshot ?? 'Included item';
    const brand = product?.brandName;
    const images = product?.images?.length ? product.images : [];
    const typeBadge = product ? productTypeLabel(product.productType) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
            className={`py-16 sm:py-20 ${altBg ? 'bg-white/80' : 'bg-[var(--background)]'}`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div>
                    <ComboImageCarousel
                        images={images}
                        alt={title}
                        aspectClassName="aspect-[4/3]"
                        className="shadow-lg"
                    />
                    {!product && (
                        <p className="mt-4 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                            This product is no longer in our catalogue. Name on file:{' '}
                            <span className="font-semibold">{comp.productNameSnapshot ?? comp.productId}</span>.
                        </p>
                    )}
                </div>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {typeBadge && (
                            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200/80">
                                {typeBadge}
                            </span>
                        )}
                        <span className="text-xs font-medium text-gray-500">Qty ×{comp.quantity}</span>
                    </div>
                    {brand && <div className="text-sm font-semibold text-cyan-600 mb-1">{brand}</div>}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        {product ? (
                            <Link
                                href={`/product/${product.slug}`}
                                className="hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm"
                            >
                                {title}
                            </Link>
                        ) : (
                            title
                        )}
                    </h3>

                    {product && (
                        <>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                                <span>
                                    Unit price{' '}
                                    <span className="font-bold text-gray-900">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </span>
                                </span>
                                <span className="text-gray-400">|</span>
                                <span>
                                    Condition{' '}
                                    <span className="font-semibold text-gray-900">{product.condition}</span>
                                </span>
                                {typeof product.stock === 'number' && (
                                    <>
                                        <span className="text-gray-400">|</span>
                                        <span>
                                            Stock{' '}
                                            <span
                                                className={
                                                    product.stock < comp.quantity
                                                        ? 'font-semibold text-amber-700'
                                                        : 'font-semibold text-gray-900'
                                                }
                                            >
                                                {product.stock}
                                            </span>
                                        </span>
                                    </>
                                )}
                            </div>

                            {product.description?.trim() && (
                                <div className="mb-8">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                                        Overview
                                    </h4>
                                    <ProductDescription description={product.description} />
                                </div>
                            )}

                            {product.includedItems && product.includedItems.length > 0 && (
                                <div className="mb-8 rounded-2xl border border-gray-200/80 bg-white/60 p-5">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                                        <Package size={16} aria-hidden />
                                        In the box
                                    </h4>
                                    <ul className="space-y-2">
                                        {product.includedItems
                                            .filter(i => i.included)
                                            .map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
                                                    <Check
                                                        size={16}
                                                        className="text-emerald-600 shrink-0 mt-0.5"
                                                        aria-hidden
                                                    />
                                                    {item.icon && <span aria-hidden>{item.icon}</span>}
                                                    {item.name}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                            {product.warranty && (
                                <div className="rounded-2xl border border-cyan-200/60 bg-gradient-to-br from-cyan-50/50 to-blue-50/40 p-5 mb-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-800 mb-2 flex items-center gap-2">
                                        <Shield size={16} aria-hidden />
                                        Warranty
                                    </h4>
                                    <p className="font-semibold text-gray-900">
                                        {product.warranty.duration} · {product.warranty.type}
                                    </p>
                                    {product.warranty.description && (
                                        <p className="text-sm text-gray-600 mt-2">{product.warranty.description}</p>
                                    )}
                                </div>
                            )}

                            <ComboProductSpecs product={product} />
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
