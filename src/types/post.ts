import firebase from 'firebase/compat/app';

interface PostData {
    authorId: string;
    category: string;
    content: string;
    createdAt: firebase.firestore.Timestamp;
    tags: string[];
    title: string;
    updatedAt: firebase.firestore.Timestamp;
    attachments: string[];
    authorName: string;
    likeCount: number;
    viewCount: number;
}

export type { PostData };
