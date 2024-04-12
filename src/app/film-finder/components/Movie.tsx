import Image from 'next/image';
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
        <div className="mb-5">
            <div className="relative mb-2">
                <Image
                    src={posterURL}
                    layout={'responsive'}
                    width={500}
                    height={300}
                    alt={movie.title}
                />
            </div>
            <h2 className="text-lg font-bold text-gray-800">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.release_date}</p>
            {renderRating(movie.vote_average)}
        </div>
    );
}
