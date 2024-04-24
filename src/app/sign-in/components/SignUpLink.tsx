import Link from 'next/link';

const SignUpLink: React.FC = () => {
    return (
        <Link
            href="/sign-up"
            className="mt-2 mb-3  block text-xs text-center underline hover:text-gray-600"
        >
            회원가입하기
        </Link>
    );
};

export default SignUpLink;
