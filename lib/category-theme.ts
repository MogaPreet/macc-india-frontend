export type CategoryAccent = {
    from: string;
    to: string;
    gradient: string;
    glow: string;
    glowRgba: string;
};

const DEFAULT_ACCENT: CategoryAccent = {
    from: 'from-cyan-500',
    to: 'to-blue-500',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/40',
    glowRgba: 'rgba(6, 182, 212, 0.35)',
};

const accentBySlug: Record<string, CategoryAccent> = {
    'gaming-enthusiast': {
        from: 'from-purple-500',
        to: 'to-pink-500',
        gradient: 'from-purple-500 to-pink-500',
        glow: 'shadow-purple-500/40',
        glowRgba: 'rgba(168, 85, 247, 0.35)',
    },
    gaming: {
        from: 'from-purple-500',
        to: 'to-pink-500',
        gradient: 'from-purple-500 to-pink-500',
        glow: 'shadow-purple-500/40',
        glowRgba: 'rgba(168, 85, 247, 0.35)',
    },
    'the-developer': {
        from: 'from-cyan-500',
        to: 'to-blue-500',
        gradient: 'from-cyan-500 to-blue-500',
        glow: 'shadow-cyan-500/40',
        glowRgba: 'rgba(6, 182, 212, 0.35)',
    },
    developer: {
        from: 'from-cyan-500',
        to: 'to-blue-500',
        gradient: 'from-cyan-500 to-blue-500',
        glow: 'shadow-cyan-500/40',
        glowRgba: 'rgba(6, 182, 212, 0.35)',
    },
    'the-student': {
        from: 'from-emerald-500',
        to: 'to-teal-500',
        gradient: 'from-emerald-500 to-teal-500',
        glow: 'shadow-emerald-500/40',
        glowRgba: 'rgba(16, 185, 129, 0.35)',
    },
    student: {
        from: 'from-emerald-500',
        to: 'to-teal-500',
        gradient: 'from-emerald-500 to-teal-500',
        glow: 'shadow-emerald-500/40',
        glowRgba: 'rgba(16, 185, 129, 0.35)',
    },
    'business-professional': {
        from: 'from-amber-500',
        to: 'to-orange-500',
        gradient: 'from-amber-500 to-orange-500',
        glow: 'shadow-amber-500/40',
        glowRgba: 'rgba(245, 158, 11, 0.35)',
    },
    'the-business-professional': {
        from: 'from-amber-500',
        to: 'to-orange-500',
        gradient: 'from-amber-500 to-orange-500',
        glow: 'shadow-amber-500/40',
        glowRgba: 'rgba(245, 158, 11, 0.35)',
    },
    'creative-professional': {
        from: 'from-rose-500',
        to: 'to-pink-400',
        gradient: 'from-rose-500 to-pink-400',
        glow: 'shadow-rose-500/40',
        glowRgba: 'rgba(244, 63, 94, 0.35)',
    },
    'everyday-home-user': {
        from: 'from-blue-400',
        to: 'to-indigo-500',
        gradient: 'from-blue-400 to-indigo-500',
        glow: 'shadow-blue-500/40',
        glowRgba: 'rgba(59, 130, 246, 0.35)',
    },
    'the-everydayhome-user': {
        from: 'from-blue-400',
        to: 'to-indigo-500',
        gradient: 'from-blue-400 to-indigo-500',
        glow: 'shadow-blue-500/40',
        glowRgba: 'rgba(59, 130, 246, 0.35)',
    },
};

const fallbackBySlug: Record<string, string> = {
    'gaming-enthusiast':
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1600',
    gaming:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1600',
    'the-developer':
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600',
    'the-student':
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600',
    'business-professional':
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
    'creative-professional':
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1600',
    'everyday-home-user':
        'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1600',
};

const DEFAULT_FALLBACK =
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1600';

function resolveSlugKey(slug: string): string | null {
    if (accentBySlug[slug]) return slug;
    const keys = Object.keys(accentBySlug);
    const match = keys.find(
        (key) => slug.includes(key) || key.includes(slug)
    );
    return match ?? null;
}

/** Resolve accent from slug map, optionally overridden by Firestore gradient string. */
export function getCategoryAccent(
    slug: string,
    firestoreColor?: string | null
): CategoryAccent {
    const key = resolveSlugKey(slug);
    const mapped = (key && accentBySlug[key]) || DEFAULT_ACCENT;

    if (firestoreColor && firestoreColor.includes('from-') && firestoreColor.includes('to-')) {
        const parts = firestoreColor.trim().split(/\s+/);
        const from = parts.find((p) => p.startsWith('from-')) || mapped.from;
        const to = parts.find((p) => p.startsWith('to-')) || mapped.to;
        return {
            ...mapped,
            from,
            to,
            gradient: `${from} ${to}`,
        };
    }

    return mapped;
}

export function getCategoryMediaFallback(slug: string): string {
    if (fallbackBySlug[slug]) return fallbackBySlug[slug];
    const key = resolveSlugKey(slug);
    if (key && fallbackBySlug[key]) return fallbackBySlug[key];
    return DEFAULT_FALLBACK;
}

/** Best media for a category: gif → image → themed fallback. */
export function getCategoryHeroMedia(category: {
    slug: string;
    gifUrl?: string | null;
    image?: string | null;
}): string {
    return (
        category.gifUrl ||
        category.image ||
        getCategoryMediaFallback(category.slug)
    );
}

export function getCategorySupportLine(name: string, count: number): string {
    const noun = count === 1 ? 'laptop' : 'laptops';
    return `Certified refurbished ${name.toLowerCase()} ${noun}, tested and ready to ship.`;
}
