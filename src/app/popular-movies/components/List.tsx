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
                // TypeScript에게 pageParam이 number임을 명시
                return getPopularMovies(pageParam as number);
            },
            initialPageParam: 1,
            getNextPageParam: lastPage => {
                // 올바른 속성 사용으로 수정 (예: lastPage.page + 1)
                const nextPage = lastPage.page + 1;
                // 이 예에서는 API의 응답 구조에 따라 nextPage 계산 로직을 조정해야 합니다.
                return nextPage <= lastPage.total_pages ? nextPage : undefined;
            },
            // getPreviousPageParam이 필요한 경우 여기에 추가
        });

    // 스크롤 이벤트 핸들러
    const handleScroll = ({ currentTarget }: React.UIEvent<HTMLDivElement>) => {
        if (
            currentTarget.scrollHeight - currentTarget.scrollTop ===
                currentTarget.clientHeight &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    };

    return (
        <div onScroll={handleScroll}>
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
