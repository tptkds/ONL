import Link from 'next/link';

const ForgotPassword: React.FC = () => {
    return (
        <>
            <Link href={'/reset-password'}>비밀번호 재설정</Link>
        </>
    );
};

export default ForgotPassword;
