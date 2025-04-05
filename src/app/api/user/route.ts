import { UserDTO } from "@/types/user"
import { NextResponse } from "next/server"

// PUT /api/user
export async function PUT(request: Request) {
	try {
		const data: UserDTO = await request.json()
		const userId = new URL(request.url).searchParams.get("id")

		const response = await fetch(`http://localhost:8080/user/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			throw new Error("Failed to update user profile")
		}

		const updatedUser = await response.json()
		return NextResponse.json(updatedUser)
	} catch (error) {
		return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
	}
}
