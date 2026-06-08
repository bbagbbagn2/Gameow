import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import { postReviews } from '@/apis/reviews/reviews';
import BasicButton from '@/components/commons/basic/BasicButton';
import BasicModal from '@/components/commons/basic/BasicModal';
import BasicTextArea from '@/components/commons/basic/BasicTextArea';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useModalClose } from '@/hooks/useModal';

interface ReviewWriteModalProps {
	/** 리뷰를 작성할 모임 ID */
	gatheringId: number;
	/** 리뷰 등록 성공 시 호출되는 콜백 */
	onSuccess: (score: number, comment: string) => void;
}

interface FormValues {
	/** 리뷰 점수 (1~5) */
	score: number;
	/** 리뷰 내용 */
	comment: string;
}

export default function ReviewWriteModal({ gatheringId, onSuccess }: ReviewWriteModalProps) {
	const closeModal = useModalClose();
	const { handleError } = useErrorHandler();
	const [rating, setRating] = useState(0);
	const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

	const { register, handleSubmit, watch } = useForm<FormValues>({
		defaultValues: {
			score: 0,
			comment: ''
		}
	});

	const comment = watch('comment');
	const isFormValid = rating > 0 && comment.trim().length > 0;

	const handleHeartClick = (index: number) => {
		setRating(index + 1);
		setAnimatingIndex(index);
		setTimeout(() => setAnimatingIndex(null), 100); // 애니메이션 끝나면 초기화
	};

	const onSubmit = async (data: FormValues) => {
		try {
			await postReviews({ gatheringId, score: rating, comment: data.comment });
			onSuccess(rating, data.comment);
			closeModal();
		} catch (err) {
			handleError(err);
		}
	};

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-[480px] min-w-[320px]">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				{/* Discord-style Header */}
				<div className="flex flex-col gap-1 p-6 pb-2">
					<h3 className="text-xl font-black tracking-tight text-white">리뷰 작성하기</h3>
					<p className="text-discord-muted text-sm font-medium">크루원들과 소중한 경험을 공유해 주세요.</p>
				</div>

				{/* Discord-style Body (Scrollable if needed) */}
				<div className="flex flex-col gap-8 p-6 pt-4">
					<div className="flex flex-col gap-4">
						<label className="text-discord-muted text-[11px] font-black tracking-wider uppercase">만족도 평가</label>
						<div className="bg-discord-bg hover:border-primary-500/20 flex items-center justify-center rounded-xl border border-white/5 py-8 transition-colors">
							<div className="flex gap-2">
								{Array.from({ length: 5 }).map((_, index) => (
									<button
										key={`heart-${index}`}
										type="button"
										onClick={() => handleHeartClick(index)}
										className="group relative cursor-pointer outline-none">
										<Image
											src={index < rating ? '/icons/heart_active.svg' : '/icons/heart.svg'}
											alt={index < rating ? '활성화된 하트' : '비활성화된 하트'}
											width={40}
											height={40}
											className={`transform transition-all duration-300 ${
												animatingIndex === index
													? 'scale-125'
													: index < rating
														? 'scale-100 drop-shadow-[0_0_10px_rgba(5,242,219,0.4)]'
														: 'scale-90 opacity-20 brightness-0 grayscale invert group-hover:scale-100 group-hover:opacity-40'
											}`}
										/>
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<label className="text-discord-muted text-[11px] font-black tracking-wider uppercase">상세 후기</label>
						<BasicTextArea
							register={register('comment', { required: true })}
							isValid={comment.trim().length > 0}
							placeholder="이곳에 내용을 입력하세요..."
							className="bg-discord-bg focus:border-primary-500/50 min-h-[120px] rounded-lg border-white/5 p-4 text-base"
							invalidText="내용을 입력해주세요"
						/>
					</div>
				</div>

				{/* Discord-style Footer */}
				<div className="bg-discord-bg mt-2 flex items-center justify-end gap-3 border-t border-white/5 p-4 px-6">
					<button
						type="button"
						onClick={closeModal}
						className="px-4 py-2 text-sm font-bold text-white transition-all hover:underline">
						취소
					</button>
					<div className="w-32">
						<BasicButton
							className="w-full text-sm font-black tracking-tighter uppercase"
							isActive={isFormValid}
							type="submit">
							리뷰 등록
						</BasicButton>
					</div>
				</div>
			</form>
		</BasicModal>
	);
}
