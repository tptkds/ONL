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
            <p
                role="alert"
                aria-live="assertive"
                className="text-sm text-red-600 mb-4"
            >
                {state?.message}
            </p>
            <form className="space-y-6" action={formAction}>
                <div>
                    <div className="mt-2">
                        <input
                            id="nickname"
                            name="nickname"
                            type="nickname"
                            required
                            placeholder="닉네임"
                            className="block w-full  border-b py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="이메일 주소"
                            className="block w-full  border-b py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between"></div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="비밀번호"
                            className="block w-full  border-b py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between"></div>
                    <div className="mt-2">
                        <input
                            id="checkPassword"
                            name="checkPassword"
                            type="password"
                            required
                            placeholder="비밀번호 확인"
                            className="block w-full  border-b py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
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
