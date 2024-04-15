'use client';
import getPostData from '@/service/post/getPostData';
import formatDate from '@/utils/date';
import { createMarkup } from '@/utils/post';
import { useMutation, useQuery } from '@tanstack/react-query';
import CommentsSection from './components/CommnetSection';
import incrementViewCount from '@/service/post/incrementViewCount';
import { useEffect } from 'react';
import { VIEWED_POSTS_KEY } from '@/constants/post';
import incrementLikeCount from '@/service/post/updateLikeCount';
import getLikedPosts from '@/service/account/getLikedPosts';
import { useSession } from 'next-auth/react';
import updateLikeCount from '@/service/post/updateLikeCount';
import addLikedPost from '@/service/account/addLikedPost';
import deleteLikedPost from '@/service/account/deleteLikedPost';

export default function Post({ params }: { params: { postId: string } }) {
    const { data, status } = useSession();
    const { data: likedPosts } = useQuery({
        queryKey: ['post', params.postId],
        queryFn: () => getLikedPosts(data?.user?.email as string),
        initialData: [],
    });
    console.log(likedPosts);

    const {
        data: postData,
        isFetching,
        isPending,
    } = useQuery({
        queryKey: ['post', params.postId],
        queryFn: () => getPostData(params.postId),
    });

    const { mutate: mutateViewCount } = useMutation({
        mutationFn: () => incrementViewCount(params.postId),
    });

    const { mutate: mutateLikeCount } = useMutation({
        mutationFn: (isIncrement: boolean) =>
            updateLikeCount(params.postId, isIncrement),
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

    if (isFetching || isPending || !postData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-2">{postData.title}</h1>
                <p className="text-gray-700 text-sm mb-4">
                    Written by <strong>{postData.authorName}</strong> on
                    {formatDate(postData.createdAt)}
                    <span>
                        · Views: {postData.viewCount} · Likes:
                        {postData.likeCount}
                    </span>
                </p>
                <div
                    className="preview mb-4 whitespace-pre-line text-gray-800"
                    dangerouslySetInnerHTML={createMarkup(postData.content)}
                ></div>

                {postData.tags && (
                    <div className="mb-4">
                        <strong>Tags:</strong>
                        {postData.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={() => {
                        if (!likedPosts?.includes(params.postId)) {
                            mutateLikeCount(true);
                            addLikedPost(
                                data?.user?.email as string,
                                params.postId
                            );
                        } else {
                            mutateLikeCount(false);
                            deleteLikedPost(
                                data?.user?.email as string,
                                params.postId
                            );
                        }
                    }}
                >
                    추천
                </button>
                <CommentsSection postId={params.postId} />
            </div>
        </div>
    );
}
