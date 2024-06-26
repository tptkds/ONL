'use server';
import { MoviesResponse } from '@/types/movie';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import Filter from './components/Filter';
import List from './components/List';
import getMoviesByFilltering from '@/service/movie/getMoviesByFilltering';

export default async function FilmFinder() {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery<MoviesResponse>({
        queryKey: ['movies', 'popularity.desc', [], ''],
        queryFn: async ({ pageParam = 1 }) => {
            return getMoviesByFilltering(
                '',
                '',
                'popularity.desc',
                pageParam as number
            );
        },
        getNextPageParam: (lastPage: MoviesResponse) => {
            const nextPage = lastPage.page + 1;
            return nextPage <= lastPage.total_pages ? nextPage : undefined;
        },
        initialPageParam: 1,
        pages: 1,
        staleTime: 21600,
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="relative w-full mt-4 mx-4 sm:mx-16 flex flex-col xl:flex-row">
                <div className=" w-full xl:w-72 flex flex-col xl:pr-2">
                    <Filter />
                </div>
                <div className="w-full lg:w-3/4flex flex-col">
                    <List />
                </div>
            </div>
        </HydrationBoundary>
    );
}
