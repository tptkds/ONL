import Link from 'next/link';

const ForgotPassword: React.FC = () => {
    return (
        <Link
            href={'/reset-password'}
            className="mt-8 mb-4  block text-xs text-center underline hover:text-gray-600"
        >
            비밀번호재설정
        </Link>
    );
};

export default ForgotPassword;
