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
    // Monitor-specific specs
    panelType?: string;
    resolution?: string;
    refreshRate?: string;
    responseTime?: string;
    displaySize?: string;
    // Phone/iPad-specific specs
    screenSize?: string;
    camera?: string;
    chipset?: string;
    simType?: string;
    connectivity?: string;
    waterResistance?: string;
    biometrics?: string;
    colorOptions?: string;
    pencilSupport?: string;
    keyboardSupport?: string;
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
    productType?: 'laptop' | 'monitor' | 'system' | 'phone' | 'ipad';
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
    gifUrl?: string; // Optional dynamic GIF URL from backend
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

// ============ Accessories (Separate Collection) ============

export interface AccessorySpecs {
    // Keyboard
    layout?: string;
    switchType?: string;
    backlight?: string;
    keyCount?: string;
    // Mouse
    dpi?: string;
    sensorType?: string;
    buttons?: string;
    // Graphic Card
    gpuChipset?: string;
    vram?: string;
    clockSpeed?: string;
    memoryBus?: string;
    powerRequirement?: string;
    cooling?: string;
    cardLength?: string;
    // Charger
    wattage?: string;
    outputPorts?: string;
    fastCharging?: string;
    cableIncluded?: string;
    // Cable
    cableType?: string;
    cableLength?: string;
    dataTransfer?: string;
    powerDelivery?: string;
    // Case/Cover
    deviceCompatibility?: string;
    features?: string;
    // Stand/Mount
    standType?: string;
    adjustable?: string;
    weightCapacity?: string;
    // Hub/Dock
    inputPort?: string;
    hubOutputPorts?: string;
    powerPassthrough?: string;
    // Audio
    audioType?: string;
    driverSize?: string;
    noiseCancellation?: string;
    batteryLife?: string;
    // Shared
    connectivity?: string;
    compatibility?: string;
    material?: string;
    color?: string;
    dimensions?: string;
    weight?: string;
    ports?: string;
    // Other
    category?: string;
    keyFeature?: string;
    [key: string]: string | undefined;
}

export type AccessoryType =
    | 'keyboard'
    | 'mouse'
    | 'graphic_card'
    | 'charger'
    | 'cable'
    | 'case_cover'
    | 'stand'
    | 'hub'
    | 'audio'
    | 'other';

export interface Accessory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    brandId: string;
    brandName: string;
    categoryIds: string[];
    categoryNames: string[];
    accessoryType: AccessoryType;
    price: number;
    originalPrice?: number;
    condition: string;
    stock: number;
    isFeatured: boolean;
    isActive: boolean;
    images: string[];
    specs: AccessorySpecs;
    warranty?: Warranty;
    youtubeUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
