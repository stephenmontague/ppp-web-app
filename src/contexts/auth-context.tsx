"use client"

import { UserDTO } from "@/types/user"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface AuthContextType {
	user: UserDTO | null
	accessToken: string | null
	refreshToken: string | null
	setAuth: (user: UserDTO, accessToken: string, refreshToken: string) => Promise<void>
	isAuthenticated: boolean
	logout: () => void
	refreshAccessToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserDTO | null>(null)
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const [refreshToken, setRefreshToken] = useState<string | null>(null)

	useEffect(() => {
		// Check for auth cookie on mount
		const checkAuth = async () => {
			try {
				const response = await fetch("/api/auth/check")
				if (response.ok) {
					const { user, accessToken, refreshToken } = await response.json()
					setUser(user)
					setAccessToken(accessToken)
					setRefreshToken(refreshToken)
				}
			} catch (error) {
				console.error("Failed to check auth status:", error)
			}
		}

		checkAuth()
	}, [])

	const setAuth = async (user: UserDTO, accessToken: string, refreshToken: string) => {
		setUser(user)
		setAccessToken(accessToken)
		setRefreshToken(refreshToken)

		// Store auth data in an HTTP-only cookie
		await fetch("/api/auth/set-cookie", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user, accessToken, refreshToken })
		})
	}

	const refreshAccessToken = async () => {
		if (!refreshToken) return

		try {
			const response = await fetch("/api/auth/refresh", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refreshToken })
			})

			if (!response.ok) {
				throw new Error("Failed to refresh token")
			}

			const { accessToken: newAccessToken } = await response.json()
			setAccessToken(newAccessToken)

			// Update the cookie with the new access token
			await fetch("/api/auth/update-token", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ accessToken: newAccessToken })
			})
		} catch (error) {
			// If refresh fails, log out the user
			logout()
		}
	}

	const logout = async () => {
		setUser(null)
		setAccessToken(null)
		setRefreshToken(null)

		// Clear the auth cookie
		await fetch("/api/auth/logout", { method: "POST" })
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				accessToken,
				refreshToken,
				setAuth,
				isAuthenticated: !!user && !!accessToken,
				logout,
				refreshAccessToken
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
