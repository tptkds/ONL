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

const Write = () => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status !== 'loading' && status === 'unauthenticated') {
            alert('로그인 후 이용할 수 있습니다.');
            router.back();
            return;
        }
    }, [status]);

    const [editorContent, setEditorContent] = useState('');
    const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    return (
        <div className="w-3/4">
            <div className="flex flex-col justify-start mt-4">
                <CatergorySelect setCategory={setCategory} />
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
                    title={title}
                    editorContent={editorContent}
                    selectedTags={selectedTags}
                    category={category}
                    setErrorMessage={setErrorMessage}
                />
            </div>
        </div>
    );
};

export default Write;
