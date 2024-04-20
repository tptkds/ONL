'use client';

import { GENRES, genres } from '@/constants/movie';
import useStore from '@/app/store';
import { useState } from 'react';

export default function Filter() {
    const [curSorting, setCurSorting] = useState<string>('popularity.desc');
    const [curKeyword, setCurKeyword] = useState<string>('');
    const [curGenres, setCurGenres] = useState<number[]>([]);
    const {
        selectedSorting,
        setSelectedSorting,
        selectedGenres,
        setSelectedGenres,
        keyword,
        setKeyword,
    } = useStore();

    const searching = () => {
        setSelectedSorting(curSorting);
        setSelectedGenres(curGenres);
        setKeyword(curKeyword);
    };
    return (
        <div className="sticky top-0 flex-col sm:flex-row flex xl:block border p-4 xl:my-6 min-w-96 sm:min-w-12">
            <div className="flex flex-col">
                <div className="mb-4 w-1/12 sm:w-1/5 mr-4 sm:mr-12 xl:mr-0 xl:w-full min-w-32">
                    <label
                        htmlFor="filterSelect"
                        className="block text-sm font-medium text-gray-700"
                    >
                        정렬
                    </label>

                    <select
                        id="filterSelect"
                        className="select  text-xs select-bordered w-full max-w-xs border mt-1 block w-full px-3 pr-10 py-2  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-neutral-500 rounded-md"
                        value={curSorting}
                        onChange={e => setCurSorting(e.target.value)}
                    >
                        <option value="popularity.desc">인기순</option>
                        <option value="primary_release_date.desc">
                            최신순
                        </option>
                        <option value="vote_average.desc">평점높은순</option>
                    </select>
                </div>
                {/* <div className="mb-4 w-1/12 sm:w-1/5 mr-4 sm:mr-12 xl:mr-0 xl:w-full min-w-32">
                    <label
                        htmlFor="keyword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        키워드
                    </label>
                    <input
                        type="text"
                        id="keyword"
                        className="input  text-xs w-full max-w-xs border mt-1 block w-full px-3  py-2  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-neutral-500 rounded-md"
                        value={curKeyword}
                        onChange={e => setCurKeyword(e.target.value)}
                    />
                </div> */}
            </div>

            <div>
                <span className="block text-sm font-medium text-gray-700">
                    장르
                </span>
                <div className=" mt-1 flex flex-wrap ">
                    {genres.map(genre => (
                        <label
                            key={genre}
                            className=" w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/2 flex items-center space-x-2 mb-2 "
                        >
                            <input
                                type="checkbox"
                                value={GENRES[genre]}
                                checked={curGenres.includes(GENRES[genre])}
                                onChange={event => {
                                    const selectedGenre = parseInt(
                                        event.target.value
                                    );
                                    if (!isNaN(selectedGenre)) {
                                        if (curGenres.includes(selectedGenre)) {
                                            const newCurGenres =
                                                curGenres.filter(
                                                    genre =>
                                                        genre !== selectedGenre
                                                );
                                            setCurGenres(newCurGenres);
                                        } else {
                                            setCurGenres([
                                                ...curGenres,
                                                selectedGenre,
                                            ]);
                                        }
                                    }
                                }}
                                className="checkbox  w-3 h-3 rounded-none "
                            />
                            <span className="text-xs text-gray-600">
                                {genre}
                            </span>
                        </label>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={searching}
                    className=" mt-4 border border-neutral-300	bg-neutral-100 hover:bg-neutral-200 hover:border-slate-400	text-black w-full  flex justify-center  px-3 py-3 rounded-md "
                >
                    검색하기
                </button>
            </div>
        </div>
    );
}
