'use client';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { BsAwardFill } from 'react-icons/bs';
import { IoChatboxEllipses } from 'react-icons/io5';
import { MdLocalMovies } from 'react-icons/md';

export default function Nav() {
    const { data, status } = useSession();

    return (
        <nav className="  w-full flex flex-col text-xs">
            <div className="flex justify-between  py-2 px-16 ">
                <h1 className="ml-4">
                    <Link href="/">
                        <Image
                            src="/onl-text.svg"
                            alt="ONL"
                            width={50}
                            height={50}
                        />
                    </Link>
                </h1>
                <div className=" flex ">
                    {status === 'unauthenticated' ? (
                        <>
                            <Link
                                href="/sign-up"
                                className="nav-item flex items-center px-4"
                            >
                                회원가입
                            </Link>{' '}
                            <Link
                                href="/sign-in"
                                className="nav-item flex items-center px-4"
                            >
                                로그인
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/mypage"
                                className="nav-item flex items-center px-4"
                            >
                                마이페이지
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="nav-item px-4"
                            >
                                로그아웃
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div
                className="border-t border-gray-200"
                style={{ width: '100vw', marginLeft: '-64px' }}
            ></div>
            <ul className="flex justify-center px-16 bg-white">
                <li className="px-4 py-4 li-hover-line relative cursor">
                    <Link
                        href="/movie-of-the-year"
                        className="flex items-center justify-center"
                    >
                        <BsAwardFill className="text-base mr-1" />
                        <span>올해의 영화</span>
                    </Link>
                </li>
                <li className="px-4 py-4 li-hover-line relative cursor">
                    <Link
                        href="/movie-of-the-year"
                        className="flex items-center justify-center"
                    >
                        <MdLocalMovies className="text-base mr-1" />
                        <span>모든 영화</span>
                    </Link>
                </li>
                <li className="px-4 py-4 li-hover-line relative cursor">
                    <Link
                        href="/movie-of-the-year"
                        className="flex items-center justify-center"
                    >
                        <IoChatboxEllipses className="text-base mr-1" />
                        <span>이야기 공간</span>
                    </Link>
                </li>
            </ul>
            <div
                className="border-t border-gray-200"
                style={{ width: '100vw', marginLeft: '-64px' }}
            ></div>
        </nav>
    );
}
