import type { Combo, Product } from '@/lib/types';

export function comboDescriptionSnippet(combo: Combo): string {
    const raw = combo.description?.trim();
    if (!raw) {
        return `${combo.name} — curated refurbished tech bundle with warranty at Macc-India.`;
    }
    if (raw.startsWith('[') || raw.startsWith('{')) {
        return `${combo.name} — premium bundle: multiple devices, one price. Warranty-backed refurbished.`;
    }
    const oneLine = raw.replace(/\s+/g, ' ');
    return oneLine.length > 165 ? `${oneLine.slice(0, 162)}…` : oneLine;
}

export function comboOpenGraphImage(
    combo: Combo,
    productById: Map<string, Product | null>
): string | undefined {
    if (combo.images?.[0]) return combo.images[0];
    for (const c of combo.components) {
        const p = productById.get(c.productId);
        if (p?.images?.[0]) return p.images[0];
    }
    return undefined;
}
