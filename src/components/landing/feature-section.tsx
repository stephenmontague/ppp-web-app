import { Clock, BarChart3, Calendar, Target, Award, Zap } from "lucide-react"

export function FeatureSection() {
	return (
		<section id='features' className='w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900'>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<div className='space-y-2'>
						<div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
							Features
						</div>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
							Everything You Need to Practice Smarter
						</h2>
						<p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
							Our app analyzes your game and creates personalized practice plans that focus on the
							areas you need to improve most.
						</p>
					</div>
				</div>
				<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
					<div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm'>
						<div className='rounded-full bg-primary/10 p-3'>
							<Clock className='h-6 w-6 text-primary' />
						</div>
						<h3 className='text-xl font-bold'>Time-Based Planning</h3>
						<p className='text-center text-gray-500 dark:text-gray-400'>
							Tell us how much time you have, and we'll create the perfect practice session.
						</p>
					</div>
					<div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm'>
						<div className='rounded-full bg-primary/10 p-3'>
							<BarChart3 className='h-6 w-6 text-primary' />
						</div>
						<h3 className='text-xl font-bold'>Stats-Based Focus</h3>
						<p className='text-center text-gray-500 dark:text-gray-400'>
							We analyze your strokes gained data to focus on areas that will lower your scores
							fastest.
						</p>
					</div>
					<div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm'>
						<div className='rounded-full bg-primary/10 p-3'>
							<Calendar className='h-6 w-6 text-primary' />
						</div>
						<h3 className='text-xl font-bold'>Flexible Scheduling</h3>
						<p className='text-center text-gray-500 dark:text-gray-400'>
							Plan your practice for a day, week, or month with easy adjustments as needed.
						</p>
					</div>
					<div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm'>
						<div className='rounded-full bg-primary/10 p-3'>
							<Target className='h-6 w-6 text-primary' />
						</div>
						<h3 className='text-xl font-bold'>Targeted Drills</h3>
						<p className='text-center text-gray-500 dark:text-gray-400'>
							Get specific drills and exercises tailored to your skill level and improvement areas.
						</p>
					</div>
					<div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm'>
						<div className='rounded-full bg-primary/10 p-3'>
							<Award className='h-6 w-6 text-primary' />
						</div>
						<h3 className='text-xl font-bold'>Progress Tracking</h3>
						<p className='text-center text-gray-500 dark:text-gray-400'>
							Visualize your improvement over time with detailed charts and statistics.
						</p>
					</div>
					<div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm'>
						<div className='rounded-full bg-primary/10 p-3'>
							<Zap className='h-6 w-6 text-primary' />
						</div>
						<h3 className='text-xl font-bold'>AI Assistance</h3>
						<p className='text-center text-gray-500 dark:text-gray-400'>
							Get AI-powered recommendations to optimize your practice routine.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
