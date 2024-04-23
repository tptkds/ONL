import addWatchedMovie from '@/service/movie/addWatchedMovie';
import deleteWatchedMovie from '@/service/movie/deleteWatchedMovie';
import { WatchedMovie } from '@/types/movie';
import { Timestamp } from 'firebase/firestore';
import { PiTelevisionSimple, PiTelevisionSimpleFill } from 'react-icons/pi';

interface WatchedToggleButtonProps {
    moviePoster: string;
    movieTitle: string;
    movieId: string;
    uId: string;
    watchedMovies: { [key: string]: WatchedMovie };
    setWatchedMovies: React.Dispatch<
        React.SetStateAction<{ [key: string]: WatchedMovie }>
    >;
    rating: number;
}

export default function WatchedToggleButton({
    moviePoster,
    movieTitle,
    movieId,
    uId,
    watchedMovies,
    setWatchedMovies,
    rating,
}: WatchedToggleButtonProps) {
    const toggleWatchedMovie = async () => {
        const isWatched = watchedMovies[movieId];

        if (isWatched) {
            try {
                await deleteWatchedMovie(
                    uId,
                    watchedMovies[movieId].id as string
                );
                const updatedWatchedMovies = { ...watchedMovies };
                delete updatedWatchedMovies[movieId];
                setWatchedMovies(updatedWatchedMovies);
                console.log(`Removed from watched movies: ${movieId}`);
            } catch (error) {
                console.error('Failed to remove from watched movies:', error);
            }
        } else {
            const newWatched: WatchedMovie = {
                movieId: movieId,
                watchDate: Timestamp.fromDate(new Date()),
                userRating: rating,
                movieTitle: movieTitle,
                moviePoster: moviePoster,
            };

            try {
                await addWatchedMovie(uId, newWatched);
                const updatedWatchedMovies = {
                    ...watchedMovies,
                    [movieId]: newWatched,
                };
                setWatchedMovies(updatedWatchedMovies);
                console.log(`Added to watched movies: ${movieId}`);
            } catch (error) {
                console.error('Failed to add to watched movies:', error);
            }
        }
    };

    return (
        <button
            onClick={toggleWatchedMovie}
            className="hover:bg-gray-100 p-2 rounded-full flex justify-center items-center"
        >
            {watchedMovies[movieId] ? (
                <PiTelevisionSimpleFill className="text-base" />
            ) : (
                <PiTelevisionSimple className="text-base" />
            )}
        </button>
    );
}
