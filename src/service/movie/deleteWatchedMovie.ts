import { db } from '@/app/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default async function deleteWatchedMovie(
    uId: string,
    movieId: string
): Promise<void> {
    try {
        const movieDocRef = doc(db, 'users', uId, 'watchedMovies', movieId);
        await deleteDoc(movieDocRef);
        console.log('Watched movie deleted successfully.');
    } catch (error) {
        console.error('Error deleting watched movie:', error);
    }
}
