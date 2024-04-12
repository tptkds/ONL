import Form from './components/Form';
import SignInWithGoogle from './components/SignInWithGoogle';
import ForgotPassword from './components/ForgotPassword';

const SignIn: React.FC = () => {
    return (
        <section className="bg-white max-w-md flex flex-1 flex-col justify-center rounded-md py-6 px-8 overflow-hidden">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight ">
                로그인
            </h2>

            <div className="mt-12 ">
                {/* <h3 className="text-center mb-6">ONL 계정으로 로그인</h3> */}
                <Form />
                <ForgotPassword />
            </div>
            <div className="contour"></div>

            <div className="w-full  flex flex-col justify-center mt-8 mb-4">
                {/* <h3 className="text-center mb-6">다른 방법으로 로그인</h3> */}
                <SignInWithGoogle />
            </div>
        </section>
    );
};

export default SignIn;
