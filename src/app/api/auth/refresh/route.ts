import { NextResponse } from "next/server"
import { AuthResponseDTO } from "@/types/auth"
import { ErrorResponseDTO } from "@/types/error"

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

		const data = await response.json()

		if (!response.ok) {
			return NextResponse.json(
				{
					status: response.status,
					error: "Token refresh failed",
					message: data.message || "Failed to refresh token"
				} as ErrorResponseDTO,
				{ status: response.status }
			)
		}

		return NextResponse.json(data as AuthResponseDTO)
	} catch (error) {
		return NextResponse.json(
			{
				status: 500,
				error: "Internal server error",
				message: "An unexpected error occurred while refreshing the token"
			} as ErrorResponseDTO,
			{ status: 500 }
		)
	}
}
