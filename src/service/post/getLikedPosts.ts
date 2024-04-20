import { db } from '@/app/firebase';
import { LikePostData } from '@/types/post';
import { collection, doc, getDocs } from 'firebase/firestore';

export default async function getLikedPosts(
    userId: string
): Promise<LikePostData[]> {
    const userRef = doc(db, 'users', userId);
    const likedPostsRef = collection(userRef, 'likedPosts');
    const docsSnapshot = await getDocs(likedPostsRef);
    return docsSnapshot.docs.map(doc => doc.data() as LikePostData) || [];
}
