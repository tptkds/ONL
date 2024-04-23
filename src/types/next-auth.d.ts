export interface SessionData {}
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            email: string | null;
            name: string | null;
            uid: string | null | undefined;
            isGoogleAccount: boolean;
        };
    }
    interface User {
        uid?: string;
    }
    interface Profile {
        sub?: string;
    }
    interface JWT {
        uid?: string | null;
    }
}
