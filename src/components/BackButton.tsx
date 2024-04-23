'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from './ui';

export const BackButton = () => {
	const router = useRouter();

	const handleOnBack = () => {
		window.history.length > 1 ? router.back() : router.push('/');
	};

	return (
		<Button
			onClick={handleOnBack}
			className='flex items-center gap-2 pb-2 text-sm'
			variant='secondary'
		>
			<ChevronLeftIcon className='size-4' /> back
		</Button>
	);
};
