import { FieldValue } from 'firebase/firestore';

export interface PostData {
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
    postId: string;
    commentCount: number;
}

export interface CommentData {
    postId: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: FieldValue;
    updatedAt: FieldValue;
    commentId: string;
    postTitle: string;
}

export interface LikePostData {
    postContent: string;
    added: FieldValue;

    postId: string;
    postTitle: string;
}

export interface TagOption {
    label: string;
    value: string;
}
