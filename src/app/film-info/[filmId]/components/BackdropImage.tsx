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
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UA8AAgUBQbH2eGIAAAAASUVORK5CYII="
            />
            <div className="absolute bg-black bg-opacity-70 h-full w-full"></div>
        </div>
    );
}
