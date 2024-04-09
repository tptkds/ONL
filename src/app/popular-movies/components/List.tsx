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
        console.log('chop');
        if (isIntersecting && hasNextPage && !isFetchingNextPage) {
            console.log('yup');
            fetchNextPage();
        }
    }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="scrollable-div ">
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                    {page.results.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: '100px' }} />
        </div>
    );
}
