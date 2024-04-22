import getMoviesOfTheYear from '@/service/movie/getMoviesOfTheYear';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import MoviesOfYearCarousel from './components/MoviesOfYearCarousel';
import MoviesOfTrending from './components/MoviesOfTrending';

export default function Home() {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ['award', 2023],
        queryFn: () => getMoviesOfTheYear(),
        staleTime: Infinity,
    });

    queryClient.prefetchQuery({
        queryKey: ['trending', 'day', 'all', 1],
        queryFn: () => getMoviesOfTheYear(),
        staleTime: Infinity,
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-col w-full sm:mb-16">
                <MoviesOfYearCarousel />
                <MoviesOfTrending />
            </div>
        </HydrationBoundary>
    );
}
