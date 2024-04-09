'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MoviesResponse } from '@/types/movie';
import getPopularMovies from '@/service/movie/getPopularMovies';
import Movie from './Movie';
import React from 'react';

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

    const handleScroll = ({ currentTarget }: React.UIEvent<HTMLDivElement>) => {
        console.log('스크롤');
        if (
            currentTarget.scrollHeight -
                currentTarget.scrollTop -
                currentTarget.clientHeight <
                100 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            console.log('실행');
            fetchNextPage();
        } else {
            console.log(hasNextPage);
        }
    };

    return (
        <div className="scrollable-div " onScroll={handleScroll}>
            {data?.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                    {page.results.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
