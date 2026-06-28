import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedBlogs } from '@/lib/firebase-services';
import { formatBlogDate } from '@/lib/blog-metadata';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Refurbished Laptop Guides & Tips',
    description:
        'Expert guides on refurbished laptops, MacBooks, and premium pre-owned devices in India. Tips, buying advice, and warranty insights from Macc-India.',
    keywords: [
        'refurbished laptop guide',
        'buy refurbished laptop India',
        'MacBook buying tips',
        'pre-owned laptop advice',
        'Macc-India blog',
    ],
    alternates: {
        canonical: 'https://www.maccindia.in/blog',
    },
    openGraph: {
        title: 'Refurbished Laptop Guides & Tips | Macc-India',
        description:
            'Expert guides on refurbished laptops and premium pre-owned devices in India.',
        url: 'https://www.maccindia.in/blog',
        type: 'website',
    },
};

export default async function BlogIndexPage() {
    const blogs = await getPublishedBlogs();

    return (
        <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Refurbished Laptop Guides & Tips
                    </h1>
                    <p className="text-gray-600">
                        Buying advice, device guides, and insights on certified pre-owned laptops in India.
                    </p>
                </header>

                {blogs.length === 0 ? (
                    <p className="text-gray-500">No articles published yet.</p>
                ) : (
                    <ul className="space-y-6">
                        {blogs.map(blog => (
                            <li key={blog.id}>
                                <article className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-cyan-200 transition-colors">
                                    <Link href={`/blog/${blog.slug}`} className="group block">
                                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors mb-2">
                                            {blog.title}
                                        </h2>
                                        {blog.publishedAt && (
                                            <time
                                                dateTime={blog.publishedAt.toISOString()}
                                                className="text-sm text-gray-400 block mb-3"
                                            >
                                                {formatBlogDate(blog.publishedAt)}
                                            </time>
                                        )}
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {blog.excerpt}
                                        </p>
                                    </Link>
                                </article>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium text-sm"
                    >
                        Shop refurbished laptops →
                    </Link>
                </div>
            </div>
        </div>
    );
}
