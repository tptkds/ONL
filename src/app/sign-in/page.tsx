import ForgotPassword from './components/ForgotPassword';
import Form from './components/Form';

const SignIn: React.FC = () => {
    return (
        <div>
            <div>
                <h2>로그인</h2>
                <ForgotPassword />
            </div>
            <Form />
        </div>
    );
};

export default SignIn;
