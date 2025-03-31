import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
	try {
		const { accessToken } = await request.json()
		const cookieStore = await cookies()
		const authCookie = cookieStore.get("auth")

		if (!authCookie) {
			return NextResponse.json({ error: "No auth cookie found" }, { status: 401 })
		}

		const authData = JSON.parse(authCookie.value)
		const response = NextResponse.json({ success: true })

		// Update the cookie with the new access token
		response.cookies.set(
			"auth",
			JSON.stringify({
				...authData,
				accessToken
			}),
			{
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
				maxAge: 7 * 24 * 60 * 60 // 7 days
			}
		)

		return response
	} catch (error) {
		return NextResponse.json({ error: "Failed to update token" }, { status: 500 })
	}
}
