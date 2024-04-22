import { sql } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db, productsTable } from '@/db';

interface PageProps {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

const SearchPage = async ({ searchParams }: PageProps) => {
	const query = searchParams.q;

	if (Array.isArray(query) || !query) {
		return redirect('/');
	}

	let products = await db
		.select()
		.from(productsTable)
		.where(
			sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${productsTable.description})) @@ to_tsquery('simple', lower(${query.trim().split(' ').join(' & ')}))`,
		)
		.limit(3);

	return <pre>{JSON.stringify(products, null, 2)}</pre>;
};

export default SearchPage;
