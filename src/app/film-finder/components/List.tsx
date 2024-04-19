'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MoviesResponse } from '@/types/movie';
import Movie from './Movie';
import React, { Fragment, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import useStore from '@/app/store';
import getMoviesByFilltering from '@/service/movie/getMoviesByFilltering';

export default function List() {
    const { selectedSorting, selectedGenres, keyword } = useStore();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
        });
    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.5,
    });
    useEffect(() => {
        if (isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);
    return (
        <div className="flex flex-wrap ">
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                    {page.results.map(movie => (
                        <div
                            key={movie.id}
                            className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 flex "
                        >
                            <Movie movie={movie} />
                        </div>
                    ))}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: '300px' }} />
        </div>
    );
}
