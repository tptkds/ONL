import { PostData } from '@/types/post';
import { db } from '@/app/firebase';
import {
    collection,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    startAfter,
} from 'firebase/firestore';
import { PAGE_SIZE } from '@/constants/post';

export default async function getPosts(
    page: number,
    lastDocument?: QueryDocumentSnapshot<DocumentData>
): Promise<{
    data: PostData[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | undefined;
}> {
    const postsRef = collection(db, 'posts');
    let q;
    if (page === 0 || !lastDocument) {
        q = query(postsRef, orderBy('createdAt'), limit(PAGE_SIZE + 1));
    } else {
        q = query(
            postsRef,
            orderBy('createdAt'),
            startAfter(lastDocument),
            limit(PAGE_SIZE + 1)
        );
    }
    const querySnapshot = await getDocs(q);

    const hasMore = querySnapshot.docs.length > PAGE_SIZE;

    const data = querySnapshot.docs
        .slice(0, PAGE_SIZE)
        .map(doc => doc.data() as PostData);

    const lastVisible = hasMore ? querySnapshot.docs[PAGE_SIZE - 1] : undefined;

    return {
        data,
        lastDoc: lastVisible,
    };
}
