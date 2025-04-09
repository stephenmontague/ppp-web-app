import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function PreferencesTab() {
	return (
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
								<input type='checkbox' id='tips-tricks' className='h-4 w-4' defaultChecked />
								<Label htmlFor='tips-tricks'>Tips & Tricks</Label>
							</div>
						</div>
					</div>

					<Button type='submit'>Save Preferences</Button>
				</form>
			</CardContent>
		</Card>
	)
}
