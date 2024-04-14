import { FieldValue } from 'firebase/firestore';

interface PostData {
    authorId: string;
    category: string;
    content: string;
    createdAt: FieldValue;
    tags: string[];
    title: string;
    updatedAt: FieldValue;
    attachments: string[];
    authorName: string;
    likeCount: number;
    viewCount: number;
}

export type { PostData };
