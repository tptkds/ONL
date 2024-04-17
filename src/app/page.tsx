import getMoviesOfTheYear from '@/service/movie/getMoviesOfTheYear';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import MoviesOfYearCarousel from './components/MoviesOfYearCarousel';

export default function Home() {
    const queryClient = new QueryClient();
    queryClient.prefetchQuery({
        queryKey: ['award', 2023],
        queryFn: () => getMoviesOfTheYear(),
        staleTime: Infinity,
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MoviesOfYearCarousel />
        </HydrationBoundary>
    );
}
