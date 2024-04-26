import { db } from '@/app/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
import { BookmarkMovie } from '@/types/movie';

export default async function getBookmarkedMovies(
    uId: string
): Promise<{ [key: string]: BookmarkMovie }> {
    try {
        const userDocRef = doc(db, 'users', uId);
        const bookmarkedMoviesCollection = collection(
            userDocRef,
            'bookmarkedMovies'
        );
        const querySnapshot = await getDocs(bookmarkedMoviesCollection);
        const bookmarkedMovies: { [key: string]: BookmarkMovie } = {};

        querySnapshot.docs.forEach(doc => {
            const data = doc.data() as BookmarkMovie;
            bookmarkedMovies[data.movieId] = {
                ...data,
            };
        });

        console.log('Bookmarked movies retrieved successfully.');
        return bookmarkedMovies;
    } catch (error) {
        console.error('Error retrieving bookmarked movies:', error);
        throw new Error('Failed to fetch bookmarked movies');
    }
}
