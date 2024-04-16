'use client';
import incrementViewCount from '@/service/post/incrementViewCount';
import { useEffect } from 'react';
import { VIEWED_POSTS_KEY } from '@/constants/post';
import { useMutation } from '@tanstack/react-query';
import LikeButton from './components/LikeButton';
import CommentsSection from './components/CommnetSection';
import PostContent from './components/PostContent';

export default function Post({ params }: { params: { postId: string } }) {
    const { mutate: mutateViewCount } = useMutation({
        mutationFn: () => incrementViewCount(params.postId),
    });

    useEffect(() => {
        const viewedPostsString = localStorage.getItem(VIEWED_POSTS_KEY);
        const viewedPosts: string[] = viewedPostsString
            ? JSON.parse(viewedPostsString)
            : [];

        if (!viewedPosts.includes(params.postId)) {
            mutateViewCount();
            localStorage.setItem(
                VIEWED_POSTS_KEY,
                JSON.stringify([...viewedPosts, params.postId])
            );
        }
    }, [mutateViewCount, params.postId]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <PostContent postId={params.postId} />
                <LikeButton postId={params.postId} />
                <CommentsSection postId={params.postId} />
            </div>
        </div>
    );
}
