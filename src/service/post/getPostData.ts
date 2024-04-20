import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function getPostData(postId: string) {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log('No such document!');
    }
}
