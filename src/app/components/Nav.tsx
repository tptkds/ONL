'use client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import SignUpLink from './SignUpLink';
import SignInLink from './SignInLink';
import MyPageLink from './MyPageLink';
import SignOutButton from './SignOutButton';
import Logo from './Logo';
import MainNavigationLinks from './MainNavigationLinks';
import SearchPanel from './SearchPanel';

export default function Nav() {
    const { status } = useSession();
    const pathname = usePathname();
    return (
        <nav className=" relative  w-full min-w-max flex flex-col text-xs sm:text-sm">
            <div className=" flex justify-between px-4 md:px-16 ">
                <h1 className="sm:w-1/3   ">
                    <div className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px]">
                        <Logo />
                    </div>
                </h1>
                <div className="w-full sm:w-2/3 flex justify-end sm:justify-between ">
                    <div className=" sm:w-1/2 flex items-center justify-center">
                        <SearchPanel />
                    </div>
                    <div className=" sm:w-1/2 flex justify-end text-neutral-500">
                        {status == 'authenticated' ? (
                            <>
                                <MyPageLink />
                                <SignOutButton />
                            </>
                        ) : (
                            <>
                                <SignUpLink />
                                <SignInLink />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {pathname.includes('sign-in') || pathname.includes('sign-up') ? (
                <></>
            ) : (
                <>
                    <div className="md: border-t border-gray-200 w-full"></div>
                    <ul className="flex justify-center px-4 md:px-16 bg-white text-xs sm:text-base font-medium text-neutral-800">
                        <MainNavigationLinks />
                    </ul>
                </>
            )}

            <div className="border-t border-gray-200 w-full"></div>
        </nav>
    );
}
