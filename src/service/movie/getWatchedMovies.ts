import { db } from '@/app/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
import { WatchedMovie } from '@/types/movie';

export default async function getWatchedMovies(
    uId: string
): Promise<{ [key: string]: WatchedMovie }> {
    try {
        const userDocRef = doc(db, 'users', uId);
        const watchedMoviesCollection = collection(userDocRef, 'watchedMovies');
        const querySnapshot = await getDocs(watchedMoviesCollection);
        const watchedMovies: { [key: string]: WatchedMovie } = {};

        querySnapshot.docs.forEach(doc => {
            const data = doc.data() as WatchedMovie;
            watchedMovies[data.movieId] = {
                ...data,
            };
        });

        console.log('Watched movies retrieved successfully.');
        return watchedMovies;
    } catch (error) {
        console.error('Error retrieving watched movies:', error);
        throw new Error('Failed to fetch watched movies');
    }
}
