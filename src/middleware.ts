import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Add paths that don't require authentication
const publicPaths = ["/", "/auth/login", "/auth/register"]

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Allow public paths
	if (publicPaths.includes(pathname)) {
		return NextResponse.next()
	}

	// Check for auth token
	const auth = request.cookies.get("auth")
	if (!auth) {
		return NextResponse.redirect(new URL("/auth/login", request.url))
	}

	try {
		const { accessToken, refreshToken } = JSON.parse(auth.value)

		// If no access token, try to refresh
		if (!accessToken && refreshToken) {
			const refreshResponse = await fetch(new URL("/api/auth/refresh", request.url), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refreshToken })
			})

			if (!refreshResponse.ok) {
				// If refresh fails, redirect to login
				return NextResponse.redirect(new URL("/auth/login", request.url))
			}

			const { accessToken: newAccessToken } = await refreshResponse.json()

			// Update the auth cookie with the new access token
			const response = NextResponse.next()
			response.cookies.set(
				"auth",
				JSON.stringify({
					...JSON.parse(auth.value),
					accessToken: newAccessToken
				})
			)
			return response
		}

		return NextResponse.next()
	} catch (error) {
		// If there's any error with the auth cookie, redirect to login
		return NextResponse.redirect(new URL("/auth/login", request.url))
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
