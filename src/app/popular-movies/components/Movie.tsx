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

    return (
        <div style={{ marginBottom: '20px' }}>
            <h2>{movie.title}</h2>
            <Image src={posterURL} alt={movie.title} width={200} height={300} />
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>{movie.overview}</p>
        </div>
    );
}
