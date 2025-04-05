"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, Clock, Home, Settings, User } from "lucide-react"

interface NavItem {
	title: string
	href: string
	icon: React.ReactNode
}

export function DashboardNav() {
	const pathname = usePathname()

	const navItems: NavItem[] = [
		{
			title: "Dashboard",
			href: "/dashboard",
			icon: <Home className='mr-2 h-4 w-4' />
		},
		{
			title: "Practice Plans",
			href: "/dashboard/practice",
			icon: <Clock className='mr-2 h-4 w-4' />
		},
		{
			title: "Schedule",
			href: "/dashboard/schedule",
			icon: <Calendar className='mr-2 h-4 w-4' />
		},
		{
			title: "Stats",
			href: "/dashboard/stats",
			icon: <BarChart3 className='mr-2 h-4 w-4' />
		},
		{
			title: "Profile",
			href: "/dashboard/profile",
			icon: <User className='mr-2 h-4 w-4' />
		},
		{
			title: "Settings",
			href: "/dashboard/settings",
			icon: <Settings className='mr-2 h-4 w-4' />
		}
	]

	return (
		<nav className='grid items-start gap-2 px-2 pt-6'>
			{navItems.map((item) => {
				const isActive =
					item.href === "/dashboard"
						? pathname === item.href
						: pathname === item.href || pathname.startsWith(`${item.href}/`)

				return (
					<Link key={item.href} href={item.href}>
						<Button
							variant={isActive ? "default" : "ghost"}
							className={cn(
								"w-full justify-start",
								isActive && "bg-primary text-primary-foreground"
							)}
							aria-current={isActive ? "page" : undefined}>
							{item.icon}
							{item.title}
						</Button>
					</Link>
				)
			})}
		</nav>
	)
}
