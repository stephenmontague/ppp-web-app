"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { UserDTO } from "@/types/user"

interface AuthContextType {
	user: UserDTO | null
	isAuthenticated: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	refreshAccessToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserDTO | null>(null)
	const [isRefreshing, setIsRefreshing] = useState(false)

	// Hydrate user state on mount by fetching user data from the backend
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch("/api/user", { credentials: "include" })
				if (!response.ok) {
					// If fetching user fails, try refreshing the token
					const newAccessToken = await refreshAccessToken()
					if (!newAccessToken) {
						setUser(null)
						return
					}
					// Retry fetching user with the new token
					const retryResponse = await fetch("/api/user", { credentials: "include" })
					if (!retryResponse.ok) {
						setUser(null)
						return
					}
					const userData = await retryResponse.json()
					setUser(userData)
				} else {
					const userData = await response.json()
					setUser(userData)
				}
			} catch (error) {
				setUser(null)
			}
		}

		fetchUser()
	}, [])

	const login = async (email: string, password: string) => {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
			credentials: "include"
		})

		if (!response.ok) {
			throw new Error("Login failed")
		}

		const data = await response.json()
		setUser(data.user)
	}

	const refreshAccessToken = async () => {
		if (isRefreshing) return null
		setIsRefreshing(true)

		try {
			const response = await fetch("/api/auth/refresh", {
				method: "POST",
				credentials: "include"
			})

			if (!response.ok) return null

			const data = await response.json()
			return data.accessToken
		} catch (error) {
			return null
		} finally {
			setIsRefreshing(false)
		}
	}

	const logout = async () => {
		setUser(null)
		await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				login,
				logout,
				refreshAccessToken
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) throw new Error("useAuth must be used within an AuthProvider")
	return context
}
