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
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1411,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
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
                breakpoint: 400,
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
            <h2 className="mt-16 mb-4 text-xl text-center font-bold">
                오늘의 인기영화
            </h2>
            {isLoading ? (
                <Skeleton className="w-full h-96" />
            ) : (
                <>
                    <div className="relative w-full overflow-hidden">
                        <Slider {...settings}>
                            {trendingMovies.results.map(
                                (movie: TrendingMovie) => (
                                    <Link
                                        key={movie.id}
                                        href={`/film-info/${movie.id}`}
                                    >
                                        <div className="relative h-56 w-36 sm:h-[284px] sm:w-[198px] lg:h-[398px] lg:w-[278px] sm:ml-16 flex-shrink-0 transition-[height] transition-[width] ease-in focus:outline-none">
                                            <Image
                                                src={`${TMDB_BASE_URL}/w500/${movie.poster_path}`}
                                                alt={movie.title}
                                                fill
                                                style={{
                                                    objectFit: 'cover',
                                                    padding: '4px',
                                                }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                                placeholder="blur"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB2ZXJzaW9uPTEuMSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyYXknLz48L3N2Zz4="
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
