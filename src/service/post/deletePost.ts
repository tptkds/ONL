import { db } from '@/app/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default async function deletePost(postId: string) {
    let postRef = doc(db, 'posts', postId);
    try {
        await deleteDoc(postRef);
        console.log('게시글 삭제 작업을 성공했습니다.');
    } catch (error) {
        console.error('게시글 삭제 작업을 실패했습니다.: ', error);
    }
}
