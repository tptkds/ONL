'use client';
import { useEffect, useState } from 'react';
import CatergorySelect from './components/CategorySelect';
import TextEditor from './components/TextEditor';
import TitleInput from './components/TitleInput';
import TagInput from './components/TagInput';
import Buttons from './components/Buttons';
import { useSession } from 'next-auth/react';
import { TagOption } from '@/types/post';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getPostData } from '@/utils/post';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Edit({ params }: { params: { postId: string } }) {
    const { data: sessionData, status: sessionStatus } = useSession();

    const router = useRouter();

    const { data: postData, isLoading: isLoadingPostData } = useQuery({
        queryKey: ['post', params.postId],
        queryFn: () => getPostData(params.postId),
        enabled: !!params.postId,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
    });

    useEffect(() => {
        if (
            sessionStatus !== 'loading' &&
            sessionStatus === 'unauthenticated'
        ) {
            alert('로그인 후 이용할 수 있습니다.');
            router.back();
            return;
        }
        if (
            sessionData &&
            postData &&
            sessionData?.user.uid !== postData?.authorId
        ) {
            alert('수정 권한이 없습니다.');
            router.back();
        }
    }, [sessionStatus, postData]);

    const [editorContent, setEditorContent] = useState('');
    const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        setEditorContent(postData?.content as string);
        if (postData?.tags !== undefined) {
            const tagOptions = postData.tags.map(tag => ({
                label: tag,
                value: tag,
            }));
            setSelectedTags(tagOptions);
        }
        setTitle(postData?.title as string);
        setCategory(postData?.category as string);
    }, [postData]);

    return (
        <>
            {isLoadingPostData || sessionStatus == 'loading' ? (
                <div className="flex items-center justify-center w-full h-full">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            ) : (
                sessionData?.user.uid === postData?.authorId && (
                    <div className="w-3/4 mt-4">
                        <div className="flex flex-col justify-start mt-4">
                            <CatergorySelect
                                setCategory={setCategory}
                                category={category}
                            />
                            <TitleInput title={title} setTitle={setTitle} />
                            <TextEditor
                                editorContent={editorContent}
                                setEditorContent={setEditorContent}
                            />
                            <TagInput
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                            />
                            <Buttons
                                postId={params.postId}
                                title={title}
                                editorContent={editorContent}
                                selectedTags={selectedTags}
                                category={category}
                                setErrorMessage={setErrorMessage}
                            />
                        </div>
                    </div>
                )
            )}
        </>
    );
}
