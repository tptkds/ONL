'use client';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Award } from '@/types/movie';
import Image from 'next/image';

export default function MovieOfTheYear() {
    const [awards, setAwards] = useState<Award[]>([]);
    const [visibleOverview, setVisibleOverview] = useState<(string|number)[]>([]);

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

        fetchMovies();
    }, []);

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
                                    className="relative p-4 my-4 border border-gray-200 w-full sm:w-1/2 screen-920:w-1/3 xl:w-1/4 2xl:w-1/5 "
                                    onMouseOver={() =>
                                        setVisibleOverview([award.id,index])
                                    }
                                    onMouseOut={() => setVisibleOverview([])}
                                >
                                    <p className="mb-3 text-sm text-center font-medium">
                                        {item.award}
                                    </p>
                                    <Image
                                        src={item.posterPath}
                                        layout={'responsive'}
                                        width={500}
                                        height={300}
                                        alt={item.title}
                                    />
                                    <p className="text-center mt-4">
                                        {item.title}
                                    </p>
                                    <p className="text-center text-xs">
                                        {item.director}
                                    </p>

                                    <div
                                        className={`${award.id === visibleOverview[0] &&index === visibleOverview[1]  ? 'absolute top-0 left-0 w-full h-full bg-neutral-900/80 text-ellipsis overflow-scroll hide-scrollbar px-6 py-4' : 'hidden'}`}
                                    >
                                        <p className="text-white text-sm">
                                            {item.overview}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
