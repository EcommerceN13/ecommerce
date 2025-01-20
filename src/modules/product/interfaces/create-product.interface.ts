export declare interface CreateProductRequest {
    name: string;
    category_id: number;
    description: string;
    nasiya: 'Tolangan' | 'Tolanmagan' | 'On proccess';
    summary: string;
    price: number;
    rating: number;
    brand_id: number;
    image?: string;
}