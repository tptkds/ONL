import addWatchedMovie from '@/service/movie/addWatchedMovie';
import deleteWatchedMovie from '@/service/movie/deleteWatchedMovie';
import { WatchedMovie } from '@/types/movie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { PiTelevisionSimple, PiTelevisionSimpleFill } from 'react-icons/pi';

interface WatchedToggleButtonProps {
    moviePoster: string;
    movieTitle: string;
    movieId: string;
    uId: string;
    watchedMovies: { [key: string]: WatchedMovie };

    rating: number;
}

export default function WatchedToggleButton({
    moviePoster,
    movieTitle,
    movieId,
    uId,
    watchedMovies,
    rating,
}: WatchedToggleButtonProps) {
    const queryClient = useQueryClient();
    const [isDisabledCheckingWatched, setIsDisabledCheckingWatched] =
        useState<boolean>(false);

    const { mutate: mutateDeleteWatchedMovie } = useMutation({
        mutationKey: ['mutateDeleteWatchedMovie', movieId],
        mutationFn: () => deleteWatchedMovie(uId, movieId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['watchedMovies', uId],
            });
        },
    });

    const { mutate: mutateAddWatchedMovie } = useMutation({
        mutationKey: ['mutateAddWatchedMovie', movieId],
        mutationFn: () =>
            addWatchedMovie(uId, {
                movieId: movieId,
                moviePoster: moviePoster,
                movieTitle: movieTitle,
                watchDate: Timestamp.fromDate(new Date()),
                userRating: rating,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['watchedMovies', uId],
            });
        },
    });

    const isFetchingWatchedMovies = queryClient.isFetching({
        queryKey: ['watchedMovies', uId],
    });

    useEffect(() => {
        if (!isFetchingWatchedMovies) setIsDisabledCheckingWatched(false);
    }, [isFetchingWatchedMovies]);

    const toggleWatchedMovie = () => {
        setIsDisabledCheckingWatched(true);
        if (watchedMovies[movieId]) {
            mutateDeleteWatchedMovie();
        } else {
            const movie: WatchedMovie = {
                movieId: movieId,
                watchDate: Timestamp.fromDate(new Date()),
                userRating: rating,
                movieTitle: movieTitle,
                moviePoster: moviePoster,
            };
            mutateAddWatchedMovie();
        }
    };

    return (
        <button
            onClick={toggleWatchedMovie}
            className="ml-2"
            disabled={isDisabledCheckingWatched}
        >
            {watchedMovies[movieId] ? (
                <PiTelevisionSimpleFill className="text-xl" />
            ) : (
                <PiTelevisionSimple className="text-xl" />
            )}
        </button>
    );
}
