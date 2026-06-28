import type { Blog } from './types';

const BASE_URL = 'https://www.maccindia.in';

export function blogPageTitle(blog: Blog): string {
    return blog.metaTitle?.trim() || blog.title;
}

export function blogPageDescription(blog: Blog): string {
    return blog.metaDescription?.trim() || blog.excerpt.trim();
}

export function blogCanonicalUrl(blog: Blog): string {
    return `${BASE_URL}/blog/${blog.slug}`;
}

export function blogOpenGraphImage(blog: Blog): string | null {
    return blog.coverImage?.trim() || null;
}

export function formatBlogDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function blogPostingJsonLd(blog: Blog) {
    const description = blogPageDescription(blog);
    const url = blogCanonicalUrl(blog);
    const image = blogOpenGraphImage(blog);

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description,
        image: image ? [image] : undefined,
        datePublished: (blog.publishedAt ?? blog.createdAt).toISOString(),
        dateModified: blog.updatedAt.toISOString(),
        author: {
            '@type': 'Organization',
            name: 'Macc-India',
            url: BASE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Macc-India',
            url: BASE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/macc-logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        url,
        keywords: blog.keywords.length > 0 ? blog.keywords.join(', ') : undefined,
    };
}
