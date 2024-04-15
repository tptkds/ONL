'use client';
import useSignInUser from '@/hooks/useSignInUser';
import { useState } from 'react';

const Form: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { status, signInUser, errorMessage } = useSignInUser();

    return (
        <>
            <p role="alert" aria-live="assertive">
                {status === 'error' ? errorMessage : ''}
            </p>
            <form
                className="space-y-6 text-sm"
                onSubmit={e => {
                    e.preventDefault();
                    signInUser(email, password);
                }}
            >
                <div>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="이메일 주소"
                            className="block w-full  border-b py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="비밀번호"
                            className="block w-full  border-b py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className=" border border-neutral-300	 hover:border-slate-400	text-black w-full  flex justify-center  px-3 py-3 rounded-md "
                        disabled={status === 'loading'}
                        aria-disabled={status === 'loading'}
                    >
                        {status === 'loading' ? '로그인 중..' : '로그인하기'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default Form;
