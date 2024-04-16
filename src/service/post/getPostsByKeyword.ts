import { db } from '@/app/firebase';
import { PostData } from '@/types/post';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function getPostsByKeyword(keyword: string) {
    console.log('getPostsByKeyword');
    const postsRef = collection(db, 'posts');
    const keywordLower = keyword.toLowerCase();
    const nextChar = String.fromCharCode(
        keywordLower.charCodeAt(keywordLower.length - 1) + 1
    );
    const keywordEnd = keywordLower.slice(0, -1) + nextChar;

    const queryTitle = query(
        postsRef,
        where('title', '>=', keywordLower),
        where('title', '<', keywordEnd)
    );
    const queryContents = query(
        postsRef,
        where('contents', '>=', keywordLower),
        where('contents', '<', keywordEnd)
    );

    try {
        const [titleDocs, contentsDocs] = await Promise.all([
            getDocs(queryTitle),
            getDocs(queryContents),
        ]);

        const docsSet = new Set();
        const combinedDocs: PostData[] = [];

        titleDocs.forEach(doc => {
            const data = doc.data() as PostData;
            if (!docsSet.has(data.postId)) {
                docsSet.add(data.postId);
                combinedDocs.push(data);
            }
        });

        contentsDocs.forEach(doc => {
            const data = doc.data() as PostData;
            if (!docsSet.has(data.postId)) {
                docsSet.add(data.postId);
                combinedDocs.push(data);
            }
        });

        return combinedDocs;
    } catch (error) {
        console.error('Error fetching documents: ', error);
        return [];
    }
}
