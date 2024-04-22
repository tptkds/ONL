import addLikedPost from '@/service/post/addLikedPost';
import deleteLikedPost from '@/service/post/deleteLikedPost';
import getLikedPosts from '@/service/post/getLikedPosts';
import getPostData from '@/service/post/getPostData';
import updateLikeCount from '@/service/post/updateLikeCount';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LikeButton({ postId }: { postId: string }) {
    const [likeAction, setLikeAction] = useState<null | string>(null);

    const { data: sessionData, status: sessionStatus } = useSession();

    const { data: postData } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostData(postId),
        enabled: !!postId,
    });

    const { data: likedPosts } = useQuery({
        queryKey: ['likedpost', postId],
        queryFn: () => getLikedPosts(sessionData?.user?.uid as string),
        initialData: [],
        enabled: !!sessionData?.user?.uid,
    });

    const { mutate: mutateLikeCount, isSuccess: isSuccessMutateLikeCount } =
        useMutation({
            mutationFn: (isIncrement: boolean) =>
                updateLikeCount(postId, isIncrement),
        });

    useEffect(() => {
        if (isSuccessMutateLikeCount) {
            if (likeAction == 'add') {
                addLikedPost(
                    sessionData?.user?.uid as string,
                    postId,
                    postData?.title as string,
                    postData?.content as string
                );
            } else if (likeAction == 'delete') {
                deleteLikedPost(sessionData?.user?.uid as string, postId);
            }
            setLikeAction(null);
        }
    }, [isSuccessMutateLikeCount]);
    if (postData === undefined) return <>loading...</>;
    return (
        <button
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${sessionStatus !== 'authenticated' ? 'bg-gray-500' : 'bg-black'}`}
            onClick={() => {
                if (!likedPosts?.includes(postId)) {
                    mutateLikeCount(true);
                    setLikeAction('add');
                } else {
                    mutateLikeCount(false);
                    setLikeAction('delete');
                }
            }}
        >
            {likedPosts?.includes(postId) ? '추천 취소' : '추천'}
        </button>
    );
}
