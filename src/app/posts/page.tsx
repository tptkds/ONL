'use server';

import getAllPostsServer from '@/service/post/getAllPostsServer';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

export default async function Posts() {
    const queryClient = new QueryClient();
    // await queryClient.prefetchInfiniteQuery({
    //     queryKey: ['posts', 'all'],
    //    // queryFn: async ({ pageParam }) => getAllPostsServer(pageParam),
    //     getNextPageParam: lastPage => lastPage.lastVisible,
    //     initialPageParam: undefined,
    //     pages: 1,
    // });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
    );
}
