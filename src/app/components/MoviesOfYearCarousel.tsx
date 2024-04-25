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
    const {
        data: moviesDetailsWithAwards,
        isSuccess,
        isLoading,
    } = useQuery({
        queryKey: ['award', 2023],
        queryFn: () => getMoviesOfTheYear(),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

    const [activeIndex, setActiveIndex] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
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
            {!isLoading ? (
                <Slider {...settings} className="z-0">
                    {moviesDetailsWithAwards?.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="relative w-full h-[284px] sm:h-[398px] xl:h-[550px] overflow-hidden focus:outline-none"
                        >
                            <div className="absolute top-0 left-0 right-0 bottom-0">
                                <Image
                                    src={`${TMDB_BASE_URL}/original/${movie.backdrop_path}`}
                                    alt={`${movie.title} backdrop`}
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: '50% 50%',
                                    }}
                                    sizes="100vw"
                                    priority={index == 1}
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB2ZXJzaW9uPTEuMSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyYXknLz48L3N2Zz4="
                                />
                            </div>
                            <Link href={`/film-info/${movie.id}`}>
                                <div className="absolute bottom-10 right-10 z-10 text-white bg-black/40 text-xs sm:text-sm p-2 sm:p-4 rounded-md ">
                                    {movie.title} - {movie.award}
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="relative w-full h-[284px] sm:h-[398px] xl:h-[550px] overflow-hidden focus:outline-none">
                    <div className="absolute top-0 left-0 right-0 bottom-0">
                        <Image
                            src={'/temporaryImage.webp'}
                            alt={`임시 이미지`}
                            fill
                            style={{
                                objectFit: 'cover',
                                objectPosition: '50% 50%',
                            }}
                            sizes="100vw"
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB2ZXJzaW9uPTEuMSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyYXknLz48L3N2Zz4="
                        />
                    </div>
                    <Link href={`/film-info/1050035`}>
                        <div className="absolute bottom-10 right-10 z-10 text-white bg-black/40 text-xs sm:text-sm p-2 sm:p-4 rounded-md ">
                            괴물 - 각본상
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}
