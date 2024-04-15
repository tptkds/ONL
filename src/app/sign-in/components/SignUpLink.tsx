import Link from 'next/link';

const SignUpLink: React.FC = () => {
    return (
        <Link href="/sign-up" className="block text-sm text-center underline">
            회원가입
        </Link>
    );
};

export default SignUpLink;
