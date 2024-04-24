'use client';
import Form from './components/Form';
import SignInWithGoogle from './components/SignInWithGoogle';
import ForgotPassword from './components/ForgotPassword';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
    const router = useRouter();

    const { status } = useSession();
    useEffect(() => {
        if (status == 'authenticated') router.push('/');
    }, [status]);
    return (
        <section className="bg-white max-w-md flex flex-1 flex-col justify-center rounded-md py-6 px-8 overflow-hidden">
            {status === 'unauthenticated' && (
                <>
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight ">
                        로그인
                    </h2>

                    <div className="mt-12 ">
                        <Form />
                        <ForgotPassword />
                    </div>
                    <div className="contour"></div>

                    <div className="w-full  flex flex-col justify-center mt-8 mb-4">
                        {/* <h3 className="text-center mb-6">다른 방법으로 로그인</h3> */}
                        <SignInWithGoogle />
                    </div>
                </>
            )}
        </section>
    );
};

export default SignIn;
