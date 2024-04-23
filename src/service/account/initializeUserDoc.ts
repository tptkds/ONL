import { db } from '@/app/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default async function initializeUserDoc(
    userId: string,
    nickname: string
) {
    const initialData = {
        createdAt: new Date(),
        nickname: nickname,
    };
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, initialData, { merge: true });
}
