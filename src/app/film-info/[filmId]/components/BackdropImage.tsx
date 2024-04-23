import { TMDB_BASE_URL } from '@/constants/movie';
import Image from 'next/image';

export default function BackdropImage({
    backdropPath,
    title,
}: {
    backdropPath: string;
    title: string;
}) {
    return (
        <div className="z-[-1] absolute w-full h-[550px] overflow-hidden">
            <Image
                src={`${TMDB_BASE_URL}/original/${backdropPath}`}
                alt={title}
                fill
                priority
                style={{
                    objectFit: 'cover',
                    objectPosition: '50% 50%',
                }}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB2ZXJzaW9uPTEuMSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyYXknLz48L3N2Zz4="
            />
            <div className="absolute bg-black bg-opacity-70 h-full w-full"></div>
        </div>
    );
}
