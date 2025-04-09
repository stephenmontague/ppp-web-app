import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get("access_token")?.value

		if (!accessToken) {
			return NextResponse.json(
				{
					status: 401,
					error: "Unauthorized",
					message: "Access token is missing"
				},
				{ status: 401 }
			)
		}

		const response = await fetch(`${process.env.PUBLIC_NEXT_API_URL}/api/users/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})

		const data = await response.json()

		if (!response.ok) {
			return NextResponse.json(data, { status: response.status })
		}

		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json(
			{
				status: 500,
				error: "Internal server error",
				message: "An unexpected error occurred while fetching user data"
			},
			{ status: 500 }
		)
	}
}
