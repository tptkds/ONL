import { yearOfFilms2023 } from '@/constants/movie';
import { getMovieDetails } from './getMovieDetails';
import { MovieDetails } from '@/types/movie';

interface MovieDetailsByAward extends MovieDetails {
    award: string;
}
export default async function getMoviesOfTheYearByFestival() {
    const moviesBerlin = { id: 'Berlin', movies: [] as MovieDetailsByAward[] };
    const moviesCannes = { id: 'Cannes', movies: [] as MovieDetailsByAward[] };
    const moviesVenice = { id: 'Venice', movies: [] as MovieDetailsByAward[] };

    const promisesBerlin = [];
    const promisesCannes = [];
    const promisesVenice = [];

    for (const festival in yearOfFilms2023) {
        for (const film of yearOfFilms2023[festival]) {
            const promise = getMovieDetails(film.tmdbId).then(movieDetails => {
                if (movieDetails) {
                    const movie = {
                        ...movieDetails,
                        award: film.award,
                        festival: festival,
                    };
                    if (festival === 'Berlin') {
                        moviesBerlin.movies.push(movie);
                    } else if (festival === 'Cannes') {
                        moviesCannes.movies.push(movie);
                    } else {
                        moviesVenice.movies.push(movie);
                    }
                }
            });
            if (festival === 'Berlin') {
                promisesBerlin.push(promise);
            } else if (festival === 'Cannes') {
                promisesCannes.push(promise);
            } else {
                promisesVenice.push(promise);
            }
        }
    }

    await Promise.all(promisesBerlin);
    await Promise.all(promisesCannes);
    await Promise.all(promisesVenice);

    const allMovies = [
        { ...moviesBerlin },
        { ...moviesCannes },
        { ...moviesVenice },
    ];
    console.log(allMovies);

    return allMovies;
}
