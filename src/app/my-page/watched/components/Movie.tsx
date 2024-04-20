import { TMDB_BASE_URL } from '@/constants/movie';
import { WatchedMovie } from '@/types/movie';
import Image from 'next/image';

export default function Movie({
    WatchedMovieData,
}: {
    WatchedMovieData: WatchedMovie;
}) {
    return (
        <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-2 ">
            <div className="relative w-full h-auto px-2">
                <Image
                    src={`${TMDB_BASE_URL}/w500/${WatchedMovieData.moviePoster}`}
                    alt={WatchedMovieData.movieTitle}
                    width={500}
                    height={300}
                    sizes="100vw"
                />
            </div>
            <div className="mt-2">
                <p className="text-center text-sm">
                    {WatchedMovieData.movieTitle}
                </p>
            </div>
        </div>
    );
}
