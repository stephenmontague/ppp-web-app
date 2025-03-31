import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/landing/hero-section"
import { FeatureSection } from "@/components/landing/feature-section"
import { TestimonialSection } from "@/components/landing/testimonial-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
	return (
		<div className='flex min-h-screen flex-col'>
			<header className='sticky top-0 z-40 border-b bg-background'>
				<div className='container flex h-16 items-center justify-between py-4'>
					<div className='flex items-center gap-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-6 w-6'>
							<path d='M12 18a6 6 0 0 0 0-12v12z' />
							<path d='M12 18a6 6 0 0 1 0-12v12z' />
							<path d='M12 18V6' />
						</svg>
						<span className='text-xl font-bold'>Pocket Practice Plan</span>
					</div>
					<nav className='hidden md:flex items-center gap-6'>
						<Link href='#features' className='text-sm font-medium hover:underline'>
							Features
						</Link>
						<Link href='#testimonials' className='text-sm font-medium hover:underline'>
							Testimonials
						</Link>
						<Link href='#pricing' className='text-sm font-medium hover:underline'>
							Pricing
						</Link>
					</nav>
					<div className='flex items-center gap-4'>
						<Link href='/auth/login'>
							<Button variant='outline'>Log In</Button>
						</Link>
						<Link href='/auth/register'>
							<Button>Sign Up</Button>
						</Link>
					</div>
				</div>
			</header>
			<main className='flex-1'>
				<HeroSection />
				<FeatureSection />
				<TestimonialSection />
			</main>
			<Footer />
		</div>
	)
}
