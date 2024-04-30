import BookmarkToggleButton from '@/app/components/BookmarkToggleButton';
import { TMDB_BASE_URL } from '@/constants/movie';
import { BookmarkMovie, MovieDataMap } from '@/types/movie';
import Image from 'next/image';

import Link from 'next/link';

export default function Bookmark({
    bookmarkData,
    uid,
    bookmarkedMovies,
    movieData,
}: {
    bookmarkData: BookmarkMovie;
    uid: string;
    bookmarkedMovies: { [key: string]: BookmarkMovie };
    movieData: MovieDataMap;
}) {
    return (
        <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  border py-2 pb-4 mb-4">
            <div className="relative w-full h-auto px-2">
                <Link href={`/film-info/${bookmarkData.movieId}`}>
                    <Image
                        src={`${TMDB_BASE_URL}/w500/${bookmarkData.moviePoster}`}
                        alt={bookmarkData.movieTitle}
                        width={500}
                        height={300}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UA8AAgUBQbH2eGIAAAAASUVORK5CYII="
                    />
                </Link>
            </div>
            <div className="mt-2">
                <Link href={`/film-info/${bookmarkData.movieId}`}>
                    <p className="text-center text-sm px-4 truncate">
                        {bookmarkData.movieTitle}
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
                        movieData[bookmarkData.movieId]?.participants &&
                        movieData[bookmarkData.movieId]?.score != 0
                            ? (
                                  Math.floor(
                                      (movieData[bookmarkData.movieId].score /
                                          movieData[bookmarkData.movieId]
                                              .participants) *
                                          100
                                  ) / 100
                              ).toFixed(2)
                            : '평점 정보가 없어요'}
                    </p>
                </div>
            </div>

            <div className="flex justify-center mt-2">
                <BookmarkToggleButton
                    moviePoster={bookmarkData.moviePoster as string}
                    movieTitle={bookmarkData.movieTitle}
                    movieId={bookmarkData.movieId}
                    uId={uid as string}
                    bookmarkedMovies={bookmarkedMovies}
                />
            </div>
        </div>
    );
}
