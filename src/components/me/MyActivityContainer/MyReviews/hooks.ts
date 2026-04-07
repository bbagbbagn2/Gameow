import { useQuery } from '@tanstack/react-query';
import { getJoinedGathering } from '@/apis/gatherings/joined';
import { getReviews } from '@/apis/reviews/reviews';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import type { JoinedGathering } from '@/types/response/gatherings';
import type { ReviewResponse, GetReviewsResponse } from '@/types/response/reviews';

/**
 * useWritableReviews
 * - 사용자가 작성 가능한 리뷰(완료 & 미작성) 목록을 반환합니다.
 */
export function useWritableReviews(userId?: number) {
	const { handleError } = useErrorHandler();

	return useQuery<JoinedGathering[]>({
		queryKey: ['writableReviews', userId],
		queryFn: async () => {
			try {
				return await getJoinedGathering({ completed: true, reviewed: false });
			} catch (err) {
				handleError(err);
				throw err;
			}
		},
		enabled: !!userId,
		select: g => g.filter(gathering => gathering.canceledAt === null),
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10
	});
}

/**
 * useWrittenReviews
 * - 사용자가 작성한 리뷰 목록을 반환합니다.
 */
export function useWrittenReviews(userId?: number) {
	const { handleError } = useErrorHandler();

	return useQuery<ReviewResponse[]>({
		queryKey: ['writtenReviews', userId],
		queryFn: async () => {
			try {
				const res = await getReviews({ userId: userId! });
				return (res as GetReviewsResponse).data;
			} catch (err) {
				handleError(err);
				throw err;
			}
		},
		enabled: !!userId,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10
	});
}
