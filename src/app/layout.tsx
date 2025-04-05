import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/auth-context"
import { LayoutProvider } from "@/contexts/layout-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Pocket Practice Plan",
	description: "Personalized golf practice planning for players of all levels"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<LayoutProvider>
			<html lang='en' suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<AuthProvider>
							{children}
							<Toaster />
						</AuthProvider>
					</ThemeProvider>
				</body>
			</html>
		</LayoutProvider>
	)
}
