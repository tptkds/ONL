import { IoIosSearch } from 'react-icons/io';
import SearchBar from './SearchBar';
import { useState } from 'react';

export default function SearchPanel() {
    const [isSearchBarHidden, setIsSearchBarHidden] = useState<boolean>(true);
    const toggleSearchBarVisibility = () => {
        setIsSearchBarHidden(prev => !prev);
    };
    return (
        <>
            <button
                className="sm:hidden nav-item h-full px-2"
                onClick={toggleSearchBarVisibility}
            >
                <IoIosSearch
                    className={`${isSearchBarHidden ? 'block' : 'hidden'} text-base px-1 w-full`}
                />
            </button>
            <div
                className={`${isSearchBarHidden ? 'hidden' : 'absolute z-10 top-0  left-0 min-h-screen bg-white '} sm:block w-full`}
            >
                <SearchBar
                    isSearchBarHidden={isSearchBarHidden}
                    setIsSearchBarHidden={setIsSearchBarHidden}
                />
            </div>
        </>
    );
}
