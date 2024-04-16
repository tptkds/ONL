import addBookmarkedMovie from '@/service/movie/addBookmarkedMovie';
import deleteBookmarkedMovie from '@/service/movie/deleteBookmarkedMovie';
import { BookmarkMovie } from '@/types/movie';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';

export default function BookmarkToggleButton({
    movieId,
    uId,
    bookmarkedMovies,
    setBookmarkedMovies,
}: {
    movieId: string;
    uId: string;
    bookmarkedMovies: { [key: string]: BookmarkMovie };
    setBookmarkedMovies: React.Dispatch<
        React.SetStateAction<{ [key: string]: BookmarkMovie }>
    >;
}) {
    const toggleBookmarMovie = async () => {
        const isBookmarked = bookmarkedMovies[movieId];

        if (isBookmarked) {
            try {
                await deleteBookmarkedMovie(
                    uId,
                    bookmarkedMovies[movieId].id as string
                );
                const updatedBookmarkedMovies = { ...bookmarkedMovies };
                delete updatedBookmarkedMovies[movieId];
                setBookmarkedMovies(updatedBookmarkedMovies);
                console.log(`Bookmark removed for movieId: ${movieId}`);
            } catch (error) {
                console.error('Failed to remove bookmark:', error);
            }
        } else {
            const newBookmark: BookmarkMovie = {
                movieId: movieId,
                bookmarkDate: new Date(),
            };

            try {
                await addBookmarkedMovie(uId, newBookmark);
                const updatedBookmarkedMovies = {
                    ...bookmarkedMovies,
                    [movieId]: newBookmark,
                };
                setBookmarkedMovies(updatedBookmarkedMovies);
                console.log(`Bookmark added for movieId: ${movieId}`);
            } catch (error) {
                console.error('Failed to add bookmark:', error);
            }
        }
    };
    return (
        <button onClick={toggleBookmarMovie}>
            {bookmarkedMovies[movieId] ? (
                <IoBookmark className="text-xl" />
            ) : (
                <IoBookmarkOutline className="text-xl" />
            )}
        </button>
    );
}
