import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="disabled:bg-black flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={pending}
            aria-disabled={pending}
        >
            {pending ? '만드는 중...' : '계정 만들기'}
        </button>
    );
}
