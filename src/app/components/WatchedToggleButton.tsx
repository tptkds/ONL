import addWatchedMovie from '@/service/movie/addWatchedMovie';
import deleteWatchedMovie from '@/service/movie/deleteWatchedMovie';
import { WatchedMovie } from '@/types/movie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
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
}: WatchedToggleButtonProps) {
    const ratingModal = useRef<HTMLDialogElement>(null);
    const [rating, setRating] = useState<number>(0);
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
            mutateAddWatchedMovie();
        }
    };

    return (
        <>
            <button
                className="ml-2"
                disabled={isDisabledCheckingWatched}
                onClick={() => ratingModal?.current?.showModal()}
            >
                {watchedMovies[movieId] ? (
                    <PiTelevisionSimpleFill className="text-base" />
                ) : (
                    <PiTelevisionSimple className="text-base" />
                )}
            </button>
            <dialog id="my_modal_1" className="modal" ref={ratingModal}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">시청한 영화 평가하기</h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                        영화를 시청 목록에 추가하기 전에 영화를 평가헤야 해요.
                    </p>
                    <div className="my-8 flex justify-center">
                        <div className="rating rating-lg rating-half">
                            <input
                                type="radio"
                                name="rating-10"
                                className="rating-hidden"
                                checked={rating == 0}
                            />

                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400 mask mask-star-2 mask-half-1"
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-2"
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-1"
                                checked
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-2"
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-1"
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-2"
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-1"
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-2"
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-1"
                            />
                            <input
                                type="radio"
                                name="rating-10"
                                className="bg-yellow-400  mask mask-star-2 mask-half-2"
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="space-x-3">
                            <button className="btn" onClick={() => {}}>
                                취소
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    toggleWatchedMovie;
                                }}
                            >
                                추가
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
