import { db } from '@/app/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { BookmarkMovie } from '@/types/movie';

export default async function addBookmarkedMovie(
    uId: string,
    movie: BookmarkMovie
): Promise<void> {
    if (!uId) {
        console.error('Invalid user ID:', uId);
        return;
    }
    try {
        const userDocRef = doc(db, 'users', uId);
        const bookmarkedMovieRef = doc(
            userDocRef,
            'bookmarkedMovies',
            movie.movieId
        );
        await setDoc(bookmarkedMovieRef, movie);
        console.log('Bookmarked movie added successfully.');
    } catch (error) {
        console.error('Error adding bookmarked movie:', error);
    }
}
