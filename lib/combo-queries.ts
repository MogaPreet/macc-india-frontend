import { unstable_cache } from 'next/cache';
import {
    getActiveCombos,
    getComboBySlug,
    getFeaturedCombos,
    getProductsByIdMap,
} from '@/lib/firebase-services';
import type { Combo } from '@/lib/types';
import type { Product } from '@/lib/types';

/** ISR-style revalidation for catalog bundles (seconds). */
const COMBO_REVALIDATE_SEC = 300;

export const getActiveCombosCached = unstable_cache(
    async () => getActiveCombos(),
    ['combos-active-list'],
    { revalidate: COMBO_REVALIDATE_SEC, tags: ['combos'] }
);

export async function getFeaturedCombosCached(limit: number) {
    return unstable_cache(
        async () => getFeaturedCombos(limit),
        ['combos-featured', String(limit)],
        { revalidate: COMBO_REVALIDATE_SEC, tags: ['combos'] }
    )();
}

export async function getComboBySlugCached(slug: string) {
    return unstable_cache(
        async () => getComboBySlug(slug),
        ['combo-by-slug', slug],
        { revalidate: COMBO_REVALIDATE_SEC, tags: ['combos', `combo-${slug}`] }
    )();
}

export type ComboDetailPayload = {
    combo: Combo;
    productById: Map<string, Product | null>;
};

/** Combo doc is cached; product map is loaded in parallel once per request (avoids non-serializable cache issues). */
export async function getComboDetailCached(slug: string): Promise<ComboDetailPayload | null> {
    const combo = await getComboBySlugCached(slug);
    if (!combo) return null;
    const ids = combo.components.map(c => c.productId);
    const productById = await getProductsByIdMap(ids);
    return { combo, productById };
}
