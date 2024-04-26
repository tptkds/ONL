import { Textarea } from '@/components/ui/textarea';
import getUserNickname from '@/service/account/getUserNickname';
import deleteComment from '@/service/post/deleteComment';
import getComments from '@/service/post/getComments';
import postComment from '@/service/post/postComment';
import updateComment from '@/service/post/updateComment';
import updateCommentCount from '@/service/post/updateCommentCount';
import { CommentData } from '@/types/post';
import formatDate from '@/utils/date';
import { getPostData } from '@/utils/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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

    const { mutate: mutateDeleteComment } = useMutation({
        mutationFn: (commentId: string) => deleteComment(commentId),
        onSuccess: () => {
            mutateUpdateCommentCount(false);
            queryClient.invalidateQueries({
                queryKey: ['comments', postId],
                exact: true,
            });
        },
    });

    const [editedCommentId, setEditedCommentId] = useState<string | null>(null);
    const [editedCommentContent, setEditedCommentContent] =
        useState<string>('');

    const { mutate: mutateEditComment } = useMutation({
        mutationFn: (commentId: string) =>
            updateComment(commentId, editedCommentContent),
        onSuccess: () => {
            setEditedCommentId(null);
            setEditedCommentContent('');
            queryClient.invalidateQueries({
                queryKey: ['comments', postId],
                exact: true,
            });
        },
    });

    const {
        isSuccess: isSuccessMutateCommentCount,
        mutate: mutateUpdateCommentCount,
    } = useMutation({
        mutationFn: (isIncrement: boolean) =>
            updateCommentCount(postId, isIncrement),
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
                <div className="flex items-center justify-center w-full h-full">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            ) : (
                <ul>
                    {comments?.map((comment, i) => (
                        <li
                            key={comment.commentId}
                            className="mb-2 p-2 border-b"
                        >
                            {editedCommentId === comment.commentId ? (
                                <>
                                    <Textarea
                                        value={editedCommentContent}
                                        onChange={e =>
                                            setEditedCommentContent(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        onClick={() => {
                                            setEditedCommentId(null);
                                            setEditedCommentContent('');
                                        }}
                                        className="mt-2 text-xs mr-1  px-2 py-0.5 border rounded-sm hover:bg-gray-100"
                                    >
                                        수정 취소
                                    </button>
                                    <button
                                        onClick={() => {
                                            mutateEditComment(
                                                comment.commentId
                                            );
                                        }}
                                        className="mt-2 text-xs mr-1  px-2 py-0.5 border rounded-sm hover:bg-gray-100"
                                    >
                                        수정 완료
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>{comment.content}</p>

                                    <div className="text-xs flex mt-1 items-center">
                                        <p>{comment.authorName}</p>
                                        <span className="tb_spr">|</span>
                                        <p> {formatDate(comment.createdAt)}</p>
                                        {sessionData?.user.uid ===
                                            comment.authorId && (
                                            <div className="ml-4 flex items-center">
                                                <button
                                                    onClick={() =>
                                                        mutateDeleteComment(
                                                            comment.commentId
                                                        )
                                                    }
                                                    className="text-xs mr-1  px-2 py-0.5 border rounded-sm hover:bg-gray-100"
                                                >
                                                    삭제
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditedCommentId(
                                                            comment.commentId
                                                        );
                                                        setEditedCommentContent(
                                                            comment.content
                                                        );
                                                    }}
                                                    className="text-xs mr-1  px-2 py-0.5 border rounded-sm hover:bg-gray-100"
                                                >
                                                    수정
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
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
                    disabled={
                        status !== 'authenticated' || editedCommentId !== null
                    }
                ></textarea>
                <button
                    type="button"
                    className="mt-2 bg-black text-white px-4 py-2 rounded disabled:opacity-50"
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
                            mutateUpdateCommentCount(true);
                            setCommentText('');
                        }
                    }}
                    disabled={
                        status !== 'authenticated' || editedCommentId !== null
                    }
                >
                    댓글 남기기
                </button>
            </div>
        </div>
    );
}
