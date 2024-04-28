import addWatchedMovie from '@/service/movie/addWatchedMovie';
import deleteWatchedMovie from '@/service/movie/deleteWatchedMovie';
import updateRatingWatchedMovie from '@/service/movie/updateRatingWatchedMovie';
import { WatchedMovie } from '@/types/movie';
import { displayToast } from '@/utils/alert';
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
}

export default function WatchedToggleButton({
    moviePoster,
    movieTitle,
    movieId,
    uId,
    watchedMovies,
}: WatchedToggleButtonProps) {
    const toastRef = useRef<HTMLDivElement>(null);
    const toastTextRef = useRef<HTMLSpanElement>(null);

    const ratingModal = useRef<HTMLDialogElement>(null);
    const [rating, setRating] = useState<number>(0);
    const [updatedRating, setUpdateRating] = useState<number>(0);
    useEffect(() => {
        watchedMovies[movieId]
            ? setRating(watchedMovies[movieId].userRating)
            : setRating(0);
        watchedMovies[movieId]
            ? setUpdateRating(watchedMovies[movieId].userRating)
            : setUpdateRating(0);
    }, [watchedMovies]);
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
            displayToast(
                toastTextRef,
                toastRef,
                movieTitle + ' 영화가 시청 목록에서 제거됐어요!'
            );
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
            displayToast(
                toastTextRef,
                toastRef,
                movieTitle + ' 영화가 시청 목록에 추가됐어요!'
            );
        },
    });

    const { mutate: mutateUpdateRatingWatchedMovie } = useMutation({
        mutationKey: ['mutateAddWatchedMovie', movieId],
        mutationFn: () => updateRatingWatchedMovie(uId, movieId, updatedRating),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['watchedMovies', uId],
            });
            displayToast(
                toastTextRef,
                toastRef,
                movieTitle + ' 영화의 평점이 업데이트됐어요!'
            );
        },
    });

    const isFetchingWatchedMovies = queryClient.isFetching({
        queryKey: ['watchedMovies', uId],
    });

    useEffect(() => {
        if (!isFetchingWatchedMovies) setIsDisabledCheckingWatched(false);
    }, [isFetchingWatchedMovies]);

    return (
        <>
            <button
                className="ml-2"
                disabled={isDisabledCheckingWatched}
                onClick={() => ratingModal?.current?.showModal()}
            >
                {watchedMovies[movieId] ? (
                    <PiTelevisionSimpleFill style={{ fontSize: '19px' }} />
                ) : (
                    <PiTelevisionSimple style={{ fontSize: '19px' }} />
                )}
            </button>
            {watchedMovies[movieId] ? (
                <dialog id="my_modal_1" className="modal" ref={ratingModal}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">시청한 영화</h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                            평점을 수정하거나 동일한 별을 한 번 더 클릭해 해당
                            영화를 시청 목록에서 제거할 수 있어요.
                        </p>
                        <div className="my-8 flex justify-center">
                            <div className="rating rating-lg rating-half">
                                {Array.from(new Array(10), v => null).map(
                                    (_, index) => (
                                        <input
                                            key={index}
                                            type="radio"
                                            name="rating-10"
                                            className={`mask mask-star-2 mask-half-${index % 2 === 0 ? 1 : 2} ${updatedRating >= index + 1 ? 'bg-yellow-400' : 'bg-opacity-20'} `}
                                            style={{}}
                                            onChange={() => {
                                                if (
                                                    updatedRating ===
                                                    index + 1
                                                ) {
                                                    setUpdateRating(0);
                                                } else {
                                                    setUpdateRating(index + 1);
                                                }
                                            }}
                                            checked={
                                                updatedRating === index + 1
                                            }
                                            onClick={() => {
                                                if (index + 1 === updatedRating)
                                                    setUpdateRating(0);
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog" className="space-x-3">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setUpdateRating(rating);
                                    }}
                                >
                                    취소
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        if (updatedRating === 0) {
                                            mutateDeleteWatchedMovie();
                                        } else {
                                            mutateUpdateRatingWatchedMovie();
                                        }
                                    }}
                                    disabled={
                                        updatedRating !== 0 &&
                                        rating === updatedRating
                                    }
                                >
                                    {updatedRating === 0 ? '제거' : '수정'}
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            ) : (
                <dialog id="my_modal_1" className="modal" ref={ratingModal}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            시청한 영화 평가하기
                        </h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                            영화를 시청 목록에 추가하기 전에 영화를 평가헤야
                            해요.
                        </p>
                        <div className="my-8 flex justify-center">
                            <div className="rating rating-lg rating-half">
                                <input
                                    type="radio"
                                    name="rating-10"
                                    className="rating-hidden"
                                    checked={rating === 0}
                                    onChange={() => setRating(0)}
                                />
                                {Array.from(new Array(10), v => null).map(
                                    (_, index) => (
                                        <input
                                            key={index}
                                            type="radio"
                                            name="rating-10"
                                            className={`mask mask-star-2 mask-half-${index % 2 === 0 ? 1 : 2} ${rating >= index + 1 ? 'bg-yellow-400' : 'bg-opacity-20'}`}
                                            onChange={() => {
                                                if (rating === index + 1) {
                                                    setRating(0);
                                                } else {
                                                    setRating(index + 1);
                                                }
                                            }}
                                            checked={rating === index + 1}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog" className="space-x-3">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setRating(0);
                                    }}
                                >
                                    취소
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        mutateAddWatchedMovie();
                                    }}
                                >
                                    추가
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
            <div
                className="toast toast-end z-50 hidden"
                ref={toastRef}
                aria-live="polite"
            >
                <div className="alert alert-success bg-black rounded-full text-white bg-opacity-70 text-sm flex justify-center font-normal">
                    <span ref={toastTextRef}></span>
                </div>
            </div>
        </>
    );
}
