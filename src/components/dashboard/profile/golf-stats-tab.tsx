import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-sonner"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Info } from "lucide-react"

export function GolfStatsTab() {
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)
	const { isAuthenticated } = useAuth()

	const handleUpdateGolfStats = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Ensure the user is authenticated
			if (!isAuthenticated) {
				throw new Error("You must be logged in to update golf stats")
			}

			const formData = new FormData(e.currentTarget)
			const statsData = {
				handicap: parseFloat(formData.get("handicap") as string) || null,
				swingSpeed: parseFloat(formData.get("swing-speed") as string) || null,
				strokesGained: {
					offTheTee: parseFloat(formData.get("off-the-tee") as string) || null,
					approach: parseFloat(formData.get("approach") as string) || null,
					aroundTheGreen: parseFloat(formData.get("around-the-green") as string) || null,
					putting: parseFloat(formData.get("putting") as string) || null,
					teeToGreen: parseFloat(formData.get("tee-to-green") as string) || null,
					total: parseFloat(formData.get("total") as string) || null
				}
			}

			const response = await fetch("/api/stats", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include",
				body: JSON.stringify(statsData)
			})

			if (!response.ok) {
				throw new Error("Failed to update golf stats")
			}

			toast({
				title: "Stats updated",
				description: "Your golf statistics have been updated successfully."
			})
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "There was an error updating your golf statistics."
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Golf Statistics</CardTitle>
				<CardDescription>
					Update your golf stats to get personalized practice recommendations. Leave fields blank if you
					don't have the data.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleUpdateGolfStats} className='space-y-6'>
					<div className='grid gap-4 md:grid-cols-2'>
						<div className='grid gap-2'>
							<Label htmlFor='handicap'>Handicap</Label>
							<Input
								id='handicap'
								name='handicap'
								type='number'
								step='0.1'
								min='-10'
								max='54'
								placeholder='Enter your handicap (optional)'
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='swing-speed'>Swing Speed (mph)</Label>
							<Input
								id='swing-speed'
								name='swing-speed'
								type='number'
								step='1'
								min='50'
								max='200'
								placeholder='Enter your swing speed (optional)'
							/>
						</div>

						<div className='grid gap-2'>
							<div className='flex items-center gap-2'>
								<Label htmlFor='off-the-tee'>Strokes Gained: Off the Tee</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger type='button'>
											<Info className='h-4 w-4 text-muted-foreground' />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												Evaluates the effectiveness of tee shots on par-4s and
												par-5s, comparing starting position to the position after
												the shot relative to the field average. Accounts for
												distance and accuracy, factoring in the lie (fairway, rough,
												bunker, etc.).
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Input
								id='off-the-tee'
								name='off-the-tee'
								type='number'
								step='0.01'
								min='-30'
								max='30'
								placeholder='Enter strokes gained off the tee (optional)'
							/>
						</div>

						<div className='grid gap-2'>
							<div className='flex items-center gap-2'>
								<Label htmlFor='approach'>Strokes Gained: Approach</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger type='button'>
											<Info className='h-4 w-4 text-muted-foreground' />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												Assesses performance on approach shots (typically shots from
												over 100 yards to the green, excluding tee shots on par-3s).
												Measures how much closer a shot gets to the hole compared to
												the tour average from that starting position.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Input
								id='approach'
								name='approach'
								type='number'
								step='0.01'
								min='-30'
								max='30'
								placeholder='Enter strokes gained on approach (optional)'
							/>
						</div>

						<div className='grid gap-2'>
							<div className='flex items-center gap-2'>
								<Label htmlFor='around-the-green'>Strokes Gained: Around the Green</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger type='button'>
											<Info className='h-4 w-4 text-muted-foreground' />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												Measures performance on shots within 30 yards of the green
												(e.g., chips, pitches, and bunker shots), excluding putts.
												Compares the outcome of these shots to the tour average from
												similar positions.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Input
								id='around-the-green'
								name='around-the-green'
								type='number'
								step='0.01'
								min='-30'
								max='30'
								placeholder='Enter strokes gained around the green (optional)'
							/>
						</div>

						<div className='grid gap-2'>
							<div className='flex items-center gap-2'>
								<Label htmlFor='putting'>Strokes Gained: Putting</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger type='button'>
											<Info className='h-4 w-4 text-muted-foreground' />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												Measures putting performance relative to the field, based on
												the distance of each putt. Calculates the difference between
												the actual number of putts taken and the PGA Tour average to
												hole out from that distance.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Input
								id='putting'
								name='putting'
								type='number'
								step='0.01'
								min='-30'
								max='30'
								placeholder='Enter strokes gained putting (optional)'
							/>
						</div>

						<div className='grid gap-2'>
							<div className='flex items-center gap-2'>
								<Label htmlFor='tee-to-green'>Strokes Gained: Tee-to-Green</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger type='button'>
											<Info className='h-4 w-4 text-muted-foreground' />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												A composite stat that combines Strokes Gained: Off-the-Tee,
												Approach-the-Green, and Around-the-Green. Represents a
												player's performance from the tee to the green, excluding
												putting.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Input
								id='tee-to-green'
								name='tee-to-green'
								type='number'
								step='0.01'
								min='-30'
								max='30'
								placeholder='Enter strokes gained tee-to-green (optional)'
							/>
						</div>

						<div className='grid gap-2'>
							<div className='flex items-center gap-2'>
								<Label htmlFor='total'>Strokes Gained: Total</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger type='button'>
											<Info className='h-4 w-4 text-muted-foreground' />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												The sum of all Strokes Gained categories (Off-the-Tee +
												Approach-the-Green + Around-the-Green + Putting). Reflects a
												player's overall performance relative to the field for an
												entire round or tournament.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Input
								id='total'
								name='total'
								type='number'
								step='0.01'
								min='-30'
								max='30'
								placeholder='Enter total strokes gained (optional)'
							/>
						</div>
					</div>

					<Button type='submit' disabled={isLoading}>
						{isLoading ? "Saving..." : "Save Stats"}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
