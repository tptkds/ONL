const Form: React.FC = () => {
    return (
        <form className="flex flex-col">
            <label>이메일 주소<input type="email" /></label>
            <label>패스워드<input type="password" /></label>
            
        </form>
    );
};

export default Form;
