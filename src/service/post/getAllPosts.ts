import { db } from '@/app/firebase';
import {
    collection,
    query,
    orderBy,
    getDocs,
    startAfter,
    limit,
} from 'firebase/firestore';

export default async function getAllPosts({ pageParam = null }) {
    const postsPerPage = 20;
    let q;

    if (pageParam) {
        q = query(
            collection(db, 'posts'),
            orderBy('createdAt'),
            startAfter(pageParam),
            limit(postsPerPage)
        );
    } else {
        q = query(
            collection(db, 'posts'),
            orderBy('createdAt'),
            limit(postsPerPage)
        );
    }

    const documentSnapshots = await getDocs(q);
    const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const posts = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return { posts, lastVisible };
}
