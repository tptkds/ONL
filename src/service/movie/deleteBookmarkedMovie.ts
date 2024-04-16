import { db } from '@/app/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export default async function deleteBookmarkedMovie(
    uId: string,
    movieId: string
): Promise<void> {
    try {
        const movieDocRef = doc(db, 'users', uId, 'bookmarkedMovies', movieId);
        await deleteDoc(movieDocRef);
        console.log('Bookmarked movie deleted successfully.');
    } catch (error) {
        console.error('Error deleting bookmarked movie:', error);
    }
}
