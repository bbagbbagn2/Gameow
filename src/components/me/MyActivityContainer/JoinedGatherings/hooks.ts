import { useQuery } from '@tanstack/react-query';

import { getJoinedGathering } from '@/apis/gatherings/joined';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import type { JoinedGathering } from '@/types/response/gatherings';

/**
 * useJoinedGatherings
 * - JoinedGatherings 컴포넌트의 데이터 로드 로직을 추출한 커스텀 훅
 * - 추후 서버 페이징(useInfiniteQuery)으로 전환할 수 있도록 중앙화
 */
export function useJoinedGatherings({ enabled = true } = {}) {
	const { handleError } = useErrorHandler();

	return useQuery<JoinedGathering[]>({
		queryKey: ['joinedGatherings'],
		queryFn: async () => {
			try {
				return await getJoinedGathering({ sortBy: 'dateTime', sortOrder: 'asc' });
			} catch (err) {
				handleError(err);
				throw err;
			}
		},
		enabled,
		staleTime: 60 * 1000 * 2
	});
}
