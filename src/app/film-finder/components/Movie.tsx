import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { BookmarkMovie, MovieDataMap, WatchedMovie } from '@/types/movie';
import BookmarkToggleButton from '@/app/components/BookmarkToggleButton';
import WatchedToggleButton from '@/app/components/WatchedToggleButton';

interface MovieProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
        vote_average: number;
        overview: string;
    };
    index: number;
    bookmarkedMovies: { [key: string]: BookmarkMovie };
    watchedMovies: { [key: string]: WatchedMovie };
    movieData: MovieDataMap;
}

export default function Movie({
    movie,
    index,
    watchedMovies,
    bookmarkedMovies,
    movieData,
}: MovieProps) {
    const { data: sessionData, status } = useSession();

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
                            priority={index < 5}
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

                    <div className="flex justify-between items-center">
                        {renderRating(movie.vote_average)}

                        {status == 'authenticated' && (
                            <div className="flex justify-between items-center">
                                <BookmarkToggleButton
                                    moviePoster={movie.poster_path}
                                    movieTitle={movie.title}
                                    movieId={movie.id}
                                    uId={sessionData?.user.uid as string}
                                    bookmarkedMovies={bookmarkedMovies}
                                />
                                <p
                                    className="text-sm mr-2"
                                    aria-label={`${movie.title}을 북마크한 사용자 수`}
                                >
                                    {movieData &&
                                    movieData[movie.id]?.bookmarked
                                        ? movieData[movie.id].bookmarked
                                        : '0'}
                                </p>
                                <WatchedToggleButton
                                    moviePoster={movie.poster_path}
                                    movieTitle={movie.title}
                                    movieId={movie.id}
                                    uId={sessionData?.user.uid as string}
                                    watchedMovies={watchedMovies}
                                />
                                <p
                                    className="text-sm mr-2"
                                    aria-label={`${movie.title}을 시청한 사용자 수`}
                                >
                                    {movieData &&
                                    movieData[movie.id]?.participants
                                        ? movieData[movie.id].participants
                                        : '0'}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center ">
                        <Image
                            src={'/onl.svg'}
                            alt="ONL"
                            width={20}
                            height={20}
                            style={{ margin: '0 2px' }}
                        />
                        <div className="mx-2">
                            <p className="text-sm ">
                                {movieData &&
                                movieData[movie.id]?.participants &&
                                movieData[movie.id]?.score != 0
                                    ? (
                                          Math.floor(
                                              (movieData[movie.id].score /
                                                  movieData[movie.id]
                                                      .participants) *
                                                  100
                                          ) / 100
                                      ).toFixed(2)
                                    : '평점 정보가 없어요'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
