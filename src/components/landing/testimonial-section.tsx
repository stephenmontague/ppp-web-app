export function TestimonialSection() {
	return (
		<section id='testimonials' className='w-full py-12 md:py-24 lg:py-32'>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<div className='space-y-2'>
						<div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
							Testimonials
						</div>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Hear From Our Users</h2>
						<p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
							Golfers of all skill levels are improving their game with Pocket Practice Plan.
						</p>
					</div>
				</div>
				<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
					<div className='flex flex-col justify-between rounded-lg border p-6 shadow-sm'>
						<div>
							<div className='flex items-center gap-2'>
								{[1, 2, 3, 4, 5].map((star) => (
									<svg
										key={star}
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='h-5 w-5 text-yellow-500'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
								))}
							</div>
							<p className='mt-4 text-gray-500 dark:text-gray-400'>
								"I went from a 22 handicap to a 16 in just three months using the practice
								plans. The focused approach made all the difference."
							</p>
						</div>
						<div className='mt-6 flex items-center gap-4'>
							<div className='rounded-full bg-gray-100 p-1 dark:bg-gray-800'>
								<div className='h-8 w-8 rounded-full bg-gray-300' />
							</div>
							<div>
								<p className='text-sm font-medium'>Mike Johnson</p>
								<p className='text-sm text-gray-500 dark:text-gray-400'>22 → 16 Handicap</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-between rounded-lg border p-6 shadow-sm'>
						<div>
							<div className='flex items-center gap-2'>
								{[1, 2, 3, 4, 5].map((star) => (
									<svg
										key={star}
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='h-5 w-5 text-yellow-500'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
								))}
							</div>
							<p className='mt-4 text-gray-500 dark:text-gray-400'>
								"The time-based practice plans are perfect for my busy schedule. I can get in
								quality practice even when I only have 30 minutes."
							</p>
						</div>
						<div className='mt-6 flex items-center gap-4'>
							<div className='rounded-full bg-gray-100 p-1 dark:bg-gray-800'>
								<div className='h-8 w-8 rounded-full bg-gray-300' />
							</div>
							<div>
								<p className='text-sm font-medium'>Sarah Williams</p>
								<p className='text-sm text-gray-500 dark:text-gray-400'>12 Handicap</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-between rounded-lg border p-6 shadow-sm'>
						<div>
							<div className='flex items-center gap-2'>
								{[1, 2, 3, 4, 5].map((star) => (
									<svg
										key={star}
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='h-5 w-5 text-yellow-500'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
								))}
							</div>
							<p className='mt-4 text-gray-500 dark:text-gray-400'>
								"As a senior golfer, I appreciate how the app adapts to my abilities. The
								targeted putting drills have taken 3 strokes off my game."
							</p>
						</div>
						<div className='mt-6 flex items-center gap-4'>
							<div className='rounded-full bg-gray-100 p-1 dark:bg-gray-800'>
								<div className='h-8 w-8 rounded-full bg-gray-300' />
							</div>
							<div>
								<p className='text-sm font-medium'>Robert Chen</p>
								<p className='text-sm text-gray-500 dark:text-gray-400'>18 → 15 Handicap</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
