import Image from 'next/image';
import React from 'react';

// Movie 타입을 정의합니다. 실제 프로젝트에서는 전체 Movie 타입을 사용해야 할 수도 있습니다.
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
            <Image
                src={posterURL}
                alt={movie.title}
                style={{ width: '200px' }}
            />
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>{movie.overview}</p>
        </div>
    );
}
