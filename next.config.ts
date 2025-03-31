import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@": "./src"
		}
		return config
	}
}

export default nextConfig
