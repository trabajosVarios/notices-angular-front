
export interface NoticesResponse {
    data: BodyNotices[];
}

export interface BodyNotices {
    count: number;
    next: string;
    previous: string;
    results: Notices;
}

export interface Notices {
    id: number;
    title: string; 
    url: string;
    image_url: string; 
    news_site: string; 
    summary: string;
    published_at: Date;
    updated_at: Date;
    featured: boolean;
    launches: any[];
    events: any[];
}