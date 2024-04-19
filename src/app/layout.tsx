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
        'ONL은 영화인을 위한 커뮤니티입니다. 3대 영화제에서 상을 수상한 영화를 쉽게 찾고 자유롭게 평가를 공유하고 의견을 나눌 수 있는 커뮤니티를 제공합니다. ',
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
        <html lang="ko" suppressHydrationWarning className="h-full">
            <body className={`h-full  ${notoSans.className}`}>
                <AppProviders>
                    <div className="min-h-screen">
                        <header className="relative w-full">
                            <Nav />
                        </header>
                        <main className="pb-12 flex justify-center">
                            {children}
                        </main>
                    </div>
                </AppProviders>
                <Footer />
            </body>
        </html>
    );
}
