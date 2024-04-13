'use client';
import { genres } from '@/constants/movie';
import { useState } from 'react';

export default function Filter() {
    const [selectedSorting, setSelectedSorting] = useState<string>('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const handleGenreChange = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const handleSortingChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedSorting(event.target.value);
    };

    return (
        <div className="flex xl:block border p-4 xl:my-6">
            <div className="mb-4 w-1/5 mr-12 xl:mr-0 xl:w-full min-w-32">
                <label
                    htmlFor="filterSelect"
                    className="block text-sm font-medium text-gray-700"
                >
                    정렬
                </label>

                <select
                    id="filterSelect"
                    className="select  text-xs select-bordered w-full max-w-xs border mt-1 block w-full px-3 pr-10 py-2  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-neutral-500 rounded-md"
                    value={selectedSorting}
                    onChange={handleSortingChange}
                >
                    <option value="popular">인기순</option>
                    <option value="newest">최신순</option>
                    <option value="highest-rated">평점높은순</option>
                </select>
            </div>
            <div>
                <span className="block text-sm font-medium text-gray-700">
                    장르
                </span>
                <div className=" mt-1 flex flex-wrap">
                    {genres.map(genre => (
                        <label
                            key={genre}
                            className=" w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/2 flex items-center space-x-2 mb-2"
                        >
                            <input
                                type="checkbox"
                                checked={selectedGenres.includes(genre)}
                                onChange={() => handleGenreChange(genre)}
                                className="checkbox w-6 h-6"
                            />
                            <span className="text-xs text-gray-600">
                                {genre}
                            </span>
                        </label>
                    ))}
                </div>
                <button
                    type="button"
                    className=" mt-4 border border-neutral-300	bg-neutral-100 hover:bg-neutral-200 hover:border-slate-400	text-black w-full  flex justify-center  px-3 py-3 rounded-md "
                >
                    검색하기
                </button>
            </div>
        </div>
    );
}
