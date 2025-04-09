import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicPaths = ["/", "/auth/login", "/auth/register"]
const protectedPaths = ["/dashboard", "/dashboard/practice"] // Add other protected paths as needed

function isTokenExpired(token: string): boolean {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]))
		const expiry = payload.exp * 1000 // Convert to milliseconds
		return Date.now() >= expiry
	} catch (error) {
		return true // If token parsing fails, treat it as expired
	}
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const accessToken = request.cookies.get("access_token")?.value
	const refreshToken = request.cookies.get("refresh_token")?.value

	const isAuthenticated = accessToken && !isTokenExpired(accessToken)
	console.log("[Middleware] Is authenticated:", isAuthenticated)

	if (isAuthenticated && publicPaths.includes(pathname)) {
		console.log("[Middleware] Redirecting authenticated user to /dashboard")
		return NextResponse.redirect(new URL("/dashboard", request.url))
	}

	// If the path is not public or protected, allow the request to proceed
	if (!publicPaths.includes(pathname) && !protectedPaths.some((path) => pathname.startsWith(path))) {
		return NextResponse.next()
	}

	// If no refresh token, redirect to login (for protected paths)
	if (!refreshToken && protectedPaths.some((path) => pathname.startsWith(path))) {
		return NextResponse.redirect(new URL("/auth/login", request.url))
	}

	// If access token is missing or expired, attempt to refresh
	if (!accessToken || isTokenExpired(accessToken)) {
		const cookieHeader = request.headers.get("Cookie") || ""
		const refreshResponse = await fetch(new URL("/api/auth/refresh", request.url), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieHeader
			}
		})

		if (!refreshResponse.ok) {
			// If refresh fails, redirect to login for protected paths
			if (protectedPaths.some((path) => pathname.startsWith(path))) {
				return NextResponse.redirect(new URL("/auth/login", request.url))
			}
			return NextResponse.next()
		}

		const data = await refreshResponse.json()
		const response = NextResponse.next()

		// Update access token cookie
		response.cookies.set("access_token", data.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: data.expiresIn
		})

		// If the user was trying to access a public path, redirect to /dashboard after refreshing
		if (publicPaths.includes(pathname)) {
			return NextResponse.redirect(new URL("/dashboard", request.url))
		}

		return response
	}

	// If access token is valid, proceed with the request
	return NextResponse.next()
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
