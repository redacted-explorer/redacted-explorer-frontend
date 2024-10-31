/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { nextRuntime }) => {
        if (typeof nextRuntime === "undefined") {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
};

export default nextConfig;
