import { db } from '@/app/firebase';
import { PostData } from '@/types/post';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function getAllAccountPosts(
    authorId: string
): Promise<null | PostData[]> {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('authorId', '==', authorId));
    const postsSnap = await getDocs(q);

    if (postsSnap.empty) {
        return null;
    } else {
        let posts: PostData[] = [];
        postsSnap.forEach(doc => posts.push(doc.data() as PostData));
        return posts;
    }
}
