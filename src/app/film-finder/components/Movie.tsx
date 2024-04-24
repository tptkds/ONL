import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BookmarkToggleButton from '../../components/BookmarkToggleButton';
import WatchedToggleButton from '../../components/WatchedToggleButton';
import { BookmarkMovie } from '@/types/movie';
import { useSession } from 'next-auth/react';
import getBookmarkedMovies from '@/service/movie/getBookmarkedMovies';
import getWatchedMovies from '@/service/movie/getWatchedMovies';

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
    const { data: sessionData, status } = useSession();
    const [watchedMovies, setWatchedMovies] = useState({});
    const [bookmarkedMovies, setBookmarkedMovies] = useState<{
        [key: string]: BookmarkMovie;
    }>({});

    useEffect(() => {
        if (
            sessionData?.user?.uid &&
            Object.keys(bookmarkedMovies).length === 0
        ) {
            getBookmarkedMovies(sessionData.user.uid)
                .then(setBookmarkedMovies)
                .catch(console.error);

            getWatchedMovies(sessionData.user.uid)
                .then(setWatchedMovies)
                .catch(console.error);
        }
    }, [sessionData?.user?.uid]);

    const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const renderRating = (rating: number) => {
        return (
            <div className="flex items-center">
                <div className="relative w-24 h-1 bg-gray-300 mr-2">
                    <div
                        className="absolute top-0 left-0 h-1 bg-gray-950"
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
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UA8AAgUBQbH2eGIAAAAASUVORK5CYII="
                        />
                    </div>
                </Link>
                <div className="h-1/4">
                    <h2 className="text-base font-bold text-gray-800 truncate">
                        <Link href={`/film-info/${movie.id}`}>
                            {movie.title}
                        </Link>
                    </h2>
                    <p className="text-sm text-gray-600">
                        {movie.release_date}
                    </p>

                    <div className="flex justify-between">
                        {renderRating(movie.vote_average)}
                        {status == 'authenticated' && (
                            <div className="flex">
                                <BookmarkToggleButton
                                    moviePoster={movie.poster_path}
                                    movieTitle={movie.title}
                                    movieId={movie.id + ''}
                                    uId={sessionData?.user.uid as string}
                                    bookmarkedMovies={bookmarkedMovies}
                                    setBookmarkedMovies={setBookmarkedMovies}
                                />
                                <WatchedToggleButton
                                    moviePoster={movie.poster_path}
                                    movieTitle={movie.title}
                                    movieId={movie.id + ''}
                                    uId={sessionData?.user.uid as string}
                                    watchedMovies={watchedMovies}
                                    setWatchedMovies={setWatchedMovies}
                                    rating={5}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
