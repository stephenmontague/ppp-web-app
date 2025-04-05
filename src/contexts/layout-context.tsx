"use client"

import { useLocalStorage } from "@/hooks/use-local-storage"
import { createContext, ReactNode, useContext } from "react"

type LayoutContextType = {
	isCompactMode: boolean
	setIsCompactMode: (value: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
	const [isCompactMode, setIsCompactMode] = useLocalStorage("compact-mode", false)

	return <LayoutContext.Provider value={{ isCompactMode, setIsCompactMode }}>{children}</LayoutContext.Provider>
}

export function useLayout() {
	const context = useContext(LayoutContext)
	if (context === undefined) {
		throw new Error("useLayout must be used within a LayoutProvider")
	}
	return context
}
