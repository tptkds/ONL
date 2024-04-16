import { db } from '@/app/firebase';
import { WatchedMovie } from '@/types/movie';
import { addDoc, collection, doc } from 'firebase/firestore';

export default async function addWatchedMovie(
    uId: string,
    movie: WatchedMovie
): Promise<void> {
    try {
        const userDocRef = doc(db, 'users', uId);
        const watchedMoviesCollection = collection(userDocRef, 'watchedMovies');
        await addDoc(watchedMoviesCollection, movie);
        console.log('Watched movie added successfully.');
    } catch (error) {
        console.error('Error adding watched movie:', error);
    }
}
