import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,jsx,ts,tsx,html}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            screens: {
                'screen-420': '420px',
                'screen-920': '920px',
            },
            height: {
                284: '284px',
                398: '398px',
                550: '550px',
                600: '600px',
            },
            width: {
                198: '198px',
                278: '278px',
            },
            zIndex: {
                '-1': '-1',
            },
            transitionProperty: {
                height: 'height',
                width: 'width',
            },
            fontSize: {
                '2.5rem': '2.5rem',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('daisyui')],
    safelist: ['mask-half', 'mask-half-1', 'mask-half-2'],
};

export default config;
