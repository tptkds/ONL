'use client';
import React, { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import getMoviesOfTheYear from '@/service/movie/getMoviesOfTheYear';
import { useQuery } from '@tanstack/react-query';
import { TMDB_BASE_URL } from '@/constants/movie';
import Link from 'next/link';

export default function MoviesOfYearCarousel() {
    const { data: moviesDetailsWithAwards, isSuccess } = useQuery({
        queryKey: ['award', 2023],
        queryFn: () => getMoviesOfTheYear(),
        staleTime: Infinity,
    });

    const [activeIndex, setActiveIndex] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        beforeChange: (current: number, next: number) => setActiveIndex(next),
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'ease-in-out',
        initialSlide: 9,
    };

    return (
        <div className="relative w-full overflow-hidden">
            {isSuccess && moviesDetailsWithAwards.length > 0 && (
                <Slider {...settings} className="z-0">
                    {moviesDetailsWithAwards.map(movie => (
                        <div
                            key={movie.id}
                            className="relative w-full h-[550px] overflow-hidden focus:outline-none"
                        >
                            <Image
                                src={`${TMDB_BASE_URL}/original${movie.backdrop_path}`}
                                alt={`${movie.title} backdrop`}
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: '50% 50%',
                                }}
                                sizes="100vw"
                                priority
                                className="absolute inset-0 z-0"
                            />
                            <Link href={`/film-info/${movie.id}`}>
                                <div className="absolute bottom-10 right-10 z-10 text-white bg-black/40 p-4 rounded-md ">
                                    {movie.title} - {movie.award}
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}
