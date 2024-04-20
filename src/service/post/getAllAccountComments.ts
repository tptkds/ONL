import { db } from '@/app/firebase';
import { CommentData } from '@/types/post';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function getAllAccountComments(
    authorId: string
): Promise<null | CommentData[]> {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('authorId', '==', authorId));
    const commentSnap = await getDocs(q);

    if (commentSnap.empty) {
        return null;
    } else {
        let comments: CommentData[] = [];
        commentSnap.forEach(doc => comments.push(doc.data() as CommentData));
        return comments;
    }
}
