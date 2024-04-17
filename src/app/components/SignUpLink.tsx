import Link from 'next/link';

export default function SignUpLink() {
    return (
        <Link
            href="/sign-up"
            className="nav-item flex items-center px-2 sm:px-4 py-2"
        >
            회원가입
        </Link>
    );
}
