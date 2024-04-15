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
                className="border-neutral-300	 relative w-full bg-white py-4 px-2 flex items-center justify-center rounded-full border hover:border-slate-400"
                aria-label="Google 계정으로 로그인"
            >
                <FcGoogle className="absolute left-4 text-xl" />
                <span className="ml-2 text-sm">Google로 계속하기</span>
            </button>
        </>
    );
}
