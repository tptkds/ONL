import { db } from '@/app/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default async function changeNickname(
    uid: string,
    newNickname: string
): Promise<boolean> {
    const userRef = doc(db, 'users', uid);

    try {
        await updateDoc(userRef, { nickname: newNickname });
        console.log('닉네임 변경 작업을 성공했습니다.');
        return true;
    } catch (e) {
        console.error('닉네임 변경 작업을 실패했습니다: ' + e);
        throw new Error();
    }
}
