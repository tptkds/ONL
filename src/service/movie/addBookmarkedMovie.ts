import { db } from '@/app/firebase';
import { doc, runTransaction } from 'firebase/firestore';
import { BookmarkMovie } from '@/types/movie';

export default async function addBookmarkedMovie(
    uId: string,
    movie: BookmarkMovie
): Promise<void> {
    const userDocRef = doc(db, 'users', uId);
    const bookmarkedMovieRef = doc(
        userDocRef,
        'bookmarkedMovies',
        movie.movieId + ''
    );
    const movieRef = doc(db, 'movies', movie.movieId + '');

    try {
        await runTransaction(db, async transaction => {
            const movieSnap = await transaction.get(movieRef);
            if (!movieSnap.exists()) {
                transaction.set(movieRef, { bookmarked: 1 });
                transaction.set(bookmarkedMovieRef, movie);
            } else {
                const data = movieSnap.data() || {};
                const currentBookmarked: number = data.bookmarked || 0;
                let updatedBookmarked: number = currentBookmarked + 1;
                transaction.update(movieRef, {
                    bookmarked: updatedBookmarked,
                });
                transaction.set(bookmarkedMovieRef, movie);
            }
        });
        console.log('북마크 추가 트랜잭션을 성공했습니다.');
    } catch (error) {
        console.error('북마크 추가 트랜잭션을 실패했습니다:', error);
    }
}
