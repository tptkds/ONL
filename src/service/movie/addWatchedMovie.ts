import { db } from '@/app/firebase';
import { FirebaseMovieData, WatchedMovie } from '@/types/movie';
import { doc, runTransaction } from 'firebase/firestore';

export default async function addWatchedMovie(
    uId: string,
    movie: WatchedMovie
): Promise<void> {
    const userDocRef = doc(db, 'users', uId);
    const watchedMovieRef = doc(
        userDocRef,
        'watchedMovies',
        movie.movieId + ''
    );
    const movieDocRef = doc(db, 'movies', movie.movieId + '');

    try {
        await runTransaction(db, async transaction => {
            const movieSnap = await transaction.get(movieDocRef);

            if (!movieSnap.exists()) {
                const newMovieData = {
                    score: movie.userRating,
                    participants: 1,
                };
                transaction.set(watchedMovieRef, { ...movie });
                transaction.set(movieDocRef, newMovieData);
            } else {
                const movieData: FirebaseMovieData =
                    movieSnap.data() as FirebaseMovieData;
                const curScore: number = movieData?.score || 0;
                const curParticipants: number = movieData?.participants || 0;
                let updatedScore: number = curScore + movie.userRating;
                let updatedParticipants: number = curParticipants + 1;

                transaction.set(watchedMovieRef, { ...movie });
                transaction.update(movieDocRef, {
                    score: curScore + movie.userRating,
                    participants: curParticipants + 1,
                });
            }
        });
        console.log('평점 추가 트랜잭션 작업을 성공했습니다.');
    } catch (error) {
        console.error('평점 추가 트랜잭션 작업을 실패했습니다: ', error);
    }
}
