import { db } from '@/app/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default async function addLikedPost(userId: string, postId: string) {
    const userRef = doc(db, 'users', userId);
    const likedPostRef = doc(userRef, 'likedPosts', postId);
    await setDoc(likedPostRef, { added: new Date() });
}
