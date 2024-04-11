/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/t/p/w500/*',
            },
            {
                protocol: 'https',
                hostname: 'www.themoviedb.org',
                pathname: '/t/p/w500/*',
            },
        ],
    },
};

export default nextConfig;
