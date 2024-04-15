'use client';
import { ReactNode } from 'react';

import Provider from './queryClientProvider';
import AuthProvider from './SessionProvider';

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <AuthProvider>
            <Provider>{children}</Provider>
        </AuthProvider>
    );
};
