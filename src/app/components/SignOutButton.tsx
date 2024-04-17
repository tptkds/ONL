import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    return (
        <button onClick={() => signOut()} className="nav-item px-2 sm:px-4">
            로그아웃
        </button>
    );
}
