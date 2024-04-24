'use client';
import { useQuery } from '@tanstack/react-query';

import getAllAccountComments from '@/service/post/getAllAccountComments';
import { useSession } from 'next-auth/react';
import Comment from './components/Comment';

export default function Comments() {
    const { data: sessionData } = useSession();
    const { data: commentsData } = useQuery({
        queryKey: ['commnets', sessionData?.user.uid],
        queryFn: () => getAllAccountComments(sessionData?.user.uid as string),
        initialData: [],
        enabled: !!sessionData?.user.uid,
        refetchOnMount: 'always',
    });

    return (
        <div className="sm:ml-4 flex flex-wrap content-start w-full">
            {commentsData ? (
                commentsData?.map(comment => (
                    <Comment {...comment} key={comment.commentId} />
                ))
            ) : (
                <div className="flex justify-center w-full h-60 items-center text-sm">
                    작성한 댓글이 아직 없어요!
                </div>
            )}
        </div>
    );
}
