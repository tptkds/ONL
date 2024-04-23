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
            {postsData?.map(post => <Post {...post} key={post.postId} />)}
        </div>
    );
}
