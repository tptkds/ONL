import { db } from '@/app/firebase';
import {
    collection,
    query,
    orderBy,
    startAfter,
    getDocs,
    limit,
    doc,
} from 'firebase/firestore';
export async function getAllPostsClient(pageParam?: string) {
    const postsPerPage = 20;
    let q;

    if (pageParam) {
        const lastDocRef = doc(db, 'posts', pageParam);
        const lastDocSnap = await getDocs(
            query(
                collection(db, 'posts'),
                orderBy('createdAt'),
                startAfter(lastDocRef),
                limit(1)
            )
        );
        const lastDoc = lastDocSnap.docs[0];

        q = query(
            collection(db, 'posts'),
            orderBy('createdAt'),
            startAfter(lastDoc),
            limit(postsPerPage)
        );
    } else {
        q = query(
            collection(db, 'posts'),
            orderBy('createdAt'),
            limit(postsPerPage)
        );
    }

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1]?.id;

    return { posts, lastVisible };
}
