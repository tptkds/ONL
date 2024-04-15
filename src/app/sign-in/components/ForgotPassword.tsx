import Link from 'next/link';

const ForgotPassword: React.FC = () => {
    return (
        <Link
            href={'/reset-password'}
            className="mt-6 mb-8  block text-xs text-center underline hover:text-gray-600"
        >
            비밀번호재설정
        </Link>
    );
};

export default ForgotPassword;
