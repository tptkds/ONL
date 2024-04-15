import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseError } from 'firebase/app';
import { FirebaseAuthError } from '@/error/firebaseAuthError';
import signInFirebase from '@/service/account/signInFirebase';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(
        'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be defined'
    );
}

const authOptions: NextAuthOptions = {
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'ONL',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;
                try {
                    const result = await signInFirebase(
                        credentials.email,
                        credentials.password
                    );
                    if (result) {
                        const { user } = result;
                        return {
                            id: user.uid,
                            name: user.displayName,
                            email: user.email,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        const firebaseError = error as FirebaseError;
                        const errorCode = firebaseError.code;
                        const message = firebaseError.message;

                        throw new FirebaseAuthError(errorCode, message);
                    } else {
                        throw new Error('알 수 없는 에러가 발생했습니다.');
                    }
                }
            },
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
