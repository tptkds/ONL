import addLikedPost from '@/service/account/addLikedPost';
import deleteLikedPost from '@/service/account/deleteLikedPost';
import getLikedPosts from '@/service/account/getLikedPosts';
import updateLikeCount from '@/service/post/updateLikeCount';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LikeButton({ postId }: { postId: string }) {
    const [likeAction, setLikeAction] = useState<null | string>(null);

    const { data: sessionData, status: sessionStatus } = useSession();

    const { data: likedPosts } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getLikedPosts(sessionData?.user?.email as string),
        initialData: [],
        enabled: !!sessionData?.user?.email,
    });

    const { mutate: mutateLikeCount, isSuccess: isSuccessMutateLikeCount } =
        useMutation({
            mutationFn: (isIncrement: boolean) =>
                updateLikeCount(postId, isIncrement),
        });

    useEffect(() => {
        if (isSuccessMutateLikeCount) {
            if (likeAction == 'add') {
                addLikedPost(sessionData?.user?.email as string, postId);
            } else if (likeAction == 'delete') {
                deleteLikedPost(sessionData?.user?.email as string, postId);
            }
            setLikeAction(null); // 작업 후 상태 초기화
        }
    }, [isSuccessMutateLikeCount]);

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
            추천
        </button>
    );
}
