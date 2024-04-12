'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MoviesResponse } from '@/types/movie';
import getPopularMovies from '@/service/movie/getPopularMovies';
import Movie from './Movie';
import React, { Fragment, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

export default function List() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery<MoviesResponse>({
            queryKey: ['popularMovies'],
            queryFn: async ({ pageParam = 1 }) => {
                return getPopularMovies(pageParam as number);
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
                        <div key={movie.id} className="w-1/4 flex ">
                            <Movie movie={movie} />
                        </div>
                    ))}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: '300px' }} />
        </div>
    );
}
