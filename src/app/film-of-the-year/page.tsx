'use client';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Award, BookmarkMovie } from '@/types/movie';
import Image from 'next/image';
import BookmarkToggleButton from './components/BookmarkToggleButton';
import { useSession } from 'next-auth/react';
import getBookmarkedMovies from '@/service/movie/getBookmarkedMovies';
import WatchedToggleButton from './components/WatchedToggleButton';
import getWatchedMovies from '@/service/movie/getWatchedMovies';
import Link from 'next/link';

export default function MovieOfTheYear() {
    const [rating, setRating] = useState<number>(0);
    const [awards, setAwards] = useState<Award[]>([]);
    const [visibleOverview, setVisibleOverview] = useState<(string | number)[]>(
        []
    );
    const [watchedMovies, setWatchedMovies] = useState({});
    const [bookmarkedMovies, setBookmarkedMovies] = useState<{
        [key: string]: BookmarkMovie;
    }>({});
    const { data: sessionData } = useSession();

    // 영화 데이터 로드
    useEffect(() => {
        const fetchMovies = async () => {
            const moviesCollectionRef = collection(db, 'Awards');
            const querySnapshot = await getDocs(moviesCollectionRef);
            const awardList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }));
            setAwards(awardList);
        };
        if (awards.length == 0) fetchMovies();
    }, []);

    // 북마크 ,시청영화 데이터 로드
    useEffect(() => {
        if (
            sessionData?.user?.uid &&
            Object.keys(bookmarkedMovies).length === 0
        ) {
            getBookmarkedMovies(sessionData.user.uid)
                .then(setBookmarkedMovies)
                .catch(console.error);

            getWatchedMovies(sessionData.user.uid)
                .then(setWatchedMovies)
                .catch(console.error);
        }
    }, [sessionData?.user?.uid]);

    return (
        <section className="w-full px-16 text-neutral-800">
            {awards.map(award => (
                <div key={award.id} className="mb-8">
                    <h2 className="text-xl font-semibold text-center">
                        {award.id === 'Berlin'
                            ? '베를린 국제 영화제 제73회'
                            : award.id === 'Cannes'
                              ? '칸 영화제 제76회'
                              : '베니스 국제 영화제 제80회'}
                    </h2>
                    <div className="flex flex-wrap">
                        {award.data[2023] &&
                            award.data[2023].map((item, index) => (
                                <div
                                    key={index}
                                    className=" flex flex-col justify-center p-4 my-4 border border-gray-200 w-full sm:w-1/2 screen-920:w-1/3 xl:w-1/4 2xl:w-1/5 "
                                >
                                    <p className="mb-3 text-sm text-center font-medium">
                                        {item.award}
                                    </p>
                                    <div
                                        className="relative "
                                        onMouseOver={() =>
                                            setVisibleOverview([
                                                award.id,
                                                index,
                                            ])
                                        }
                                        onMouseOut={() =>
                                            setVisibleOverview([])
                                        }
                                    >
                                        <Image
                                            src={item.posterPath}
                                            layout={'responsive'}
                                            width={500}
                                            height={300}
                                            alt={item.title}
                                        />
                                        <div
                                            className={`${award.id === visibleOverview[0] && index === visibleOverview[1] ? 'absolute top-0 left-0 w-full h-full bg-neutral-900/80 text-ellipsis overflow-scroll hide-scrollbar px-6 py-4' : 'hidden'}`}
                                        >
                                            <p className="text-white text-sm">
                                                {item.overview}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/film-info/${item.tmdbId}`}
                                        className="text-center mt-4"
                                    >
                                        {item.title}
                                    </Link>

                                    <p className="text-center text-xs">
                                        {item.director}
                                    </p>
                                    <div className="flex justify-center">
                                        <BookmarkToggleButton
                                            movieId={item.tmdbId}
                                            uId={
                                                sessionData?.user.uid as string
                                            }
                                            bookmarkedMovies={bookmarkedMovies}
                                            setBookmarkedMovies={
                                                setBookmarkedMovies
                                            }
                                        />
                                        <WatchedToggleButton
                                            movieId={item.tmdbId}
                                            uId={
                                                sessionData?.user.uid as string
                                            }
                                            watchedMovies={watchedMovies}
                                            setWatchedMovies={setWatchedMovies}
                                            rating={rating}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
