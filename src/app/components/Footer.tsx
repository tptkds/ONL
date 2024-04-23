'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';

export default function Footer() {
    return (
        <footer
            className="w-full flex flex-col  py-8 100 px-16 text-xs text-white"
            style={{ backgroundColor: '#222222' }}
        >
            <div className="flex  items-center ">
                <div className="w-1/5 w-full">
                    <Image
                        src="/onl-text-white.svg"
                        alt="ONL"
                        width={100}
                        height={100}
                        priority
                    />
                </div>
                <div className="w-4/5 flex flex-col justify-end">
                    <p className="text-right">
                        ONL에서 영화를 쉽게 탐색하고, ONL 사용자와 나만의 영화
                        이야기를 공유하세요.
                    </p>
                    <div className="flex mt-4 text-sm justify-end ">
                        <Link href="https://github.com/tptkds/ONL">
                            <FaGithub />
                        </Link>
                        <Link
                            href="https://velog.io/@wlldone/posts"
                            className="ml-2"
                        >
                            <SiVelog />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
