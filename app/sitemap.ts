import type { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/firebase-services';

const BASE_URL = 'https://www.maccindia.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/returns`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/warranty`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Fetch dynamic product pages
    let productPages: MetadataRoute.Sitemap = [];
    try {
        const products = await getProducts();
        productPages = products.map((product) => ({
            url: `${BASE_URL}/product/${product.slug}`,
            lastModified: product.updatedAt || new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));
    } catch (error) {
        console.error('Error fetching products for sitemap:', error);
    }

    // Fetch dynamic category pages
    let categoryPages: MetadataRoute.Sitemap = [];
    try {
        const categories = await getCategories();
        categoryPages = categories.map((category) => ({
            url: `${BASE_URL}/category/${category.slug}`,
            lastModified: category.updatedAt || new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Error fetching categories for sitemap:', error);
    }

    return [...staticPages, ...productPages, ...categoryPages];
}
