import { db } from '@/app/firebaseAdmin';

export default async function getAllPostsServer(pageParam?: string) {
    const postsPerPage = 20;
    let q;

    if (pageParam) {
        const lastDoc = await db.collection('posts').doc(pageParam).get();
        q = db
            .collection('posts')
            .orderBy('createdAt')
            .startAfter(lastDoc)
            .limit(postsPerPage);
    } else {
        q = db.collection('posts').orderBy('createdAt').limit(postsPerPage);
    }

    const snapshot = await q.get();
    const posts: any[] = [];
    snapshot.forEach((doc: { id: any; data: () => any }) => {
        posts.push({ id: doc.id, ...doc.data() });
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1]?.id;
    return { posts, lastVisible };
}
