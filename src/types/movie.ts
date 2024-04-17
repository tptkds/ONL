import { Timestamp } from 'firebase/firestore';

interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
}

interface MoviesResponse {
    [x: string]: any;
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface AwardItem {
    title: string;
    director: string;
    overview: string;
    award: string;
    genres: string[];
    posterPath: string;
    release_date: string;
    tmdbId: string;
}

interface AwardData {
    [year: number]: AwardItem[];
}

interface Award {
    id: string;
    data: AwardData;
}

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface Collection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

interface MovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: Collection | null;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface CastMember {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

interface CrewMember {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

interface MovieCredits {
    id: number;
    cast: CastMember[];
    crew: CrewMember[];
}

export type {
    Award,
    MovieDetails,
    MoviesResponse,
    Movie,
    Genre,
    SpokenLanguage,
    CastMember,
    CrewMember,
    MovieCredits,
};

export interface WatchedMovie {
    id?: string;
    movieId: string;
    watchDate: Timestamp;
    userRating: number;
}

export interface BookmarkMovie {
    id?: string;
    movieId: string;
    bookmarkDate: Date;
}
export interface FestivalData {
    [key: string]: { tmdbId: string; award: string }[];
}
