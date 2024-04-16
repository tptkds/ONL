import { db } from '@/app/firebase';
import { doc, increment, updateDoc } from 'firebase/firestore';

export default async function incrementViewCount(postId: string) {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { viewCount: increment(1) });
}
