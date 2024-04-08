import axios from 'axios';

export default async function getPopularMovies(pageNumber: number) {
    const URL = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageNumber}`;
    const OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
    };
    try {
        const response = await axios(URL, OPTIONS);
        return response.data;
    } catch (error) {
        console.error('error: ' + error);
        return null;
    }
}
