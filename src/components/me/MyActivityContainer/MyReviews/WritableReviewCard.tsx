import { useModal } from '@/hooks/useModal';
import type { JoinedGathering } from '@/types/response/gatherings';
import CardLayout from '../common/CardLayout/CardLayout';
import ReviewWriteModal from '../modals/ReviewWriteModal';
import BasicButton from '@/components/commons/basic/BasicButton';

interface GatheringProps {
	/** 리뷰 작성이 가능한 모임 객체 */
	gathering: JoinedGathering;

	/** 리뷰 작성 시 호출되는 콜백 함수 (낙관적 업데이트 및 API 호출 수행) */
	onSubmit: (score: number, comment: string) => Promise<void>;
}

/**
 * 작성 가능한 리뷰 카드 컴포넌트
 * - 참여한 모임 정보를 표시
 * - "리뷰 작성하기" 버튼 클릭 시 모달 오픈
 */
export default function WritableReviewCard({ gathering, onSubmit }: GatheringProps) {
	const { openModal } = useModal();

	/**
	 * 리뷰 작성 버튼 클릭 시 모달을 열고
	 * 작성 완료 시 onSubmit 호출 (낙관적 업데이트)
	 */
	const handleClick = () => {
		openModal(<ReviewWriteModal onSubmit={onSubmit} />);
	};

	return (
		<CardLayout gathering={gathering}>
			<BasicButton onClick={handleClick}>리뷰 작성하기</BasicButton>
		</CardLayout>
	);
}
