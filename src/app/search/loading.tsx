const SearchPageLoading = () => {
	return (
		<ul className='mt-1 divide-y divide-zinc-100 rounded-md border bg-white py-4 shadow'>
			{[...new Array(3)].map((_, idx) => (
				<li
					key={idx}
					className='mx-auto flex animate-pulse items-center space-x-4 px-8 py-4'
				>
					<div className='size-40 rounded-lg bg-gray-200' />

					<div className='w-full flex-1 space-y-2 py-1'>
						<div className='h-8 rounded bg-gray-200' />

						<div className='space-y-2'>
							<div className='h-4 w-4/5 rounded bg-gray-200' />
							<div className='h-4 w-4/5 rounded bg-gray-200' />
							<div className='h-4 w-4/5 rounded bg-gray-200' />
						</div>

						<div className='h-8 w-2/5 rounded bg-gray-200' />
					</div>
				</li>
			))}
		</ul>
	);
};

export default SearchPageLoading;
