import { db } from '@/app/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default async function initializeUserDoc(userId: string) {
    const initialData = {
        createdAt: new Date(),
    };
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, initialData, { merge: true });
}
