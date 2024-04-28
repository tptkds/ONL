import addBookmarkedMovie from '@/service/movie/addBookmarkedMovie';
import deleteBookmarkedMovie from '@/service/movie/deleteBookmarkedMovie';
import { BookmarkMovie } from '@/types/movie';
import { displayToast } from '@/utils/alert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { PiBookmarkSimpleFill, PiBookmarkSimpleLight } from 'react-icons/pi';

export default function BookmarkToggleButton({
    moviePoster,
    movieTitle,
    movieId,
    uId,
    bookmarkedMovies,
}: {
    moviePoster: string;
    movieTitle: string;
    movieId: string;
    uId: string;
    bookmarkedMovies: { [key: string]: BookmarkMovie };
}) {
    const toastRef = useRef<HTMLDivElement>(null);
    const toastTextRef = useRef<HTMLSpanElement>(null);

    const [isDisabledBookmarking, setIsDisabledBookmarking] =
        useState<boolean>(false);
    const queryClient = useQueryClient();

    const { mutate: mutateDeleteBookmarkedMovie } = useMutation({
        mutationKey: ['mutateDeleteBookmarkedMovie', movieId],
        mutationFn: () => deleteBookmarkedMovie(uId, movieId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['bookmarkedMovies', uId],
            });
            displayToast(
                toastTextRef,
                toastRef,
                movieTitle + ' 영화가 북마크 목록에서 제거됐어요!'
            );
        },
    });

    const { mutate: mutateAddBookmarkedMovie } = useMutation({
        mutationKey: ['mutateDeleteBookmarkedMovie', movieId],
        mutationFn: () =>
            addBookmarkedMovie(uId, {
                movieId: movieId,
                bookmarkDate: Timestamp.fromDate(new Date()),
                moviePoster: moviePoster,
                movieTitle: movieTitle,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['bookmarkedMovies', uId],
            });
            displayToast(
                toastTextRef,
                toastRef,
                movieTitle + ' 영화가 북마크 목록에 추가됐어요!'
            );
        },
    });

    const toggleBookmarMovie = async () => {
        setIsDisabledBookmarking(true);
        if (bookmarkedMovies[movieId]) {
            mutateDeleteBookmarkedMovie();
        } else {
            mutateAddBookmarkedMovie();
        }
    };

    const isFetchingBookmarkedMovies = queryClient.isFetching({
        queryKey: ['bookmarkedMovies', uId],
    });

    useEffect(() => {
        if (!isFetchingBookmarkedMovies) setIsDisabledBookmarking(false);
    }, [isFetchingBookmarkedMovies]);

    return (
        <>
            <button
                className=" hover:bg-gray-100 p-2 rounded-full flex justify-center items-center"
                onClick={toggleBookmarMovie}
                disabled={isDisabledBookmarking}
            >
                {bookmarkedMovies[movieId] ? (
                    <PiBookmarkSimpleFill style={{ fontSize: '18px' }} />
                ) : (
                    <PiBookmarkSimpleLight style={{ fontSize: '19px' }} />
                )}
            </button>
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
