import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getComboDetailCached } from '@/lib/combo-queries';
import { comboDescriptionSnippet, comboOpenGraphImage } from '@/lib/combo-metadata';
import ComboDetailClient from '@/components/combos/ComboDetailClient';
import { getAllComboSlugs } from '@/lib/firebase-services';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    try {
        const slugs = await getAllComboSlugs();
        return slugs.map(slug => ({ slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await getComboDetailCached(slug);
    if (!data) {
        return { title: 'Bundle not found' };
    }
    const { combo, productById } = data;
    const title = `${combo.name} — bundle`;
    const description = comboDescriptionSnippet(combo);
    const ogImage = comboOpenGraphImage(combo, productById);

    return {
        title,
        description,
        alternates: { canonical: `https://www.maccindia.in/combos/${combo.slug}` },
        openGraph: {
            title: `${combo.name} | Macc-India`,
            description,
            url: `https://www.maccindia.in/combos/${combo.slug}`,
            type: 'website',
            images: ogImage
                ? [{ url: ogImage, width: 1200, height: 630, alt: combo.name }]
                : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${combo.name} | Macc-India`,
            description,
            images: ogImage ? [ogImage] : [],
        },
    };
}

export default async function ComboDetailPage({ params }: Props) {
    const { slug } = await params;
    const data = await getComboDetailCached(slug);
    if (!data) notFound();

    const { combo, productById } = data;
    const productsById = Object.fromEntries(productById.entries());

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: combo.name,
        description: comboDescriptionSnippet(combo),
        image: combo.images.length ? combo.images : undefined,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: combo.price,
            availability:
                combo.stock > 0
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
            url: `https://www.maccindia.in/combos/${combo.slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ComboDetailClient combo={combo} productsById={productsById} />
        </>
    );
}
