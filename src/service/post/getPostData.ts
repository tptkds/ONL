import { db } from '@/app/firebase';
import { PostData } from '@/types/post';
import { doc, getDoc } from 'firebase/firestore';

export default async function getPostData(postId: string): Promise<PostData> {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as PostData;
    } else {
        console.error('No such document!');
        throw new Error('No such document!');
    }
}
