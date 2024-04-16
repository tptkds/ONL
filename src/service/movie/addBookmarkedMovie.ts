import { db } from '@/app/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { BookmarkMovie } from '@/types/movie';

export default async function addBookmarkedMovie(
    uId: string,
    movie: BookmarkMovie
): Promise<void> {
    if (!uId) {
        console.error('Invalid user ID:', uId);
        return; // Early return if uId is invalid
    }
    try {
        const userDocRef = doc(db, 'users', uId);
        const bookmarkedMoviesCollection = collection(
            userDocRef,
            'bookmarkedMovies'
        );
        await addDoc(bookmarkedMoviesCollection, movie);
        console.log('Bookmarked movie added successfully.');
    } catch (error) {
        console.error('Error adding bookmarked movie:', error);
    }
}
