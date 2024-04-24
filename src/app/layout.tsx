import type { Metadata } from 'next';
import './globals.css';
import Nav from './components/Nav';
import { AppProviders } from './AppProviders';
import { Noto_Sans_KR } from 'next/font/google';
import Footer from './components/Footer';
const notoSans = Noto_Sans_KR({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    preload: true,
});
export const metadata: Metadata = {
    title: 'ONL',
    description:
        'ONL은 영화인을 위한 커뮤니티입니다. 최근 3대 영화제에서의 수상작을 쉽게 찾고, 모든 영화를 탐색할 수 있습니다. ONL은 사용자들과 자유롭게 이야기를 공유하고 의견을 나눌 수 있는 커뮤니티를 제공합니다. ',
    keywords: '영화, 영화제, 수상작, 영화 리뷰, 영화 추천, 영화 커뮤니티',
    authors: {
        name: 'yougyoung kim',
        url: 'https://onl-tptkds-projects.vercel.app/',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning className="h-full antialiased">
            <body className={`h-full  ${notoSans.className}`}>
                <AppProviders>
                    <div className="min-h-screen flex flex-col">
                        <header className="relative w-full">
                            <Nav />
                        </header>
                        <main className="h-full mb-12 flex flex-grow justify-center">
                            {children}
                        </main>
                    </div>
                </AppProviders>
                <Footer />
            </body>
        </html>
    );
}
