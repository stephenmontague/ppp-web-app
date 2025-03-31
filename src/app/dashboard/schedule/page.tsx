"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ScheduleEvent } from "@/components/schedule/schedule-event"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSchedule } from "@/hooks/use-schedule"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function SchedulePage() {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const { events, addEvent } = useSchedule()
	const [newEvent, setNewEvent] = useState({
		title: "",
		type: "practice",
		duration: "60"
	})
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleAddEvent = () => {
		if (date && newEvent.title) {
			addEvent({
				id: Date.now().toString(),
				title: newEvent.title,
				date: date,
				type: newEvent.type,
				duration: Number.parseInt(newEvent.duration)
			})

			// Reset form
			setNewEvent({
				title: "",
				type: "practice",
				duration: "60"
			})
			setIsDialogOpen(false)
		}
	}

	// Filter events for the selected date
	const selectedDateEvents = events.filter((event) => {
		if (!date) return false
		const eventDate = new Date(event.date)
		return (
			eventDate.getDate() === date.getDate() &&
			eventDate.getMonth() === date.getMonth() &&
			eventDate.getFullYear() === date.getFullYear()
		)
	})

	// Get dates with events for highlighting in calendar
	const datesWithEvents = events.map((event) => new Date(event.date))

	return (
		<div className='flex flex-col gap-6'>
			<DashboardHeader
				heading='Schedule'
				text='Plan and manage your golf practice and play schedule'></DashboardHeader>

			<Tabs defaultValue='calendar' className='space-y-4'>
				<div className='flex justify-between items-center'>
					<TabsList>
						<TabsTrigger value='calendar'>Calendar</TabsTrigger>
						<TabsTrigger value='list'>List View</TabsTrigger>
						<TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
					</TabsList>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className='mr-2 h-4 w-4' />
								Add Event
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New Event</DialogTitle>
								<DialogDescription>
									Schedule a new practice session or round of golf.
								</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4 py-4'>
								<div className='grid gap-2'>
									<Label htmlFor='title'>Event Title</Label>
									<Input
										id='title'
										value={newEvent.title}
										onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
										placeholder='Quick Practice Session'
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='type'>Event Type</Label>
									<Select
										value={newEvent.type}
										onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
										<SelectTrigger id='type'>
											<SelectValue placeholder='Select event type' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='practice'>Practice Session</SelectItem>
											<SelectItem value='round'>Round of Golf</SelectItem>
											<SelectItem value='lesson'>Golf Lesson</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='duration'>Duration (minutes)</Label>
									<Input
										id='duration'
										type='number'
										value={newEvent.duration}
										onChange={(e) =>
											setNewEvent({ ...newEvent, duration: e.target.value })
										}
									/>
								</div>
							</div>
							<DialogFooter>
								<Button variant='outline' onClick={() => setIsDialogOpen(false)}>
									Cancel
								</Button>
								<Button onClick={handleAddEvent}>Add to Schedule</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<TabsContent value='calendar' className='space-y-4'>
					<div className='space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle>Calendar</CardTitle>
								<CardDescription>Select a date to view or add scheduled events</CardDescription>
							</CardHeader>
							<CardContent className='p-0'>
								<Calendar
									mode='single'
									selected={date}
									onSelect={setDate}
									className='mx-auto'
									modifiers={{ hasEvent: datesWithEvents }}
									modifiersStyles={{
										hasEvent: { fontWeight: "bold", textDecoration: "underline" }
									}}
									classNames={{
										root: "w-full",
										months: "w-full",
										month: "w-full",
										table: "w-full border-collapse",
										head_row: "flex w-full",
										row: "flex w-full mt-2",
										head_cell:
											"text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
										cell: "h-9 w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
										day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
										day_selected:
											"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
										day_today: "bg-accent text-accent-foreground",
										day_outside: "text-muted-foreground opacity-50",
										day_disabled: "text-muted-foreground opacity-50",
										day_range_middle:
											"aria-selected:bg-accent aria-selected:text-accent-foreground",
										day_hidden: "invisible",
										nav: "space-x-1 flex items-center justify-between px-4 py-2",
										nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
										nav_button_previous: "absolute left-1",
										nav_button_next: "absolute right-1",
										caption: "flex justify-center py-2 px-4 relative items-center",
										caption_label: "text-sm font-medium",
										caption_dropdowns: "flex justify-center gap-1"
									}}
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>
									{date
										? date.toLocaleDateString("en-US", {
												weekday: "long",
												month: "long",
												day: "numeric"
										  })
										: "Select a date"}
								</CardTitle>
								<CardDescription>
									{selectedDateEvents.length
										? `${selectedDateEvents.length} event${
												selectedDateEvents.length > 1 ? "s" : ""
										  } scheduled`
										: "No events scheduled"}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									{selectedDateEvents.length > 0 ? (
										selectedDateEvents.map((event) => (
											<ScheduleEvent
												key={event.id}
												title={event.title}
												type={event.type}
												time={new Date(event.date).toLocaleTimeString("en-US", {
													hour: "numeric",
													minute: "2-digit"
												})}
												duration={event.duration}
											/>
										))
									) : (
										<div className='text-center py-8 text-muted-foreground'>
											<p>No events scheduled for this day</p>
											<Button
												variant='outline'
												className='mt-4'
												onClick={() => setIsDialogOpen(true)}>
												Add Event
											</Button>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value='list' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>All Scheduled Events</CardTitle>
							<CardDescription>
								View all your upcoming practice sessions and rounds
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{events.length > 0 ? (
									events
										.sort(
											(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
										)
										.map((event) => (
											<ScheduleEvent
												key={event.id}
												title={event.title}
												type={event.type}
												date={new Date(event.date).toLocaleDateString("en-US", {
													weekday: "short",
													month: "short",
													day: "numeric"
												})}
												time={new Date(event.date).toLocaleTimeString("en-US", {
													hour: "numeric",
													minute: "2-digit"
												})}
												duration={event.duration}
											/>
										))
								) : (
									<div className='text-center py-8 text-muted-foreground'>
										<p>No events scheduled</p>
										<Button
											variant='outline'
											className='mt-4'
											onClick={() => setIsDialogOpen(true)}>
											Add Your First Event
										</Button>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='upcoming' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Upcoming Events</CardTitle>
							<CardDescription>Your next 7 days of scheduled activities</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{events
									.filter((event) => {
										const eventDate = new Date(event.date)
										const now = new Date()
										const sevenDaysLater = new Date()
										sevenDaysLater.setDate(now.getDate() + 7)
										return eventDate >= now && eventDate <= sevenDaysLater
									})
									.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
									.map((event) => (
										<ScheduleEvent
											key={event.id}
											title={event.title}
											type={event.type}
											date={new Date(event.date).toLocaleDateString("en-US", {
												weekday: "short",
												month: "short",
												day: "numeric"
											})}
											time={new Date(event.date).toLocaleTimeString("en-US", {
												hour: "numeric",
												minute: "2-digit"
											})}
											duration={event.duration}
										/>
									))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
