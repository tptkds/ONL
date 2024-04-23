'use client';
import getBookmarkedMovies from '@/service/movie/getBookmarkedMovies';
import { BookmarkMovie } from '@/types/movie';
import { useSession } from 'next-auth/react';
import Bookmark from './components/Bookmark';
import { useEffect, useState } from 'react';

export default function Bookmarks() {
    const { data: sessionData } = useSession();

    const [bookmarkedMovies, setBookmarkedMovies] = useState<{
        [key: string]: BookmarkMovie;
    }>({});

    useEffect(() => {
        if (
            sessionData?.user?.uid &&
            Object.keys(bookmarkedMovies).length === 0
        ) {
            getBookmarkedMovies(sessionData.user.uid)
                .then(setBookmarkedMovies)
                .catch(console.error);
        }
    }, [sessionData?.user?.uid]);

    return (
        <div className="flex flex-wrap w-full mt-4 sm:mt-0 ml-2 h-fit">
            {bookmarkedMovies &&
                Object.keys(bookmarkedMovies).map(key => (
                    <Bookmark
                        key={key}
                        bookmarkData={bookmarkedMovies[key] as BookmarkMovie}
                        uid={sessionData?.user.uid as string}
                        bookmarkedMovies={bookmarkedMovies}
                        setBookmarkedMovies={setBookmarkedMovies}
                    />
                ))}
        </div>
    );
}
