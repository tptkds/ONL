'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MoviesResponse } from '@/types/movie';
import Movie from './Movie';
import React, { Fragment, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import useStore from '@/app/store';
import getMoviesByFilltering from '@/service/movie/getMoviesByFilltering';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function List() {
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
                            <Movie movie={movie} index={index} />
                        </div>
                    ))}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: '300px' }} />
        </div>
    );
}
