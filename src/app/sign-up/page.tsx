import Form from './components/Form';

const SignUp: React.FC = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight ">
                계정 만들기
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form />
            </div>
        </div>
    );
};

export default SignUp;
