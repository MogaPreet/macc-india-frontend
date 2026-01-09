// Firebase Firestore Types matching database schema

export interface ProductSpecs {
    processor?: string;
    ram?: string;
    storage?: string;
    screen?: string;
    graphics?: string;
    battery?: string;
    os?: string;
    ports?: string;
    weight?: string;
    [key: string]: string | undefined; // Allow additional custom specs
}

export interface IncludedItem {
    name: string;
    icon?: string;
    included: boolean;
}

export interface Warranty {
    duration: string;
    type: string;
    description?: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string;
    brandId: string;
    brandName: string;
    categoryIds: string[];      // Changed from categoryId: string - now supports multiple categories
    categoryNames: string[];    // Changed from categoryName: string - now supports multiple categories
    price: number;
    originalPrice?: number;
    condition: 'Like New' | 'Excellent' | 'Good' | 'Fair';
    stock?: number;
    isFeatured: boolean;
    isActive: boolean;
    images: string[];
    youtubeUrl?: string;
    specs: ProductSpecs;
    includedItems?: IncludedItem[];
    warranty?: Warranty;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    color?: string;
    image?: string;
    order?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Brand {
    id: string;
    name: string;
    logo?: string;
    color?: string;
    isActive: boolean;
    createdAt: Date;
}

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    avatar?: string;
    productId?: string;
    isActive: boolean;
    createdAt: Date;
}

export interface ProductRequest {
    id: string;
    productId: string;
    productName: string;
    productSlug: string;
    customerName: string;
    customerPhone: string;
    status: 'pending' | 'contacted' | 'completed' | 'cancelled';
    createdAt: Date;
}

export interface ContactRequest {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'pending' | 'read' | 'replied' | 'resolved';
    createdAt: Date;
}

export interface PromoOffer {
    id: string;
    title: string;
    subtitle?: string;
    backgroundImage: string;
    productIds: string[];
    startDate?: Date;
    endDate?: Date;
    isActive: boolean;
    createdAt: Date;
}
