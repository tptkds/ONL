import { Button } from '@/components/ui/button';
import { stripHtml } from '@/utils/post';
import { db } from '@/app/firebase';
import {
    addDoc,
    collection,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import { PostData } from '@/types/post';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getUserNickname from '@/service/account/getUserNickname';
import { useState } from 'react';

interface ButtonsProps {
    title: string;
    category: string;
    editorContent: string;
    selectedTags: { label: string; value: string }[];
    setErrorMessage: (message: string) => void;
}

export default function Buttons({
    title,
    category,
    editorContent,
    selectedTags,
    setErrorMessage,
}: ButtonsProps) {
    const [status, setStatus] = useState<string>('등록하기');
    const { data: sessionData } = useSession();
    const router = useRouter();

    const { data: nickname } = useQuery({
        queryKey: ['nickname', sessionData?.user.uid],
        queryFn: () => getUserNickname(sessionData?.user.uid as string),
        enabled:
            !!sessionData?.user.uid &&
            sessionData.user.isGoogleAccount === false,
    });

    const handlePostSubmit = async () => {
        setStatus('등록중...');
        const plainTextContent = stripHtml(editorContent);
        if (!title || plainTextContent.length < 10) {
            setErrorMessage(
                '제목과 내용을 적절히 입력해주세요. 내용은 최소 10자 이상이어야 합니다.'
            );
            setStatus('등록하기');
            return;
        }

        const tags = selectedTags.map(tag => tag.value);

        const newPost: PostData = {
            title,
            content: editorContent,
            authorId: sessionData?.user.uid as string,
            category: category,
            tags,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            attachments: [],
            authorName: sessionData?.user.isGoogleAccount
                ? (sessionData.user.name as string)
                : (nickname as string),
            likeCount: 0,
            viewCount: 0,
            postId: '',
            commentCount: 0,
        };

        try {
            const docRef = await addDoc(collection(db, 'posts'), newPost);
            await updateDoc(docRef, {
                postId: docRef.id,
            });
            console.log('Post added successfully');
            setErrorMessage('');
            router.push(`/post/${docRef.id}`);
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('게시글 등록 중 오류가 발생했습니다.');
            setStatus('등록하기');
        }
    };
    return (
        <div className="flex justify-center mt-8 ">
            <Button className="mr-2" onClick={() => router.back()}>
                돌아가기
            </Button>
            <Button
                onClick={handlePostSubmit}
                disabled={
                    !title ||
                    stripHtml(editorContent).length < 10 ||
                    status === '등록중...'
                }
            >
                {status}
            </Button>
        </div>
    );
}
