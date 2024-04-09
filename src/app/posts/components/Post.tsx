import React from 'react';

interface PostProps {
    post: {
        id: number;
        title: string;
        content: string;
        createdAt: string;
    };
}

export default function Post({ post }: PostProps) {
    return (
        <div
            style={{
                marginBottom: '20px',
                borderBottom: '1px solid #eee',
                paddingBottom: '10px',
            }}
        >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Posted on: {post.createdAt}</p>
        </div>
    );
}
