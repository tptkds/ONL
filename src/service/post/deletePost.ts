import { db } from '@/app/firebase';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import deleteComment from './deleteComment';

export default async function deletePost(postId: string) {
    let postRef = doc(db, 'posts', postId);
    try {
        await deleteDoc(postRef);
        const commentsRef = collection(db, 'comments');
        const q = query(commentsRef, where('postId', '==', postId));
        const commentsSnap = await getDocs(q);
        await Promise.all(
            commentsSnap.docs.map(comment =>
                deleteComment(comment.id).catch(error =>
                    console.error(
                        `Failed to delete comment: ${comment.id}`,
                        error
                    )
                )
            )
        );

        console.log('게시글 삭제 작업을 성공했습니다.');
    } catch (error) {
        console.error('게시글 삭제 작업을 실패했습니다.: ', error);
    }
}
