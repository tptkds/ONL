import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import List from './components/List';
import getMoviesOfTheYearByFestival from '@/service/movie/getMoviesOfTheYearByFestival';

export default function FilmOfTheYear() {
    const queryClient = new QueryClient();
    queryClient.prefetchQuery({
        queryKey: ['award', 2023, 'byFestival'],
        queryFn: () => getMoviesOfTheYearByFestival(),
        staleTime: Infinity,
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <List />
        </HydrationBoundary>
    );
}
