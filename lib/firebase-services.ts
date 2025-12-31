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
    serverTimestamp
} from 'firebase/firestore';
import { Product, Category, Brand, Testimonial, ProductRequest, PromoOffer } from './types';

// Helper to convert Firestore timestamp to Date
const convertTimestamp = (timestamp: Timestamp | undefined): Date => {
    return timestamp?.toDate() || new Date();
};

// Helper to convert Firestore document to Product type
const docToProduct = (doc: any): Product => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name || '',
        slug: data.slug || doc.id,
        description: data.description,
        brandId: data.brandId || '',
        brandName: data.brandName || '',
        categoryId: data.categoryId || '',
        categoryName: data.categoryName || '',
        price: data.price || 0,
        originalPrice: data.originalPrice,
        condition: data.condition || 'Good',
        stock: data.stock,
        isFeatured: data.isFeatured || false,
        isActive: data.isActive !== false,
        images: data.images || [],
        specs: data.specs || {},
        includedItems: data.includedItems,
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
        return snapshot.docs.map(docToProduct);
    } catch (error) {
        console.error('Error fetching products:', error);
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

        if (snapshot.empty) {
            return null;
        }

        return docToProduct(snapshot.docs[0]);
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
        const productsRef = collection(db, 'products');
        const q = query(
            productsRef,
            where('categoryId', '==', categoryId),
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(docToProduct);
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
        const products: Product[] = [];
        for (const id of ids) {
            const productRef = doc(db, 'products', id);
            const snapshot = await getDoc(productRef);
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

