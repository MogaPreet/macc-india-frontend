import type { Combo, ComboComponent, Product } from '@/lib/types';

/**
 * Business rules (storefront messaging — admin handles real inventory):
 *
 * - The bundle is considered "available to order / inquire" only when combo.stock > 0.
 * - We still surface component-level gaps: missing Firestore product docs, or any resolved
 *   line item where product.stock is a finite number and is < required quantity.
 *   (If stock is undefined on a product, we do not block messaging — legacy docs.)
 */
export type ComboAvailability = {
    /** True when combo.stock > 0 (primary gate for "Get this bundle" CTA). */
    comboInStock: boolean;
    /** True when any resolved product has insufficient stock for its line quantity. */
    hasInsufficientComponentStock: boolean;
    /** Product ids in the combo that did not resolve to a live product doc. */
    missingProductIds: string[];
};

export function getComboAvailability(
    combo: Combo,
    components: ComboComponent[],
    productById: Map<string, Product | null>
): ComboAvailability {
    const comboInStock = combo.stock > 0;
    const missingProductIds: string[] = [];
    let hasInsufficientComponentStock = false;

    for (const c of components) {
        const p = productById.get(c.productId);
        if (!p) {
            missingProductIds.push(c.productId);
            continue;
        }
        if (typeof p.stock === 'number') {
            if (p.stock < c.quantity) {
                hasInsufficientComponentStock = true;
            }
        }
    }

    return { comboInStock, hasInsufficientComponentStock, missingProductIds };
}
