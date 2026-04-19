import { Product, Accessory, AccessoryType } from './types';

// Helper to extract processor family from full processor name
export const getProcessorFamily = (processor: string): string => {
    const lower = processor.toLowerCase();
    if (lower.includes('i9')) return 'Intel i9';
    if (lower.includes('i7')) return 'Intel i7';
    if (lower.includes('i5')) return 'Intel i5';
    if (lower.includes('i3')) return 'Intel i3';
    if (lower.includes('ryzen 9') || lower.includes('r9')) return 'Ryzen 9';
    if (lower.includes('ryzen 7') || lower.includes('r7')) return 'Ryzen 7';
    if (lower.includes('ryzen 5') || lower.includes('r5')) return 'Ryzen 5';
    if (lower.includes('ryzen 3') || lower.includes('r3')) return 'Ryzen 3';
    if (lower.includes('m1') || lower.includes('m2') || lower.includes('m3') || lower.includes('m4')) return 'Apple Silicon';
    if (lower.includes('celeron')) return 'Intel Celeron';
    if (lower.includes('pentium')) return 'Intel Pentium';
    return 'Other';
};

// Helper to check if a processor matches a family
export const processorMatchesFamily = (processor: string, family: string): boolean => {
    const lower = processor.toLowerCase();
    const familyLower = family.toLowerCase();

    if (familyLower.includes('i9')) return lower.includes('i9');
    if (familyLower.includes('i7')) return lower.includes('i7');
    if (familyLower.includes('i5')) return lower.includes('i5');
    if (familyLower.includes('i3')) return lower.includes('i3');
    if (familyLower.includes('ryzen 9')) return lower.includes('ryzen 9') || lower.includes('r9');
    if (familyLower.includes('ryzen 7')) return lower.includes('ryzen 7') || lower.includes('r7');
    if (familyLower.includes('ryzen 5')) return lower.includes('ryzen 5') || lower.includes('r5');
    if (familyLower.includes('ryzen 3')) return lower.includes('ryzen 3') || lower.includes('r3');
    if (familyLower.includes('apple')) return lower.includes('m1') || lower.includes('m2') || lower.includes('m3') || lower.includes('m4');
    if (familyLower.includes('celeron')) return lower.includes('celeron');
    if (familyLower.includes('pentium')) return lower.includes('pentium');
    return false;
};

// Generic helper to get unique values from an array of products for a specific spec field
export const getUniqueSpecValues = (products: (Product | Accessory)[], specKey: string): string[] => {
    const values = products
        .map(p => (p.specs as any)?.[specKey])
        .filter(Boolean) as string[];
    return [...new Set(values)].sort();
};

// Specialized helper for RAM (extracts short version like "16GB")
export const getRAMOptions = (products: (Product | Accessory)[]): string[] => {
    const rams = products.map(p => p.specs?.ram).filter(Boolean) as string[];
    const ramShort = rams.map(r => r.split(' ')[0]);
    return [...new Set(ramShort)].sort((a, b) => {
        const numA = parseInt(a) || 0;
        const numB = parseInt(b) || 0;
        return numA - numB;
    });
};

// Specialized helper for Brands found in the product list
export const getBrandOptions = (products: (Product | Accessory)[]): string[] => {
    const brands = products.map(p => p.brandName).filter(Boolean) as string[];
    return [...new Set(brands)].sort();
};

// Specialized helper for Processor Families
export const getProcessorOptions = (products: (Product | Accessory)[]): string[] => {
    const processors = products.map(p => p.specs?.processor).filter(Boolean) as string[];
    const processorFamilies = processors.map(p => getProcessorFamily(p));
    return [...new Set(processorFamilies)].filter(p => p !== 'Other').sort();
};

// Specialized helper for Accessory Types
export const getAccessoryTypeOptions = (accessories: Accessory[]): AccessoryType[] => {
    const types = accessories.map(a => a.accessoryType).filter(Boolean) as AccessoryType[];
    return [...new Set(types)].sort();
};

const ACCESSORY_TYPE_LABELS: Record<AccessoryType, string> = {
    keyboard: 'Keyboard',
    mouse: 'Mouse',
    graphic_card: 'Graphics card',
    charger: 'Charger',
    cable: 'Cable',
    case_cover: 'Case / cover',
    stand: 'Stand / mount',
    hub: 'Hub / dock',
    audio: 'Audio',
    other: 'Other',
};

export const formatAccessoryTypeLabel = (t: AccessoryType): string => ACCESSORY_TYPE_LABELS[t] || t;

// Tablet / iPad listing: screen from screenSize or display field
export const getTabletScreenOptions = (products: Product[]): string[] => {
    const set = new Set<string>();
    for (const p of products) {
        const v = p.specs?.screenSize || p.specs?.screen;
        if (v) set.add(v);
    }
    return [...set].sort();
};

// Chip line as stored (chipset preferred, else processor)
export const getTabletChipOptions = (products: Product[]): string[] => {
    const set = new Set<string>();
    for (const p of products) {
        const v = p.specs?.chipset || p.specs?.processor;
        if (v) set.add(v);
    }
    return [...set].sort();
};

/** Normalized screen value for filter matching */
export const getProductTabletScreen = (p: Product): string | undefined =>
    p.specs?.screenSize || p.specs?.screen;

/** Normalized chip line for filter matching */
export const getProductTabletChip = (p: Product): string | undefined =>
    p.specs?.chipset || p.specs?.processor;
