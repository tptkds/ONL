import { db } from '@/app/firebase';
import { doc, runTransaction } from 'firebase/firestore';

export default async function deleteBookmarkedMovie(
    uId: string,
    movieId: number
): Promise<void> {
    const userDocRef = doc(db, 'users', uId);
    const bookmarkedMovieRef = doc(
        userDocRef,
        'bookmarkedMovies',
        movieId + ''
    );
    const movieRef = doc(db, 'movies', movieId + '');

    try {
        await runTransaction(db, async transaction => {
            const movieSnap = await transaction.get(movieRef);
            if (movieSnap.exists()) {
                const data = movieSnap.data() || {};
                let currentBookmarked = data.bookmarked || 0;
                if (currentBookmarked < 1) currentBookmarked = 1;
                transaction.update(movieRef, {
                    bookmarked: currentBookmarked - 1,
                });

                transaction.delete(bookmarkedMovieRef);
            } else {
                console.log('북마크가 존재하지 않습니다.');
            }
        });
        console.log('북마크된 영화 삭제 트랜잭션을 성공했습니다.');
    } catch (error) {
        console.error('북마크된 영화 삭제 트랜잭션을 실패했습니다:', error);
    }
}
