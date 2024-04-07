'use client';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function SignInWithGoogle() {
    return (
        <>
            <button
                type="button"
                onClick={e => {
                    e.preventDefault();
                    signIn('google', { redirect: false });
                }}
                className="w-full bg-white py-4 px-2 flex text-black items-center justify-center rounded"
            >
                <FcGoogle className="text-xl" />
                <span className="ml-2">구글로 로그인하기</span>
            </button>
        </>
    );
}
