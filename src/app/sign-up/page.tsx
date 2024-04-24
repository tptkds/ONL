'use client';
import { useRouter } from 'next/navigation';
import Form from './components/Form';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const SignUp: React.FC = () => {
    const router = useRouter();

    const { status } = useSession();
    useEffect(() => {
        if (status == 'authenticated') router.push('/');
    }, [status]);
    return (
        <section className="bg-white max-w-md flex flex-1 flex-col justify-center rounded-md py-6 pb-12 px-8 text-sm overflow-hidden">
            {status === 'unauthenticated' && (
                <>
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight ">
                        회원가입
                    </h2>
                    <div className="mt-12 ">
                        <Form />
                    </div>
                </>
            )}
        </section>
    );
};

export default SignUp;
