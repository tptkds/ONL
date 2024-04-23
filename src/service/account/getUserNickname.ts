import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function getUserNickname(uid: string): Promise<string> {
    const userRef = doc(db, 'users', uid);

    try {
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        return data?.nickname as string;
    } catch (e) {
        console.error('닉네임 가져오기 작업을 실패했습니다: ' + e);
        throw new Error();
    }
}
