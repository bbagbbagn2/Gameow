import { leaveGathering } from '@/apis/gatherings/[id]';
import BasicModal from '@/components/commons/basic/BasicModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useModalClose } from '@/hooks/useModal';

interface CancelConfirmModalProps {
	/** 예약 취소할 모임 ID */
	gatheringId: number;
	/** 예약 취소 성공 시 호출되는 콜백 */
	onSuccess: () => void;
}

/**
 * 모임 예약 취소 확인 모달 컴포넌트
 * - "정말 예약을 취소하시겠습니까?" 문구와 버튼 제공
 * - 취소 버튼 클릭 시 API 호출 후 onSuccess 콜백 실행
 */
export default function CancelConfirmModal({ gatheringId, onSuccess }: CancelConfirmModalProps) {
	const closeModal = useModalClose();
	const { handleError } = useErrorHandler();

	/**
	 * 예약 취소 버튼 클릭 핸들러
	 * - leaveGathering API 호출
	 * - 성공 시 onSuccess 콜백 실행 후 모달 닫기
	 */
	const handleCancel = async () => {
		try {
			await leaveGathering(gatheringId);
			onSuccess();
			closeModal();
		} catch (err) {
			handleError(err);
		}
	};

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-[440px] min-w-[320px]">
			<div className="flex flex-col">
				{/* Discord-style Header (Minimal) */}
				<div className="p-6 pb-2">
					<h3 className="text-xl font-black tracking-tight text-white">예약 취소</h3>
				</div>

				{/* Discord-style Body */}
				<div className="p-6 pt-2">
					<p className="text-discord-text text-base leading-relaxed font-medium">
						정말 예약을 취소하시겠습니까? <br />
						취소된 예약은 복구할 수 없으며, 다시 참여하려면 새로 신청해야 합니다.
					</p>
				</div>

				{/* Discord-style Footer */}
				<div className="bg-discord-bg mt-4 flex items-center justify-end gap-3 border-t border-white/5 p-4 px-6">
					<button
						type="button"
						onClick={closeModal}
						className="px-4 py-2 text-sm font-bold text-white transition-all outline-none hover:underline">
						돌아가기
					</button>
					<div className="w-32">
						<button
							onClick={handleCancel}
							className="bg-destructive hover:bg-destructive/80 shadow-destructive/10 w-full rounded-md py-2.5 text-sm font-black tracking-tighter text-white uppercase shadow-lg transition-all active:scale-95">
							취소하기
						</button>
					</div>
				</div>
			</div>
		</BasicModal>
	);
}
