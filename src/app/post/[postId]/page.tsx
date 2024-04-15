'use client';
import getPostData from '@/service/post/getPostData';
import formatDate from '@/utils/date';
import { createMarkup } from '@/utils/post';
import { useQuery } from '@tanstack/react-query';
import CommentsSection from './components/CommnetSection';

export default function Post({ params }: { params: { postId: string } }) {
    const {
        data: postData,
        isFetching,
        isPending,
    } = useQuery({
        queryKey: ['post', params.postId],
        queryFn: () => getPostData(params.postId),
    });

    if (isFetching || isPending || !postData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-2">{postData.title}</h1>
                <p className="text-gray-700 text-sm mb-4">
                    Written by <strong>{postData.authorName}</strong> on{' '}
                    {formatDate(postData.createdAt)}
                    <span>
                        · Views: {postData.viewCount} · Likes:{' '}
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
                <CommentsSection postId={params.postId} />
            </div>
        </div>
    );
}
