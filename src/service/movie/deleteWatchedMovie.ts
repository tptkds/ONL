import { db } from '@/app/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default async function deleteWatchedMovie(
    uId: string,
    docId: string
): Promise<void> {
    try {
        const movieDocRef = doc(db, 'users', uId, 'watchedMovies', docId);
        await deleteDoc(movieDocRef);
        console.log('Watched movie deleted successfully.');
    } catch (error) {
        console.error('Error deleting watched movie:', error);
    }
}
