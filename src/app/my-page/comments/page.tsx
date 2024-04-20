'use client';
import { useQuery } from '@tanstack/react-query';

import getAllAccountComments from '@/service/post/getAllAccountComments';
import { useSession } from 'next-auth/react';
import Comment from './components/Comment';

export default function Comments() {
    const { data: sessionData } = useSession();
    const { data: commentsData } = useQuery({
        queryKey: ['commnet', 'all'],
        queryFn: () => getAllAccountComments(sessionData?.user.uid as string),
        initialData: [],
        enabled: !!sessionData?.user.uid,
        refetchOnMount: 'always',
    });

    return (
        <div className="sm:ml-4 flex flex-wrap w-full">
            {commentsData?.map(comment => (
                <Comment {...comment} key={comment.commentId} />
            ))}
        </div>
    );
}
