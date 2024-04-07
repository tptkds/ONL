import Link from 'next/link';

const SignUpLink: React.FC = () => {
    return (
        <p className="mt-10 text-center text-sm ">
            <Link href="/sign-up" className="leading-6 underline">
                계정만들기
            </Link>
        </p>
    );
};

export default SignUpLink;
