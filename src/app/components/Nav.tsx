'use client';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsAwardFill } from 'react-icons/bs';
import { IoChatboxEllipses } from 'react-icons/io5';
import { MdLocalMovies } from 'react-icons/md';

export default function Nav() {
    const { data, status } = useSession();
    const pathname = usePathname();
    return (
        <nav className="  w-full flex flex-col text-sm">
            <div className=" flex justify-between px-16 ">
                <h1 className="w-1/3 ml-4">
                    <Link href="/">
                        <Image
                            src="/onl-text.svg"
                            alt="ONL"
                            width={100}
                            height={100}
                        />
                    </Link>
                </h1>
                <div className="w-1/3 flex items-center justify-center">
                    <input
                        type="text"
                        className="h-12 w-full border focus:outline-none p-3"
                        placeholder="영화, 게시글 검색"
                    />
                </div>

                <div className=" w-1/3 flex justify-end text-neutral-500">
                    {status === 'unauthenticated' ? (
                        <>
                            <Link
                                href="/sign-up"
                                className="nav-item flex items-center px-4 py-2"
                            >
                                회원가입
                            </Link>
                            <Link
                                href="/sign-in"
                                className="nav-item flex items-center px-4 py-2"
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

            {pathname.includes('sign-in') || pathname.includes('sign-up') ? (
                <></>
            ) : (
                <>
                    <div className="border-t border-gray-200 w-full"></div>
                    <ul className="flex justify-center px-16 bg-white text-base font-medium text-neutral-800">
                        <li className="px-4 py-6 mx-6 li-hover-line relative cursor">
                            <Link
                                href="/film-of-the-year"
                                className="flex items-center justify-center"
                            >
                                <BsAwardFill className="text-base mr-1" />
                                <span>올해의영화</span>
                            </Link>
                        </li>
                        <li className="px-4 py-6 mx-6  li-hover-line relative cursor">
                            <Link
                                href="/film-finder"
                                className="flex items-center justify-center"
                            >
                                <MdLocalMovies className="text-base mr-1" />
                                <span>영화탐색</span>
                            </Link>
                        </li>
                        <li className="px-4 py-6 mx-6  li-hover-line relative cursor">
                            <Link
                                href="/board/1"
                                className="flex items-center justify-center"
                            >
                                <IoChatboxEllipses className="text-base mr-1" />
                                <span>이야기공간</span>
                            </Link>
                        </li>
                    </ul>
                </>
            )}

            <div className="border-t border-gray-200 w-full"></div>
        </nav>
    );
}
