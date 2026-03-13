import { useModalClose } from '@/hooks/useModal';
import BasicButton from '@/components/commons/basic/BasicButton';
import BasicModal from '@/components/commons/basic/BasicModal';

interface CancelConfirmModalProps {
	/** 예약 취소 시 호출되는 콜백 (낙관적 업데이트 및 API 호출 수행) */
	onConfirm: () => Promise<void>;
}

/**
 * 모임 예약 취소 확인 모달 컴포넌트
 * - "정말 예약을 취소하시겠습니까?" 문구와 버튼 제공
 * - 확인 버튼 클릭 시 onConfirm 콜백 실행 (부모에서 낙관적 업데이트 및 API 호출)
 */
export default function CancelConfirmModal({ onConfirm }: CancelConfirmModalProps) {
	const closeModal = useModalClose();

	/**
	 * 예약 취소 버튼 클릭 핸들러
	 * - 부모에서 제공한 낙관적 업데이트 콜백 실행
	 * - 성공 시 모달 자동 닫기
	 */
	const handleCancel = async () => {
		await onConfirm();
		closeModal();
	};

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-[402px]">
			<div className="mt-12">
				<form
					onSubmit={e => {
						e.preventDefault();
						handleCancel();
					}}
					className="flex flex-col items-center gap-6">
					<p className="font-medium text-white text-shadow-white">정말 예약을 취소하시겠습니까?</p>
					<div className="flex gap-2 font-semibold">
						<BasicButton outlined onClick={closeModal} type="button">
							닫기
						</BasicButton>
						<BasicButton type="submit">취소하기</BasicButton>
					</div>
				</form>
			</div>
		</BasicModal>
	);
}
