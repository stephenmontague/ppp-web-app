"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-sonner"
import { useTheme } from "next-themes"
import { useState } from "react"

export default function SettingsPage() {
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)
	const { theme, setTheme } = useTheme()

	const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// In a real app, this would call an API to save settings
			await new Promise((resolve) => setTimeout(resolve, 1000))

			toast({
				title: "Settings saved",
				description: "Your settings have been updated successfully."
			})
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "There was an error saving your settings."
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col gap-6'>
			<DashboardHeader heading='Settings' text='Manage your preferences' />

			<Tabs defaultValue='notifications' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='notifications'>Notifications</TabsTrigger>
					<TabsTrigger value='appearance'>Appearance</TabsTrigger>
				</TabsList>

				<TabsContent value='notifications'>
					<Card>
						<CardHeader>
							<CardTitle>Notification Settings</CardTitle>
							<CardDescription>Configure how and when you receive notifications</CardDescription>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div className='space-y-4'>
								<h3 className='text-lg font-medium'>Email Notifications</h3>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label htmlFor='practice-reminders'>Practice Reminders</Label>
											<p className='text-sm text-muted-foreground'>
												Receive reminders about scheduled practice sessions
											</p>
										</div>
										<Switch id='practice-reminders' defaultChecked />
									</div>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label htmlFor='progress-updates'>Progress Updates</Label>
											<p className='text-sm text-muted-foreground'>
												Get weekly updates on your golf progress
											</p>
										</div>
										<Switch id='progress-updates' defaultChecked />
									</div>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label htmlFor='tips-tricks'>Tips & Tricks</Label>
											<p className='text-sm text-muted-foreground'>
												Receive golf tips and practice suggestions
											</p>
										</div>
										<Switch id='tips-tricks' defaultChecked />
									</div>
								</div>
							</div>

							<div className='space-y-4'>
								<h3 className='text-lg font-medium'>Push Notifications</h3>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label htmlFor='push-practice'>Practice Notifications</Label>
											<p className='text-sm text-muted-foreground'>
												Receive push notifications for practice reminders
											</p>
										</div>
										<Switch id='push-practice' defaultChecked />
									</div>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label htmlFor='push-achievements'>Achievements</Label>
											<p className='text-sm text-muted-foreground'>
												Get notified when you reach milestones
											</p>
										</div>
										<Switch id='push-achievements' defaultChecked />
									</div>
								</div>
							</div>

							<Button>Save Notification Settings</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='appearance'>
					<Card>
						<CardHeader>
							<CardTitle>Appearance Settings</CardTitle>
							<CardDescription>Customize how the app looks and feels</CardDescription>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div className='space-y-4'>
								<h3 className='text-lg font-medium'>Theme</h3>
								<div className='grid gap-2'>
									<Label htmlFor='theme'>Color Theme</Label>
									<Select value={theme} onValueChange={setTheme}>
										<SelectTrigger id='theme'>
											<SelectValue placeholder='Select theme' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='light'>Light</SelectItem>
											<SelectItem value='dark'>Dark</SelectItem>
											<SelectItem value='system'>System</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
