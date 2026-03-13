'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postReviews } from '@/apis/reviews/reviews';
import { getJoinedGathering } from '@/apis/gatherings/joined';
import { getReviews } from '@/apis/reviews/reviews';
import { useUserStore } from '@/stores/user';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import type { JoinedGathering } from '@/types/response/gatherings';
import type { ReviewResponse, GetReviewsResponse } from '@/types/response/reviews';
import WritableReviewCard from './WritableReviewCard';
import WrittenReviewCard from './WrittenReviewCard';
import NoDataMessage from '../../../commons/NoDataMessage/NoDataMessage';
import Chip from '@/components/commons/Chip';
import GatheringSkeleton from '../../skeleton/GatheringSkeleton';

/**
 * MyReviews 컴포넌트
 *
 * 사용자가 작성할 수 있는 리뷰 목록과 이미 작성한 리뷰 목록을 탭으로 전환해 보여줍니다.
 * - 로그인된 사용자의 참여 모임(완료된 모임 중 리뷰 미작성)을 API로 불러와 '작성 가능한 리뷰' 탭에 렌더링합니다.
 * - 사용자가 직접 작성한 리뷰를 불러와 '작성한 리뷰' 탭에 렌더링합니다.
 * - 리뷰 작성 시 낙관적 업데이트를 적용하여 즉시 UI를 반영합니다.
 *
 * @returns {JSX.Element} 나의 리뷰 탭 UI
 */
export default function MyReviews() {
	const { user } = useUserStore();
	const queryClient = useQueryClient();
	const { handleError } = useErrorHandler();
	const [activeTab, setActiveTab] = useState<'writable' | 'written'>('writable');

	const {
		data: writableReviewsData = [],
		isLoading: isWritableLoading,
		isError: isWritableError,
		error: writableError
	} = useQuery<JoinedGathering[], Error>({
		queryKey: ['writableReviews', user?.userId],
		queryFn: async () => {
			try {
				const data = await getJoinedGathering({ completed: true, reviewed: false });
				return data.filter(gathering => gathering.canceledAt === null);
			} catch (err) {
				handleError(err);
				throw err;
			}
		},
		enabled: !!user,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000
	});

	const {
		data: writtenReviewsData = [],
		isLoading: isWrittenLoading,
		isError: isWrittenError,
		error: writtenError
	} = useQuery<ReviewResponse[], Error>({
		queryKey: ['writtenReviews', user?.userId],
		queryFn: async () => {
			try {
				const res: GetReviewsResponse = await getReviews({ userId: user!.userId });
				return res.data;
			} catch (err) {
				handleError(err);
				throw err;
			}
		},
		enabled: !!user,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000
	});

	/**
	 * 낙관적 업데이트를 통한 리뷰 작성 핸들러
	 * 1. 낙관적으로 UI 캐시 업데이트
	 * 2. API 호출로 서버에 저장
	 * 3. 실패 시 이전 상태로 롤백
	 * 4. 성공 시 캐시 무효화로 서버 상태와 동기화
	 *
	 * @param gatheringId 리뷰 작성할 모임 ID
	 * @param score 리뷰 점수 (1-5)
	 * @param comment 리뷰 내용
	 */
	const handleReviewSubmit = async (gatheringId: number, score: number, comment: string) => {
		if (!user) return;

		const previousWritableData = queryClient.getQueryData<JoinedGathering[]>(['writableReviews', user.userId]);
		const previousWrittenData = queryClient.getQueryData<ReviewResponse[]>(['writtenReviews', user.userId]);

		try {
			queryClient.setQueryData<JoinedGathering[]>(
				['writableReviews', user.userId],
				old => old?.filter(g => g.id !== gatheringId) ?? []
			);

			await postReviews({ gatheringId, score, comment });

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['writableReviews', user.userId] }),
				queryClient.invalidateQueries({ queryKey: ['writtenReviews', user.userId] })
			]);

			setActiveTab('written');
		} catch (error) {
			queryClient.setQueryData(['writableReviews', user.userId], previousWritableData);
			queryClient.setQueryData(['writtenReviews', user.userId], previousWrittenData);

			handleError(error);
		}
	};

	if (isWritableLoading || isWrittenLoading) return <GatheringSkeleton />;

	if (isWritableError || isWrittenError) {
		const errorMessage =
			isWritableError && writableError instanceof Error
				? writableError.message
				: isWrittenError && writtenError instanceof Error
					? writtenError.message
					: '리뷰 정보를 불러올 수 없어요';
		return <NoDataMessage text={errorMessage} />;
	}

	return (
		<div className="flex flex-1 flex-col gap-6">
			<div className="flex gap-2">
				<Chip text="작성 가능한 리뷰" isActive={activeTab === 'writable'} onClick={() => setActiveTab('writable')} />
				<Chip text="작성한 리뷰" isActive={activeTab === 'written'} onClick={() => setActiveTab('written')} />
			</div>
			{activeTab === 'writable' ? (
				writableReviewsData.length > 0 ? (
					writableReviewsData.map(gathering => (
						<WritableReviewCard
							key={gathering.id}
							gathering={gathering}
							onSubmit={(score: number, comment: string) => handleReviewSubmit(gathering.id, score, comment)}
						/>
					))
				) : (
					<NoDataMessage text="작성 가능한 리뷰가 아직 없어요" />
				)
			) : writtenReviewsData.length > 0 ? (
				writtenReviewsData.map(review => <WrittenReviewCard key={review.id} review={review} />)
			) : (
				<NoDataMessage text="작성한 리뷰가 아직 없어요" />
			)}
		</div>
	);
}
