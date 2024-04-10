import firebase from 'firebase/compat/app';

interface PostData {
    authorId: string;
    category: string;
    content: string;
    createdAt: firebase.firestore.FieldValue;
    tags: string[];
    title: string;
    updatedAt: firebase.firestore.FieldValue;
}

export type { PostData };
