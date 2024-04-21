'use client';
import { useQuery } from '@tanstack/react-query';
import getPostsForPage from '@/service/post/getPostsForPage';
import BoardSkeleton from './components/BoardSkeleton';
import List from './components/List';
import Pagination from './components/Pagination';
import getTotalPostsCount from '@/service/post/getTotalPostsCount';

export default function Board({ params }: { params: { pageNumber: number } }) {
    const {
        data: posts,
        isFetching: isFetchingPosts,
        isError: isErrorPosts,
        isLoading: isLoadingPosts,
        isSuccess: isSuccessPosts,
    } = useQuery({
        queryKey: ['board', params.pageNumber],
        queryFn: () => getPostsForPage(params.pageNumber),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        data: totalPostsCount,
        isFetching: isFetchingTotalPosts,
        isError: isErrorTotalPosts,
        isLoading: isLoadingTotalPosts,
        isSuccess: isSuccessTotalPosts,
    } = useQuery({
        queryKey: ['totalPostsCount'],
        queryFn: () => getTotalPostsCount(),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: true,
        retryDelay: 1000,
        staleTime: 1000,
    });
    console.log(posts);

    return (
        <div className="w-full mx-16 mt-8 flex">
            {isLoadingPosts ||
            isFetchingPosts ||
            isLoadingTotalPosts ||
            isFetchingTotalPosts ? (
                <BoardSkeleton />
            ) : isErrorPosts || isErrorTotalPosts ? (
                <div className="h-full w-full flex items-center justify-center">
                    <div>
                        죄송합니다, 글을 불러오는 과정에서 문제가 발생했습니다.
                    </div>
                </div>
            ) : isSuccessPosts && isSuccessTotalPosts ? (
                <div className="flex flex-col items-center container mx-auto px-4">
                    <List posts={posts} />
                    <Pagination
                        curPage={params.pageNumber}
                        totalPages={totalPostsCount}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
