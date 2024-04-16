import getMoviesByKeyword from '@/service/movie/getMoviesByKeyword';
import getPostsByKeyword from '@/service/post/getPostsByKeyword';
import { Movie } from '@/types/movie';
import { PostData } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export default function SearchBar() {
    const [searchedText, setSearchedText] = useState<string>('');
    const [debouncedText, setDebouncedText] = useState<string>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            console.log('야!');
            setDebouncedText(searchedText);
        }, 300);

        return () => {
            console.log('종료!');
            clearTimeout(handler);
        };
    }, [searchedText]);

    const { data: searchedMovies, isLoading: isLoadingMovies } = useQuery({
        queryKey: ['searchingMovies', debouncedText],
        queryFn: () => getMoviesByKeyword(debouncedText),
        staleTime: Infinity,
        enabled: !!debouncedText,
        placeholderData: previousData => previousData,
    });

    const { data: searchedPosts, isLoading: isLoadingPosts } = useQuery({
        queryKey: ['searchingPosts', debouncedText],
        queryFn: () => getPostsByKeyword(debouncedText),
        staleTime: 60000,
        enabled: !!debouncedText,
        placeholderData: previousData => previousData,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedText(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                className="h-12 w-full border focus:outline-none p-3"
                placeholder="영화, 게시글 검색"
                value={searchedText}
                onChange={handleInputChange}
            />
            {(searchedMovies && searchedMovies.length > 0) ||
            (searchedPosts && searchedPosts.length > 0) ? (
                <div>
                    {searchedMovies && searchedMovies.length > 0 && (
                        <div>
                            <h2>Movies</h2>
                            <ul>
                                {searchedMovies.map((movie: Movie) => (
                                    <li key={movie.id}>{movie.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {searchedPosts && searchedPosts.length > 0 && (
                        <div>
                            <h2>Posts</h2>
                            <ul>
                                {searchedPosts.map((post: PostData) => (
                                    <li key={post.postId}>
                                        {post.title} - {post.authorName}
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
