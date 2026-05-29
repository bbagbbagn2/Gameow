'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWritableReviews, useWrittenReviews } from './hooks';
import { useUserStore } from '@/stores/user';
import type { JoinedGathering } from '@/types/response/gatherings';
import WritableReviewCard from './WritableReviewCard';
import WrittenReviewCard from './WrittenReviewCard';
import NoDataMessage from '../../../commons/NoDataMessage/NoDataMessage';
import Chip from '@/components/commons/Chip';
import ReviewSkeleton from '@/components/reviews/ReviewSkeleton';

/**
 * MyReviews 컴포넌트
 *
 * 사용자가 작성할 수 있는 리뷰 목록과 이미 작성한 리뷰 목록을 탭으로 전환해 보여줍니다.
 * - 로그인된 사용자의 참여 모임(완료된 모임 중 리뷰 미작성)을 API로 불러와 '작성 가능한 리뷰' 탭에 렌더링합니다.
 * - 사용자가 직접 작성한 리뷰를 불러와 '작성한 리뷰' 탭에 렌더링합니다.
 *
 * @returns {JSX.Element} 나의 리뷰 탭 UI
 *
 */
export default function MyReviews() {
	const { user } = useUserStore();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = useState<'writable' | 'written'>('writable');

	const { data: writableReviewsData = [], isLoading: isLoadingWritable } = useWritableReviews(user?.userId);

	const { data: writtenReviewsData = [], isLoading: isLoadingWritten } = useWrittenReviews(user?.userId);

	const isLoading = activeTab === 'writable' ? isLoadingWritable : isLoadingWritten;

	/**
	 * 리뷰 작성 성공 시 해당 모임의 isReviewed를 true로 업데이트
	 * @param gatheringId 리뷰 작성 완료한 모임 ID
	 */
	const handleReviewSuccess = (gatheringId: number) => {
		if (!user) return;

		try {
			queryClient.setQueryData<JoinedGathering[]>(
				['writableReviews', user.userId],
				old => old?.filter(g => g.id !== gatheringId) ?? []
			);

			queryClient.invalidateQueries({ queryKey: ['writtenReviews', user.userId] });

			setActiveTab('written');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-6">
			<div className="flex gap-2">
				<Chip text="작성 가능한 리뷰" isActive={activeTab === 'writable'} onClick={() => setActiveTab('writable')} />
				<Chip text="작성한 리뷰" isActive={activeTab === 'written'} onClick={() => setActiveTab('written')} />
			</div>

			{isLoading ? (
				<div className="flex flex-col gap-6">
					{Array.from({ length: 3 }).map((_, i) => (
						<ReviewSkeleton key={i} />
					))}
				</div>
			) : activeTab === 'writable' ? (
				writableReviewsData.length > 0 ? (
					writableReviewsData.map(gathering => (
						<WritableReviewCard
							key={gathering.id}
							gathering={gathering}
							onSuccess={() => handleReviewSuccess(gathering.id)}
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

