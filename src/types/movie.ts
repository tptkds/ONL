export interface Movie {
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

export interface MoviesResponse {
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
export type { Award };
