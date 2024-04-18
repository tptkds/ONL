'use client';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';

export default function Footer() {
    return (
        <footer className="w-full flex flex-col  items-center py-8 100 px-16 bg-gray-100 text-xs">
            <div className="flex flex-wrap justify-center">
                <Link href="/">
                    <span className="mb-2 ml-3  cursor-pointer">홈</span>
                </Link>

                <Link href="/film-of-the-year">
                    <span className="mb-2  ml-3  cursor-pointer">
                        올해의영화
                    </span>
                </Link>

                <Link href="/film-finder">
                    <span className="mb-2  ml-3  cursor-pointer">영화탐색</span>
                </Link>

                <Link href="/board/1">
                    <span className="mb-2  ml-3  cursor-pointer">
                        이야기공간
                    </span>
                </Link>

                <Link href="/my-page">
                    <span className="mb-2  ml-3  cursor-pointer">
                        마이페이지
                    </span>
                </Link>
            </div>
            <div className="flex items-center mt-4">
                <p>© 2024 ONL</p>
            </div>
            <div className="flex mt-2 text-base">
                <Link href="https://github.com/tptkds/ONL">
                    <FaGithub />
                </Link>
                <Link href="https://velog.io/@wlldone/posts" className="ml-2">
                    <SiVelog />
                </Link>
            </div>
        </footer>
    );
}
