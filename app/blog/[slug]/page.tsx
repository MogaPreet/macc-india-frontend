import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/firebase-services';
import {
    blogCanonicalUrl,
    blogOpenGraphImage,
    blogPageDescription,
    blogPageTitle,
    blogPostingJsonLd,
    formatBlogDate,
} from '@/lib/blog-metadata';
import { ProductDescription } from '@/components/ProductDescription';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    try {
        const slugs = await getAllBlogSlugs();
        return slugs.map(slug => ({ slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return { title: 'Article Not Found' };
    }

    const title = blogPageTitle(blog);
    const description = blogPageDescription(blog);
    const canonical = blogCanonicalUrl(blog);
    const ogImage = blogOpenGraphImage(blog);

    return {
        title,
        description,
        keywords: blog.keywords.length > 0 ? blog.keywords : undefined,
        alternates: { canonical },
        openGraph: {
            title: `${title} | Macc-India`,
            description,
            url: canonical,
            type: 'article',
            publishedTime: (blog.publishedAt ?? blog.createdAt).toISOString(),
            modifiedTime: blog.updatedAt.toISOString(),
            images: ogImage
                ? [{ url: ogImage, width: 1200, height: 630, alt: blog.title }]
                : [],
        },
        twitter: {
            card: ogImage ? 'summary_large_image' : 'summary',
            title: `${title} | Macc-India`,
            description,
            images: ogImage ? [ogImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const jsonLd = blogPostingJsonLd(blog);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <header className="mb-8">
                        {blog.publishedAt && (
                            <time
                                dateTime={blog.publishedAt.toISOString()}
                                className="text-sm text-gray-400 block mb-3"
                            >
                                {formatBlogDate(blog.publishedAt)}
                            </time>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                            {blog.title}
                        </h1>
                        {blog.excerpt && (
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {blog.excerpt}
                            </p>
                        )}
                    </header>

                    {blog.coverImage && (
                        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-gray-200">
                            <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 768px"
                            />
                        </div>
                    )}

                    <div className="prose prose-gray max-w-none">
                        <ProductDescription description={blog.content} />
                    </div>

                    <footer className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <Link
                            href="/blog"
                            className="text-sm text-gray-500 hover:text-cyan-700 transition-colors"
                        >
                            ← All guides
                        </Link>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
                        >
                            Shop refurbished laptops
                        </Link>
                    </footer>
                </article>
            </div>
        </>
    );
}
