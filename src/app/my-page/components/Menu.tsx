'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Menu() {
    const [curCategory, setCurCategory] = useState<string>('');
    const pathname = usePathname();
    console.log(curCategory);
    useEffect(() => {
        if (pathname) setCurCategory(pathname.slice(9));
    }, [setCurCategory, pathname]);
    return (
        <ul className="text-sm px-2 py-4 bg-base-200 sm:w-56 rounded-box flex-row sm:flex-col justify-center sm:justify-normal sm:items-start h-fit focus-bg-white">
            <li
                className={`w-full p-2  px-4 hover:bg-black/5 rounded-md ${curCategory == 'bookmark' ? 'font-semibold text-gray-950 ' : ''} `}
            >
                <Link href="/my-page/bookmark" className="w-full">
                    북마크 영화
                </Link>
            </li>
            <li
                className={`w-full p-2  px-4 hover:bg-black/5 rounded-md  ${curCategory == 'watched' ? 'font-semibold text-gray-950 ' : ''} `}
            >
                <Link href="/my-page/watched">시청 영화</Link>
            </li>
            <li
                className={`w-full p-2  px-4 hover:bg-black/5 rounded-md ${curCategory == 'posts' ? 'font-semibold text-gray-950 ' : ''} `}
            >
                <Link href="/my-page/posts">내가 쓴 글</Link>
            </li>
            <li
                className={`w-full p-2  px-4 hover:bg-black/5 rounded-md ${curCategory == 'comments' ? 'font-semibold text-gray-950 ' : ''} `}
            >
                <Link href="/my-page/comments">내가 남긴 댓글</Link>
            </li>
            <li
                className={`w-full p-2  px-4 hover:bg-black/5 rounded-md ${curCategory == 'recommendations' ? 'font-semibold text-gray-950 ' : ''} `}
            >
                <Link href="/my-page/recommendations">추천한 글</Link>
            </li>
            <li
                className={`w-full p-2  px-4 hover:bg-black/5 rounded-md ${curCategory == 'edit-profile' ? 'font-semibold text-gray-950 ' : ''} `}
            >
                <Link href="/my-page/edit-profile">내 정보 수정</Link>
            </li>
        </ul>
    );
}
