import { db } from '@/app/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default async function deleteComment(commentId: string) {
    const commentRef = doc(db, 'comments', commentId);
    try {
        await deleteDoc(commentRef);
        console.log('댓글 삭제 작업을 성공했습니다.');
    } catch (e) {
        console.error('댓글 삭제 작업을 실패했습니다.: ', e);
        throw new Error('댓글 삭제 작업을 실패했습니다.');
    }
}
