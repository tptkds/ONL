import React, { useState } from 'react';
import Image from 'next/image';
import { TMDB_BASE_URL } from '@/constants/movie';
import { CastMember, MovieCredits } from '@/types/movie';

export default function CastList({
    creditsData,
}: {
    creditsData: MovieCredits;
}) {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    return (
        <>
            <div className="flex flex-wrap">
                {creditsData.cast
                    .slice(0, visibleCount)
                    .map((cast: CastMember) => (
                        <div
                            key={cast.id + cast.character}
                            className="relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 flex items-center"
                        >
                            <div className="relative w-24 h-24 rounded overflow-hidden border flex-shrink-0">
                                <Image
                                    src={
                                        cast.profile_path
                                            ? `${TMDB_BASE_URL}/w185/${cast.profile_path}`
                                            : '/default-pfp.png'
                                    }
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: '50% 50%',
                                    }}
                                    alt={cast.name}
                                />
                            </div>
                            <div className="px-3">
                                <p className="text-sm font-semibold">
                                    {cast.name}
                                </p>
                                <p className="text-xs">{cast.character}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="flex justify-center">
                {visibleCount < creditsData.cast.length && (
                    <button onClick={handleShowMore} className="text-sm">
                        더보기
                    </button>
                )}
            </div>
        </>
    );
}
