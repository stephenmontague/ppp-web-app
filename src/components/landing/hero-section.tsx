import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
	return (
		<section className='w-full py-12 md:py-24 lg:py-32 bg-background'>
			<div className='container px-4 md:px-6'>
				<div className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'>
					<div className='flex flex-col justify-center space-y-4'>
						<div className='space-y-2'>
							<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
								Elevate Your Golf Game with Structured Practice
							</h1>
							<p className='max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
								Stop wondering what to practice. Get personalized practice plans based on your
								skill level, stats, and available time.
							</p>
						</div>
						<div className='flex flex-col gap-2 min-[400px]:flex-row'>
							<Link href='/auth/register'>
								<Button size='lg' className='px-8'>
									Get Started
								</Button>
							</Link>
							<Link href='#features'>
								<Button size='lg' variant='outline' className='px-8'>
									Learn More
								</Button>
							</Link>
						</div>
					</div>
					<div className='flex items-center justify-center'>
						<div className='relative w-full h-[400px] overflow-hidden rounded-xl'>
							<img
								src='/placeholder.svg?height=400&width=600'
								alt='Golf practice visualization'
								className='object-cover w-full h-full'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
