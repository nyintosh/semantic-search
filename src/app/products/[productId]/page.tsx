import { eq } from 'drizzle-orm';
import { CheckIcon, ShieldIcon } from 'lucide-react';
import Image from 'next/image';

import { BackButton } from '@/components';
import { Button } from '@/components/ui';
import { db, productsTable } from '@/db';

interface ProductPageProps {
	params: {
		productId: string;
	};
}

const ProductPage = async ({ params }: ProductPageProps) => {
	const [product] = await db
		.select()
		.from(productsTable)
		.where(eq(productsTable.id, params.productId));

	if (!product) {
		return (
			<div className='mt-8 flex items-center justify-center gap-4'>
				<BackButton />
				<p className='prose text-sm'>Product not found.</p>
			</div>
		);
	}

	return (
		<div className='mt-1 divide-y divide-zinc-100 rounded-md rounded-b-md border bg-white px-12 py-8 shadow'>
			<div>
				<BackButton />

				<div className='mt-4'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
						{product.name}
					</h1>
				</div>

				<div className='my-6 aspect-square size-52 border border-border'>
					<div className='relative size-full overflow-hidden rounded-xl bg-zinc-100'>
						<Image
							className='size-full object-contain object-center'
							src={`/images/${product.imageUrl}`}
							alt={`Image of ${product.name}`}
							fill
							loading='eager'
						/>
					</div>
				</div>

				<div className='mt-4'>
					<div className='flex items-center'>
						<p className='font-medium text-gray-900'>
							${product.price.toFixed(2)}
						</p>
					</div>

					<div className='mt-4 space-y-6'>
						<p className='max-w-prose text-base text-muted-foreground'>
							{product.description}
						</p>
					</div>

					<div className='mt-6 flex items-center'>
						<CheckIcon className='size-5 flex-shrink-0 text-primary' />
						<p className='ml-2 text-sm text-muted-foreground'>
							Elegible for express delivery
						</p>
					</div>
				</div>
			</div>

			<div className='mt-6'>
				<Button className='mt-10 w-full'>Add to card</Button>

				<div className='mt-6 text-center'>
					<div className='inline-flex text-sm font-medium'>
						<ShieldIcon className='mr-2 size-5 flex-shrink-0 text-gray-400' />
						<span className='cursor-pointer text-muted-foreground hover:text-gray-700'>
							30 days return Gurantee
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
