/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.themoviedb.org', 'media.themoviedb.org'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/t/p/w500/*',
            },
        ],
    },
};

export default nextConfig;
