import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { email, password } = body

		const response = await fetch("http://localhost:8080/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password })
		})

		if (!response.ok) {
			return NextResponse.json({ error: "Authentication failed" }, { status: response.status })
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
	}
}
