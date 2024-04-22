import Link from 'next/link';

export default function MyPageLink() {
    return (
        <Link
            href="/my-page/bookmark"
            className="nav-item flex items-center px-2  sm:px-4"
        >
            마이페이지
        </Link>
    );
}
