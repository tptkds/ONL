import { db } from '@/app/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export default async function deleteBookmarkedMovie(
    uId: string,
    docId: string
): Promise<void> {
    try {
        const movieDocRef = doc(db, 'users', uId, 'bookmarkedMovies', docId);
        await deleteDoc(movieDocRef);
        console.log('Bookmarked movie deleted successfully.');
    } catch (error) {
        console.error('Error deleting bookmarked movie:', error);
    }
}
