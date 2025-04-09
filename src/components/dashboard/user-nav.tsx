"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { getInitials } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function UserNav() {
	const router = useRouter()
	const { user } = useAuth()

	const handleLogout = async () => {
		try {
			const response = await fetch("/auth/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (!response.ok) {
				throw new Error("Logout failed")
			}

			router.push("/")
		} catch (error) {
			console.error("Logout error:", error)
			// You might want to show a toast notification here
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src='/placeholder.svg?height=32&width=32' alt='User' />
						<AvatarFallback>{getInitials(user?.username || "")}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{user?.username || "User"}</p>
						<p className='text-xs leading-none text-muted-foreground'>{user?.email || ""}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>Profile</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
