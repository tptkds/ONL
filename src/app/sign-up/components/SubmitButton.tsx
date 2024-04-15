import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className=" border border-neutral-300	 hover:border-slate-400	text-black w-full  flex justify-center  px-3 py-3 rounded-md "
            disabled={pending}
            aria-disabled={pending}
        >
            {pending ? '회원가입하는 중...' : '회원가입하기'}
        </button>
    );
}
