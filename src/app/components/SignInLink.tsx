import Link from 'next/link';

export default function SignInLink() {
    return (
        <Link
            href="/sign-in"
            className="nav-item flex items-center px-2 sm:px-4 py-2"
        >
            로그인
        </Link>
    );
}
