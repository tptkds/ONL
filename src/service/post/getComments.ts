import { db } from '@/app/firebase';
import { CommentData } from '@/types/post';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function getComments(postId: string) {
    const postRef = collection(db, 'comments');
    const q = query(postRef, where('postId', '==', postId));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data() as CommentData) || [];
    console.log(data);
    return data;
}
