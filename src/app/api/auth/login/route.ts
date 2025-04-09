import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	try {
		console.log("We are in here")

		const body = await request.json()
		const { email, password } = body

		const response = await fetch(`${process.env.PUBLIC_NEXT_API_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		})

		const data = await response.json()

		if (!response.ok) {
			return NextResponse.json(data, { status: response.status })
		}

		const authResponse = NextResponse.json(data)

		// Set access token in HTTP-only cookie
		authResponse.cookies.set("access_token", data.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: data.expiresIn
		})

		// Set refresh token in HTTP-only cookie
		authResponse.cookies.set("refresh_token", data.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: data.refreshTokenExpiresIn
		})

		return authResponse
	} catch (error) {
		return NextResponse.json(
			{
				status: 401,
				error: "Authentication failed",
				message: "An unexpected error occurred during authentication"
			},
			{ status: 401 }
		)
	}
}
