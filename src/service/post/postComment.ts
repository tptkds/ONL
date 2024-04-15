import { db } from '@/app/firebase';
import { CommentData } from '@/types/post';
import { addDoc, collection, updateDoc } from 'firebase/firestore';

export default async function postComment(commentData: CommentData) {
    try {
        const docRef = await addDoc(collection(db, 'comments'), commentData);
        updateDoc(docRef, { commentId: docRef.id });
        console.log('댓글이 성공적으로 남겨졌습니다.: ' + docRef.id);
    } catch (e) {
        console.error('error: ' + e);
    }
}
