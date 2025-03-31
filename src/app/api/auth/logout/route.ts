import { NextResponse } from "next/server"

export async function POST() {
	const response = NextResponse.json({ success: true })

	// Clear the auth cookie
	response.cookies.set("auth", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0
	})

	return response
}
