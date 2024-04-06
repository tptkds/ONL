import ForgotPassword from './components/ForgotPassword';
import Form from './components/Form';

const SignIn: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-96 h-80 py-8 bg-white bg-opacity-10 shadow ">
            <div>
                <h2 className="PretendardBold text-xl ">로그인</h2>
            </div>
            <div className="mt-4">
                <h3 className="">ONL 계정으로 로그인</h3>
                <Form />
            </div>

            {/* <ForgotPassword /> */}
        </div>
    );
};

export default SignIn;
