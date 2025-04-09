import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
	try {
		const cookieStore = await cookies()
		const refreshToken = cookieStore.get("refresh_token")?.value

		if (refreshToken) {
			// Notify the backend to invalidate the refresh token
			await fetch(`${process.env.PUBLIC_NEXT_API_URL}/auth/logout`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refreshToken })
			})
		}

		const response = NextResponse.json({ message: "Logged out successfully" })

		// Clear cookies
		response.cookies.set("access_token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0
		})

		response.cookies.set("refresh_token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0
		})

		return response
	} catch (error) {
		return NextResponse.json(
			{
				status: 500,
				error: "Logout failed",
				message: "An unexpected error occurred during logout"
			},
			{ status: 500 }
		)
	}
}
