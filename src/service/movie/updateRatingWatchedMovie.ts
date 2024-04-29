import { db } from '@/app/firebase';
import { doc, runTransaction } from 'firebase/firestore';

export default async function updateRatingWatchedMovie(
    uId: string,
    movieId: number,
    updatedRating: number
) {
    const userDocRef = doc(db, 'users', uId);
    const watchedMovieRef = doc(userDocRef, 'watchedMovies', movieId + '');
    const movieDocRef = doc(db, 'movies', movieId + '');

    try {
        await runTransaction(db, async transaction => {
            const watchedMovieSnap = await transaction.get(watchedMovieRef);
            const movieSnap = await transaction.get(movieDocRef);

            if (!watchedMovieSnap.exists()) {
                throw new Error('시청한 영화 문서가 존재하지 않습니다.');
            }
            if (!movieSnap.exists()) {
                throw new Error('영화 정보가 존재하지 않습니다.');
            }

            const watchedMovieData = watchedMovieSnap.data();
            const movieData = movieSnap.data();
            const oldRating = watchedMovieData.userRating;

            const newScore = movieData.score - oldRating + updatedRating;
            transaction.update(movieDocRef, {
                score: newScore,
            });

            // 시청한 영화 문서에 새 평점 저장
            transaction.update(watchedMovieRef, {
                userRating: updatedRating,
            });
        });
        console.log('시청한 영화 평점 수정 작업을 성공했습니다');
    } catch (e) {
        console.error('시청한 영화 평점 수정 작업을 실패했습니다: ', e);
    }
}
