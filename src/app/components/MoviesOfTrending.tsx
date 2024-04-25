'use client';
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import getTrendingMovies from '@/service/movie/getTrendingMovies';
import { TMDB_BASE_URL } from '@/constants/movie';
import { TrendingMovie } from '@/types/movie';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function MoviesOfTrending() {
    const { data: trendingMovies, isLoading } = useQuery({
        queryKey: ['trending', 'day', 'all', 1],
        queryFn: getTrendingMovies,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

    const settings = {
        className: 'center',
        centerMode: true,
        centerPadding: '20px',
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1411,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },

            {
                breakpoint: 1163,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
        autoplay: true,
        autoplaySpeed: 500,
        cssEase: 'ease-in-out',
    };

    return (
        <>
            <h2 className="mt-8 sm:mt-16 mb-4 text-base sm:text-xl text-center font-bold">
                오늘의 인기영화
            </h2>
            {isLoading ? (
                <Skeleton className="w-full h-96" />
            ) : (
                <>
                    <div className="relative w-full overflow-hidden">
                        <Slider {...settings}>
                            {trendingMovies.results.map(
                                (movie: TrendingMovie, index: number) => (
                                    <Link
                                        key={movie.id}
                                        href={`/film-info/${movie.id}`}
                                    >
                                        <div className="relative h-72 w-full sm:h-[284px] sm:w-[198px] lg:h-[398px] lg:w-[278px] flex-shrink-0 transition-[height] transition-[width] ease-in focus:outline-none">
                                            <Image
                                                src={`${TMDB_BASE_URL}/w500/${movie.poster_path}`}
                                                alt={movie.title}
                                                fill
                                                style={{
                                                    objectFit: 'contain',
                                                    padding: '4px',
                                                }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={index < 5}
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UA8AAgUBQbH2eGIAAAAASUVORK5CYII="
                                            />
                                        </div>
                                    </Link>
                                )
                            )}
                        </Slider>
                    </div>
                </>
            )}
        </>
    );
}
