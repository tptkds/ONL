import { db } from '@/app/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

export default async function getTotalPostsCount() {
    const collRef = collection(db, 'posts');
    const snapshot = await getCountFromServer(collRef);
    return snapshot.data().count;
}
