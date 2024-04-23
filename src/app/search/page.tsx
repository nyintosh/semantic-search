import { Index } from '@upstash/vector';
import { sql } from 'drizzle-orm';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Product, db, productsTable } from '@/db';
import { vectorize } from '@/lib';

export const dynamic = 'force-dynamic';

const index = new Index<Product>();

interface SearchPageProps {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const query = searchParams.q;

	if (Array.isArray(query) || !query) {
		return redirect('/');
	}

	const products = await db
		.select()
		.from(productsTable)
		.where(
			sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${productsTable.description})) @@ to_tsquery('simple', lower(${query.trim().split(' ').join(' & ')}))`,
		)
		.limit(3);

	if (products.length < 3) {
		const vector = await vectorize(query);

		const res = await index.query({
			topK: 3,
			vector,
			includeMetadata: true,
		});

		products.push(
			...res
				.filter(
					(vp) => !products.some(({ id }) => id === vp.id) && vp.score > 0.9,
				)
				.map((product) => product.metadata!),
		);
	}

	if (products.length <= 0) {
		return (
			<div className='mt-1 rounded-md border bg-white py-4 text-center shadow'>
				<XIcon className='mx-auto size-8 text-gray-400' />

				<h3 className='mt-2 text-sm font-semibold text-gray-900'>
					No results.
				</h3>

				<p className='mx-auto mt-1 max-w-prose text-sm text-gray-500'>
					Sorry, we couldn&apos;t find any matches for{' '}
					<span className='font-medium text-primary'>{query}</span>.
				</p>
			</div>
		);
	}

	return (
		<ul className='mt-1 divide-y divide-zinc-100 rounded-md border bg-white py-4 shadow'>
			{products.slice(0, 3).map((product) => (
				<Link
					key={`${product.name}:${product.id}`}
					className='block'
					href={`/products/${product.id}`}
				>
					<li className='mx-auto flex items-center space-x-4 px-8 py-4'>
						<div className='relative flex size-40 items-center rounded-lg bg-gray-200'>
							<Image
								className='rounded-lg'
								src={`/images/${product.imageUrl}`}
								alt={`Image of ${product.name}`}
								fill
								loading='eager'
							/>
						</div>

						<div className='w-full flex-1 space-y-2 py-1'>
							<h1 className='text-lg font-medium text-gray-900'>
								{product.name}
							</h1>

							<p className='prose prose-sm line-clamp-3 text-gray-500'>
								{product.description}
							</p>

							<p className='text-base font-medium text-gray-900'>
								${product.price.toFixed(2)}
							</p>
						</div>
					</li>
				</Link>
			))}
		</ul>
	);
};

export default SearchPage;
