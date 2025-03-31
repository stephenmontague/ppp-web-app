"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, BarChart3, Target } from "lucide-react"
import { PracticeSessionCard } from "@/components/dashboard/practice-session-card"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
	const router = useRouter()

	const handleQuickStart = (duration: number) => {
		router.push(`/dashboard/practice/session?planId=quick-${duration}`)
	}

	return (
		<div className='flex flex-col gap-6'>
			<DashboardHeader heading='Dashboard' text='Welcome back! View your stats and create a practice plan.' />

			{/* Quick Practice Box - At the top */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Practice</CardTitle>
					<CardDescription>Create a practice plan based on available time</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						<div className='font-medium'>How much time do you have?</div>
						<div className='grid grid-cols-2 gap-2'>
							<Button variant='outline' onClick={() => handleQuickStart(30)}>
								30 min
							</Button>
							<Button variant='outline' onClick={() => handleQuickStart(60)}>
								1 hour
							</Button>
							<Button variant='outline' onClick={() => handleQuickStart(90)}>
								90 min
							</Button>
							<Button variant='outline' onClick={() => router.push("/dashboard/practice")}>
								Custom
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Recent Activity - Now moved up */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
					<CardDescription>Your latest practice sessions and rounds</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							<div>
								<div className='font-medium'>60 Minute Practice</div>
								<div className='text-sm text-muted-foreground'>2 days ago</div>
							</div>
							<Button variant='outline' size='sm' onClick={() => handleQuickStart(60)}>
								Repeat
							</Button>
						</div>
						<div className='flex justify-between items-center'>
							<div>
								<div className='font-medium'>Round at City Course</div>
								<div className='text-sm text-muted-foreground'>4 days ago</div>
							</div>
							<Button variant='outline' size='sm' onClick={() => router.push("/dashboard/stats")}>
								View Stats
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Recent Practice Sessions - Now moved up */}
			<div>
				<h2 className='text-xl font-bold mb-4'>Recent Practice Sessions</h2>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					<PracticeSessionCard date='Yesterday' duration='45 min' focus='Putting' completed={true} />
					<PracticeSessionCard
						date='3 days ago'
						duration='1 hour'
						focus='Approach Shots'
						completed={true}
					/>
					<PracticeSessionCard date='5 days ago' duration='30 min' focus='Driving' completed={true} />
				</div>
			</div>

			<Tabs defaultValue='overview' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='stats'>Stats</TabsTrigger>
					<TabsTrigger value='history'>History</TabsTrigger>
				</TabsList>
				<TabsContent value='overview' className='space-y-4'>
					{/* Stats Cards - Now moved down */}
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Handicap</CardTitle>
								<Target className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>17.3</div>
								<p className='text-xs text-muted-foreground'>-0.5 from last month</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Practice Sessions</CardTitle>
								<CalendarDays className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>12</div>
								<p className='text-xs text-muted-foreground'>+3 from last month</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Practice Time</CardTitle>
								<Clock className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>8.5h</div>
								<p className='text-xs text-muted-foreground'>+2.3h from last month</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Rounds Played</CardTitle>
								<BarChart3 className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>4</div>
								<p className='text-xs text-muted-foreground'>Same as last month</p>
							</CardContent>
						</Card>
					</div>

					{/* Strokes Gained Overview - Kept in the same position */}
					<Card>
						<CardHeader>
							<CardTitle>Strokes Gained Overview</CardTitle>
							<CardDescription>
								Your performance across different aspects of your game
							</CardDescription>
						</CardHeader>
						<CardContent className='pl-2'>
							<StatsOverview />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='stats' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Detailed Statistics</CardTitle>
							<CardDescription>
								View your performance metrics across different aspects of your game
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className='text-sm text-muted-foreground'>
								Detailed statistics will be displayed here. Track your progress over time.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='history' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Practice History</CardTitle>
							<CardDescription>View your past practice sessions and rounds</CardDescription>
						</CardHeader>
						<CardContent>
							<p className='text-sm text-muted-foreground'>
								Your practice history will be displayed here. Track your consistency and
								progress.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
