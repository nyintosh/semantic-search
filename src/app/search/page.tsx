import { redirect } from 'next/navigation';

interface PageProps {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

const SearchPage = ({ searchParams }: PageProps) => {
	const query = searchParams.q;

	if (Array.isArray(query) || !query) {
		return redirect('/');
	}

	return null;
};

export default SearchPage;
