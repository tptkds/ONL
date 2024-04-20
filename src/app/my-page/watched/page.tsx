'use client';
import getWatchedMovies from '@/service/movie/getWatchedMovies';
import { WatchedMovie } from '@/types/movie';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Movie from './components/Movie';

export default function Bookmarks() {
    const { data: sessionData } = useSession();
    const { data: watchedMovies, isFetching } = useQuery({
        queryKey: ['watched', sessionData?.user.uid],
        queryFn: () => getWatchedMovies(sessionData?.user.uid as string),
        enabled: !!sessionData?.user.uid,
        refetchOnMount: 'always',
    });
    if (isFetching) return <></>;
    return (
        <div className="flex flex-wrap w-full mt-4 sm:mt-0 ml-2">
            {watchedMovies &&
                Object.keys(watchedMovies).map(key => (
                    <Movie
                        key={key}
                        WatchedMovieData={watchedMovies[key] as WatchedMovie}
                    />
                ))}
        </div>
    );
}
