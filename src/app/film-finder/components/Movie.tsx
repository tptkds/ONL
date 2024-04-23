import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MovieProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
        vote_average: number;
        overview: string;
    };
}

export default function Movie({ movie }: MovieProps) {
    const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const renderRating = (rating: number) => {
        return (
            <div className="flex items-center">
                <div className="relative w-24 h-1 bg-gray-300 mr-2">
                    <div
                        className="absolute top-0 left-0 h-1 bg-blue-500"
                        style={{ width: `${rating * 10}%` }}
                    ></div>
                </div>
                <span className="text-xs">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div className="py-2 sm:py-6 p-2 h-full">
            <div className="  w-full h-full">
                <Link href={`/film-info/${movie.id}`}>
                    <div className="relative mb-2 flex h-4/5">
                        <Image
                            src={posterURL}
                            alt={movie.title}
                            sizes="100vw"
                            width={1000}
                            height={700}
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB2ZXJzaW9uPTEuMSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyYXknLz48L3N2Zz4="
                        />
                    </div>
                </Link>
                <div className="h-1/4">
                    <h2 className="text-lg font-bold text-gray-800 ">
                        {movie.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {movie.release_date}
                    </p>
                    {renderRating(movie.vote_average)}
                </div>
            </div>
        </div>
    );
}
