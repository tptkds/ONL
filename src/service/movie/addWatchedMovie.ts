import { db } from '@/app/firebase';
import { FirebaseMovieData, WatchedMovie } from '@/types/movie';
import { doc, runTransaction, getDoc, setDoc } from 'firebase/firestore';

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
        const movieSnap = await getDoc(movieDocRef);
        if (!movieSnap.exists()) {
            const newMovieData = {
                score: movie.userRating,
                participants: 1,
            };

            await runTransaction(db, async transaction => {
                transaction.set(watchedMovieRef, { ...movie });
                transaction.set(movieDocRef, newMovieData);
            });
        } else {
            const movieData: FirebaseMovieData =
                movieSnap.data() as FirebaseMovieData;
            const curScore = movieData.score;
            const curParticipants = movieData.participants;

            await runTransaction(db, async transaction => {
                transaction.set(watchedMovieRef, { ...movie });

                transaction.update(movieDocRef, {
                    score: curScore + movie.userRating,
                    participants: curParticipants + 1,
                });
            });
        }
        console.log('평점 추가 트랜잭션 작업을 성공했습니다.');
    } catch (error) {
        console.log('평점 추가 트랜잭션 작업을 실패했습니다: ', error);
    }
}
