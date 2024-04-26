import { db } from '@/app/firebase';
import { WatchedMovie } from '@/types/movie';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export default async function addWatchedMovie(
    uId: string,
    movie: WatchedMovie
): Promise<void> {
    if (!uId) {
        console.error('Invalid user ID:', uId);
        return;
    }
    try {
        const userDocRef = doc(db, 'users', uId);
        const watchedMovieRef = doc(userDocRef, 'watchedMovies', movie.movieId);
        await setDoc(watchedMovieRef, movie);
        console.log('Watched movie added successfully.');
    } catch (error) {
        console.error('Error adding watched movie:', error);
    }
}
