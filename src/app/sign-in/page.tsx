import Form from './components/Form';
import SignUpLink from './components/SignUpLink';
import SignInWithGoogle from './components/SignInWithGoogle';

const SignIn: React.FC = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight ">
                로그인
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <h3 className="text-center mb-6">ONL 계정으로 로그인</h3>
                <Form />
                <SignUpLink />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                <div className="flex w-full items-center mb-6">
                    <div className="border-b  w-full h-1"></div>
                    <h3 className="text-center w-full mx-4">
                        다른 방법으로 로그인하기
                    </h3>
                    <div className="border-b w-full h-1"></div>
                </div>
                <SignInWithGoogle />
            </div>
        </div>
    );
};

export default SignIn;
