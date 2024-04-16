import { db } from '@/app/firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

export default async function deleteLikedPost(userId: string, postId: string) {
    const userRef = doc(db, 'users', userId);
    const likedPostRef = doc(userRef, 'likedPosts', postId);
    await deleteDoc(likedPostRef);
}
