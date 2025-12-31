// Extended product data for the All Products page
export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    condition: 'Like New' | 'Excellent' | 'Good' | 'Fair';
    specs: {
        processor: string;
        ram: string;
        storage: string;
        screen: string;
    };
    image: string;
    images: string[];
    category: 'laptop' | 'component';
    featured: boolean;
}

export const products: Product[] = [
    {
        id: 'macbook-pro-m1-14',
        name: 'MacBook Pro 14-inch',
        brand: 'Apple',
        price: 125000,
        originalPrice: 199900,
        condition: 'Like New',
        specs: {
            processor: 'Apple M1 Pro',
            ram: '16GB Unified',
            storage: '512GB SSD',
            screen: '14.2" Liquid Retina XDR'
        },
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
            'https://images.unsplash.com/photo-1541807084-5c52b6b92e0b?w=800&q=80',
            'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&q=80'
        ],
        category: 'laptop',
        featured: true
    },
    {
        id: 'macbook-air-m2',
        name: 'MacBook Air M2',
        brand: 'Apple',
        price: 82000,
        originalPrice: 119900,
        condition: 'Excellent',
        specs: {
            processor: 'Apple M2',
            ram: '8GB Unified',
            storage: '256GB SSD',
            screen: '13.6" Liquid Retina'
        },
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
            'https://images.unsplash.com/photo-1541807084-5c52b6b92e0b?w=800&q=80',
            'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&q=80'
        ],
        category: 'laptop',
        featured: true
    },
    {
        id: 'dell-xps-15',
        name: 'Dell XPS 15',
        brand: 'Dell',
        price: 95000,
        originalPrice: 145000,
        condition: 'Like New',
        specs: {
            processor: 'Intel Core i7-12700H',
            ram: '16GB DDR5',
            storage: '512GB NVMe',
            screen: '15.6" OLED 3.5K'
        },
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
        ],
        category: 'laptop',
        featured: true
    },
    {
        id: 'hp-spectre-x360',
        name: 'HP Spectre x360',
        brand: 'HP',
        price: 78000,
        originalPrice: 125000,
        condition: 'Excellent',
        specs: {
            processor: 'Intel Core i7-1165G7',
            ram: '16GB DDR4',
            storage: '1TB SSD',
            screen: '13.5" OLED Touch'
        },
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
        ],
        category: 'laptop',
        featured: true
    },
    {
        id: 'lenovo-thinkpad-x1',
        name: 'Lenovo ThinkPad X1 Carbon',
        brand: 'Lenovo',
        price: 89000,
        originalPrice: 140000,
        condition: 'Like New',
        specs: {
            processor: 'Intel Core i7-1270P',
            ram: '16GB DDR5',
            storage: '512GB SSD',
            screen: '14" 2.8K OLED'
        },
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
        ],
        category: 'laptop',
        featured: false
    },
    {
        id: 'asus-rog-zephyrus',
        name: 'ASUS ROG Zephyrus G14',
        brand: 'Asus',
        price: 115000,
        originalPrice: 165000,
        condition: 'Excellent',
        specs: {
            processor: 'AMD Ryzen 9 6900HS',
            ram: '16GB DDR5',
            storage: '1TB SSD',
            screen: '14" QHD 120Hz'
        },
        image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80',
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
            'https://images.unsplash.com/photo-1541807084-5c52b6b92e0b?w=800&q=80'
        ],
        category: 'laptop',
        featured: false
    },
    {
        id: 'dell-latitude-5520',
        name: 'Dell Latitude 5520',
        brand: 'Dell',
        price: 52000,
        originalPrice: 85000,
        condition: 'Good',
        specs: {
            processor: 'Intel Core i5-1145G7',
            ram: '8GB DDR4',
            storage: '256GB SSD',
            screen: '15.6" FHD'
        },
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80'
        ],
        category: 'laptop',
        featured: false
    },
    {
        id: 'hp-elitebook-840',
        name: 'HP EliteBook 840 G8',
        brand: 'HP',
        price: 65000,
        originalPrice: 110000,
        condition: 'Excellent',
        specs: {
            processor: 'Intel Core i7-1185G7',
            ram: '16GB DDR4',
            storage: '512GB SSD',
            screen: '14" FHD IPS'
        },
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
            'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'
        ],
        category: 'laptop',
        featured: false
    },
    {
        id: 'macbook-pro-m2-13',
        name: 'MacBook Pro 13-inch M2',
        brand: 'Apple',
        price: 99000,
        originalPrice: 149900,
        condition: 'Like New',
        specs: {
            processor: 'Apple M2',
            ram: '8GB Unified',
            storage: '256GB SSD',
            screen: '13.3" Retina'
        },
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
            'https://images.unsplash.com/photo-1541807084-5c52b6b92e0b?w=800&q=80',
            'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&q=80'
        ],
        category: 'laptop',
        featured: false
    },
    {
        id: 'acer-swift-3',
        name: 'Acer Swift 3',
        brand: 'Acer',
        price: 45000,
        originalPrice: 72000,
        condition: 'Good',
        specs: {
            processor: 'Intel Core i5-1135G7',
            ram: '8GB DDR4',
            storage: '512GB SSD',
            screen: '14" FHD IPS'
        },
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80'
        ],
        category: 'laptop',
        featured: false
    },
    {
        id: 'lenovo-yoga-9i',
        name: 'Lenovo Yoga 9i',
        brand: 'Lenovo',
        price: 98000,
        originalPrice: 155000,
        condition: 'Excellent',
        specs: {
            processor: 'Intel Core i7-1260P',
            ram: '16GB DDR5',
            storage: '512GB SSD',
            screen: '14" 4K OLED Touch'
        },
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
        ],
        category: 'laptop',
        featured: false
    },
    {
        id: 'asus-vivobook-15',
        name: 'ASUS VivoBook 15',
        brand: 'Asus',
        price: 38000,
        originalPrice: 58000,
        condition: 'Good',
        specs: {
            processor: 'AMD Ryzen 5 5500U',
            ram: '8GB DDR4',
            storage: '256GB SSD',
            screen: '15.6" FHD'
        },
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80'
        ],
        category: 'laptop',
        featured: false
    }
];

export const brands = [
    { name: 'Apple', logo: '🍎', color: '#A3AAAE' },
    { name: 'Dell', logo: '💻', color: '#007DB8' },
    { name: 'HP', logo: '🖥️', color: '#0096D6' },
    { name: 'Asus', logo: '⚡', color: '#00539B' },
    { name: 'Lenovo', logo: '🔴', color: '#E2231A' },
    { name: 'Acer', logo: '🟢', color: '#83B81A' }
];

export const testimonials = [
    {
        id: 1,
        name: 'Rahul Sharma',
        location: 'Mumbai',
        rating: 5,
        text: 'Got my MacBook Pro at half the price. Looks and works brand new. Amazing service!',
        avatar: 'RS'
    },
    {
        id: 2,
        name: 'Priya Patel',
        location: 'Bangalore',
        rating: 5,
        text: 'The exchange offer was fantastic. ₹5000 bonus on my old laptop made the deal sweeter.',
        avatar: 'PP'
    },
    {
        id: 3,
        name: 'Arjun Menon',
        location: 'Delhi',
        rating: 5,
        text: 'Professional packaging and quick delivery. The laptop was exactly as described.',
        avatar: 'AM'
    },
    {
        id: 4,
        name: 'Sneha Reddy',
        location: 'Hyderabad',
        rating: 5,
        text: 'Best refurbished laptop store in India. The quality check is top-notch.',
        avatar: 'SR'
    },
    {
        id: 5,
        name: 'Vikram Singh',
        location: 'Pune',
        rating: 5,
        text: 'Saved 40% on my Dell XPS. No compromises on quality. Highly recommended!',
        avatar: 'VS'
    }
];

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getFeaturedProducts(): Product[] {
    return products.filter(p => p.featured);
}
