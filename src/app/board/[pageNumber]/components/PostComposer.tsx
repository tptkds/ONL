import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function PostComposer() {
    const { status } = useSession();
    return (
        <Link
            href={'/board/write'}
            aria-disabled={status !== 'authenticated'}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 text-white shadow hover:bg-neutral-900/90 h-9 px-2 sm::px-4 py-1 sm:py-2 mb-4
                    ${status !== 'authenticated' ? 'hidden' : undefined}`}
        >
            글쓰기
        </Link>
    );
}
