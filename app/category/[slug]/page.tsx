import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getCategories, getProductsByCategory } from '@/lib/firebase-services';
import CategoryPageClient from './CategoryPageClient';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    const title = `${category.name} Refurbished Laptops - Best Prices`;
    const description = `Shop refurbished ${category.name} laptops at the best prices in India. Certified pre-owned with warranty. Browse our collection of premium ${category.name} laptops.`;

    return {
        title,
        description,
        keywords: [
            `${category.name} refurbished`,
            `${category.name} used laptop`,
            `${category.name} second hand`,
            `buy ${category.name} laptop India`,
            'refurbished laptops',
        ],
        alternates: {
            canonical: `https://maccindia.in/category/${category.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://maccindia.in/category/${category.slug}`,
            type: 'website',
            images: category.image ? [
                {
                    url: category.image,
                    width: 800,
                    height: 600,
                    alt: `${category.name} Laptops`,
                },
            ] : [],
        },
    };
}

// Generate static params for categories
export async function generateStaticParams() {
    try {
        const categories = await getCategories();
        return categories.map((category) => ({
            slug: category.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const [category, allCategories] = await Promise.all([
        getCategoryBySlug(slug),
        getCategories(),
    ]);

    if (!category) {
        notFound();
    }

    const products = await getProductsByCategory(category.id);
    const otherCategories = allCategories.filter(c => c.slug !== slug && c.isActive);

    // ItemList JSON-LD for category page
    const itemListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${category.name} Refurbished Laptops`,
        description: `Collection of refurbished ${category.name} laptops at Macc-India`,
        numberOfItems: products.length,
        itemListElement: products.slice(0, 10).map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: product.name,
                url: `https://maccindia.in/product/${product.slug}`,
                image: product.images?.[0],
                offers: {
                    '@type': 'Offer',
                    price: product.price,
                    priceCurrency: 'INR',
                    availability: 'https://schema.org/InStock',
                },
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <CategoryPageClient
                category={category}
                products={products}
                otherCategories={otherCategories}
            />
        </>
    );
}
