import { yearOfFilms2023 } from '@/constants/movie';
import { getMovieDetails } from './getMovieDetails';
interface MovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
    } | null;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    award: string;
    festival: string;
}

export default async function getMoviesOfTheYearByFestival() {
    const moviesBerlin = { id: 'Berlin', movies: [] as MovieDetails[] };
    const moviesCannes = { id: 'Cannes', movies: [] as MovieDetails[] };
    const moviesVenice = { id: 'Venice', movies: [] as MovieDetails[] };

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

    return allMovies;
}
