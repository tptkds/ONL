'use client';
import ForgotPassword from './ForgotPassword';
import useSignInUser from '@/hooks/useSignInUser';
import { useState } from 'react';

const Form: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { status, signInUser, errorMessage } = useSignInUser();

    return (
        <>
            <p aria-live="polite">{status === 'error' ? errorMessage : ''}</p>
            <form
                className="space-y-6"
                onSubmit={e => {
                    e.preventDefault();
                    signInUser(email, password);
                }}
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 "
                    >
                        이메일 주소
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-4 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 "
                        >
                            비밀번호
                        </label>
                        <div className="text-sm">
                            <ForgotPassword />
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-4 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? '로그인 중..' : '로그인하기'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default Form;
