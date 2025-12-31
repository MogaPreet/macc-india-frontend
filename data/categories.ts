// Category data with images for category pages
export interface Category {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    image: string;
    color: string;
    bgGlow: string;
    priceRange: string;
    priceMin: number;
    priceMax: number;
}

export const categories: Category[] = [
    {
        id: 'budget',
        name: 'Budget Friendly',
        description: 'Quality laptops under ₹50,000',
        longDescription: 'Discover amazing refurbished laptops that deliver excellent value without breaking the bank. Perfect for everyday computing, web browsing, and light productivity tasks.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&q=80',
        color: 'from-emerald-400 to-teal-500',
        bgGlow: 'rgba(16, 185, 129, 0.3)',
        priceRange: '₹25K - ₹50K',
        priceMin: 0,
        priceMax: 50000,
    },
    {
        id: 'gaming',
        name: 'Gaming Beasts',
        description: 'High-performance for serious gamers',
        longDescription: 'Power up your gaming with our premium refurbished gaming laptops. Featuring dedicated GPUs, high-refresh displays, and powerful processors for an immersive gaming experience.',
        image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1600&q=80',
        color: 'from-purple-500 to-pink-500',
        bgGlow: 'rgba(168, 85, 247, 0.3)',
        priceRange: '₹60K - ₹1.5L',
        priceMin: 60000,
        priceMax: 150000,
    },
    {
        id: 'office',
        name: 'Office Pro',
        description: 'Productivity powerhouses',
        longDescription: 'Boost your workplace productivity with reliable business laptops. Built for professionals who need dependable performance, excellent battery life, and enterprise-grade security.',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1600&q=80',
        color: 'from-blue-500 to-cyan-500',
        bgGlow: 'rgba(6, 182, 212, 0.3)',
        priceRange: '₹40K - ₹80K',
        priceMin: 40000,
        priceMax: 80000,
    },
    {
        id: 'student',
        name: 'Student Special',
        description: 'Perfect for learning & projects',
        longDescription: 'Affordable laptops designed for students. Great for online classes, research, assignments, and casual entertainment. Get the performance you need at prices you can afford.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=80',
        color: 'from-orange-400 to-amber-500',
        bgGlow: 'rgba(251, 146, 60, 0.3)',
        priceRange: '₹30K - ₹55K',
        priceMin: 30000,
        priceMax: 55000,
    },
    {
        id: 'creative',
        name: 'Creative Studio',
        description: 'For designers & video editors',
        longDescription: 'Unleash your creativity with powerful workstations. Color-accurate displays, powerful GPUs, and fast storage make these laptops perfect for design, video editing, and 3D rendering.',
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1600&q=80',
        color: 'from-rose-500 to-red-500',
        bgGlow: 'rgba(244, 63, 94, 0.3)',
        priceRange: '₹70K - ₹1.8L',
        priceMin: 70000,
        priceMax: 180000,
    },
    {
        id: 'developer',
        name: 'Developer Setup',
        description: 'Code anywhere, deploy everywhere',
        longDescription: 'Engineered for developers who demand the best. Fast compilation, smooth multitasking, and excellent keyboards for those long coding sessions. Your perfect coding companion.',
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&q=80',
        color: 'from-indigo-500 to-violet-500',
        bgGlow: 'rgba(99, 102, 241, 0.3)',
        priceRange: '₹55K - ₹1.2L',
        priceMin: 55000,
        priceMax: 120000,
    },
];

export function getCategoryById(id: string): Category | undefined {
    return categories.find(c => c.id === id);
}
