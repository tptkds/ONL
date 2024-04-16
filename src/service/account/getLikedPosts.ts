import { db } from '@/app/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';

export default async function getLikedPosts(userId: string) {
    const userRef = doc(db, 'users', userId);
    const likedPostsRef = collection(userRef, 'likedPosts');
    const docsSnapshot = await getDocs(likedPostsRef);
    console.log(docsSnapshot);
    return docsSnapshot.docs.map(doc => doc.id) || [];
}
