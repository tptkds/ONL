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

    for (const festival in yearOfFilms2023) {
        for (const film of yearOfFilms2023[festival]) {
            const movieDetails = await getMovieDetails(film.tmdbId);
            if (movieDetails) {
                if (festival === 'Berlin') {
                    moviesBerlin.movies.push({
                        ...movieDetails,
                        award: film.award,
                        festival: festival,
                    });
                } else if (festival === 'Cannes') {
                    moviesCannes.movies.push({
                        ...movieDetails,
                        award: film.award,
                        festival: festival,
                    });
                } else {
                    moviesVenice.movies.push({
                        ...movieDetails,
                        award: film.award,
                        festival: festival,
                    });
                }
            }
        }
    }

    const allMovies = [
        { ...moviesBerlin },
        { ...moviesCannes },
        { ...moviesVenice },
    ];
    return allMovies;
}
