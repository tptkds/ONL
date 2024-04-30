import { db } from '@/app/firebase';
import { collection, DocumentData, getDocs } from 'firebase/firestore';

interface MovieData {
    participants: number;
    score: number;
    bookmarked: number;
}
interface MovieDataMap {
    [key: string]: MovieData;
}

export default async function getMovieData(): Promise<MovieDataMap> {
    const moviesRef = collection(db, 'movies');
    const obj: MovieDataMap = {};
    try {
        const moviesSnap = await getDocs(moviesRef);
        moviesSnap.docs.forEach(movie => {
            const data = movie.data();
            if (isValidMovieData(data)) {
                obj[movie.id] = data;
            } else {
                console.error('Invalid movie data', data);
            }
        });
        console.log('ONL 영화 평점 및 북마크 데이터 패치 작업을 성공했습니다.');
        return obj;
    } catch (error) {
        console.error(
            'ONL 영화 평점 및 북마크 패치 작업을 실패했습니다:',
            error
        );
        return {};
    }
}

function isValidMovieData(data: any): data is MovieData {
    return (
        (data && typeof data.participants === 'number') ||
        typeof data.score === 'number' ||
        typeof data.bookmarked === 'number'
    );
}
