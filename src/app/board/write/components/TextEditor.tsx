'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Skeleton } from '@/components/ui/skeleton';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => (
        <div className="space-y-2">
            <Skeleton className="h-96 w-full" />
        </div>
    ),
});

export default function TextEditor({
    editorContent,
    setEditorContent,
}: {
    editorContent: string;
    setEditorContent: React.Dispatch<React.SetStateAction<string>>;
}) {
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    return (
        <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            formats={formats}
            className="h-96 border-neutral-200"
            placeholder="최소 10자 이상을 입력해 주세요."
        />
    );
}
