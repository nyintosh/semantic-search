'use client';

import { Loader2Icon, SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';

import { Button, Input } from './ui';

export const SearchBar = () => {
	const searchParams = useSearchParams();

	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState(searchParams.get('q') ?? '');
	const [isSearching, startTransition] = useTransition();

	const router = useRouter();

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case 'Escape':
				inputRef.current?.blur();
				break;
			case 'Enter':
				$search();
				break;
		}
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const $search = () => {
		if (!query) {
			router.push('/');
			inputRef.current?.focus();
			return;
		}

		startTransition(() => {
			router.push(`/search?q=${query}`);
		});
	};

	return (
		<div className='relative flex h-14 w-full flex-col bg-white'>
			<div className='relative z-10 h-14 rounded-md'>
				<Input
					onKeyDown={handleOnKeyDown}
					onChange={handleOnChange}
					className='absolute inset-0 h-full'
					ref={inputRef}
					value={query}
					disabled={isSearching}
				/>

				<Button
					onClick={$search}
					className='absolute inset-y-0 right-0 h-full rounded-l-none'
					disabled={isSearching}
				>
					{isSearching ? (
						<Loader2Icon className='size-6 animate-spin' />
					) : (
						<SearchIcon className='size-6' />
					)}
				</Button>
			</div>
		</div>
	);
};
