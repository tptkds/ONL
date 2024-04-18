import Link from 'next/link';
import { BsAwardFill } from 'react-icons/bs';
import { IoChatboxEllipses } from 'react-icons/io5';
import { MdLocalMovies } from 'react-icons/md';

export default function MainNavigationLinks() {
    return (
        <>
            <li className="sm:mx-6 li-hover-line relative cursor">
                <Link
                    href="/film-of-the-year"
                    className=" h-full px-4 py-2 sm:py-6 flex items-center justify-center"
                >
                    <BsAwardFill className="text-xs sm:text-base mr-1" />
                    <span>올해의영화</span>
                </Link>
            </li>
            <li className="sm:mx-6  li-hover-line relative cursor">
                <Link
                    href="/film-finder"
                    className="h-full px-4 py-2 sm:py-6 flex items-center justify-center"
                >
                    <MdLocalMovies className="text-xs sm:text-base mr-1" />
                    <span>영화탐색</span>
                </Link>
            </li>
            <li className=" sm:mx-6  li-hover-line relative cursor">
                <Link
                    href="/board/1"
                    className="h-full px-4 py-2 sm:py-6 flex items-center justify-center "
                >
                    <IoChatboxEllipses className="text-xs sm:text-base mr-1" />
                    <span className="">이야기공간</span>
                </Link>
            </li>
        </>
    );
}
