import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { AuthResponseDTO } from "@/types/auth"
import { ErrorResponseDTO } from "@/types/error"

export async function POST() {
	try {
		// Get the auth cookie
		const cookieStore = await cookies()
		const auth = cookieStore.get("auth")
		if (!auth?.value) {
			return NextResponse.json({
				message: "Logged out successfully"
			} as AuthResponseDTO)
		}

		// Parse the auth cookie to get the refresh token
		const { refreshToken } = JSON.parse(auth.value)

		// Call the server's logout endpoint
		const serverResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ refreshToken })
		})

		const data = await serverResponse.json()

		if (!serverResponse.ok) {
			const errorData = data as ErrorResponseDTO
			console.error("Failed to logout on server:", errorData)
			return NextResponse.json(errorData, { status: serverResponse.status })
		}

		// Create the response with cleared cookie
		const response = NextResponse.json({
			message: "Logged out successfully"
		} as AuthResponseDTO)

		// Clear the auth cookie
		response.cookies.set("auth", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0
		})

		return response
	} catch (error) {
		console.error("Error during logout:", error)
		return NextResponse.json(
			{
				status: 500,
				error: "Logout failed",
				message: "An unexpected error occurred during logout"
			} as ErrorResponseDTO,
			{ status: 500 }
		)
	}
}
