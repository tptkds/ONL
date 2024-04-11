import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className=" bg-neutral-950	hover:bg-neutral-800	text-white w-full  flex justify-center  px-3 py-3 mt-8 rounded-md "
            disabled={pending}
            aria-disabled={pending}
        >
            {pending ? '회원가입하는 중...' : '회원가입하기'}
        </button>
    );
}
