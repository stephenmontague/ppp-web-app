import { NextResponse } from "next/server"

export interface UserProfile {
	id: number
	name: string
	email: string
	handicap?: number
	phone?: string
	[key: string]: any
}

// GET /api/user
export async function GET() {
	try {
		// In a real app, this would fetch from your database
		const userProfile: UserProfile = {
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			handicap: 17.3,
			phone: "(555) 123-4567"
		}

		return NextResponse.json(userProfile)
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
	}
}

// PUT /api/user
export async function PUT(request: Request) {
	try {
		const data: UserProfile = await request.json()
		const userId = "current-user-id" // In a real app, get this from the session

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
