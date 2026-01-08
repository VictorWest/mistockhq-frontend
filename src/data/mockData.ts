export interface Worker {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
}

export interface Vendor {
    id: number;
    name: string;
    rating: number;
    image: string;
    description: string;
    tags: string[];
    location: string;
    email: string;
    phone: string;
    workers: Worker[];
}

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stockLevel: number;
    image: string;
    description: string;
    vendorId: number;
}

export const MOCK_VENDORS: Vendor[] = [
    {
        id: 1,
        name: "TechSolutions Inc.",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=200",
        description: "Leading provider of enterprise hardware and server infrastructure.",
        tags: ["Electronics", "Enterprise", "Hardware"],
        location: "San Francisco, CA",
        email: "contact@techsolutions.com",
        phone: "+1 (555) 123-4567",
        workers: [
            {
                id: 'w1',
                name: 'Alice Johnson',
                role: 'Sales Manager',
                bio: 'Expert in enterprise solutions with 10 years of experience.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
            },
            {
                id: 'w2',
                name: 'Bob Smith',
                role: 'Technical Support',
                bio: 'Dedicated support specialist ensuring 24/7 uptime for clients.',
                image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150'
            }
        ]
    },
    {
        id: 2,
        name: "Global Fresh Produce",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200&h=200",
        description: "Direct importer of organic fruits and vegetables from sustainable farms.",
        tags: ["Food", "Organic", "Wholesale"],
        location: "Miami, FL",
        email: "orders@globalfresh.com",
        phone: "+1 (555) 987-6543",
        workers: []
    },
    {
        id: 3,
        name: "ConstructPro Supplies",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200&h=200",
        description: "Heavy machinery and construction materials for large-scale projects.",
        tags: ["Construction", "Industrial", "Heavy Equipment"],
        location: "Dallas, TX",
        email: "sales@constructpro.com",
        phone: "+1 (555) 456-7890",
        workers: []
    },
    {
        id: 4,
        name: "Office Essentials Co.",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200&h=200",
        description: "One-stop shop for modern office furniture and supplies.",
        tags: ["Office", "Furniture", "Design"],
        location: "New York, NY",
        email: "support@officeessentials.com",
        phone: "+1 (555) 789-0123",
        workers: []
    },
    {
        id: 5,
        name: "MediCare Direct",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=200&h=200",
        description: "Certified medical equipment and pharmaceutical supplier.",
        tags: ["Healthcare", "Medical", "Pharma"],
        location: "Boston, MA",
        email: "info@medicaredirect.com",
        phone: "+1 (555) 321-6547",
        workers: []
    },
    {
        id: 6,
        name: "Fashion Forward B2B",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=200&h=200",
        description: "Wholesale fashion apparel and accessories for retailers.",
        tags: ["Fashion", "Apparel", "Retail"],
        location: "Los Angeles, CA",
        email: "wholesale@fashionforward.com",
        phone: "+1 (555) 654-0987",
        workers: []
    }
];

export const MOCK_PRODUCTS: Product[] = [
    // Global Tech Supplies (id: 1)
    { id: 101, vendorId: 1, name: 'Enterprise Server Rack', price: 12500, category: 'Electronics', description: '42U Standard Server Rack', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60', stockLevel: 15 },
    { id: 102, vendorId: 1, name: 'High-Performance Switch', price: 899, category: 'Electronics', description: '48-Port Gigabit Manageable Switch', image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?w=500&auto=format&fit=crop&q=60', stockLevel: 42 },
    { id: 103, vendorId: 1, name: 'Fiber Optic Cable (100m)', price: 250, category: 'Electronics', description: 'Duplex Multimode LC-LC', image: 'https://images.unsplash.com/photo-1531297461136-82lw82a8291?w=500&auto=format&fit=crop&q=60', stockLevel: 800 },

    // Fresh Farm Distributors (id: 2)
    { id: 201, vendorId: 2, name: 'Organic Avocados (Crate)', price: 45, category: 'Groceries', description: 'Premium Hass Avocados', image: 'https://images.unsplash.com/photo-1523049673856-33866850d75a?w=500&auto=format&fit=crop&q=60', stockLevel: 120 },
    { id: 202, vendorId: 2, name: 'Artisan Sourdough Bread', price: 8, category: 'Groceries', description: 'Freshly baked daily', image: 'https://images.unsplash.com/photo-1585476263060-855885342fc7?w=500&auto=format&fit=crop&q=60', stockLevel: 50 },

    // MediCare Pharmacal (id: 3)
    { id: 301, vendorId: 3, name: 'N95 Surgical Masks (Box)', price: 25, category: 'Pharmacy', description: '50pcs per box, FDA Approved', image: 'https://images.unsplash.com/photo-1586942593568-29361efcd571?w=500&auto=format&fit=crop&q=60', stockLevel: 5000 },
    { id: 302, vendorId: 3, name: 'Digital Infrared Thermometer', price: 45, category: 'Pharmacy', description: 'Non-contact temperature measurement', image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=500&auto=format&fit=crop&q=60', stockLevel: 300 },

    // BuildRight Materials (id: 4)
    { id: 401, vendorId: 4, name: 'Portland Cement (50kg)', price: 12, category: 'Construction', description: 'High strength construction cement', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&auto=format&fit=crop&q=60', stockLevel: 1000 },
    { id: 402, vendorId: 4, name: 'Steel Rebar (Ton)', price: 850, category: 'Construction', description: 'Deformed steel reinforcement bars', image: 'https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=500&auto=format&fit=crop&q=60', stockLevel: 50 },

    // Fashion Forward (id: 6)
    { id: 601, vendorId: 6, name: 'Denim Jacket', price: 65, category: 'Apparel', description: 'Classic fit denim jacket', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&auto=format&fit=crop&q=60', stockLevel: 200 },
    { id: 602, vendorId: 6, name: 'Cotton T-Shirt Pack', price: 30, category: 'Apparel', description: 'Pack of 5 heavy cotton shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60', stockLevel: 500 },
];
