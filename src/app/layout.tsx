import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import { Icons, SearchBar } from '@/components';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Semantic Search',
	description: `An elegant hybrid search engine that significantly enhances search precision by seamlessly querying semantically related results using embedding AI models.`,
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='relative isolate min-h-screen overflow-hidden bg-white text-slate-900'>
					<svg
						className='absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
						aria-hidden='true'
					>
						<defs>
							<pattern
								id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
								width={200}
								height={200}
								x='50%'
								y={-1}
								patternUnits='userSpaceOnUse'
							>
								<path d='M.5 200V.5H200' fill='none' />
							</pattern>
						</defs>
						<rect
							width='100%'
							height='100%'
							strokeWidth={0}
							fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
						/>
					</svg>

					<div className='mx-auto max-w-7xl gap-16 px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-24'>
						<div className='flex h-full w-full flex-col items-center gap-4'>
							<Icons.Sparkles className='size-16' />

							<h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
								Semantic Search
							</h1>

							<p className='max-w-2xl text-center text-slate-700'>
								An elegant hybrid search engine that significantly enhances
								search precision by seamlessly querying semantically related
								results using embedding AI models.
							</p>

							<div className='mx-auto mt-12 flex w-full max-w-2xl flex-col'>
								<Suspense>
									<SearchBar />
								</Suspense>
								{children}
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
