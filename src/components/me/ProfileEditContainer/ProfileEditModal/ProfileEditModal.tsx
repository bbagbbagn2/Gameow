'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalClose } from '@/hooks/useModal';
import { ProfileEditSchemaType, profileEditSchema } from '@/utils/schema';
import BasicButton from '@/components/commons/basic/BasicButton';
import BasicModal from '@/components/commons/basic/BasicModal';
import BasicInput from '@/components/commons/basic/BasicInput';
import ProfileImageUploader from './ProfileImageUploader';

interface ProfileEditModalProps {
	/** 현재 사용자의 프로필 이미지 URL */
	currentImage?: string;
	/** 현재 사용자의 닉네임 */
	currentNickname?: string;
	/** 수정 완료 시 호출되는 콜백 함수 */
	onSubmit: (data: Partial<ProfileEditSchemaType>) => Promise<void>;
}

/**
 * `ProfileEditModal` 컴포넌트
 *
 * 사용자 프로필 정보를 수정할 수 있는 모달을 제공합니다.
 * - 닉네임과 프로필 이미지를 변경할 수 있음
 * - `react-hook-form` + `zod`를 사용한 유효성 검사 지원
 *
 * @param {ProfileEditModalProps} props - 컴포넌트 props
 * @param {string} [props.currentImage] - 현재 사용자의 프로필 이미지 URL
 * @param {string} [props.currentNickname] - 현재 사용자의 닉네임
 * @param {Function} props.onSubmit - 수정 완료 시 호출되는 콜백
 *
 * @returns {JSX.Element} 모달 UI
 */
export default function ProfileEditModal({ currentImage, currentNickname, onSubmit }: ProfileEditModalProps) {
	const closeModal = useModalClose();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty, isSubmitting, dirtyFields },
		setValue,
		setError
	} = useForm<ProfileEditSchemaType>({
		mode: 'onChange',
		resolver: zodResolver(profileEditSchema),
		defaultValues: { companyName: currentNickname ?? '', image: undefined }
	});

	const handleProfileImage = (selectedFile: File) => {
		setValue('image', selectedFile, { shouldValidate: true, shouldDirty: true });
	};

	const handleFormSubmit = async (data: ProfileEditSchemaType) => {
		const dirtyFieldKeys = Object.keys(dirtyFields) as Array<keyof ProfileEditSchemaType>;

		if (dirtyFieldKeys.length === 0) {
			closeModal();
			return;
		}

		const updates = dirtyFieldKeys.reduce((acc, key) => {
			const value = data[key];
			if (value !== undefined) {
				return { ...acc, [key]: value };
			}
			return acc;
		}, {} as Partial<ProfileEditSchemaType>);

		try {
			await onSubmit(updates);
			closeModal();
		} catch (error) {
			setError('root', {
				message: error instanceof Error ? error.message : '프로필 수정에 실패했습니다.'
			});
		}
	};

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-118">
			<h1 className="text-shadow-primary text-lg font-semibold text-white">프로필 수정하기</h1>
			<form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 flex flex-col items-start gap-6 self-stretch">
				<div className="flex w-full flex-col items-start gap-6">
					<ProfileImageUploader currentImage={currentImage} onChange={handleProfileImage} />
					<div className="w-full">
						<BasicInput
							id="companyName"
							label="닉네임"
							placeholder="닉네임을 입력해주세요"
							{...register('companyName')}
							isValid={!errors.companyName}
							invalidText={errors.companyName?.message}
						/>
					</div>
				</div>

				<div className="flex items-start gap-4 self-stretch">
					<BasicButton onClick={closeModal} isLarge outlined type="button">
						취소
					</BasicButton>
					<BasicButton isActive={isValid && isDirty} isLarge type="submit" disabled={!isValid || isSubmitting}>
						수정하기
					</BasicButton>
				</div>
			</form>
		</BasicModal>
	);
}
