'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

function getYoutubeVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) return match[1];
    }
    return null;
}

export default function ComboYoutubeBlock({ url, title }: { url: string; title: string }) {
    const [open, setOpen] = useState(false);
    const id = getYoutubeVideoId(url);
    if (!id) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg px-1"
            >
                Watch on YouTube
            </a>
        );
    }

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="group relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                aria-label={`Play video: ${title}`}
            >
                <img
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-xl group-hover:scale-105 transition-transform">
                        <Play size={28} className="ml-1" fill="currentColor" />
                    </span>
                </span>
            </button>
        );
    }

    return (
        <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-black">
            <iframe
                title={`YouTube: ${title}`}
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
