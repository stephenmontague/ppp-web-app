import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const { refreshToken } = await request.json()

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ refreshToken })
		})

		if (!response.ok) {
			return NextResponse.json({ error: "Failed to refresh token" }, { status: response.status })
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
