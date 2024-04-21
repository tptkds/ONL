import { db } from '@/app/firebase';
import { PAGE_SIZE } from '@/constants/post';
import { PostData } from '@/types/post';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export default async function getPostsForPage(
    pageNumber: number
): Promise<PostData[]> {
    const postsRef = collection(db, 'posts');
    const offset = pageNumber * PAGE_SIZE;
    const q = query(postsRef, limit(offset));
    try {
        const postsSnap = await getDocs(q);
        let postsData: PostData[] = [];
        postsSnap.forEach(postSnap =>
            postsData.push(postSnap.data() as PostData)
        );

        return postsData.slice(
            (pageNumber - 1) * PAGE_SIZE,
            (pageNumber - 1) * PAGE_SIZE + 10
        );
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            throw new Error(e.message);
        } else {
            console.error(e);
            throw new Error('An unknown error occurred');
        }
    }
}
