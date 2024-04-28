import { db } from '@/app/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default async function updateRatingWatchedMovie(
    uId: string,
    movieId: string,
    updatedRating: number
) {
    const userDoc = doc(db, 'users', uId);
    const watchedMovieDoc = doc(userDoc, 'watchedMovies', movieId);
    try {
        await updateDoc(watchedMovieDoc, { userRating: updatedRating });
        console.log('시청한 영화 평점 수정 작업을 성공했습니다');
    } catch (e) {
        console.error('시청한 영화 평점 수정 작업을 실패했습니다: ', e);
    }
}
