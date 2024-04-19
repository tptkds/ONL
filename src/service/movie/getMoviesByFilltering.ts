import { getTodayDate } from '@/utils/date';
import axios from 'axios';

export default async function getMoviesByFilltering(
    keyword: string,
    genres: string,
    sortBy: string,
    pageNumber: number
) {
    const todayDate = getTodayDate();
    const genreQeury = genres.length === 0 ? '' : `&with_genres=${genres}`;
    const keywordQuery =
        keyword.length === 0 ? '' : `&with_keywords=${keyword}]`;
    const URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${pageNumber}&release_date.lte=${todayDate}&sort_by=${sortBy === 'vote_average.desc' ? 'vote_average.desc&vote_count.gte=300' : sortBy}&watch_region=KR${genreQeury}`;
    const OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
    };
    try {
        const response = await axios(URL, OPTIONS);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('error: ' + error);
        return null;
    }
}
