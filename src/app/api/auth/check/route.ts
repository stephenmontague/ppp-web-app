import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
	try {
		const cookieStore = await cookies()
		const authCookie = cookieStore.get("auth")

		if (!authCookie) {
			return NextResponse.json({ error: "No auth cookie found" }, { status: 401 })
		}

		const authData = JSON.parse(authCookie.value)
		return NextResponse.json(authData)
	} catch (error) {
		return NextResponse.json({ error: "Failed to check auth status" }, { status: 500 })
	}
}
