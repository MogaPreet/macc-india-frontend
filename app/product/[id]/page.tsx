import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/firebase-services';
import ProductPageClient from './ProductPageClient';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductBySlug(id);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    const title = `${product.name} - ${product.brandName} Refurbished Laptop`;
    const description = `Buy ${product.name} at ₹${product.price.toLocaleString('en-IN')}. ${product.specs?.processor || ''} ${product.specs?.ram || ''} ${product.specs?.storage || ''}. Certified refurbished with warranty. Best price in India!`;

    return {
        title,
        description,
        keywords: [
            product.name,
            `${product.brandName} refurbished`,
            `${product.brandName} used laptop`,
            product.specs?.processor || '',
            'refurbished laptop India',
            'certified pre-owned laptop',
        ].filter(Boolean),
        alternates: {
            canonical: `https://maccindia.in/product/${product.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://maccindia.in/product/${product.slug}`,
            type: 'website',
            images: product.images?.[0] ? [
                {
                    url: product.images[0],
                    width: 800,
                    height: 600,
                    alt: product.name,
                },
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: product.images?.[0] ? [product.images[0]] : [],
        },
    };
}

// Generate static params for popular products (optional, improves build performance)
export async function generateStaticParams() {
    try {
        const products = await getProducts();
        return products.slice(0, 20).map((product) => ({
            id: product.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProductBySlug(id);

    if (!product) {
        notFound();
    }

    // Product JSON-LD structured data
    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || `${product.brandName} refurbished laptop with ${product.specs?.processor || ''} ${product.specs?.ram || ''} ${product.specs?.storage || ''}`,
        image: product.images || [],
        brand: {
            '@type': 'Brand',
            name: product.brandName,
        },
        offers: {
            '@type': 'Offer',
            url: `https://maccindia.in/product/${product.slug}`,
            priceCurrency: 'INR',
            price: product.price,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/RefurbishedCondition',
            seller: {
                '@type': 'Organization',
                name: 'Macc-India',
            },
        },
        ...(product.specs && {
            additionalProperty: [
                product.specs.processor && {
                    '@type': 'PropertyValue',
                    name: 'Processor',
                    value: product.specs.processor,
                },
                product.specs.ram && {
                    '@type': 'PropertyValue',
                    name: 'RAM',
                    value: product.specs.ram,
                },
                product.specs.storage && {
                    '@type': 'PropertyValue',
                    name: 'Storage',
                    value: product.specs.storage,
                },
                product.specs.screen && {
                    '@type': 'PropertyValue',
                    name: 'Display',
                    value: product.specs.screen,
                },
            ].filter(Boolean),
        }),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <ProductPageClient product={product} />
        </>
    );
}
