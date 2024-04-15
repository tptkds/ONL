import React, { useState } from 'react';
import Image from 'next/image';
import { jobKoreanMap, TMDB_BASE_URL } from '@/constants/movie';
import { CrewMember, MovieCredits } from '@/types/movie';

export default function CrewList({
    creditsData,
}: {
    creditsData: MovieCredits;
}) {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    return (
        <div>
            <div className="flex flex-wrap">
                {creditsData.crew
                    .slice(0, visibleCount)
                    .map((crew: CrewMember) => (
                        <div
                            key={crew.id + crew.job}
                            className="relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 flex items-center"
                        >
                            <div className="relative w-24 h-24 rounded overflow-hidden border flex-shrink-0">
                                <Image
                                    src={
                                        crew.profile_path
                                            ? `${TMDB_BASE_URL}/w185/${crew.profile_path}`
                                            : '/default-pfp.png' // 기본 프로필 이미지
                                    }
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: '50% 50%',
                                    }}
                                    alt={crew.name}
                                />
                            </div>
                            <div className="px-3">
                                <p className="text-sm font-semibold">
                                    {crew.name}
                                </p>
                                <p className="text-xs">
                                    {jobKoreanMap[crew.job] || crew.job}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="flex justify-center">
                {visibleCount < creditsData.crew.length && (
                    <button onClick={handleShowMore} className="text-sm">
                        더보기
                    </button>
                )}
            </div>
        </div>
    );
}
