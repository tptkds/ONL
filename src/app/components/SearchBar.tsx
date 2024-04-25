import getMoviesByKeyword from '@/service/movie/getMoviesByKeyword';
import getPostsByKeyword from '@/service/post/getPostsByKeyword';
import { Movie } from '@/types/movie';
import { PostData } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';

export default function SearchBar({
    isSearchBarHidden,
    setIsSearchBarHidden,
}: {
    isSearchBarHidden: boolean;
    setIsSearchBarHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [searchedText, setSearchedText] = useState<string>('');
    const [debouncedText, setDebouncedText] = useState<string>('');
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(searchedText);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchedText]);

    const { data: searchedMovies, isLoading: isLoadingMovies } = useQuery({
        queryKey: ['searchingMovies', debouncedText],
        queryFn: () => getMoviesByKeyword(debouncedText),
        staleTime: Infinity,

        placeholderData: previousData => previousData,
    });

    const { data: searchedPosts, isLoading: isLoadingPosts } = useQuery({
        queryKey: ['searchingPosts', debouncedText],
        queryFn: () => getPostsByKeyword(debouncedText),
        staleTime: 60000,

        placeholderData: previousData => previousData,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedText(event.target.value);
    };

    return (
        <div className="relative w-full ">
            <IoIosSearch className="hidden sm:block absolute top-1/2 right-2 translate-y-[-50%] text-gray-500 text-xl" />
            <button
                onClick={() => setIsSearchBarHidden(!isSearchBarHidden)}
                className="sm:hidden"
            >
                <IoCloseSharp className="absolute top-1/2 right-2 translate-y-[-50%] text-gray-500 text-xl" />
            </button>
            <input
                type="text"
                name="search"
                autoComplete="off"
                className="h-12 w-full border focus:outline-none p-3"
                placeholder="영화, 게시글 검색"
                value={searchedText}
                onChange={handleInputChange}
                onFocus={() => setShowResults(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setShowResults(false);
                        setSearchedText('');
                        setIsSearchBarHidden(true);
                    }, 100);
                }}
                style={{ fontSize: '16px' }}
            />
            {(showResults && searchedMovies && searchedMovies.length > 0) ||
            (showResults && searchedPosts && searchedPosts.length > 0) ? (
                <div className="absolute top-12 z-10  w-full max-w-full max-h-[500px] py-4 bg-white sm:shadow-md overflow-hidden">
                    {searchedPosts && searchedPosts.length > 0 && (
                        <div className="mb-3">
                            <h2 className="py-0.5 px-4  text-sm font-bold">
                                검색된 게시글
                            </h2>
                            <ul className="">
                                {searchedPosts.map((post: PostData) => (
                                    <li
                                        key={post.postId}
                                        className=" py-1 px-4 hover:bg-gray-100 text-sm "
                                    >
                                        <Link
                                            href={`/post/${post.postId}`}
                                            className="w-full flex items-center"
                                        >
                                            <span className="block max-w-full truncate">
                                                {post.title}
                                            </span>

                                            <span className="text-xs"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {searchedMovies && searchedMovies.length > 0 && (
                        <div>
                            <h2 className="py-0.5 px-4  text-sm font-bold">
                                검색된 영화
                            </h2>
                            <ul className="overflow-hidden">
                                {searchedMovies.map((movie: Movie) => (
                                    <li
                                        key={movie.id}
                                        className="px-4  py-1 hover:bg-gray-100   text-sm "
                                    >
                                        <Link
                                            href={`/film-info/${movie.id}`}
                                            className="w-full flex items-center"
                                        >
                                            <span className="block max-w-[90%] truncate">
                                                {movie.title}
                                            </span>

                                            <span className="text-xs">{` (${movie.release_date.slice(0, 4)})`}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}
