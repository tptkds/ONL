import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link href="/" className="relative block  w-full h-full">
            <Image src="/onl-text.svg" alt="ONL" fill priority />
        </Link>
    );
}
