import { yearOfFilms2023 } from '@/constants/movie';
import { getMovieDetails } from './getMovieDetails';

export default async function getMoviesOfTheYear() {
    const moviesDetailsWithAwards = [];
    for (const festival in yearOfFilms2023) {
        for (const film of yearOfFilms2023[festival]) {
            const movieDetails = await getMovieDetails(film.tmdbId);

            if (movieDetails) {
                moviesDetailsWithAwards.push({
                    ...movieDetails,
                    award: film.award,
                    festival: festival,
                });
            }
        }
    }
    console.log(moviesDetailsWithAwards);
    return moviesDetailsWithAwards;
}
