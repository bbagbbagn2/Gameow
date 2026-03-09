import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModalClose } from '@/hooks/useModal';
import BasicButton from '@/components/commons/basic/BasicButton';
import BasicModal from '@/components/commons/basic/BasicModal';
import BasicTextArea from '@/components/commons/basic/BasicTextArea';

interface ReviewWriteModalProps {
	/** 리뷰 제출 시 호출되는 콜백 (낙관적 업데이트 및 API 호출 수행) */
	onSubmit: (score: number, comment: string) => Promise<void>;
}

interface FormValues {
	/** 리뷰 점수 (1~5) */
	score: number;
	/** 리뷰 내용 */
	comment: string;
}

export default function ReviewWriteModal({ onSubmit }: ReviewWriteModalProps) {
	const closeModal = useModalClose();
	const [rating, setRating] = useState(0);
	const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

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

	const handleFormSubmit = async (data: FormValues) => {
		setIsSubmitting(true);
		try {
			await onSubmit(rating, data.comment);
			closeModal();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-[472px] min-w-[290px]">
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div className="text-white">
					<h3 className="text-shadow-primary text-start text-lg font-semibold">리뷰 쓰기</h3>
					<div className="mt-6 flex w-full flex-col gap-6">
						<div className="flex flex-col gap-3 font-semibold">
							<div className="flex flex-col items-start gap-3">
								<p className="text-shadow-white">만족스러운 경험이었나요?</p>
								<div className="flex gap-0.5">
									{Array.from({ length: 5 }).map((_, index) => (
										<button
											key={`heart-${index}`}
											type="button"
											onClick={() => handleHeartClick(index)}
											className="cursor-pointer">
											<Image
												src={index < rating ? '/icons/heart_active.svg' : '/icons/heart.svg'}
												alt={index < rating ? '활성화된 하트' : '비활성화된 하트'}
												width={24}
												height={24}
												className={`transform transition-transform duration-500 ease-out ${
													animatingIndex === index ? 'scale-115' : index < rating ? 'scale-110' : 'scale-100'
												}`}
											/>
										</button>
									))}
								</div>
							</div>
							<div className="flex w-full flex-col items-stretch gap-3">
								<p className="text-start text-shadow-white">경험에 대해 남겨주세요.</p>
								<BasicTextArea
									register={register('comment', { required: true })}
									isValid={comment.trim().length > 0}
									invalidText="내용을 입력해주세요"
								/>
							</div>
						</div>
						<div className="flex gap-4">
							<BasicButton outlined onClick={closeModal} className="font-semibold" isLarge type="button">
								취소
							</BasicButton>
							<BasicButton
								className="font-semibold"
								isLarge
								isActive={isFormValid && !isSubmitting}
								disabled={isSubmitting}
								type="submit">
								리뷰 등록
							</BasicButton>
						</div>
					</div>
				</div>
			</form>
		</BasicModal>
	);
}
