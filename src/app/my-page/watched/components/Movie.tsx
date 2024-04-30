import WatchedToggleButton from '@/app/components/WatchedToggleButton';
import { TMDB_BASE_URL } from '@/constants/movie';
import { MovieDataMap, WatchedMovie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';

export default function Movie({
    uid,
    WatchedMovieData,
    watchedMovies,
    movieData,
}: {
    uid: string;
    WatchedMovieData: WatchedMovie;
    watchedMovies: { [key: string]: WatchedMovie };
    movieData: MovieDataMap;
}) {
    return (
        <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  border py-2 pb-4 mb-4">
            <div className="relative w-full h-auto px-2">
                <Link href={`/film-info/${WatchedMovieData.movieId}`}>
                    <Image
                        src={`${TMDB_BASE_URL}/w500/${WatchedMovieData.moviePoster}`}
                        alt={WatchedMovieData.movieTitle}
                        width={500}
                        height={300}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UA8AAgUBQbH2eGIAAAAASUVORK5CYII="
                    />
                </Link>
            </div>
            <div className="mt-2">
                <Link href={`/film-info/${WatchedMovieData.movieId}`}>
                    <p className="text-center text-sm px-4 truncate">
                        {WatchedMovieData.movieTitle}
                    </p>
                </Link>
            </div>
            <div className="flex items-center justify-center">
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
                        movieData[WatchedMovieData.movieId]?.participants &&
                        movieData[WatchedMovieData.movieId]?.score != 0
                            ? (
                                  Math.floor(
                                      (movieData[WatchedMovieData.movieId]
                                          .score /
                                          movieData[WatchedMovieData.movieId]
                                              .participants) *
                                          100
                                  ) / 100
                              ).toFixed(2)
                            : '평점 정보가 없어요'}
                    </p>
                </div>
            </div>
            <div className="flex justify-center mt-2">
                <WatchedToggleButton
                    moviePoster={WatchedMovieData.moviePoster}
                    movieTitle={WatchedMovieData.movieTitle}
                    movieId={WatchedMovieData.movieId}
                    uId={uid}
                    watchedMovies={watchedMovies}
                />
            </div>
        </div>
    );
}
