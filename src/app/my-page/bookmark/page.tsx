'use client';
import getBookmarkedMovies from '@/service/movie/getBookmarkedMovies';
import { BookmarkMovie } from '@/types/movie';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Bookmark from './components/Bookmark';

export default function Bookmarks() {
    const { data: sessionData } = useSession();
    const { data: bookmarks, isFetching } = useQuery({
        queryKey: ['bookmark', sessionData?.user.uid],
        queryFn: () => getBookmarkedMovies(sessionData?.user.uid as string),
        enabled: !!sessionData?.user.uid,
        refetchOnMount: 'always',
    });
    if (isFetching) return <></>;
    return (
        <div className="flex flex-wrap w-full mt-4 sm:mt-0 ml-2">
            {bookmarks &&
                Object.keys(bookmarks).map(key => (
                    <Bookmark
                        key={key}
                        bookmarkData={bookmarks[key] as BookmarkMovie}
                    />
                ))}
        </div>
    );
}
