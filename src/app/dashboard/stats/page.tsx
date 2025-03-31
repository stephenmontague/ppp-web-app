"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { ScoreHistoryChart } from "@/components/stats/score-history-chart"
import { StatsBreakdown } from "@/components/stats/stats-breakdown"
import { RoundHistoryTable } from "@/components/stats/round-history-table"
import { Plus } from "lucide-react"

export default function StatsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [newRound, setNewRound] = useState({
		course: "",
		date: new Date().toISOString().split("T")[0],
		score: "85",
		putts: "32",
		fairways: "7",
		greensInRegulation: "6"
	})

	const handleAddRound = () => {
		// In a real app, this would call an API to save the round
		console.log("Adding round:", newRound)
		setIsDialogOpen(false)

		// Reset form
		setNewRound({
			course: "",
			date: new Date().toISOString().split("T")[0],
			score: "85",
			putts: "32",
			fairways: "7",
			greensInRegulation: "6"
		})
	}

	return (
		<div className='flex flex-col gap-6'>
			<DashboardHeader heading='Statistics' text='Track and analyze your golf performance'>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className='mr-2 h-4 w-4' />
							Add Round
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Round</DialogTitle>
							<DialogDescription>
								Enter the details of your latest round of golf.
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid gap-2'>
								<Label htmlFor='course'>Course Name</Label>
								<Input
									id='course'
									value={newRound.course}
									onChange={(e) => setNewRound({ ...newRound, course: e.target.value })}
									placeholder='Pine Valley Golf Club'
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='date'>Date Played</Label>
								<Input
									id='date'
									type='date'
									value={newRound.date}
									onChange={(e) => setNewRound({ ...newRound, date: e.target.value })}
								/>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='grid gap-2'>
									<Label htmlFor='score'>Total Score</Label>
									<Input
										id='score'
										type='number'
										value={newRound.score}
										onChange={(e) => setNewRound({ ...newRound, score: e.target.value })}
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='putts'>Total Putts</Label>
									<Input
										id='putts'
										type='number'
										value={newRound.putts}
										onChange={(e) => setNewRound({ ...newRound, putts: e.target.value })}
									/>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='grid gap-2'>
									<Label htmlFor='fairways'>Fairways Hit</Label>
									<Input
										id='fairways'
										type='number'
										value={newRound.fairways}
										onChange={(e) =>
											setNewRound({ ...newRound, fairways: e.target.value })
										}
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='greensInRegulation'>Greens in Regulation</Label>
									<Input
										id='greensInRegulation'
										type='number'
										value={newRound.greensInRegulation}
										onChange={(e) =>
											setNewRound({ ...newRound, greensInRegulation: e.target.value })
										}
									/>
								</div>
							</div>
						</div>
						<DialogFooter>
							<Button variant='outline' onClick={() => setIsDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleAddRound}>Save Round</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</DashboardHeader>

			<Tabs defaultValue='overview' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='strokes-gained'>Strokes Gained</TabsTrigger>
					<TabsTrigger value='rounds'>Round History</TabsTrigger>
					<TabsTrigger value='trends'>Trends</TabsTrigger>
				</TabsList>

				<TabsContent value='overview' className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Current Handicap</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>17.3</div>
								<p className='text-xs text-muted-foreground'>-0.5 from last month</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Average Score</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>89</div>
								<p className='text-xs text-muted-foreground'>Last 5 rounds</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Fairways Hit</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>42%</div>
								<p className='text-xs text-muted-foreground'>+5% from last month</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Greens in Regulation</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>28%</div>
								<p className='text-xs text-muted-foreground'>+3% from last month</p>
							</CardContent>
						</Card>
					</div>

					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
						<Card className='col-span-4'>
							<CardHeader>
								<CardTitle>Score History</CardTitle>
								<CardDescription>Your scores over the last 10 rounds</CardDescription>
							</CardHeader>
							<CardContent className='pl-2'>
								<ScoreHistoryChart />
							</CardContent>
						</Card>
						<Card className='col-span-3'>
							<CardHeader>
								<CardTitle>Stats Breakdown</CardTitle>
								<CardDescription>Key performance indicators</CardDescription>
							</CardHeader>
							<CardContent>
								<StatsBreakdown />
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value='strokes-gained' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Strokes Gained Analysis</CardTitle>
							<CardDescription>See how your game compares to your target handicap</CardDescription>
						</CardHeader>
						<CardContent>
							<StatsOverview />
							<div className='mt-6 space-y-4'>
								<h3 className='text-lg font-medium'>Interpretation</h3>
								<p className='text-sm text-muted-foreground'>
									Your strokes gained data shows you're losing the most strokes on the
									putting green (-3.1), followed by approach shots (-2.5). Focus your
									practice on these areas to see the biggest improvement in your scores.
								</p>
								<div className='grid gap-4 md:grid-cols-2'>
									<Card>
										<CardHeader className='pb-2'>
											<CardTitle className='text-base'>Putting</CardTitle>
										</CardHeader>
										<CardContent className='pb-2'>
											<p className='text-sm text-muted-foreground'>
												You're losing 3.1 strokes per round on the green. Work on
												your 6-10 foot putts and distance control.
											</p>
										</CardContent>
										<CardFooter>
											<Button variant='outline' size='sm' className='w-full'>
												View Putting Drills
											</Button>
										</CardFooter>
									</Card>
									<Card>
										<CardHeader className='pb-2'>
											<CardTitle className='text-base'>Approach</CardTitle>
										</CardHeader>
										<CardContent className='pb-2'>
											<p className='text-sm text-muted-foreground'>
												You're losing 2.5 strokes per round on approach shots. Focus
												on 100-150 yard shots.
											</p>
										</CardContent>
										<CardFooter>
											<Button variant='outline' size='sm' className='w-full'>
												View Approach Drills
											</Button>
										</CardFooter>
									</Card>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='rounds' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Round History</CardTitle>
							<CardDescription>Your recent rounds and detailed statistics</CardDescription>
						</CardHeader>
						<CardContent>
							<RoundHistoryTable />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='trends' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Performance Trends</CardTitle>
							<CardDescription>Track your improvement over time</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-8'>
								<div>
									<h3 className='text-lg font-medium mb-4'>Handicap Trend</h3>
									<div className='h-[200px] w-full bg-muted rounded-md flex items-center justify-center'>
										<p className='text-muted-foreground'>
											Handicap trend chart will be displayed here
										</p>
									</div>
								</div>
								<div>
									<h3 className='text-lg font-medium mb-4'>Key Stats Trends</h3>
									<div className='grid gap-4 md:grid-cols-2'>
										<Card>
											<CardHeader className='pb-2'>
												<CardTitle className='text-base'>Putting Average</CardTitle>
											</CardHeader>
											<CardContent>
												<div className='h-[150px] w-full bg-muted rounded-md flex items-center justify-center'>
													<p className='text-muted-foreground'>
														Putting trend chart
													</p>
												</div>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className='pb-2'>
												<CardTitle className='text-base'>
													Greens in Regulation
												</CardTitle>
											</CardHeader>
											<CardContent>
												<div className='h-[150px] w-full bg-muted rounded-md flex items-center justify-center'>
													<p className='text-muted-foreground'>
														GIR trend chart
													</p>
												</div>
											</CardContent>
										</Card>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
