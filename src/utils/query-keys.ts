export const queryKeys = {
	gatherings: {
		all: ['gatherings'] as const,
		lists: () => ['gatherings', 'list'] as const,
		list: (queryString: string) => ['gatherings', 'list', queryString] as const,
		details: () => ['gatherings', 'detail'] as const,
		detail: (id: number) => ['gatherings', 'detail', id] as const,
		participants: (id: number) => ['gatherings', 'participants', id] as const,
		reviews: (id: number) => ['gatherings', 'reviews', id] as const
	},
	favorites: {
		all: ['favorites'] as const,
		lists: () => ['favorites', 'list'] as const,
		list: (ids: readonly number[]) => ['favorites', 'list', ids] as const
	},
	reviews: {
		all: ['reviews'] as const,
		lists: () => ['reviews', 'list'] as const,
		list: (type: string, filterValues: unknown, page: number) => ['reviews', 'list', type, filterValues, page] as const,
		scores: () => ['reviews', 'scores'] as const,
		score: (type: string) => ['reviews', 'scores', type] as const
	},
	me: {
		all: ['me'] as const,
		joinedGatherings: () => ['me', 'joinedGatherings'] as const,
		reviews: () => ['me', 'reviews'] as const,
		writableReviews: (userId?: number) => ['me', 'reviews', 'writable', userId] as const,
		writtenReviews: (userId?: number) => ['me', 'reviews', 'written', userId] as const
	}
};
