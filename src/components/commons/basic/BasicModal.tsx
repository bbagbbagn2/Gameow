'use client';

import Image from 'next/image';
import { cn } from '@/utils/cn';

interface BasicModalProps {
	/** 모달 내부에 표시될 콘텐츠 */
	children: React.ReactNode;
	/** 모달을 닫는 함수(일반적으로는 useModalClose 훅을 사용하면 됩니다) */
	onClose: () => void;
	/** 모달 내부 영역에 추가할 커스텀 CSS 클래스명 */
	className?: string;
	/** 모달의 너비 (CSS 값으로 설정) */
	width?: string;
}

/**
 * 기본 모달 컴포넌트
 *
 * 배경 클릭 또는 닫기 버튼을 통해 모달을 닫을 수 있습니다.
 * 화면 중앙에 고정되어 표시됩니다.
 * 기본 컴포넌트를 바탕으로 각각의 모달 컴포넌트를 생성하여 사용하시면 좋을 것 같습니다.
 *
 * @param props - BasicModalProps 객체
 * @returns JSX.Element
 *
 * @example
 * // 기본 모달 사용법
 * <BasicModal onClose={handleClose}>
 *   <div>모달 내용입니다</div>
 * 	 <BasicButton onClick={handleClose}>확인</BasicButton>
 * </BasicModal>
 */
export default function BasicModal({ children, onClose, className, width }: BasicModalProps) {
	const closeModalOnBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="z-modal fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
			onClick={closeModalOnBackgroundClick}>
			<div
				className="bg-discord-surface relative flex flex-col overflow-hidden rounded-xl border border-white/5 shadow-2xl animate-in zoom-in-95 duration-200"
				style={{ width: width || 'auto' }}
				onClick={e => e.stopPropagation()}>
				{/* Discord-style Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-base flex h-8 w-8 items-center justify-center rounded-md text-discord-muted transition-all hover:bg-white/5 hover:text-white">
					<Image src="/icons/close.svg" alt="close" width={20} height={20} className="opacity-60 invert" />
				</button>

				<div className={cn('flex flex-col', className)}>{children}</div>
			</div>
		</div>
	);
}
