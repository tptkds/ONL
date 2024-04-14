'use client';
import { getMovieDetails } from '@/service/movie/getMovieDetails';
import { useQuery } from '@tanstack/react-query';
import BackdropImage from './BackdropImage';
import Image from 'next/image';
import { languageMap, TMDB_BASE_URL } from '@/constants/movie';
import { CastMember, Genre, SpokenLanguage } from '@/types/movie';
import { getMovieCredits } from '@/service/movie/getMovieCredits';
import CastList from './CastList';
import CrewList from './CrewList';

export default function Info({ filmId }: { filmId: string }) {
    const { data, isError, isPending, isFetching } = useQuery({
        queryKey: ['filmInfo', filmId],
        queryFn: async () => getMovieDetails(filmId),
        staleTime: Infinity,
    });

    const { data: creditsData, isFetching: isFetchingCreditsData } = useQuery({
        queryKey: ['credits', filmId],
        queryFn: async () => getMovieCredits(filmId),
        staleTime: Infinity,
    });

    if (isFetching || isFetchingCreditsData) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading backdrop image.</div>;
    }

    return (
        <div className="h-full w-full">
            <BackdropImage
                backdropPath={data.backdrop_path}
                title={data.title}
            />
            <div className="h-[550px] mt-4 sm:mt-0 flex-col sm:flex-row flex items-center">
                <div className="relative h-56 w-36 sm:h-[284px] sm:w-[198px] lg:h-[398px] lg:w-[278px] sm:ml-16 flex-shrink-0 transition-[height] transition-[width] ease-in ">
                    <Image
                        src={`${TMDB_BASE_URL}/w780/${data.poster_path}`}
                        fill
                        style={{
                            objectFit: 'contain',
                        }}
                        alt={data.title}
                    />
                </div>
                <div className="sm:ml-12 sm:mr-12 flex flex-col justify-center items-center sm:items-start text-white">
                    <h2 className="mb-4  text-[2.5rem] font-bold">
                        {data.title}
                    </h2>
                    <p className="mb-2  text-xs">
                        {data.original_title === data.title
                            ? ''
                            : data.original_title}
                    </p>
                    <div className=" flex text-xs mb-2">
                        <p>
                            {`
                            ${data.release_date} · 
                            ${data.genres.map((genre: Genre) => genre.name).join('/')} · 
                            ${data.spoken_languages.map(
                                (language: SpokenLanguage) => {
                                    return (
                                        languageMap[language.iso_639_1] ||
                                        language.iso_639_1
                                    );
                                }
                            )}
                        `}
                        </p>
                    </div>
                    <p className="mb-4 text-sm">{`${data.runtime / 60 >= 1 ? Math.floor(data.runtime / 60) + '시간 ' + (data.runtime % 60) + '분' : data.runtime + '분'}`}</p>
                    <p className="mx-6 sm:ml-0  mb-4 text-sm">
                        {data.overview}
                    </p>
                </div>
            </div>
            <div className="mt-16 mx-16">
                <h3 className="mb-4 text-2xl font-bold">배우</h3>
                <CastList creditsData={creditsData} />
            </div>
            <div className="mt-16 mx-16">
                <h3 className="mb-4 text-2xl font-bold">제작진</h3>
                <CrewList creditsData={creditsData} />
            </div>
        </div>
    );
}
