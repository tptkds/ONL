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
        <div className=" border p-4 ">
            <div className="mb-4 ">
                <label
                    htmlFor="filterSelect"
                    className="block text-sm font-medium text-gray-700"
                >
                    정렬
                </label>
                <select
                    id="filterSelect"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                <div className="flex flex-wrap">
                    {genres.map(genre => (
                        <label
                            key={genre}
                            className="w-1/2 flex items-center space-x-2"
                        >
                            <input
                                type="checkbox"
                                checked={selectedGenres.includes(genre)}
                                onChange={() => handleGenreChange(genre)}
                            />
                            <span className="text-sm text-gray-600">
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
