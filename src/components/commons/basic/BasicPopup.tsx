'use client';

import { useModalClose } from '@/hooks/useModal';

import BasicButton from './BasicButton';
import BasicModal from './BasicModal';

interface BasicPopupProps {
	/** 팝업 제목 */
	title: string;
	/** 팝업 본문 메시지 */
	subTitle?: string;
	/** 확인 버튼 텍스트 */
	confirmText?: string;
	/** 취소 버튼 텍스트 (없으면 취소 버튼 숨김) */
	cancelText?: string;
	/** 확인 버튼 클릭 시 동작 */
	onConfirm?: () => void;
	/** 취소 버튼 클릭 시 동작 */
	onCancel?: () => void;
}

export default function BasicPopup({
	title,
	subTitle,
	confirmText = '확인',
	cancelText,
	onConfirm,
	onCancel
}: BasicPopupProps) {
	const closePopup = useModalClose(); // 자기 자신 닫기

	/** 확인 버튼 클릭 시 실행될 동작 */
	const handleConfirm = () => {
		if (onConfirm) onConfirm();
		closePopup();
	};

	/** 취소 버튼 클릭 시 실행될 동작 */
	const handleCancel = () => {
		if (onCancel) onCancel();
		closePopup();
	};

	return (
		<BasicModal onClose={handleCancel} className="tb:min-w-[440px] min-w-[320px]">
			<div className="flex flex-col">
				{/* Discord-style Header */}
				<div className="p-6 pb-2">
					<h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
				</div>

				{/* Discord-style Body */}
				<div className="p-6 pt-2">
					{subTitle ? (
						<p className="text-discord-text text-base font-medium leading-relaxed">
							{subTitle}
						</p>
					) : (
						<p className="text-discord-muted text-sm font-medium">
							계속하려면 로그인이 필요합니다.
						</p>
					)}
				</div>

				{/* Discord-style Footer */}
				<div className="bg-discord-bg mt-4 flex items-center justify-end gap-3 p-4 px-6 border-t border-white/5">
					<button 
						type="button"
						onClick={handleCancel}
						className="text-white text-sm font-bold px-4 py-2 hover:underline transition-all outline-none">
						{cancelText || '취소'}
					</button>
					<div className="w-32">
						<BasicButton 
							className="w-full font-black text-sm uppercase tracking-tighter" 
							onClick={handleConfirm}>
							{confirmText}
						</BasicButton>
					</div>
				</div>
			</div>
		</BasicModal>
	);
}
