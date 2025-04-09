import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
	if (!name) return "??"
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2)
}

export function formatTime(seconds: number): string {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

// Function to check if token is expired
export const isTokenExpired = (token: string) => {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]))
		const expiryTime = payload.exp * 1000 // convert to milliseconds
		return Date.now() >= expiryTime
	} catch (error) {
		return true
	}
}
