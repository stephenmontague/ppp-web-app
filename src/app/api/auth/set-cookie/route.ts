import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const { user, accessToken, refreshToken } = await request.json()

		const response = NextResponse.json({ success: true })

		// Set HTTP-only cookie with auth data
		response.cookies.set("auth", JSON.stringify({ user, accessToken, refreshToken }), {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 7 * 24 * 60 * 60 // 7 days
		})

		return response
	} catch (error) {
		return NextResponse.json({ error: "Failed to set auth cookie" }, { status: 500 })
	}
}
