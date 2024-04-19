import React from 'react';
import Menu from './components/Menu';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row w-full mx-4 sm:mx-24 mt-8">
            <Menu />
            {children}
        </div>
    );
}
