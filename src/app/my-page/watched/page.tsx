'use client';
import getWatchedMovies from '@/service/movie/getWatchedMovies';
import { MovieDataMap, WatchedMovie } from '@/types/movie';
import { useSession } from 'next-auth/react';
import Movie from './components/Movie';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getMovieData from '@/service/movie/getMovieData';

export default function Bookmarks() {
    const { data: sessionData } = useSession();
    const [watchedMovies, setWatchedMovies] = useState<any>({});
    const { data: watchedMoviesData } = useQuery({
        queryKey: ['watchedMovies', sessionData?.user.uid],
        queryFn: () => getWatchedMovies(sessionData?.user?.uid as string),
        enabled: !!sessionData?.user?.uid,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
    const { data: movieData } = useQuery({
        queryKey: ['movieData'],
        queryFn: () => getMovieData(),
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
    useEffect(() => {
        if (watchedMoviesData) setWatchedMovies(watchedMoviesData);
    }, [watchedMoviesData]);

    return (
        <div className="flex flex-wrap w-full mt-4 sm:mt-0 ml-2 h-fit">
            {Object.keys(watchedMovies).length != 0 ? (
                Object.keys(watchedMovies).map((key: string) => (
                    <Movie
                        key={key}
                        WatchedMovieData={watchedMovies[key] as WatchedMovie}
                        watchedMovies={watchedMovies}
                        uid={sessionData?.user.uid as string}
                        movieData={movieData as MovieDataMap}
                    />
                ))
            ) : (
                <div className="flex justify-center w-full h-60 items-center text-sm">
                    시청한 영화가 아직 없어요!
                </div>
            )}
        </div>
    );
}
