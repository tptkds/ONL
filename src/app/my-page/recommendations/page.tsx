'use client';
import getLikedPosts from '@/service/post/getLikedPosts';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Post from './components/Post';

export default function Recommendations() {
    const { data: sessionData } = useSession();
    const { data: recommendationsData } = useQuery({
        queryKey: ['likedPosts', sessionData?.user.uid],
        queryFn: () => getLikedPosts(sessionData?.user.uid as string),
        initialData: [],
        enabled: !!sessionData?.user.uid,
        refetchOnMount: 'always',
    });

    return (
        <div className="sm:ml-4 flex flex-wrap content-start w-full ">
            {recommendationsData?.map(likedPost => (
                <Post {...likedPost} key={likedPost.postId} />
            ))}
        </div>
    );
}
