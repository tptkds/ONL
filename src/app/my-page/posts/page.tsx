'use client';
import getAllAccountPosts from '@/service/post/getAllAccountPosts';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Post from './components/Post';

export default function Posts() {
    const { data: sessionData } = useSession();
    const { data: postsData } = useQuery({
        queryKey: ['posts', sessionData?.user.uid],
        queryFn: () => getAllAccountPosts(sessionData?.user.uid as string),
        initialData: [],
        enabled: !!sessionData?.user.uid,
        refetchOnMount: 'always',
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

    return (
        <div className="sm:ml-4 flex flex-wrap content-start w-full ">
            {postsData ? (
                postsData?.map(post => <Post {...post} key={post.postId} />)
            ) : (
                <div className="flex justify-center w-full h-60 items-center text-sm">
                    작성한 글이 아직 없어요!
                </div>
            )}
        </div>
    );
}
