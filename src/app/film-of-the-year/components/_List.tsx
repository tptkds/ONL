'use client';
import { useEffect, useState } from 'react';
import { BookmarkMovie, WatchedMovie } from '@/types/movie';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import getBookmarkedMovies from '@/service/movie/getBookmarkedMovies';
import getWatchedMovies from '@/service/movie/getWatchedMovies';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import getMoviesOfTheYearByFestival from '@/service/movie/getMoviesOfTheYearByFestival';
import { TMDB_BASE_URL } from '@/constants/movie';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import BookmarkToggleButton from '@/app/components/BookmarkToggleButton';
import WatchedToggleButton from '@/app/components/WatchedToggleButton';
import getMovieData from '@/service/movie/getMovieData';
interface WatchedMoviesMap {
    [key: string]: WatchedMovie;
}
export default function List() {
    const { data: sessionData, status } = useSession();

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
                                        <p className="mb-3 text-sm text-center font-medium">
                                            {movie.award}
                                        </p>
                                        <Link
                                            href={`/film-info/${movie.id}`}
                                            className="relative"
                                        >
                                            <Image
                                                src={`${TMDB_BASE_URL}/w500/${movie.poster_path}`}
                                                alt={movie.title}
                                                sizes="100vw"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                                width={500}
                                                height={500}
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UA8AAgUBQbH2eGIAAAAASUVORK5CYII="
                                            />
                                        </Link>
                                        <Link
                                            href={`/film-info/${movie.id}`}
                                            className="text-center mt-4 mb-1"
                                        >
                                            {movie.title}
                                        </Link>
                                        <div className="flex items-center justify-center ">
                                            <Image
                                                src={'/onl.svg'}
                                                alt="ONL"
                                                width={20}
                                                height={20}
                                                style={{ margin: '0 2px' }}
                                            />
                                            <div className="mx-2">
                                                <p className="text-sm ">
                                                    {movieData &&
                                                    movieData[movie.id]
                                                        ?.participants &&
                                                    movieData[movie.id]
                                                        ?.score != 0
                                                        ? (
                                                              Math.floor(
                                                                  (movieData[
                                                                      movie.id
                                                                  ].score /
                                                                      movieData[
                                                                          movie
                                                                              .id
                                                                      ]
                                                                          .participants) *
                                                                      100
                                                              ) / 100
                                                          ).toFixed(2)
                                                        : '평점 정보가 없어요'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center mt-3">
                                            {status === 'authenticated' ? (
                                                <>
                                                    <BookmarkToggleButton
                                                        moviePoster={
                                                            movie.poster_path as string
                                                        }
                                                        movieTitle={movie.title}
                                                        movieId={movie.id}
                                                        uId={
                                                            sessionData?.user
                                                                .uid as string
                                                        }
                                                        bookmarkedMovies={
                                                            bookmarkedMovies
                                                        }
                                                    />
                                                    <p
                                                        className="text-sm mr-2"
                                                        aria-label={`${movie.title}을 북마크한 사용자 수`}
                                                    >
                                                        {movieData &&
                                                        movieData[movie.id]
                                                            ?.bookmarked
                                                            ? movieData[
                                                                  movie.id
                                                              ].bookmarked
                                                            : '0'}
                                                    </p>
                                                    <WatchedToggleButton
                                                        moviePoster={
                                                            movie.poster_path as string
                                                        }
                                                        movieTitle={movie.title}
                                                        movieId={movie.id}
                                                        uId={
                                                            sessionData?.user
                                                                .uid as string
                                                        }
                                                        watchedMovies={
                                                            watchedMovies
                                                        }
                                                    />
                                                    <p
                                                        className="text-sm mr-2"
                                                        aria-label={`${movie.title}을 시청한 사용자 수`}
                                                    >
                                                        {movieData &&
                                                        movieData[movie.id]
                                                            ?.participants
                                                            ? movieData[
                                                                  movie.id
                                                              ].participants
                                                            : '0'}
                                                    </p>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}
