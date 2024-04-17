import axios from 'axios';

export default async function getMoviesByKeyword(keyword: string) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
    };

    const url = `https://api.themoviedb.org/3/search/movie?language=ko-KR&query=${encodeURIComponent(keyword)}`;

    try {
        const response = await axios(url, options);
        return response.data.results.slice(0, 5);
    } catch (error) {
        console.error('Error fetching movies: ' + error);
        return [];
    }
}
