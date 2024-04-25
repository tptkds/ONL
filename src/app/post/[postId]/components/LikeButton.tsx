import { Skeleton } from '@/components/ui/skeleton';
import addLikedPost from '@/service/post/addLikedPost';
import deleteLikedPost from '@/service/post/deleteLikedPost';
import getLikedPostIds from '@/service/post/getLikedPostIds';
import getPostData from '@/service/post/getPostData';
import updateLikeCount from '@/service/post/updateLikeCount';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { BiLike, BiSolidLike } from 'react-icons/bi';

export default function LikeButton({ postId }: { postId: string }) {
    const { data: sessionData, status: sessionStatus } = useSession();

    const { data: postData, isLoading: isLoadingPostData } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostData(postId),
        enabled: !!postId,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
    });

    const {
        data: likedPostIds,
        isLoading: isLoadingLikedPostIds,
        isFetching: isFetchingLikedPostIds,
    } = useQuery({
        queryKey: ['likedPostIds', sessionData?.user.uid],
        queryFn: () => getLikedPostIds(sessionData?.user.uid as string),
        enabled: !!sessionData?.user.uid,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
    });

    const queryClient = useQueryClient();

    const handleSuccess = async (isIncrement: boolean) => {
        await updateLikeCount(postId, isIncrement);
        queryClient.invalidateQueries({
            queryKey: ['likedPostIds', sessionData?.user.uid as string],
        });
        queryClient.invalidateQueries({
            queryKey: ['post', postId],
        });
    };

    const { mutate: addLikeMutate, isPending: isPendingAddLikeMutate } =
        useMutation({
            mutationFn: () =>
                addLikedPost(
                    sessionData?.user.uid as string,
                    postId,
                    postData?.title as string,
                    postData?.content as string
                ),
            onSuccess: () => handleSuccess(true),
            onError: error => {
                console.error('Error adding like:', error);
            },
        });

    const { mutate: removeLikeMutate, isPending: isPendingRemoveLikeMutate } =
        useMutation({
            mutationFn: () =>
                deleteLikedPost(sessionData?.user.uid as string, postId),
            onSuccess: () => handleSuccess(false),
            onError: error => {
                console.error('Error removing like:', error);
            },
        });

    const handleLike = () => {
        if (sessionStatus !== 'authenticated') {
            alert('로그인 후에 추천할 수 있어요.');
            return;
        }
        if (likedPostIds?.[postId]) {
            removeLikeMutate();
        } else {
            addLikeMutate();
        }
    };

    return (
        <>
            <div className="w-full flex justify-center mt-4 pb-4 border-b">
                {isLoadingLikedPostIds || isLoadingPostData ? (
                    <Skeleton className="w-12 h-12" />
                ) : likedPostIds?.[postId] ? (
                    <button
                        className="hover:bg-gray-100 rounded-xl px-4 py-2 text-sm flex items-center justify-center"
                        onClick={handleLike}
                        disabled={
                            isPendingRemoveLikeMutate || isPendingAddLikeMutate
                        }
                    >
                        <BiSolidLike className="text-base mr-2" /> 추천
                    </button>
                ) : (
                    <button
                        className="hover:bg-gray-100 rounded-xl px-4 py-2 text-sm flex items-center justify-center"
                        onClick={handleLike}
                        disabled={
                            isPendingRemoveLikeMutate || isPendingAddLikeMutate
                        }
                    >
                        <BiLike className="text-base mr-2" /> 추천
                    </button>
                )}
            </div>
        </>
    );
}
