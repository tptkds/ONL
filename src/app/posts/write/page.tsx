'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const Write = () => {
    const [editorContent, setEditorContent] = useState('');

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

    const createMarkup = (htmlContent: string) => {
        const safeHTML =
            typeof window === 'undefined'
                ? htmlContent
                : DOMPurify.sanitize(htmlContent);
        return {
            __html: safeHTML,
        };
    };

    return (
        <>
            <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
                modules={modules}
                formats={formats}
                placeholder="Compose an epic..."
            />
            <h2>Preview</h2>
            <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(editorContent)}
            ></div>
        </>
    );
};

export default Write;
