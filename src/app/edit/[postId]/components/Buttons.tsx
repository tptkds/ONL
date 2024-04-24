import { Button } from '@/components/ui/button';
import { stripHtml } from '@/utils/post';
import { db } from '@/app/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

interface ButtonsProps {
    postId: string;
    title: string;
    category: string;
    editorContent: string;
    selectedTags: { label: string; value: string }[];
    setErrorMessage: (message: string) => void;
}

export default function Buttons({
    postId,
    title,
    category,
    editorContent,
    selectedTags,
    setErrorMessage,
}: ButtonsProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const handlePostSubmit = async () => {
        const plainTextContent = stripHtml(editorContent);
        if (!title || plainTextContent.length < 10) {
            setErrorMessage(
                '제목과 내용을 적절히 입력해주세요. 내용은 최소 10자 이상이어야 합니다.'
            );
            return;
        }

        const tags = selectedTags.map(tag => tag.value);

        try {
            const docRef = doc(db, 'posts', postId);
            await updateDoc(docRef, {
                title: title,
                category: category,
                content: editorContent,
                tags: tags,
                updatedAt: serverTimestamp(),
            });
            console.log('Post Edited successfully');
            setErrorMessage('');
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
            router.push(`/post/${docRef.id}`);
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('게시글 수정 중 오류가 발생했습니다.');
        }
    };
    return (
        <div className="flex justify-center mt-4">
            <Button className="mr-2">돌아가기</Button>
            <Button
                onClick={handlePostSubmit}
                disabled={!title || stripHtml(editorContent).length < 10}
            >
                수정하기
            </Button>
        </div>
    );
}
