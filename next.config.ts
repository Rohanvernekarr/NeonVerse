/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: { module: { rules: { test: RegExp; use: string; }[]; }; }) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: 'null-loader'
    });
    return config;
  }
};

module.exports = nextConfig;
