'use client';
import { useQuery } from '@tanstack/react-query';
import getPostsForPage from '@/service/post/getPostsForPage';
import List from './components/List';
import Pagination from './components/Pagination';
import getTotalPostsCount from '@/service/post/getTotalPostsCount';
import PostComposer from './components/PostComposer';
import { PAGE_SIZE } from '@/constants/post';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

export default function Board({ params }: { params: { pageNumber: number } }) {
    const router = useRouter();
    const { status: sessionStatus } = useSession();
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
        placeholderData: prevData => prevData,
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

    useEffect(() => {
        if (params.pageNumber < 1) router.push('/board/1');
        if (totalPostsCount)
            if (params.pageNumber > Math.ceil(totalPostsCount / PAGE_SIZE))
                router.push(`/board/${Math.ceil(totalPostsCount / PAGE_SIZE)}`);
    }, [totalPostsCount]);

    return (
        <div className="w-full mx-2 sm:mx-16 mt-4 flex">
            {isLoadingTotalPosts || sessionStatus == 'loading' ? (
                <div className="flex items-center justify-center w-full h-full">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            ) : isErrorPosts || isErrorTotalPosts ? (
                <div className="h-full w-full flex items-center justify-center">
                    <div>
                        죄송합니다, 글을 불러오는 과정에서 문제가 발생했습니다.
                    </div>
                </div>
            ) : isSuccessPosts && isSuccessTotalPosts ? (
                <div className="flex flex-col items-center container mx-auto px-4 w-full lg:w-5/6 xl:w-3/4">
                    <div className="w-full flex justify-end mb-2">
                        <PostComposer />
                    </div>
                    <List posts={posts} />
                    <Pagination
                        curPage={params.pageNumber}
                        totalPages={Math.ceil(totalPostsCount / PAGE_SIZE)}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
