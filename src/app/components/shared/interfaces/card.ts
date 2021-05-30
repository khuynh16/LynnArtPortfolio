export interface Card {
    src: string;
    thumbnail?: string;  // object will have this property if object is a video
    alt: string;
    category: string;
    subcategory: string;
}