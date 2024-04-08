'use client';
import { createUser } from '@/app/actions/createUser';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
const initialState = {
    message: '',
};
const Form: React.FC = () => {
    const [state, formAction] = useFormState(createUser, initialState);

    return (
        <>
            <p role="alert" aria-live="assertive">
                {state?.message}
            </p>
            <form className="space-y-6" action={formAction}>
                <div>
                    <label
                        htmlFor="nickname"
                        className="block text-sm font-medium leading-6 "
                    >
                        닉네임
                    </label>
                    <div className="mt-2">
                        <input
                            id="nickname"
                            name="nickname"
                            type="nickname"
                            required
                            className="block w-full rounded-md border-0 py-4 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
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
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full rounded-md border-0 py-4 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="checkPassword"
                            className="block text-sm font-medium leading-6 "
                        >
                            비밀번호 확인
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="checkPassword"
                            name="checkPassword"
                            type="password"
                            required
                            className="block w-full rounded-md border-0 py-4 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <SubmitButton />
                </div>
            </form>
        </>
    );
};

export default Form;
