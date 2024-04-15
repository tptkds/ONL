import { db } from '@/app/firebase';
import { doc, increment, updateDoc } from 'firebase/firestore';

export default async function updateLikeCount(
    postId: string,
    isIncrement: boolean
) {
    const postRef = doc(db, 'posts', postId);
    if (isIncrement) await updateDoc(postRef, { likeCount: increment(1) });
    else await updateDoc(postRef, { likeCount: increment(-1) });
}
