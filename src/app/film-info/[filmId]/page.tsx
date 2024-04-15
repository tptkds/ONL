import { getMovieDetails } from '@/service/movie/getMovieDetails';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import Info from './components/Info';
import { getMovieCredits } from '@/service/movie/getMovieCredits';

export default async function FilmInfo({
    params,
}: {
    params: { filmId: string };
}) {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ['filmInfo', params.filmId],
        queryFn: async () => getMovieDetails(params.filmId),
        staleTime: Infinity,
    });

    queryClient.prefetchQuery({
        queryKey: ['credits', params.filmId],
        queryFn: async () => getMovieCredits(params.filmId),
        staleTime: Infinity,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Info filmId={params.filmId} />
        </HydrationBoundary>
    );
}
