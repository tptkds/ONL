import { yearOfFilms2023 } from '@/constants/movie';
import { getMovieDetails } from './getMovieDetails';

export default async function getMoviesOfTheYear() {
    const promises = [];
    for (const festival in yearOfFilms2023) {
        for (const film of yearOfFilms2023[festival]) {
            const promise = getMovieDetails(film.tmdbId).then(movieDetails => {
                if (movieDetails) {
                    return {
                        ...movieDetails,
                        award: film.award,
                        festival: festival,
                    };
                }
            });
            promises.push(promise);
        }
    }
    const moviesDetailsWithAwards = await Promise.all(promises);
    return moviesDetailsWithAwards.filter(movie => movie !== undefined);
}
