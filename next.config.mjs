/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/conversations",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
