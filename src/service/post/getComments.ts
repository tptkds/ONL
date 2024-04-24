import { db } from '@/app/firebase';
import { CommentData } from '@/types/post';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export default async function getComments(postId: string) {
    const commentsRef = collection(db, 'comments');
    const q = query(
        commentsRef,
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data() as CommentData) || [];
    return data;
}
