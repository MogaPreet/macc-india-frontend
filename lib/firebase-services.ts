import { db } from './firebase';
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    serverTimestamp,
    type DocumentSnapshot,
} from 'firebase/firestore';
import { Product, Category, Brand, Testimonial, ProductRequest, PromoOffer, Accessory, Combo, ComboComponent } from './types';

// Helper to convert Firestore timestamp to Date
const convertTimestamp = (timestamp: Timestamp | undefined): Date => {
    return timestamp?.toDate() || new Date();
};

// Helper to convert Firestore document to Product type
const docToProduct = (doc: any): Product => {
    const data = doc.data();

    // Handle backward compatibility for category fields
    // New format: categoryIds/categoryNames (arrays)
    // Old format: categoryId/categoryName (single values)
    const categoryIds = data.categoryIds
        ? data.categoryIds
        : (data.categoryId ? [data.categoryId] : []);
    const categoryNames = data.categoryNames
        ? data.categoryNames
        : (data.categoryName ? [data.categoryName] : []);

    return {
        id: doc.id,
        name: data.name || '',
        slug: data.slug || doc.id,
        description: data.description,
        brandId: data.brandId || '',
        brandName: data.brandName || '',
        categoryIds,
        categoryNames,
        price: data.price || 0,
        originalPrice: data.originalPrice,
        condition: data.condition || 'Good',
        stock: data.stock,
        isFeatured: data.isFeatured || false,
        isActive: data.isActive !== false,
        images: data.images || [],
        youtubeUrl: data.youtubeUrl,
        specs: data.specs || {},
        includedItems: data.includedItems,
        warranty: data.warranty,
        productType: data.productType || 'laptop',
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
    };
};

// Helper to convert Firestore document to Accessory type
const docToAccessory = (doc: any): Accessory => {
    const data = doc.data();

    const categoryIds = data.categoryIds
        ? data.categoryIds
        : (data.categoryId ? [data.categoryId] : []);
    const categoryNames = data.categoryNames
        ? data.categoryNames
        : (data.categoryName ? [data.categoryName] : []);

    return {
        id: doc.id,
        name: data.name || '',
        slug: data.slug || doc.id,
        description: data.description,
        brandId: data.brandId || '',
        brandName: data.brandName || '',
        categoryIds,
        categoryNames,
        accessoryType: data.accessoryType || 'other',
        price: data.price || 0,
        originalPrice: data.originalPrice,
        condition: data.condition || 'New',
        stock: data.stock || 0,
        isFeatured: data.isFeatured || false,
        isActive: data.isActive !== false,
        images: data.images || [],
        youtubeUrl: data.youtubeUrl,
        specs: data.specs || {},
        warranty: data.warranty,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
    };
};

// ============ PRODUCTS ============

export async function getProducts(): Promise<Product[]> {
    try {
        const productsRef = collection(db, 'products');
        const q = query(
            productsRef,
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const allProducts = snapshot.docs.map(docToProduct);
        // Only return laptops (backward compat: products without productType are laptops)
        return allProducts.filter(p => !p.productType || p.productType === 'laptop');
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getProductsByType(type: string): Promise<Product[]> {
    try {
        const productsRef = collection(db, 'products');
        const q = query(
            productsRef,
            where('isActive', '==', true),
            where('productType', '==', type),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(docToProduct);
    } catch (error) {
        console.error(`Error fetching ${type} products:`, error);
        return [];
    }
}

// ============ ACCESSORIES ============

export async function getAccessories(): Promise<Accessory[]> {
    try {
        const accessoriesRef = collection(db, 'accessories');
        const q = query(
            accessoriesRef,
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(docToAccessory);
    } catch (error) {
        console.error('Error fetching accessories:', error);
        return [];
    }
}

export async function getAccessoriesByType(type: string): Promise<Accessory[]> {
    try {
        const accessoriesRef = collection(db, 'accessories');
        const q = query(
            accessoriesRef,
            where('isActive', '==', true),
            where('accessoryType', '==', type),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(docToAccessory);
    } catch (error) {
        console.error(`Error fetching ${type} accessories:`, error);
        return [];
    }
}

export async function getFeaturedAccessories(limitCount: number = 4): Promise<Accessory[]> {
    try {
        const accessoriesRef = collection(db, 'accessories');
        const q = query(
            accessoriesRef,
            where('isActive', '==', true),
            where('isFeatured', '==', true),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(docToAccessory);
    } catch (error) {
        console.error('Error fetching featured accessories:', error);
        return [];
    }
}

export async function getFeaturedProducts(limitCount: number = 4): Promise<Product[]> {
    try {
        const productsRef = collection(db, 'products');
        const q = query(
            productsRef,
            where('isActive', '==', true),
            where('isFeatured', '==', true),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(docToProduct);
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const productsRef = collection(db, 'products');
        const q = query(
            productsRef,
            where('slug', '==', slug),
            where('isActive', '==', true),
            limit(1)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            return docToProduct(snapshot.docs[0]);
        }

        // Fallback: Check if it's an accessory since they share the /product/[slug] route
        const accessoriesRef = collection(db, 'accessories');
        const qAcc = query(
            accessoriesRef,
            where('slug', '==', slug),
            where('isActive', '==', true),
            limit(1)
        );
        const accSnapshot = await getDocs(qAcc);

        if (!accSnapshot.empty) {
            const accessory = docToAccessory(accSnapshot.docs[0]);
            // Format accessory as product for frontend compatibility
            return {
                ...accessory,
                productType: accessory.accessoryType as any
            } as unknown as Product;
        }

        return null;
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        return null;
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
            return null;
        }

        return docToProduct(snapshot);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
        // Fetch all active products and filter client-side to support both:
        // - Old format: products with categoryId field (single category)
        // - New format: products with categoryIds array (multiple categories)
        const allProducts = await getProducts();
        return allProducts.filter(product => product.categoryIds.includes(categoryId));
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
}

// ============ CATEGORIES ============

export async function getCategories(): Promise<Category[]> {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(
            categoriesRef,
            where('isActive', '==', true),
            orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || '',
                slug: data.slug || doc.id,
                icon: data.icon,
                color: data.color,
                image: data.image,
                gifUrl: data.gifUrl,
                order: data.order || 0,
                isActive: data.isActive !== false,
                createdAt: convertTimestamp(data.createdAt),
                updatedAt: convertTimestamp(data.updatedAt),
            };
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(
            categoriesRef,
            where('slug', '==', slug),
            where('isActive', '==', true),
            limit(1)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name || '',
            slug: data.slug || doc.id,
            icon: data.icon,
            color: data.color,
            image: data.image,
            order: data.order || 0,
            isActive: data.isActive !== false,
            createdAt: convertTimestamp(data.createdAt),
            updatedAt: convertTimestamp(data.updatedAt),
        };
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        return null;
    }
}

// ============ BRANDS ============

export async function getBrands(): Promise<Brand[]> {
    try {
        const brandsRef = collection(db, 'brands');
        const q = query(
            brandsRef,
            where('isActive', '==', true)
        );
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || '',
                logo: data.logo,
                color: data.color,
                isActive: data.isActive !== false,
                createdAt: convertTimestamp(data.createdAt),
            };
        });
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    }
}

// ============ TESTIMONIALS ============

export async function getTestimonials(): Promise<Testimonial[]> {
    try {
        const testimonialsRef = collection(db, 'testimonials');
        const q = query(
            testimonialsRef,
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || '',
                location: data.location || '',
                rating: data.rating || 5,
                text: data.text || '',
                avatar: data.avatar,
                productId: data.productId,
                isActive: data.isActive !== false,
                createdAt: convertTimestamp(data.createdAt),
            };
        });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
}

// ============ PRODUCT REQUESTS ============

export interface SubmitProductRequestData {
    productId: string;
    productName: string;
    productSlug: string;
    customerName: string;
    customerPhone: string;
}

export async function submitProductRequest(data: SubmitProductRequestData): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        const requestsRef = collection(db, 'productRequests');
        const docRef = await addDoc(requestsRef, {
            ...data,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting product request:', error);
        return { success: false, error: 'Failed to submit request. Please try again.' };
    }
}

/** Same collection as product requests; productId holds the combo Firestore doc id. */
export interface SubmitComboRequestData {
    comboId: string;
    comboName: string;
    comboSlug: string;
    customerName: string;
    customerPhone: string;
}

export async function submitComboRequest(data: SubmitComboRequestData): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        const requestsRef = collection(db, 'productRequests');
        const docRef = await addDoc(requestsRef, {
            productId: data.comboId,
            productName: `[Combo] ${data.comboName}`,
            productSlug: data.comboSlug,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting combo request:', error);
        return { success: false, error: 'Failed to submit request. Please try again.' };
    }
}

// ============ CONTACT REQUESTS ============

export interface SubmitContactRequestData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export async function submitContactRequest(data: SubmitContactRequestData): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        const requestsRef = collection(db, 'contactRequests');
        const docRef = await addDoc(requestsRef, {
            ...data,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting contact request:', error);
        return { success: false, error: 'Failed to send message. Please try again.' };
    }
}

// ============ PROMO OFFERS ============

export async function getActivePromoOffer(): Promise<PromoOffer | null> {
    try {
        const offersRef = collection(db, 'promoOffers');
        const q = query(
            offersRef,
            where('isActive', '==', true),
            orderBy('createdAt', 'desc'),
            limit(1)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        const offer: PromoOffer = {
            id: doc.id,
            title: data.title || '',
            subtitle: data.subtitle,
            backgroundImage: data.backgroundImage || '',
            productIds: data.productIds || [],
            startDate: data.startDate ? convertTimestamp(data.startDate) : undefined,
            endDate: data.endDate ? convertTimestamp(data.endDate) : undefined,
            isActive: data.isActive,
            createdAt: convertTimestamp(data.createdAt),
        };

        // Check date range if exists
        const now = new Date();
        if (offer.startDate && now < offer.startDate) return null;
        if (offer.endDate && now > offer.endDate) return null;

        return offer;
    } catch (error) {
        console.error('Error fetching promo offer:', error);
        return null;
    }
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
    if (!ids || ids.length === 0) return [];

    try {
        const snapshots = await Promise.all(ids.map(id => getDoc(doc(db, 'products', id))));
        const products: Product[] = [];
        for (let i = 0; i < ids.length; i++) {
            const snapshot = snapshots[i];
            if (snapshot.exists()) {
                products.push(docToProduct(snapshot));
            }
        }
        return products;
    } catch (error) {
        console.error('Error fetching products by IDs:', error);
        return [];
    }
}

/**
 * Parallel fetch: map each productId → Product or null if missing/inactive data.
 * Prefer this for combo pages to avoid N+1 sequential getDoc latency.
 */
export async function getProductsByIdMap(ids: string[]): Promise<Map<string, Product | null>> {
    const unique = [...new Set(ids.filter(Boolean))];
    const map = new Map<string, Product | null>();
    if (unique.length === 0) return map;

    try {
        const snapshots = await Promise.all(unique.map(id => getDoc(doc(db, 'products', id))));
        unique.forEach((id, i) => {
            const snapshot = snapshots[i];
            map.set(id, snapshot.exists() ? docToProduct(snapshot) : null);
        });
        return map;
    } catch (error) {
        console.error('Error fetching products by id map:', error);
        unique.forEach(id => map.set(id, null));
        return map;
    }
}

// ============ COMBOS ============
//
// Firestore indexes (create in Firebase console if queries fail):
// - combos: collection group query uses equality on `slug` only below to minimize index needs.
// - Optional: composite (isActive ASC, createdAt DESC) if you switch to query+orderBy in Firestore.
//   Current list query: where isActive == true only is NOT used; we filter in memory after slug lookup
//   For listing, we use: where('isActive','==',true) — single-field index is usually auto-created.

function normalizeComboComponents(raw: unknown): ComboComponent[] {
    if (!Array.isArray(raw)) return [];
    return raw
        .map((c: Record<string, unknown>, i: number) => ({
            productId: String(c.productId ?? ''),
            quantity: typeof c.quantity === 'number' && !Number.isNaN(c.quantity) ? c.quantity : 1,
            sortOrder: typeof c.sortOrder === 'number' && !Number.isNaN(c.sortOrder) ? c.sortOrder : i,
            productNameSnapshot:
                c.productNameSnapshot != null && c.productNameSnapshot !== ''
                    ? String(c.productNameSnapshot)
                    : null,
        }))
        .filter(c => c.productId.length > 0)
        .sort((a, b) => a.sortOrder - b.sortOrder);
}

function docToCombo(docSnap: DocumentSnapshot): Combo {
    const data = docSnap.data()!;
    return {
        id: docSnap.id,
        name: data.name || '',
        slug: data.slug || docSnap.id,
        description: data.description != null ? String(data.description) : null,
        components: normalizeComboComponents(data.components),
        price: typeof data.price === 'number' ? data.price : 0,
        originalPrice: typeof data.originalPrice === 'number' ? data.originalPrice : null,
        stock: typeof data.stock === 'number' ? data.stock : 0,
        isActive: data.isActive !== false,
        isFeatured: data.isFeatured === true,
        images: Array.isArray(data.images) ? data.images.filter((u: unknown) => typeof u === 'string') : [],
        youtubeUrl: data.youtubeUrl != null && data.youtubeUrl !== '' ? String(data.youtubeUrl) : null,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
    };
}

export async function getActiveCombos(): Promise<Combo[]> {
    try {
        const combosRef = collection(db, 'combos');
        const q = query(combosRef, where('isActive', '==', true));
        const snapshot = await getDocs(q);
        const combos = snapshot.docs.map(docToCombo);
        return combos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
        console.error('Error fetching active combos:', error);
        return [];
    }
}

export async function getFeaturedCombos(limitCount: number = 6): Promise<Combo[]> {
    const all = await getActiveCombos();
    const featured = all.filter(c => c.isFeatured);
    return featured.slice(0, limitCount);
}

export async function getComboBySlug(slug: string): Promise<Combo | null> {
    if (!slug?.trim()) return null;
    try {
        const combosRef = collection(db, 'combos');
        const q = query(combosRef, where('slug', '==', slug.trim()), limit(1));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        const combo = docToCombo(snapshot.docs[0]);
        if (!combo.isActive) return null;
        return combo;
    } catch (error) {
        console.error('Error fetching combo by slug:', error);
        return null;
    }
}

export async function getAllComboSlugs(): Promise<string[]> {
    try {
        const combosRef = collection(db, 'combos');
        const q = query(combosRef, where('isActive', '==', true));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => docToCombo(d).slug).filter(Boolean);
    } catch (error) {
        console.error('Error fetching combo slugs:', error);
        return [];
    }
}

