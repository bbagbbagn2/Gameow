export const queryKeys = {
	gatherings: {
		all: ['gatherings'] as const,
		list: (queryString: string) => ['gatherings', queryString] as const,
		detail: (id: number) => ['gathering', id] as const,
		participants: (id: number) => ['participants', id] as const,
		reviews: (id: number) => ['gatheringReviews', id] as const
	},
	favorites: {
		all: ['favoriteGatherings'] as const,
		list: (ids: readonly number[]) => ['favoriteGatherings', ids] as const
	},
	reviews: {
		scores: (type: string) => ['scores', type] as const,
		list: (type: string, filterValues: unknown, page: number) => ['reviews', type, filterValues, page] as const
	},
	me: {
		joinedGatherings: ['joinedGatherings'] as const,
		writableReviews: (userId?: number) => ['writableReviews', userId] as const,
		writtenReviews: (userId?: number) => ['writtenReviews', userId] as const
	}
};
