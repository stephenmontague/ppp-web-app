"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-sonner"

export default function ProfilePage() {
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)

	const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const formData = new FormData(e.currentTarget)
			const profileData = {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				phone: formData.get("phone") as string,
				handicap: parseFloat(formData.get("handicap") as string) || undefined
			}

			const response = await fetch("/api/user", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(profileData)
			})

			if (!response.ok) {
				throw new Error("Failed to update profile")
			}

			toast({
				title: "Profile updated",
				description: "Your profile has been updated successfully."
			})
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "There was an error updating your profile."
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col gap-6'>
			<DashboardHeader heading='Profile' text='Manage your account settings and preferences' />

			<Tabs defaultValue='general' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='general'>General</TabsTrigger>
					<TabsTrigger value='golf-stats'>Golf Stats</TabsTrigger>
					<TabsTrigger value='preferences'>Preferences</TabsTrigger>
				</TabsList>

				<TabsContent value='general'>
					<Card>
						<CardHeader>
							<CardTitle>General Information</CardTitle>
							<CardDescription>Update your account information</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleUpdateProfile} className='space-y-6'>
								<div className='flex items-center gap-6'>
									<Avatar className='h-20 w-20'>
										<AvatarImage
											src='/placeholder.svg?height=80&width=80'
											alt='Profile'
										/>
										<AvatarFallback>JD</AvatarFallback>
									</Avatar>
									<Button variant='outline' type='button'>
										Change Avatar
									</Button>
								</div>

								<div className='grid gap-4'>
									<div className='grid gap-2'>
										<Label htmlFor='name'>Name</Label>
										<Input id='name' defaultValue='John Doe' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='email'>Email</Label>
										<Input id='email' type='email' defaultValue='john.doe@example.com' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='phone'>Phone Number</Label>
										<Input id='phone' type='tel' defaultValue='(555) 123-4567' />
									</div>
								</div>

								<Button type='submit' disabled={isLoading}>
									{isLoading ? "Saving..." : "Save Changes"}
								</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='golf-stats'>
					<Card>
						<CardHeader>
							<CardTitle>Golf Statistics</CardTitle>
							<CardDescription>
								Update your golf stats to get personalized practice recommendations
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className='space-y-6'>
								<div className='grid gap-4 md:grid-cols-2'>
									<div className='grid gap-2'>
										<Label htmlFor='handicap'>Handicap</Label>
										<Input id='handicap' type='number' step='0.1' defaultValue='17.3' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='avg-score'>Average Score</Label>
										<Input id='avg-score' type='number' defaultValue='89' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='driving-distance'>
											Average Driving Distance (yards)
										</Label>
										<Input id='driving-distance' type='number' defaultValue='230' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='fairways-hit'>Fairways Hit (%)</Label>
										<Input id='fairways-hit' type='number' defaultValue='50' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='greens-in-regulation'>Greens in Regulation (%)</Label>
										<Input id='greens-in-regulation' type='number' defaultValue='35' />
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='putts-per-round'>Putts per Round</Label>
										<Input id='putts-per-round' type='number' defaultValue='34' />
									</div>
								</div>

								<Button type='submit'>Save Stats</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='preferences'>
					<Card>
						<CardHeader>
							<CardTitle>Preferences</CardTitle>
							<CardDescription>Customize your app experience</CardDescription>
						</CardHeader>
						<CardContent>
							<form className='space-y-6'>
								<div className='space-y-4'>
									<h3 className='text-lg font-medium'>Notifications</h3>
									<div className='grid gap-2'>
										<div className='flex items-center gap-2'>
											<input
												type='checkbox'
												id='practice-reminders'
												className='h-4 w-4'
												defaultChecked
											/>
											<Label htmlFor='practice-reminders'>Practice Reminders</Label>
										</div>
										<div className='flex items-center gap-2'>
											<input
												type='checkbox'
												id='progress-updates'
												className='h-4 w-4'
												defaultChecked
											/>
											<Label htmlFor='progress-updates'>Progress Updates</Label>
										</div>
										<div className='flex items-center gap-2'>
											<input
												type='checkbox'
												id='tips-tricks'
												className='h-4 w-4'
												defaultChecked
											/>
											<Label htmlFor='tips-tricks'>Tips & Tricks</Label>
										</div>
									</div>
								</div>

								<Button type='submit'>Save Preferences</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
