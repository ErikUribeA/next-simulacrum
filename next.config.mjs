import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const intl = createNextIntlPlugin()
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'fakestoreapi.com'], // Añade el dominio permitido

    },
};

export default intl(nextConfig);
