'use client';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import getMoviesOfTheYear from '@/service/movie/getMoviesOfTheYear';
import { useQuery } from '@tanstack/react-query';

export default function MoviesOfYearCarousel() {
    const { data: moviesDetailsWithAwards, isSuccess } = useQuery({
        queryKey: ['award', 2023],
        queryFn: () => getMoviesOfTheYear(),
        staleTime: Infinity,
    });

    const [activeIndex, setActiveIndex] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        beforeChange: (current, next) => setActiveIndex(next),
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
    };

    return (
        <div className="relative w-full">
            {/* Background image of the centered movie */}
            {isSuccess && moviesDetailsWithAwards.length > 0 && (
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${moviesDetailsWithAwards[activeIndex]?.backdrop_path})`,
                    }}
                />
            )}

            <Slider {...settings} className="relative z-10">
                {moviesDetailsWithAwards?.map((movie, index) => (
                    <div
                        key={movie.id}
                        className="outline-none focus:outline-none"
                    >
                        <div
                            className={`transition-transform ease-in-out duration-500 ${index === activeIndex ? 'scale-110' : 'scale-90'}`}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title}
                                className="mx-auto"
                                style={{
                                    height: '300px', // Adjust size as needed
                                    width: 'auto',
                                }}
                            />
                            <div className="text-center text-white bg-black/50 p-2.5 rounded">
                                {movie.title} - {movie.award}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
