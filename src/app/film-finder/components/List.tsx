'use client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MoviesResponse } from '@/types/movie';
import Movie from './Movie';
import { useIntersectionObserver } from 'usehooks-ts';
import useStore from '@/app/store';
import getMoviesByFilltering from '@/service/movie/getMoviesByFilltering';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import getBookmarkedMovies from '@/service/movie/getBookmarkedMovies';
import getWatchedMovies from '@/service/movie/getWatchedMovies';
import { BookmarkMovie } from '@/types/movie';
import React, { useEffect, useState, Fragment } from 'react';
import { useSession } from 'next-auth/react';
import getMovieData from '@/service/movie/getMovieData';
interface MovieData {
    participants: number;
    score: number;
    bookmarked: number;
}
interface MovieDataMap {
    [key: string]: MovieData;
}
export default function List() {
    const { data: sessionData } = useSession();
    const { selectedSorting, selectedGenres, keyword } = useStore();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery<MoviesResponse>({
            queryKey: ['movies', selectedSorting, selectedGenres, keyword],
            queryFn: async ({ pageParam = 1 }) => {
                return getMoviesByFilltering(
                    keyword,
                    selectedGenres.join(','),
                    selectedSorting,
                    pageParam as number
                );
            },
            initialPageParam: 1,
            getNextPageParam: lastPage => {
                const nextPage = lastPage.page + 1;
                return nextPage <= lastPage.total_pages ? nextPage : undefined;
            },
            refetchOnWindowFocus: false,
            refetchInterval: false,
        });
    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '500px',
    });
    useEffect(() => {
        if (isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const [watchedMovies, setWatchedMovies] = useState({});

    const { data: movieData } = useQuery({
        queryKey: ['movieData'],
        queryFn: () => getMovieData(),
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

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

    return (
        <div className="flex flex-wrap h-full">
            {isLoading && (
                <div className="flex items-center justify-center w-full h-full">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            )}
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                    {page.results.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="relative w-full sm:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 flex flex-col "
                        >
                            <Movie
                                movie={movie}
                                index={index}
                                bookmarkedMovies={bookmarkedMovies}
                                watchedMovies={watchedMovies}
                                movieData={movieData as MovieDataMap}
                            />
                        </div>
                    ))}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: '300px' }} />
        </div>
    );
}
