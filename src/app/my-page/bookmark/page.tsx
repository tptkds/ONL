'use client';
import getBookmarkedMovies from '@/service/movie/getBookmarkedMovies';
import { BookmarkMovie, MovieDataMap } from '@/types/movie';
import { useSession } from 'next-auth/react';
import Bookmark from './components/Bookmark';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getMovieData from '@/service/movie/getMovieData';

export default function Bookmarks() {
    const { data: sessionData } = useSession();
    const [bookmarkedMovies, setBookmarkedMovies] = useState<{
        [key: string]: BookmarkMovie;
    }>({});
    const { data: movieData } = useQuery({
        queryKey: ['movieData'],
        queryFn: () => getMovieData(),
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
    const { data: bookmarkedMoviesData } = useQuery({
        queryKey: ['bookmarkedMovies', sessionData?.user.uid],
        queryFn: () => getBookmarkedMovies(sessionData?.user?.uid as string),
        enabled: !!sessionData?.user?.uid,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
    useEffect(() => {
        if (bookmarkedMoviesData) setBookmarkedMovies(bookmarkedMoviesData);
    }, [bookmarkedMoviesData]);

    return (
        <div className="flex flex-wrap w-full mt-4 sm:mt-0 ml-2 h-fit">
            {Object.keys(bookmarkedMovies).length != 0 ? (
                Object.keys(bookmarkedMovies).map(key => (
                    <Bookmark
                        key={key}
                        bookmarkData={bookmarkedMovies[key] as BookmarkMovie}
                        uid={sessionData?.user.uid as string}
                        bookmarkedMovies={bookmarkedMovies}
                        movieData={movieData as MovieDataMap}
                    />
                ))
            ) : (
                <div className="flex justify-center w-full h-60 items-center text-sm">
                    북마크한 영화가 아직 없어요!
                </div>
            )}
        </div>
    );
}
