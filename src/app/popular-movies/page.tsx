import getPopularMovies from '@/service/movie/getPopularMovies';
import { MoviesResponse } from '@/types/movie';
import {
    HydrationBoundary,
    InfiniteData,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import List from './components/List';

export default async function PopularMovies() {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery<MoviesResponse>({
        queryKey: ['popularMovies'],
        queryFn: async ({ pageParam = 1 }) => {
            return getPopularMovies(pageParam as number);
        },
        getNextPageParam: (
            lastPage: MoviesResponse,
            allPages: InfiniteData<MoviesResponse>['pages']
        ) => {
            const nextPage = lastPage.page + 1;
            return nextPage <= lastPage.total_pages ? nextPage : undefined;
        },
        initialPageParam: 1,
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <List />
        </HydrationBoundary>
    );
}
