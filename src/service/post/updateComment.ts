import { db } from '@/app/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export default async function updateComment(
    commentId: string,
    content: string
): Promise<void> {
    const commentRef = doc(db, 'comments', commentId);
    try {
        await updateDoc(commentRef, {
            content: content,
            updatedAt: serverTimestamp(),
        });
        console.log('댓글 수정 작업을 성공했습니다.');
    } catch (e) {
        console.error('댓글 수정 작업을 실패했습니다: ', e);
    }
}
