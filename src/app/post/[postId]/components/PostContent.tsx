import { Skeleton } from '@/components/ui/skeleton';
import getPostData from '@/service/post/getPostData';
import formatDate from '@/utils/date';
import { createMarkup } from '@/utils/post';
import { useQuery } from '@tanstack/react-query';

export default function PostContent({ postId }: { postId: string }) {
    const { data: postData, isLoading: isLoadingPostData } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostData(postId),
        enabled: !!postId,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
    });

    return (
        <>
            {isLoadingPostData || !postData ? (
                <>
                    <Skeleton className="w-64 h-8" />
                    <Skeleton className="w-44 h-4 mt-4 " />
                    <Skeleton className="w-full h-96 mt-4 " />
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-2">
                        {postData.title}
                    </h2>
                    <div className="text-gray-700 text-xs flex pt-2 pb-4 border-b">
                        <p>{postData.authorName}</p>
                        <span className="tb_spr">|</span>
                        <p>{formatDate(postData.createdAt)}</p>
                        <span className="tb_spr">|</span>
                        <p>조회 {postData.viewCount} </p>
                        <span className="tb_spr">|</span>
                        <p>추천 {postData.likeCount}</p>
                    </div>
                    <div
                        className="  break-words h-full w-full mb-4 text-gray-800 py-6 "
                        dangerouslySetInnerHTML={createMarkup(postData.content)}
                    ></div>

                    {postData.tags && (
                        <div className="my-4 pb-4 border-b">
                            {postData.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="inline-block bg-neutral-200 text-neutral-500 rounded-full px-3 py-1 text-xs text-gray-700 mr-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
}
