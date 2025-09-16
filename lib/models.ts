

export interface Dealer {
    id: string;
    image: string;
    name: string;
    phone: string;
    joined_since: string;
}


export interface VehicleModel {
    listing_id: string;
    vehicle_type: string;
    vehicle_make: string;
    vehicle_model: string;
    price: string;
    year_of_make: string;
    transmission: string;
    drive: string;
    fuel: string;
    mileage: string;
    engine_capacity: string;
    usage: string;
    financing?: string;
    tradein?: boolean;
    description: string;
    make?: string;
    model?: string;
    price_drop?: any;
    price_dropped?: boolean;
    registration_number?: string; 
    images: any;
    dealer: any;
    status: any;
    expires_at: string;
    slug: string;
    clicks: number;
    location?: string;
    display_type?: string;
    auctions: any;
}



export interface PackageItem {
    pid: string;
    name: string;
    price: string;
    active_days: number;
    discounted_price: number;
    is_discounted: boolean;
    renew_after_hours: number;
    uploads_allowed: number;
}



export interface SparePart {
    id: string;
    vehicle_type: string; 
    title: string; 
    vehicle_make: string; 
    make: string;
    vehicle_model: string;
    model: string;
    parts_type: string;
    spare_name: string;
    condition: string;
    price: string;
    description: string;
    images: any;
    dealer: Dealer;
    status: string;
    expires_at: string;
    slug: string;
}



export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}


export interface BlogModel {
    id: string;
    title: string; 
    slug: string; 
    category: string; 
    image: string; 
    exerpt: string; 
    content: string; 
    uploaded_by: string; 
    uploaded_at: string;
}


