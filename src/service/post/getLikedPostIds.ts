import { db } from '@/app/firebase';
import { LikePostData } from '@/types/post';
import { collection, doc, getDocs } from 'firebase/firestore';

export default async function getLikedPostIds(
    userId: string
): Promise<{ [key: string]: string }> {
    const userRef = doc(db, 'users', userId);
    const likedPostsRef = collection(userRef, 'likedPosts');
    const docsSnapshot = await getDocs(likedPostsRef);
    let ids: { [key: string]: string } = {};
    docsSnapshot.docs.map(doc => {
        const data = doc.data() as LikePostData;
        ids[data.postId] = data.postTitle;
    });
    return ids;
}
