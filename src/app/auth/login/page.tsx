"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-sonner"
import { useAuth } from "@/contexts/auth-context"
import { AuthRequestDTO } from "@/types/auth"

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address."
	}),
	password: z.string().min(1, {
		message: "Password is required."
	})
})

type FormValues = z.infer<typeof formSchema>

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const { toast } = useToast()
	const { setAuth, accessToken } = useAuth()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	async function onSubmit(values: FormValues) {
		setIsLoading(true)
		try {
			const requestBody: AuthRequestDTO = {
				email: values.email,
				password: values.password
			}

			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(requestBody)
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "Login failed")
			}

			// Store auth data in cookie
			await setAuth(data.user, data.accessToken, data.refreshToken)

			// Ensure cookie is set before redirecting
			toast({
				title: "Login successful!",
				description: "Setting up your session..."
			})
			await new Promise((resolve) => setTimeout(resolve, 100))

			router.push("/dashboard")
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Login failed",
				description: error instanceof Error ? error.message : "Invalid email or password. Please try again."
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='container flex h-screen w-screen flex-col items-center justify-center'>
			<Link href='/' className='absolute left-4 top-4 md:left-8 md:top-8'>
				<Button variant='ghost'>← Back</Button>
			</Link>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
					<p className='text-sm text-muted-foreground'>
						Enter your credentials to sign in to your account
					</p>
				</div>
				<div className='grid gap-6'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='john.doe@example.com'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type='password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? "Setting up session..." : "Sign in"}
							</Button>
						</form>
					</Form>
					<div className='text-center text-sm'>
						Don&apos;t have an account?{" "}
						<Link href='/auth/register' className='underline'>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
