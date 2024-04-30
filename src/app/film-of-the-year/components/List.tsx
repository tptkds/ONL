'use client';
import { useEffect, useState } from 'react';
import { BookmarkMovie, MovieDataMap, WatchedMovie } from '@/types/movie';
import { useSession } from 'next-auth/react';
import getBookmarkedMovies from '@/service/movie/getBookmarkedMovies';
import getWatchedMovies from '@/service/movie/getWatchedMovies';
import { useQuery } from '@tanstack/react-query';
import getMoviesOfTheYearByFestival from '@/service/movie/getMoviesOfTheYearByFestival';
import getMovieData from '@/service/movie/getMovieData';
import Movie from '@/app/components/Movie';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
interface WatchedMoviesMap {
    [key: string]: WatchedMovie;
}
export default function List() {
    const { data: sessionData } = useSession();

    const { data: movieData } = useQuery({
        queryKey: ['movieData'],
        queryFn: () => getMovieData(),
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

    const { data: awards, isLoading } = useQuery({
        queryKey: ['award', 2023, 'byFestival'],
        queryFn: () => getMoviesOfTheYearByFestival(),

        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

    const [watchedMovies, setWatchedMovies] = useState<WatchedMoviesMap>({});
    const { data: watchedMoviesData } = useQuery({
        queryKey: ['watchedMovies', sessionData?.user.uid],
        queryFn: () => getWatchedMovies(sessionData?.user?.uid as string),
        enabled: !!sessionData?.user?.uid,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
    useEffect(() => {
        if (watchedMoviesData) setWatchedMovies(watchedMoviesData);
    }, [watchedMoviesData]);

    const [bookmarkedMovies, setBookmarkedMovies] = useState<{
        [key: string]: BookmarkMovie;
    }>({});
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

    if (!awards) {
        return <></>;
    }
    return (
        <section className="w-full mt-8 sm:mt-10 px-4 min-[420px]:px-16 text-neutral-800">
            {isLoading || !awards ? (
                <div className="flex items-center justify-center w-full h-full">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            ) : (
                awards?.map(award => (
                    <div key={award.id} className="mb-8">
                        <h2 className="text-base sm:text-xl font-semibold text-center">
                            {award.id === 'Berlin'
                                ? '베를린 국제 영화제 제73회'
                                : award.id === 'Cannes'
                                  ? '칸 영화제 제76회'
                                  : '베니스 국제 영화제 제80회'}
                        </h2>
                        <div className="flex flex-wrap">
                            {award.movies &&
                                award.movies.map((movie, index) => (
                                    <div
                                        key={index}
                                        className=" flex flex-col justify-center p-4 my-4 border border-gray-200 w-full  sm:w-1/2 screen-920:w-1/3 xl:w-1/4 2xl:w-1/5 "
                                    >
                                        <p className=" text-sm text-center font-medium">
                                            {movie.award}
                                        </p>
                                        <Movie
                                            movie={{
                                                id: movie.id,
                                                title: movie.title,
                                                poster_path:
                                                    movie.poster_path as string,
                                                release_date:
                                                    movie.release_date,
                                                vote_average:
                                                    movie.vote_average,
                                                overview: movie.overview,
                                            }}
                                            index={index}
                                            bookmarkedMovies={bookmarkedMovies}
                                            watchedMovies={watchedMovies}
                                            movieData={
                                                movieData as MovieDataMap
                                            }
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}
