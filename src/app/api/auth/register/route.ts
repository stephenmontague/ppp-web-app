import { NextResponse } from "next/server"
import { AuthResponseDTO, RegisterRequestDTO } from "@/types/auth"
import { ErrorResponseDTO } from "@/types/error"

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as RegisterRequestDTO
		const { name, email, password } = body

		const response = await fetch("http://localhost:8080/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name, email, password })
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
				status: 400,
				error: "Registration failed",
				message: "An unexpected error occurred during registration"
			} as ErrorResponseDTO,
			{ status: 400 }
		)
	}
}
