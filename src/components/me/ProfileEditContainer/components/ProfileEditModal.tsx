'use client';

import ProfileImageUploader from './ProfileImageUploader';

import { useProfileEditModal } from '../hooks/useProfileEditModal';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicInput from '@/components/commons/basic/BasicInput';
import BasicModal from '@/components/commons/basic/BasicModal';
import type { ProfileEditSchemaType } from '@/utils/schema';

interface ProfileEditModalProps {
	currentImage?: string;
	currentNickname?: string;
	onSubmit: (data: Partial<ProfileEditSchemaType>) => Promise<void>;
}

export default function ProfileEditModal({ currentImage, currentNickname, onSubmit }: ProfileEditModalProps) {
	const {
		register,
		handleSubmit,
		errors,
		isValid,
		isDirty,
		isSubmitting,
		closeModal,
		handleProfileImage,
		handleFormSubmit
	} = useProfileEditModal({
		currentNickname,
		onSubmit
	});

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-118 bg-discord-surface border border-white/5 p-8 shadow-2xl">
			<h1 className="text-xl font-bold tracking-tight text-white uppercase">Edit Profile</h1>
			<p className="text-discord-muted mt-1 text-sm">유저 정보를 수정하여 본인만의 프로필을 완성하세요.</p>
			<form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8 flex flex-col items-center gap-8 self-stretch">
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
