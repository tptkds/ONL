import getComments from '@/service/post/getComments';
import postComment from '@/service/post/postComment';
import { CommentData } from '@/types/post';
import formatDate from '@/utils/date';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function CommentsSection({ postId }: { postId: string }) {
    const queryClient = useQueryClient();
    const [commentText, setCommentText] = useState('');

    const { data: comments, isFetching } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId),
        initialData: [],
    });

    const { isSuccess, mutate } = useMutation({
        mutationFn: (commentData: CommentData) => postComment(commentData),
    });
    useEffect(() => {
        if (isSuccess)
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }, [isSuccess]);

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Comments</h2>
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Leave a comment..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                ></textarea>
                <button
                    type="button"
                    className="mt-2 bg-black text-white px-4 py-2 rounded"
                    onClick={() => {
                        if (commentText.trim() !== '') {
                            const commentData: CommentData = {
                                authorId: 'tptkds12@gmail.com',
                                authorName: 'finn',
                                createdAt: serverTimestamp(),
                                updatedAt: serverTimestamp(),
                                content: commentText,
                                postId: postId,
                                commentId: '',
                            };
                            mutate(commentData);
                            setCommentText('');
                        }
                    }}
                >
                    Post Comment
                </button>
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
                            <div className="text-sm">
                                By {comment.authorName} on{' '}
                                {formatDate(comment.createdAt)}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
