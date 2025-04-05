"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PracticeTimer } from "@/components/practice/practice-timer"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { usePracticeSession } from "@/hooks/use-practice-session"
import { PracticeSegment } from "@/types/practice"

export default function PracticeSessionPage() {
	const params = useParams()
	const router = useRouter()
	const sessionId = params.id as string

	const { session, currentSegment, progress, startSession, nextSegment, completeSession } =
		usePracticeSession(sessionId)
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		// In a real app, we would fetch the session data here
		startSession()
	}, [startSession])

	if (!session) {
		return <div>Loading session...</div>
	}

	const handleComplete = () => {
		completeSession()
		router.push("/dashboard/practice")
	}

	return (
		<div className='flex flex-col gap-6'>
			<DashboardHeader heading='Practice Session' text={session.title}>
				<Button variant='outline' size='sm' onClick={() => router.back()}>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Back
				</Button>
			</DashboardHeader>

			<Card>
				<CardHeader>
					<div className='flex justify-between items-center'>
						<div>
							<CardTitle>Current Activity</CardTitle>
							<CardDescription>
								{progress.completedSegments} of {session.segments.length} activities completed
							</CardDescription>
						</div>
						<Progress value={progress.percentage} className='w-1/3' />
					</div>
				</CardHeader>
				<CardContent className='space-y-6'>
					{currentSegment ? (
						<>
							<div className='space-y-2'>
								<h3 className='text-xl font-bold'>{currentSegment.area}</h3>
								<p>{currentSegment.description}</p>
							</div>

							<PracticeTimer
								duration={currentSegment.duration * 60}
								isActive={isActive}
								onToggle={() => setIsActive(!isActive)}
								onComplete={nextSegment}
							/>

							<div className='flex justify-between'>
								<Button variant='outline' onClick={nextSegment}>
									Skip
								</Button>
								<Button onClick={nextSegment}>Complete & Next</Button>
							</div>
						</>
					) : (
						<div className='text-center py-8 space-y-4'>
							<CheckCircle className='mx-auto h-12 w-12 text-green-500' />
							<h3 className='text-xl font-bold'>Practice Complete!</h3>
							<p className='text-muted-foreground'>
								You've completed all activities in this practice session.
							</p>
							<Button onClick={handleComplete}>Finish Session</Button>
						</div>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Session Overview</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{session.segments.map((segment: PracticeSegment, index: number) => {
							const isCompleted = index < progress.completedSegments
							const isCurrent = index === progress.completedSegments

							return (
								<div
									key={index}
									className={`flex items-center p-3 rounded-lg border ${
										isCurrent ? "border-primary bg-primary/5" : ""
									}`}>
									<div
										className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
											isCompleted
												? "bg-green-100 text-green-600"
												: isCurrent
												? "bg-primary/20 text-primary"
												: "bg-gray-100 text-gray-400"
										}`}>
										{isCompleted ? (
											<CheckCircle className='h-4 w-4' />
										) : (
											<span>{index + 1}</span>
										)}
									</div>
									<div className='flex-1'>
										<div className='font-medium'>{segment.area}</div>
										<div className='text-sm text-muted-foreground'>
											{segment.duration} minutes
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
