import addBookmarkedMovie from '@/service/movie/addBookmarkedMovie';
import deleteBookmarkedMovie from '@/service/movie/deleteBookmarkedMovie';
import { BookmarkMovie } from '@/types/movie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';

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
        <button
            className=" hover:bg-gray-100 p-2 rounded-full flex justify-center items-center"
            onClick={toggleBookmarMovie}
            disabled={isDisabledBookmarking}
        >
            {bookmarkedMovies[movieId] ? (
                <IoBookmark className="text-base " />
            ) : (
                <IoBookmarkOutline className="text-base" />
            )}
        </button>
    );
}
