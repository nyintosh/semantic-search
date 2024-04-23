'use client';

import { BackButton } from '@/components';

const ProductErrorPage = () => {
	return (
		<div className='mt-8 flex items-center justify-center gap-4'>
			<BackButton />
			<p className='prose text-sm'>Oops! Something went wrong.</p>
		</div>
	);
};

export default ProductErrorPage;
