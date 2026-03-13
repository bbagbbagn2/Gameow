import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { leaveGathering } from '@/apis/gatherings/[id]';
import { getJoinedGathering } from '@/apis/gatherings/joined';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useUserStore } from '@/stores/user';
import type { JoinedGathering } from '@/types/response/gatherings';
import GatheringCard from './GatheringCard';
import NoDataMessage from '../../../commons/NoDataMessage/NoDataMessage';
import GatheringSkeleton from '@/components/me/skeleton/GatheringSkeleton';
import Chip from '@/components/commons/Chip';
/**
 * JoinedGatherings 컴포넌트
 *
 * 사용자가 참여한 모임 목록을 카드 리스트로 렌더링합니다.
 * - API로부터 사용자가 참여한 모임을 조회하고
 *   - 취소된 모임은 뒤로 보내고, 이용 예정인 모임이 먼저 보이도록 정렬합니다.
 * - 자식 카드에서 리뷰 작성/취소 성공 시 상위 쿼리 캐시를 업데이트합니다.
 *
 * @component
 * @returns {JSX.Element} 참여한 모임 목록을 렌더링하는 React 컴포넌트
 * @example
 * <JoinedGatherings />
 */

/**
 * 에러 객체에서 사용자에게 보여줄 간단한 메시지를 추출합니다.
 * - 문자열이나 Error 인스턴스, 기타 unknown 타입을 다룹니다.
 * - 더 정교한 매핑(HTTP 상태 코드별 메시지 등)은 공통 유틸로 분리 권장.
 *
 * @param {unknown} err - 잡힌 에러 객체
 * @returns {string} 사용자에게 표시할 에러 메시지
 */

export default function JoinedGatherings() {
	const { user } = useUserStore();
	const queryClient = useQueryClient();
	const { handleError } = useErrorHandler();
	const [showFilteredOnly, setShowFilteredOnly] = useState(false);

	/**
	 * React Query: joinedGatherings 캐시
	 * - queryKey: ['joinedGatherings'] 로 캐싱/무효화에 사용됩니다.
	 * - queryFn: API에서 참여한 모임을 불러오고 취소된 모임을 뒤로 보냅니다.
	 * - enabled: user 정보가 있을 때만 쿼리를 활성화하여 불필요한 API 호출을 방지합니다.
	 * - staleTime: 2분, gcTime: 5분으로 설정하여 적절한 캐시 유지 및 메모리 관리를 합니다.
	 */

	const {
		data: gatherings = [],
		isLoading,
		isError,
		error
	} = useQuery<JoinedGathering[]>({
		queryKey: ['joinedGatherings', user?.userId],
		queryFn: async () => {
			try {
				return await getJoinedGathering({ sortBy: 'dateTime', sortOrder: 'asc' });
			} catch (err) {
				handleError(err);
				throw err;
			}
		},
		enabled: !!user,
		staleTime: 2 * 60 * 1000,
		gcTime: 5 * 60 * 1000
	});

	if (isLoading) return <GatheringSkeleton />;

	if (isError) {
		const errorMessage = error instanceof Error ? error.message : '모임 정보를 불러올 수 없어요';
		return <NoDataMessage text={errorMessage} />;
	}

	const filteredGatherings = showFilteredOnly
		? gatherings.filter(g => !g.isCompleted && !g.isReviewed && g.canceledAt === null)
		: gatherings;

	if (gatherings.length === 0) return <NoDataMessage text="신청한 모임이 아직 없어요" />;

	/**
	 * 리뷰 작성 성공 콜백
	 *
	 * 1. 낙관적으로 로컬 캐시 업데이트
	 * 2. 서버와 동기화를 위해 캐시 무효화
	 * 3. 실패 시 이전 상태로 롤백하고 에러 처리
	 *
	 * @param {number} gatheringId - 리뷰가 작성된 모임의 ID
	 * @returns {Promise<void>}
	 */
	const handleReviewSuccess = async (gatheringId: number) => {
		if (!user) return;

		const previousGatherings = queryClient.getQueryData<JoinedGathering[]>(['joinedGatherings', user.userId]);

		try {
			queryClient.setQueryData<JoinedGathering[]>(['joinedGatherings', user.userId], prev =>
				prev ? prev.map(g => (g.id === gatheringId ? { ...g, isReviewed: true } : g)) : []
			);

			await queryClient.invalidateQueries({ queryKey: ['joinedGatherings', user.userId] });
		} catch (error) {
			queryClient.setQueryData(['joinedGatherings', user.userId], previousGatherings);

			handleError(error);
			throw error;
		}
	};

	/**
	 * 낙관적 업데이트를 통한 모임 취소 핸들러
	 *
	 * 1. 낙관적으로 UI 캐시 업데이트 (목록에서 제거)
	 * 2. API 호출로 서버에서 취소 처리
	 * 3. 실패 시 이전 상태로 롤백하고 에러 처리
	 * 4. 성공 시 캐시 무효화로 서버 상태와 동기화
	 *
	 * @param {number} gatheringId - 취소할 모임의 ID
	 * @returns {Promise<void>}
	 */
	const handleCancelSuccess = async (gatheringId: number) => {
		if (!user) return;

		const previousGatherings = queryClient.getQueryData<JoinedGathering[]>(['joinedGatherings', user.userId]);

		try {
			queryClient.setQueryData<JoinedGathering[]>(['joinedGatherings', user.userId], prev =>
				prev ? prev.filter(g => g.id !== gatheringId) : []
			);

			await leaveGathering(gatheringId);

			await queryClient.invalidateQueries({ queryKey: ['joinedGatherings', user.userId] });
		} catch (error) {
			queryClient.setQueryData(['joinedGatherings', user.userId], previousGatherings);

			handleError(error);
			throw error;
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-6">
			<div className="flex">
				<Chip
					isActive={showFilteredOnly}
					text="이용 예정인 모임만 보기"
					onClick={() => setShowFilteredOnly(prev => !prev)}
				/>
			</div>

			{filteredGatherings.length === 0 ? (
				<NoDataMessage text="이용 예정인 모임이 없어요" />
			) : (
				<ul className="flex flex-col gap-6">
					{filteredGatherings.map(gathering => (
						<li key={gathering.id}>
							<GatheringCard
								gathering={gathering}
								onReviewSuccess={(gatheringId: number) => handleReviewSuccess(gatheringId)}
								onCancelSuccess={(gatheringId: number) => handleCancelSuccess(gatheringId)}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
