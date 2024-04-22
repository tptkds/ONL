import getComments from '@/service/post/getComments';
import postComment from '@/service/post/postComment';
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
    const { data: comments, isFetching } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId),
        initialData: [],
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
    });

    const { isSuccess, mutate } = useMutation({
        mutationFn: (commentData: CommentData) => postComment(commentData),
    });
    useEffect(() => {
        if (isSuccess)
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }, [isSuccess]);

    return (
        <div className="mt-2  pt-4">
            <h3 className="text-xl font-bold mb-2">댓글</h3>
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
                                !sessionData?.user.name
                            )
                                return;
                            const commentData: CommentData = {
                                authorId: sessionData?.user.uid,
                                authorName: sessionData?.user.name,
                                createdAt: serverTimestamp(),
                                updatedAt: serverTimestamp(),
                                content: commentText,
                                postId: postId,
                                commentId: '',
                                postTitle: postData?.title,
                            };
                            mutate(commentData);
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
