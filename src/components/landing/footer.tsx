import Link from "next/link"

export function Footer() {
	return (
		<footer className='w-full border-t bg-background py-6 md:py-10'>
			<div className='container flex flex-col items-center justify-between gap-4 md:flex-row'>
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
					<span className='text-lg font-bold'>Pocket Practice Plan</span>
				</div>
				<div className='flex gap-6 text-sm'>
					<Link href='#' className='text-gray-500 hover:underline dark:text-gray-400'>
						Terms
					</Link>
					<Link href='#' className='text-gray-500 hover:underline dark:text-gray-400'>
						Privacy
					</Link>
					<Link href='#' className='text-gray-500 hover:underline dark:text-gray-400'>
						Contact
					</Link>
				</div>
				<p className='text-sm text-gray-500 dark:text-gray-400'>
					© {new Date().getFullYear()} Pocket Practice Plan. All rights reserved.
				</p>
			</div>
		</footer>
	)
}
