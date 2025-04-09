import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-sonner"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { getInitials } from "@/lib/utils"

export function GeneralProfileTab() {
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useAuth()

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
		<Card>
			<CardHeader>
				<CardTitle>General Information</CardTitle>
				<CardDescription>Update your account information</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleUpdateProfile} className='space-y-6'>
					<div className='flex items-center gap-6'>
						<Avatar className='h-20 w-20'>
							<AvatarImage src='/placeholder.svg?height=80&width=80' alt='Profile' />
							<AvatarFallback>{user ? getInitials(user.username) : "??"}</AvatarFallback>
						</Avatar>
						<Button variant='outline' type='button'>
							Change Avatar
						</Button>
					</div>

					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' name='name' defaultValue={user?.username || ""} />
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' name='email' type='email' defaultValue={user?.email || ""} />
						</div>
					</div>

					<Button type='submit' disabled={isLoading}>
						{isLoading ? "Saving..." : "Save Changes"}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
