import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies()
		const refreshToken = cookieStore.get("refresh_token")?.value

		if (!refreshToken) {
			return NextResponse.json(
				{
					status: 401,
					error: "No refresh token",
					message: "Refresh token is missing"
				},
				{ status: 401 }
			)
		}

		const response = await fetch(`${process.env.PUBLIC_NEXT_API_URL}/auth/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refreshToken })
		})

		const data = await response.json()

		if (!response.ok) {
			return NextResponse.json(
				{
					status: response.status,
					error: "Token refresh failed",
					message: data.message || "Failed to refresh token"
				},
				{ status: response.status }
			)
		}

		const authResponse = NextResponse.json(data)

		// Update access token cookie
		authResponse.cookies.set("access_token", data.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: data.expiresIn
		})

		// If the backend rotates refresh tokens, update the refresh token cookie
		if (data.refreshToken) {
			authResponse.cookies.set("refresh_token", data.refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
				maxAge: data.refreshTokenExpiresIn
			})
		}

		return authResponse
	} catch (error) {
		return NextResponse.json(
			{
				status: 500,
				error: "Internal server error",
				message: "An unexpected error occurred while refreshing the token"
			},
			{ status: 500 }
		)
	}
}
