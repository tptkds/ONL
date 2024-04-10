'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { db } from '@/app/firebase';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { PostData } from '@/types/post';
import { MultiValue } from 'react-select';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const CreatableSelect = dynamic(() => import('react-select/creatable'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

interface TagOption {
    label: string;
    value: string;
}

const Write = () => {
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [category, setCategory] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
    const handleTagsChange = (newValue: unknown) => {
        const typedNewValue = newValue as MultiValue<TagOption>;
        setSelectedTags([...typedNewValue]);
    };

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

    const handlePostSubmit = async () => {
        const tags = selectedTags.map(tag => tag.value);
        const newPost: PostData = {
            title,
            content: editorContent,
            authorId,
            category,
            tags,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        try {
            const newPostRef = doc(collection(db, 'posts'));
            await setDoc(newPostRef, newPost);
            console.log('Post added successfully');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="text"
                value={authorId}
                onChange={e => setAuthorId(e.target.value)}
                placeholder="Author ID"
            />
            <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Category"
            />
            <CreatableSelect
                isMulti
                onChange={handleTagsChange}
                value={selectedTags}
                placeholder="Type and press enter to add tags..."
            />
            <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
                modules={modules}
                formats={formats}
                placeholder="Compose an epic..."
            />
            <button onClick={handlePostSubmit}>Submit Post</button>
            <h2>Preview</h2>
            <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(editorContent)}
            ></div>
        </>
    );
};

export default Write;
