import { db } from '@/app/firebase';
import { doc, runTransaction } from 'firebase/firestore';

export default async function deleteWatchedMovie(
    uId: string,
    movieId: number
): Promise<void> {
    if (!uId || !movieId) {
        console.error(
            '유저 ID 또는 영화 ID가 유효하지 않습니다:',
            uId,
            movieId
        );
        return;
    }

    const userDocRef = doc(db, 'users', uId);
    const watchedMovieRef = doc(userDocRef, 'watchedMovies', movieId + '');
    const movieDocRef = doc(db, 'movies', movieId + '');

    try {
        await runTransaction(db, async transaction => {
            const movieSnap = await transaction.get(movieDocRef);
            const watchedMovieSnap = await transaction.get(watchedMovieRef);

            if (!watchedMovieSnap.exists()) {
                throw new Error('시청한 영화 문서가 존재하지 않습니다.');
            }
            if (!movieSnap.exists()) {
                throw new Error('영화 정보가 존재하지 않습니다.');
            }

            const watchedMovieData = watchedMovieSnap.data();
            const movieData = movieSnap.data();

            let newScore = movieData.score - watchedMovieData.userRating;
            let newParticipants = movieData.participants - 1;

            if (newParticipants < 0) {
                newParticipants = 0;
            }
            if (newScore < 0) {
                newScore = 0;
            }

            transaction.delete(watchedMovieRef);

            transaction.update(movieDocRef, {
                score: newScore,
                participants: newParticipants,
            });
        });
        console.log(
            '시청한 영화 삭제 및 영화 정보 업데이트 트랜잭션이 성공적으로 완료되었습니다.'
        );
    } catch (error) {
        console.error('트랜잭션 실행 중 오류가 발생했습니다:', error);
    }
}
