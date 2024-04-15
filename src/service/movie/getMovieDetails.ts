import axios from 'axios';

export const getMovieDetails = async (movieId: string) => {
    const OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
    };

    const URL = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
    try {
        const response = await axios(URL, OPTIONS);

        return response.data;
    } catch (error) {
        console.error('error: ' + error);
        return null;
    }
};
