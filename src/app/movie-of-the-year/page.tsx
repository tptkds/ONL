'use client';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Award } from '@/types/movie';
import Image from 'next/image';

export default function MovieOfTheYear() {
    const [awards, setAwards] = useState<Award[]>([]);

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
        <section className="w-full px-16 ">
            {awards.map(award => (
                <div key={award.id} className="mb-8">
                    <h2 className="text-xl font-semibold	">{award.id}</h2>
                    <div className="flex flex-wrap">
                        {award.data[2023] &&
                            award.data[2023].map(
                                (
                                    item,
                                    index // 2023년 데이터가 있다면 그 내용을 순회하여 렌더링
                                ) => (
                                    <div key={index} className="w-1/4 bg-white">
                                        <Image
                                            src={item.posterPath}
                                            width={50}
                                            height={50}
                                            alt={item.title}
                                        />
                                        <p>{item.title}</p>
                                        <p>{item.director}</p>
                                        {/* 추가적으로 필요한 정보를 렌더링 */}
                                    </div>
                                )
                            )}
                    </div>
                </div>
            ))}
        </section>
    );
}
