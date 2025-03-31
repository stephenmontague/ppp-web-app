import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"

interface DashboardLayoutProps {
	children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className='flex min-h-screen flex-col'>
			<header className='sticky top-0 z-40 border-b bg-background'>
				<div className='container flex h-16 items-center justify-between py-4'>
					<div className='flex items-center gap-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-6 w-6'>
							<path d='M12 18a6 6 0 0 0 0-12v12z' />
							<path d='M12 18a6 6 0 0 1 0-12v12z' />
							<path d='M12 18V6' />
						</svg>
						<span className='text-xl font-bold'>Pocket Practice Plan</span>
					</div>
					<UserNav />
				</div>
			</header>
			<div className='container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10'>
				<aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
					<DashboardNav />
				</aside>
				<main className='flex w-full flex-col overflow-hidden pt-6 pb-20 md:pb-6'>{children}</main>
			</div>
			<MobileNav />
		</div>
	)
}
