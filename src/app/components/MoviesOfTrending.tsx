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

export default function MoviesOfTrending() {
    const { data: trendingMovies, isSuccess } = useQuery({
        queryKey: ['trending', 'day', 'all', 1],
        queryFn: getTrendingMovies,
        staleTime: Infinity,
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'ease-in-out',
    };

    if (!isSuccess || !trendingMovies || trendingMovies.length === 0) {
        return <div></div>;
    }

    return (
        <div className="relative w-full overflow-hidden">
            {isSuccess && trendingMovies.results.length > 0 && (
                <Slider {...settings}>
                    {trendingMovies.results.map((movie: TrendingMovie) => (
                        <div
                            key={movie.id}
                            className="relative h-56 w-36 sm:h-[284px] sm:w-[198px] lg:h-[398px] lg:w-[278px] sm:ml-16 flex-shrink-0 transition-[height] transition-[width] ease-in focus:outline-none"
                        >
                            <Image
                                src={`${TMDB_BASE_URL}/w500/${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                style={{
                                    objectFit: 'contain',
                                    padding: '4px',
                                }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}
