"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-sonner"
import { AlertCircle } from "lucide-react"

export default function SettingsPage() {
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)

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

	const handleDeleteAccount = async () => {
		// In a real app, this would call an API to delete the account
		toast({
			title: "Account deletion requested",
			description: "We've sent a confirmation email to verify this action."
		})
	}

	return (
		<div className='flex flex-col gap-6'>
			<DashboardHeader heading='Settings' text='Manage your account settings and preferences' />

			<Tabs defaultValue='account' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='account'>Account</TabsTrigger>
					<TabsTrigger value='notifications'>Notifications</TabsTrigger>
					<TabsTrigger value='appearance'>Appearance</TabsTrigger>
					<TabsTrigger value='integrations'>Integrations</TabsTrigger>
				</TabsList>

				<TabsContent value='account'>
					<Card>
						<CardHeader>
							<CardTitle>Account Settings</CardTitle>
							<CardDescription>Update your account information and preferences</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSaveSettings} className='space-y-6'>
								<div className='space-y-4'>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email Address</Label>
										<Input id='email' type='email' defaultValue='john.doe@example.com' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='phone'>Phone Number</Label>
										<Input id='phone' type='tel' defaultValue='(555) 123-4567' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='password'>Password</Label>
										<Input id='password' type='password' defaultValue='********' />
									</div>
								</div>

								<Button type='submit' disabled={isLoading}>
									{isLoading ? "Saving..." : "Save Changes"}
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card className='mt-4'>
						<CardHeader>
							<CardTitle>Delete Account</CardTitle>
							<CardDescription>
								Permanently delete your account and all associated data
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='flex items-start gap-4 rounded-md border p-4'>
								<AlertCircle className='h-5 w-5 text-red-500 mt-0.5' />
								<div className='space-y-1'>
									<p className='text-sm font-medium'>
										Warning: This action cannot be undone
									</p>
									<p className='text-sm text-muted-foreground'>
										Once you delete your account, all of your data will be permanently
										removed. This action cannot be undone.
									</p>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button variant='destructive' onClick={handleDeleteAccount}>
								Delete Account
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

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
									<Select defaultValue='light'>
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

							<div className='space-y-4'>
								<h3 className='text-lg font-medium'>Display</h3>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label htmlFor='compact-mode'>Compact Mode</Label>
											<p className='text-sm text-muted-foreground'>
												Use a more compact layout to fit more content on screen
											</p>
										</div>
										<Switch id='compact-mode' />
									</div>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label htmlFor='large-text'>Larger Text</Label>
											<p className='text-sm text-muted-foreground'>
												Increase text size for better readability
											</p>
										</div>
										<Switch id='large-text' />
									</div>
								</div>
							</div>

							<Button>Save Appearance Settings</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='integrations'>
					<Card>
						<CardHeader>
							<CardTitle>App Integrations</CardTitle>
							<CardDescription>Connect with other golf apps and services</CardDescription>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-4'>
										<div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center'>
											<span className='font-bold'>18B</span>
										</div>
										<div>
											<h3 className='text-lg font-medium'>18Birdies</h3>
											<p className='text-sm text-muted-foreground'>
												Import scores and stats from 18Birdies
											</p>
										</div>
									</div>
									<Button variant='outline'>Connect</Button>
								</div>

								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-4'>
										<div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center'>
											<span className='font-bold'>TG</span>
										</div>
										<div>
											<h3 className='text-lg font-medium'>The Grint</h3>
											<p className='text-sm text-muted-foreground'>
												Import scores and stats from The Grint
											</p>
										</div>
									</div>
									<Button variant='outline'>Connect</Button>
								</div>

								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-4'>
										<div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center'>
											<span className='font-bold'>GD</span>
										</div>
										<div>
											<h3 className='text-lg font-medium'>Garmin Golf</h3>
											<p className='text-sm text-muted-foreground'>
												Connect with Garmin devices and import data
											</p>
										</div>
									</div>
									<Button variant='outline'>Connect</Button>
								</div>
							</div>

							<div className='rounded-md border p-4'>
								<h3 className='text-sm font-medium mb-2'>Data Sharing</h3>
								<p className='text-sm text-muted-foreground mb-4'>
									When you connect an app, we'll import your scores and stats to enhance your
									practice plans. We never share your data without your permission.
								</p>
								<div className='flex items-center gap-2'>
									<Switch id='data-sharing' defaultChecked />
									<Label htmlFor='data-sharing'>
										Allow data sharing with connected apps
									</Label>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
