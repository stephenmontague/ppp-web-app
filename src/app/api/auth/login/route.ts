import { NextResponse } from "next/server"
import { AuthResponseDTO } from "@/types/auth"
import { ErrorResponseDTO } from "@/types/error"

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

		const data = await response.json()

		if (!response.ok) {
			const errorData = data as ErrorResponseDTO
			return NextResponse.json(errorData, { status: response.status })
		}

		return NextResponse.json(data as AuthResponseDTO)
	} catch (error) {
		return NextResponse.json(
			{
				status: 401,
				error: "Authentication failed",
				message: "An unexpected error occurred during authentication"
			} as ErrorResponseDTO,
			{ status: 401 }
		)
	}
}
