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
            <div className="flex flex-col w-full">
                <MoviesOfYearCarousel />
                <h2 className="mt-16 mb-4 text-2xl text-center font-bold">
                    오늘의 트렌드
                </h2>
                <MoviesOfTrending />
            </div>
        </HydrationBoundary>
    );
}
