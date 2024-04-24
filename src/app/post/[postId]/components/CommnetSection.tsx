import getUserNickname from '@/service/account/getUserNickname';
import getComments from '@/service/post/getComments';
import postComment from '@/service/post/postComment';
import updateCommentCount from '@/service/post/updateCommentCount';
import { CommentData } from '@/types/post';
import formatDate from '@/utils/date';
import { getPostData } from '@/utils/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function CommentsSection({ postId }: { postId: string }) {
    const queryClient = useQueryClient();
    const [commentText, setCommentText] = useState('');
    const { data: sessionData, status } = useSession();

    const { data: userName } = useQuery({
        queryKey: ['userName', sessionData?.user.uid],
        queryFn: () => getUserNickname(sessionData?.user.uid as string),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
        enabled: !!sessionData?.user.uid && !!!sessionData.user.isGoogleAccount,
    });

    const { data: comments, isFetching } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId),
        initialData: [],
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
    });

    const { data: post } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostData(postId),

        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
    });

    const { isSuccess, mutate } = useMutation({
        mutationFn: (commentData: CommentData) => postComment(commentData),
    });

    const {
        isSuccess: isSuccessMutateCommentCount,
        mutate: mutateAddCommentCount,
    } = useMutation({
        mutationFn: () => updateCommentCount(postId, true),
    });

    useEffect(() => {
        if (isSuccess) {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessMutateCommentCount) {
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
        }
    }, [isSuccessMutateCommentCount]);

    return (
        <div className="mt-2  pt-4">
            <div className="flex items-center  mb-2">
                <h3 className="flex text-xl font-bold">댓글</h3>
                <p className="ml-2">{post?.commentCount}개</p>
            </div>
            {isFetching ? (
                <div>Loading comments...</div>
            ) : (
                <ul>
                    {comments.map((comment, i) => (
                        <li
                            key={comment.commentId}
                            className="mb-2 p-2 border-b"
                        >
                            <p>{comment.content}</p>
                            <div className="text-xs flex mt-1">
                                <p>{comment.authorName}</p>
                                <span className="tb_spr">|</span>
                                <p> {formatDate(comment.createdAt)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded focus:outline-none"
                    placeholder={
                        status !== 'authenticated'
                            ? '로그인하면 댓글을 남길 수 있어요.'
                            : ''
                    }
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    disabled={status !== 'authenticated'}
                ></textarea>
                <button
                    type="button"
                    className="mt-2 bg-black text-white px-4 py-2 rounded"
                    onClick={async () => {
                        if (commentText.trim() !== '') {
                            const postData = await getPostData(postId);
                            if (
                                postData == null ||
                                !sessionData?.user.uid ||
                                (sessionData?.user.isGoogleAccount
                                    ? !sessionData?.user.name
                                    : !userName)
                            )
                                return;
                            const commentData: CommentData = {
                                authorId: sessionData?.user.uid,
                                authorName: sessionData?.user.isGoogleAccount
                                    ? (sessionData?.user.name as string)
                                    : (userName as string),
                                createdAt: serverTimestamp(),
                                updatedAt: serverTimestamp(),
                                content: commentText,
                                postId: postId,
                                commentId: '',
                                postTitle: postData?.title,
                            };
                            mutate(commentData);
                            mutateAddCommentCount();
                            setCommentText('');
                        }
                    }}
                    disabled={status !== 'authenticated'}
                >
                    댓글 남기기
                </button>
            </div>
        </div>
    );
}
