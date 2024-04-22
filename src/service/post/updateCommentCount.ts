import { db } from '@/app/firebase';
import { doc, increment, updateDoc } from 'firebase/firestore';

export default async function updateCommentCount(
    postId: string,
    isIncrement: boolean
) {
    const postRef = doc(db, 'posts', postId);
    if (isIncrement) await updateDoc(postRef, { commentCount: increment(1) });
    else await updateDoc(postRef, { commentCount: increment(-1) });
}
