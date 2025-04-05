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
import { RegisterRequestDTO } from "@/types/auth"

const formSchema = z
	.object({
		name: z.string().min(2, {
			message: "Name must be at least 2 characters."
		}),
		email: z.string().email({
			message: "Please enter a valid email address."
		}),
		password: z.string().min(8, {
			message: "Password must be at least 8 characters."
		}),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"]
	})

type FormValues = z.infer<typeof formSchema>

export default function RegisterPage() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const { toast } = useToast()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	})

	async function onSubmit(values: FormValues) {
		setIsLoading(true)
		try {
			const requestBody: RegisterRequestDTO = {
				name: values.name,
				email: values.email,
				password: values.password
			}

			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody)
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "Registration failed")
			}

			toast({
				title: "Account created!",
				description: "You've successfully registered. Please log in."
			})

			router.push("/auth/login")
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Registration failed",
				description:
					error instanceof Error
						? error.message
						: "There was a problem with your registration. Please try again."
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
					<h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
					<p className='text-sm text-muted-foreground'>
						Enter your information below to create your account
					</p>
				</div>
				<div className='grid gap-6'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='John Doe' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input type='password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? "Creating account..." : "Create account"}
							</Button>
						</form>
					</Form>
					<div className='text-center text-sm'>
						Already have an account?{" "}
						<Link href='/auth/login' className='underline'>
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
