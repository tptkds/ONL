import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import deletePost from '@/service/post/deletePost';
import getPostData from '@/service/post/getPostData';
import formatDate from '@/utils/date';
import { createMarkup } from '@/utils/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PostContent({ postId }: { postId: string }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: sessionData } = useSession();
    const { data: postData, isLoading: isLoadingPostData } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostData(postId),
        enabled: !!postId,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
    });

    const { mutate: mutateDeletePost } = useMutation({
        mutationFn: () => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['post', postId],
                exact: true,
            });
            queryClient.invalidateQueries({ queryKey: ['board'] });
            router.push('/board/1');
        },
    });

    useEffect(() => {
        if (!isLoadingPostData && !postData?.postId) {
            alert('삭제된 게시글입니다.');
            router.back();
        }
    }, [isLoadingPostData]);

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
                        [{postData.category}] {postData.title}
                    </h2>
                    <div className="flex justify-between border-b">
                        <div className="text-gray-700 text-xs flex pt-2 pb-4 ">
                            <p>{postData.authorName}</p>
                            <span className="tb_spr">|</span>
                            <p>{formatDate(postData.createdAt)}</p>
                            <span className="tb_spr">|</span>
                            <p>조회 {postData.viewCount} </p>
                            <span className="tb_spr">|</span>
                            <p>추천 {postData.likeCount}</p>
                        </div>
                        {sessionData?.user.uid === postData.authorId && (
                            <div className="space-x-2">
                                <Button
                                    className="text-xs h-fit  w-fit px-3"
                                    onClick={() => mutateDeletePost()}
                                >
                                    삭제
                                </Button>
                                <Button
                                    className="text-xs h-fit w-fit px-3"
                                    onClick={() =>
                                        router.push(`/edit/${postId}`)
                                    }
                                >
                                    수정
                                </Button>
                            </div>
                        )}
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
