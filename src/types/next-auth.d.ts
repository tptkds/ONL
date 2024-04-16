export interface SessionData {}
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            email: string | null;
            name: string | null;
            id: string | null;
        };
    }
}
