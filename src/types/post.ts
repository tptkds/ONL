export interface Post {
    id: string;
    title: string;
    content: string;
}

export interface PageData {
    posts: Post[];
    lastVisible: string | null;
}
