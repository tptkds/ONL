import Link from 'next/link';

const ForgotPassword: React.FC = () => {
    return (
        <Link
            href={'/reset-password'}
            className="my-6  block text-sm text-center underline"
        >
            비밀번호재설정
        </Link>
    );
};

export default ForgotPassword;
