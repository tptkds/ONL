import { db } from '@/app/firebase';
import { PostData } from '@/types/post';
import DOMPurify from 'dompurify';
import { doc, getDoc } from 'firebase/firestore';

export const createMarkup = (htmlContent: string) => {
    const safeHTML =
        typeof window === 'undefined'
            ? htmlContent
            : DOMPurify.sanitize(htmlContent);
    return {
        __html: safeHTML,
    };
};

export const getPostData = async (postId: string): Promise<PostData | null> => {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) return postSnap.data() as PostData;
    else {
        console.error('존재하지 않는 포스트ID입니다.');
        return null;
    }
};
