'use client';
import getWatchedMovies from '@/service/movie/getWatchedMovies';
import { WatchedMovie } from '@/types/movie';
import { useSession } from 'next-auth/react';
import Movie from './components/Movie';
import { useEffect, useState } from 'react';

export default function Bookmarks() {
    const { data: sessionData } = useSession();
    const [watchedMovies, setWatchedMovies] = useState<{
        [key: string]: WatchedMovie;
    }>({});

    useEffect(() => {
        if (sessionData?.user?.uid) {
            getWatchedMovies(sessionData.user.uid)
                .then(setWatchedMovies)
                .catch(console.error);
        }
    }, [sessionData?.user?.uid]);
    return (
        <div className="flex flex-wrap w-full mt-4 sm:mt-0 ml-2 h-fit">
            {watchedMovies &&
                Object.keys(watchedMovies).map(key => (
                    <Movie
                        key={key}
                        WatchedMovieData={watchedMovies[key]}
                        watchedMovies={watchedMovies}
                        setWatchedMovies={setWatchedMovies}
                        uid={sessionData?.user.uid as string}
                    />
                ))}
        </div>
    );
}
