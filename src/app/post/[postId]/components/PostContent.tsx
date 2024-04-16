import getPostData from '@/service/post/getPostData';
import formatDate from '@/utils/date';
import { createMarkup } from '@/utils/post';
import { useQuery } from '@tanstack/react-query';

export default function PostContent({ postId }: { postId: string }) {
    const { data: postData } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostData(postId),
        enabled: !!postId,
    });
    if (postData === undefined) return <>loading...</>;

    return (
        <>
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
        </>
    );
}
